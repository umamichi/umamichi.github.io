/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _visualizer = __webpack_require__(1);
	
	var _visualizer2 = _interopRequireDefault(_visualizer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	  (0, _visualizer2.default)();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = visualizer;
	function visualizer() {
	  var divNum = void 0; // divの数
	  var height = void 0; // 高さ
	  var audioContext = void 0;
	  var analyser = void 0;
	  var spectrum = void 0;
	
	  // div初期化
	  divInitialize();
	
	  // フーリエ変換の準備
	  createAnalyser();
	
	  // マイク入力を取得
	  getMicrophone();
	
	  /**
	   * div要素の初期化
	   */
	  function divInitialize() {
	    var wrap = document.getElementById('wrap');
	    divNum = Math.floor(wrap.clientWidth / 15); //divの個数を計算 15px=width+margin
	    var wrapHtml = '';
	    for (var i = 0; i < divNum; i++) {
	      wrapHtml += '<div id="' + i + '"></div>';
	    }
	    wrap.innerHTML = wrapHtml;
	
	    //描画エリアの高さ取得
	    var area = document.getElementById('area_div');
	    height = area.clientHeight;
	  }
	
	  /**
	   * アナライザを生成
	   */
	  function createAnalyser() {
	    // audioContextを生成
	    audioContext = new (window.AudioContext || window.webkitAudioContext)();
	    // analyzer（分析する装置）を生成
	    analyser = audioContext.createAnalyser();
	    //  0-1 の範囲でスペクトラムデータの動きの速さを設定する（0だともっとも速い）
	    analyser.smoothingTimeConstant = 0.8;
	    // fftSizeは音の分割サイズで、2の累乗の数値のみ設定可
	    // デフォルトで2048、しかしデータ量が多すぎてリアルタイム処理が難しくなるので適度に減らす方がいい
	    analyser.fftSize = 256;
	  }
	
	  /**
	   * マイクのデータを取得
	   */
	  function getMicrophone() {
	    // 音のソースをマイクにする
	    var audioSource = navigator.mediaDevices.getUserMedia({ video: false, audio: true });
	
	    // 音声データを取得したら実行
	    audioSource.then(function (stream) {
	      var source = audioContext.createMediaStreamSource(stream);
	      console.log(source);
	      // analyser.frequencyBinCount はfftSizeの半分
	      spectrum = new Uint8Array(analyser.frequencyBinCount);
	      // sourceをanalyserに接続
	      source.connect(analyser);
	
	      // ビジュアライザ処理
	      requestAnimationFrame(visualize);
	    });
	
	    audioSource.catch(function (e) {
	      console.log(e.name);
	    });
	  }
	
	  /**
	   * ビジュアライジング
	   */
	  function visualize() {
	    requestAnimationFrame(visualize);
	    analyser.getByteFrequencyData(spectrum); // フーリエ変換、配列で音を取得
	
	    var ct = (spectrum.length - 30) / divNum;
	
	    // //Hzごとにvalumeをheightで表す
	    for (var i = 0; i < divNum; i++) {
	      var y = Math.floor(spectrum[Math.floor(i * ct)] / 255 * height);
	      var element = document.getElementById(Math.floor(i));
	      element.style.height = y + 'px';
	    }
	  }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjcwOGUxODJlMjhjMWUxY2YyNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3Zpc3VhbGl6ZXIuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwidmlzdWFsaXplciIsImRpdk51bSIsImhlaWdodCIsImF1ZGlvQ29udGV4dCIsImFuYWx5c2VyIiwic3BlY3RydW0iLCJkaXZJbml0aWFsaXplIiwiY3JlYXRlQW5hbHlzZXIiLCJnZXRNaWNyb3Bob25lIiwid3JhcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXRoIiwiZmxvb3IiLCJjbGllbnRXaWR0aCIsIndyYXBIdG1sIiwiaSIsImlubmVySFRNTCIsImFyZWEiLCJjbGllbnRIZWlnaHQiLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJzbW9vdGhpbmdUaW1lQ29uc3RhbnQiLCJmZnRTaXplIiwiYXVkaW9Tb3VyY2UiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJ2aWRlbyIsImF1ZGlvIiwidGhlbiIsInN0cmVhbSIsInNvdXJjZSIsImNyZWF0ZU1lZGlhU3RyZWFtU291cmNlIiwiY29uc29sZSIsImxvZyIsIlVpbnQ4QXJyYXkiLCJmcmVxdWVuY3lCaW5Db3VudCIsImNvbm5lY3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ2aXN1YWxpemUiLCJjYXRjaCIsImUiLCJuYW1lIiwiZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEiLCJjdCIsImxlbmd0aCIsInkiLCJlbGVtZW50Iiwic3R5bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QjtBQUNEO0FBQ0Y7QUFDRixFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNzA4ZTE4MmUyOGMxZTFjZjI2ZiIsImltcG9ydCB2aXN1YWxpemVyIGZyb20gJy4vdmlzdWFsaXplcic7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHZpc3VhbGl6ZXIoKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9BcHAuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aXN1YWxpemVyKCkge1xuICBsZXQgZGl2TnVtOyAvLyBkaXbjga7mlbBcbiAgbGV0IGhlaWdodDsgLy8g6auY44GVXG4gIGxldCBhdWRpb0NvbnRleHQ7XG4gIGxldCBhbmFseXNlcjtcbiAgbGV0IHNwZWN0cnVtO1xuICBcbiAgLy8gZGl25Yid5pyf5YyWXG4gIGRpdkluaXRpYWxpemUoKTtcbiAgXG4gIC8vIOODleODvOODquOCqOWkieaPm+OBrua6luWCmVxuICBjcmVhdGVBbmFseXNlcigpO1xuXG4gIC8vIOODnuOCpOOCr+WFpeWKm+OCkuWPluW+l1xuICBnZXRNaWNyb3Bob25lKCk7XG5cbiAgLyoqXG4gICAqIGRpduimgee0oOOBruWIneacn+WMllxuICAgKi9cbiAgZnVuY3Rpb24gZGl2SW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCB3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dyYXAnKTtcbiAgICBkaXZOdW0gPSBNYXRoLmZsb29yKHdyYXAuY2xpZW50V2lkdGggLyAxNSk7XHQvL2RpduOBruWAi+aVsOOCkuioiOeulyAxNXB4PXdpZHRoK21hcmdpblxuICAgIGxldCB3cmFwSHRtbCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGl2TnVtOyBpKyspIHtcbiAgICAgIHdyYXBIdG1sICs9IGA8ZGl2IGlkPVwiJHtpfVwiPjwvZGl2PmA7XG4gICAgfVxuICAgIHdyYXAuaW5uZXJIVE1MID0gd3JhcEh0bWw7XG5cblx0XHQvL+aPj+eUu+OCqOODquOCouOBrumrmOOBleWPluW+l1xuICAgIGNvbnN0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJlYV9kaXYnKTtcbiAgICBoZWlnaHQgPSBhcmVhLmNsaWVudEhlaWdodDtcbiAgfVxuICBcbiAgLyoqXG4gICAqIOOCouODiuODqeOCpOOCtuOCkueUn+aIkFxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQW5hbHlzZXIoKSB7XG4gICAgLy8gYXVkaW9Db250ZXh044KS55Sf5oiQXG4gICAgYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XG4gICAgLy8gYW5hbHl6ZXLvvIjliIbmnpDjgZnjgovoo4Xnva7vvInjgpLnlJ/miJBcbiAgICBhbmFseXNlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICAgIC8vICAwLTEg44Gu56+E5Zuy44Gn44K544Oa44Kv44OI44Op44Og44OH44O844K/44Gu5YuV44GN44Gu6YCf44GV44KS6Kit5a6a44GZ44KL77yIMOOBoOOBqOOCguOBo+OBqOOCgumAn+OBhO+8iVxuICAgIGFuYWx5c2VyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IDAuODtcbiAgICAvLyBmZnRTaXpl44Gv6Z+z44Gu5YiG5Ymy44K144Kk44K644Gn44CBMuOBrue0r+S5l+OBruaVsOWApOOBruOBv+ioreWumuWPr1xuICAgIC8vIOODh+ODleOCqeODq+ODiOOBpzIwNDjjgIHjgZfjgYvjgZfjg4fjg7zjgr/ph4/jgYzlpJrjgZnjgY7jgabjg6rjgqLjg6vjgr/jgqTjg6Dlh6bnkIbjgYzpm6PjgZfjgY/jgarjgovjga7jgafpganluqbjgavmuJvjgonjgZnmlrnjgYzjgYTjgYRcbiAgICBhbmFseXNlci5mZnRTaXplID0gMjU2O1xuICB9XG4gIFxuICAvKipcbiAgICog44Oe44Kk44Kv44Gu44OH44O844K/44KS5Y+W5b6XXG4gICAqL1xuICBmdW5jdGlvbiBnZXRNaWNyb3Bob25lKCkge1xuICAgIC8vIOmfs+OBruOCveODvOOCueOCkuODnuOCpOOCr+OBq+OBmeOCi1xuICAgIGNvbnN0IGF1ZGlvU291cmNlID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyB2aWRlbzogZmFsc2UsIGF1ZGlvOiB0cnVlIH0pO1xuXG4gICAgLy8g6Z+z5aOw44OH44O844K/44KS5Y+W5b6X44GX44Gf44KJ5a6f6KGMXG4gICAgYXVkaW9Tb3VyY2UudGhlbigoc3RyZWFtKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAgICAgIGNvbnNvbGUubG9nKHNvdXJjZSk7XG4gICAgICAvLyBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCDjga9mZnRTaXpl44Gu5Y2K5YiGXG4gICAgICBzcGVjdHJ1bSA9IG5ldyBVaW50OEFycmF5KGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTtcbiAgICAgIC8vIHNvdXJjZeOCkmFuYWx5c2Vy44Gr5o6l57aaXG4gICAgICBzb3VyY2UuY29ubmVjdChhbmFseXNlcik7XG5cbiAgICAgIC8vIOODk+OCuOODpeOCouODqeOCpOOCtuWHpueQhlxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHZpc3VhbGl6ZSk7XG4gICAgfSk7XG5cbiAgICBhdWRpb1NvdXJjZS5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZS5uYW1lKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIOODk+OCuOODpeOCouODqeOCpOOCuOODs+OCsFxuICAgKi9cbiAgZnVuY3Rpb24gdmlzdWFsaXplKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh2aXN1YWxpemUpO1xuICAgIGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHNwZWN0cnVtKTsgLy8g44OV44O844Oq44Ko5aSJ5o+b44CB6YWN5YiX44Gn6Z+z44KS5Y+W5b6XXG4gIFxuICAgIGNvbnN0IGN0ID0gKHNwZWN0cnVtLmxlbmd0aCAtIDMwKSAvIGRpdk51bTtcbiAgXG4gICAgLy8gLy9IeuOBlOOBqOOBq3ZhbHVtZeOCkmhlaWdodOOBp+ihqOOBmVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGl2TnVtOyBpKyspIHtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKChzcGVjdHJ1bVtNYXRoLmZsb29yKGkgKiBjdCldIC8gMjU1KSAqIGhlaWdodCk7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoTWF0aC5mbG9vcihpKSk7XG4gICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke3l9cHhgO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy92aXN1YWxpemVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==