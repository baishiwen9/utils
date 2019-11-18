(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Utils", [], factory);
	else if(typeof exports === 'object')
		exports["Utils"] = factory();
	else
		root["Utils"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* 
* 获取时间label
* timestemp（number）: 时间戳
*/
function timeLabel() {
  var timestemp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
  var diff = (new Date().getTime() - timestemp) / 1000,
      day_diff = Math.floor(diff / (24 * 60 * 60));

  switch (day_diff) {
    case 0:
      return diff < 60 && '刚刚' || diff < 120 && '1分钟前' || diff < 3600 && Math.floor(diff / 60) + '分钟前' || diff < 7200 && '1小时前' || diff < 86400 && Math.floor(diff / 3600) + '小时前';
      break;

    case 1:
      return "昨天";
      break;

    default:
      return day_diff < 7 && day_diff + '天前' || Math.ceil(day_diff / 7) + '周前';
      break;
  }
}
/* 
* 获取日历的每天
* timestemp（number）: 时间戳
* days（number）: 想要获取的天数
* type (number) : -1表示从timestemp该时间戳往后推days天（过往时间），1表示从timestemp该时间戳向前推days天（未来时间）
* 返回值 (object)： ts时间戳，d日期，td相对timestemp时间戳的天数的偏移量
*/


function getCalendars(timestemp) {
  var days = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var today = new Date(timestemp),
      todayTimeStamp = new Date().getTime(),
      allTime = [],
      curDate = new Date(todayTimeStamp),
      curH = curDate.getHours(),
      curM = curDate.getMinutes(),
      curS = curDate.getSeconds(),
      curMs = curDate.getMilliseconds();

  for (var i = 0; i < days; i++) {
    var target = timestemp + 1000 * 60 * 60 * 24 * i * type;
    today.setTime(target);
    today.setTime(today.setHours(curH));
    today.setTime(today.setMinutes(curM));
    today.setTime(today.setSeconds(curS));
    today.setTime(today.setMilliseconds(curMs));
    var year = today.getFullYear(),
        tMonth = today.getMonth() + 1,
        tDate = today.getDate(),
        timeDiff = today.getTime() - todayTimeStamp,
        offset = Math.floor(timeDiff / (24 * 60 * 60 * 1000)),
        curTime = year + '' + (tMonth >= 10 ? tMonth : '0' + tMonth) + '' + (tDate >= 10 ? tDate : '0' + tDate);

    if (type === -1) {
      allTime.unshift({
        ts: target,
        d: curTime,
        td: offset
      });
    } else {
      allTime.push({
        ts: target,
        d: curTime,
        td: offset
      });
    }
  }

  return allTime;
}
/**
 * 移除字符串中的html标签
 * bug： script标签中间的内不也会被替换掉  
 */


function stripHtmlTags(target) {
  var rtag = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi;
  return String(target || "").replace(rtag, '');
} //  stripScriptTags('11<script>22</script>33')   =>  112233

/**
 * 移除字符串中的script标签(script标签中间的内容也会被替换掉)
 */


function stripScriptTags(target) {
  return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
} //  stripScriptTags('11<script>22</script>33')   =>  1133
// 在对字符串进行去除html标签的时候，先执行stripScriptTags方法，再执行stripHtmlTags方法

/**
 * 将字符串经过html转义（例如将"<"转义成"&lt;"）
 * 作用： 可以防止xss攻击
 */


function escapeHtml(target) {
  return target.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39');
}
/**
 * 将转义字符还原
 */


function unescapeHtml(target) {
  return target.replace(/&#39/g, '\'').replace(/&quot/g, '"').replace(/&lt;/g, '<').replace(/&gt/g, '>').replace(/&amp;/g, '&');
}
/**
* 格式化时间
* @time {Number|String|Date}  待格式化的时间
* @pattern {String}           格式化格式 年：(yyyy | yy) 月：(MM) 日：(dd) 小时：(HH 24h | hh 12h) 分：(mm) 秒：（ss）毫秒：(f)
* @return String
*/


function formatTime(time) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd HH:mm:ss';

  if (isNaN(time)) {
    return '';
  }

  var builtTime = build(time);
  var formatPattern = encodePattern(pattern);
  var timeFileds = {
    year: builtTime.getFullYear(),
    month: builtTime.getMonth() + 1,
    date: builtTime.getDate(),
    day: builtTime.getDay(),
    hour: builtTime.getHours(),
    minute: builtTime.getMinutes(),
    second: builtTime.getSeconds(),
    millisecond: builtTime.getMilliseconds()
  };
  var timeSlices = {
    '(?:h(?!\0))+': timeFileds.hour > 12 ? timeFileds.hour - 12 : timeFileds.hour,
    '(?:H(?!\0))+': timeFileds.hour,
    '(?:m(?!\0))+': timeFileds.minute,
    '(?:s(?!\0))+': timeFileds.second,
    '(?:M(?!\0))+': timeFileds.month,
    '(?:d(?!\0))+': timeFileds.date
  }; // 处理两位的

  var _loop = function _loop(slice) {
    formatPattern = formatPattern.replace(new RegExp(slice, 'g'), function (m) {
      return pad(timeSlices[slice], Math.min(2, m.length));
    });
  };

  for (var slice in timeSlices) {
    _loop(slice);
  } // millisecods


  formatPattern = formatPattern.replace(/(?:f(?!\0))+/g, function (m) {
    return pad(timeFileds.millisecond, 3).substr(0, Math.min(m.length, 3));
  }); // year

  formatPattern = formatPattern.replace(/(?:y(?!\0))+/g, function (m) {
    var year = timeFileds.year;
    return m.length < 3 ? pad(year % 1000, Math.min(m.length, 2)) : pad(year, m.length);
  });
  return decodePattern(formatPattern);
} // 处理 pattern 中的占位符 '\\hh\\dd' 等


function encodePattern(pattern) {
  return pattern.replace(/\\([yMdwhHmsf])/g, '$1\0');
}

function decodePattern(pattern) {
  return pattern.replace(/([yMdwhHmsf])\0/g, '$1');
}
/**
 * 构建时间
 * @param time {Number|String|Date} 用来构建的时间
 * @return Date
*/


function build(time) {
  var builtTime;

  switch (_typeof(time)) {
    case 'number':
      builtTime = new Date(parseInt(time));
      break;

    case 'string':
      if (!isNaN(time)) {
        builtTime = build(parseInt(time));
      } else {
        time = time.replace(/-/g, '/').replace(/\+\d+/, '');
        var tMatch = time.match(/^(.+?)\.(\d+)$/);

        if (tMatch && tMatch[2]) {
          builtTime = new Date(+new Date(tMatch[1]) + parseInt(tMatch[2]));
        } else {
          builtTime = new Date(time);
        }
      }

      break;

    default:
      builtTime = time instanceof Date ? time : new Date();
  }

  if (builtTime == 'Invalid Date') {
    throw new Error('[TimeFormater Exception]: Invalid Date!');
  }

  return builtTime;
}

function pad(num, len, _char) {
  var numStr = num2str(num);
  var numParts = numStr.split('.');
  numParts[0] = numParts[0].replace(/([+-]?)([\da-f]*)/i, function (m, $1, $2) {
    var prefixLen = Math.max((len || 0) - numStr.length, 0);
    return "".concat($1).concat(Array(prefixLen + 1).join(_char || '0').substr(0, prefixLen)).concat($2);
  });
  return numParts[1] ? numParts.join('.') : numParts[0];
}

function num2str(num) {
  if (typeof num == 'number' && Math.abs(num) > (Number.MAX_SAFE_INTEGER || 9007199254740991)) {
    throw new Error('[Util.number Exception]: Input number out of range.');
  } else {
    var numStr = (num + '').replace(/^\s+|\s+$/g, '') || '0';

    if (!/^[+-]?(?:[\da-f]+\.?|[\da-f]*\.[\da-f]+)$/i.test(numStr)) {
      throw new Error('[Util.number Exception]: Invalid input number.');
    } else {
      return numStr;
    }
  }
}
/**
* 实现倒计时功能
*	future： 未来时间
*	present： 当前时间
*/


function countdown(future, present) {
  future = build(future);
  present = build(present);
  var diff = future - present;
  var diff_year = 0,
      diff_month = 0,
      diff_day = 0,
      diff_hour = 0,
      diff_minute = 0,
      diff_second = 0;
  var year_ms = 365 * 24 * 60 * 60 * 1000,
      month_ms = 30 * 24 * 60 * 60 * 1000,
      day_ms = 24 * 60 * 60 * 1000,
      hour_ms = 60 * 60 * 1000,
      minute_ms = 60 * 1000,
      second_ms = 1000;
  var surplus_ms = 0; //剩余毫秒数

  if (diff > 0) {
    diff_year = Math.floor(diff / year_ms);

    if (diff_year > 0) {
      surplus_ms = diff - diff_year * year_ms;
    } else {
      surplus_ms = diff;
    }

    diff_month = Math.floor(surplus_ms / month_ms);

    if (diff_month > 0) {
      surplus_ms = surplus_ms - diff_month * month_ms;
    }

    diff_day = Math.floor(surplus_ms / day_ms);

    if (diff_day > 0) {
      surplus_ms = surplus_ms - diff_day * day_ms;
    }

    diff_hour = Math.floor(surplus_ms / hour_ms);

    if (diff_hour > 0) {
      surplus_ms = surplus_ms - diff_hour * hour_ms;

      if (diff_hour > 24) {
        var day = Math.floor(diff_hour / 24);
        diff_day += day;
        surplus_ms = surplus_ms - day * day_ms;
        diff_hour = Math.floor(surplus_ms / hour_ms);
        surplus_ms = surplus_ms - diff_hour * hour_ms;
      }
    }

    diff_minute = Math.floor(surplus_ms / minute_ms);

    if (diff_minute > 0) {
      surplus_ms = surplus_ms - diff_minute * minute_ms;

      if (diff_minute > 59) {
        var hour = Math.floor(diff_minute / 60);
        diff_hour += hour;
        surplus_ms = surplus_ms - hour * hour_ms;
        diff_minute = Math.floor(surplus_ms / minute_ms);
        surplus_ms = surplus_ms - diff_minute * minute_ms;
      }
    }

    diff_second = Math.floor(surplus_ms / second_ms);

    if (diff_second > 0) {
      surplus_ms = surplus_ms - diff_second * second_ms;

      if (diff_second > 59) {
        var minute = Math.floor(diff_second / 60);
        diff_minute += minute;
        surplus_ms = surplus_ms - minute * minute_ms;
        diff_second = Math.floor(surplus_ms / second_ms);
        surplus_ms = surplus_ms - diff_second * minute_ms;
      }
    }
  }

  var res = {
    'arr_time': [diff_year, diff_month, diff_day, diff_hour, diff_minute, diff_second],
    'str_time': diff_year + '年' + diff_month + '月' + diff_day + '天' + diff_hour + '小时' + diff_minute + '分' + diff_second + '秒'
  };
  console.log(res);
  return res;
}
/**
*
* 金钱格式化
* eg: 123456789 =>  1,234,456,789
*/


function formatMoney(moneyNum) {
  return (moneyNum + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} // function formatMoney(moneyNum) {
// 	return moneyNum.split('').reverse().reduce((prev, next, index) => {
// 		return ((index % 3) ? next : (next + ',')) + prev;
//     });
// }
//返回指定范围内的随机整数，[min, max]


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isArray(arr) {
  return Array.isArray(arr);
}
/*
* JSON克隆
* @param {Object | Json} jsonObj json对象
* @return {Object | Json} 新的json对象	
*/


function cloneObj(jsonObj) {
  var temp;

  if (isArray(jsonObj)) {
    temp = [];
    var i = jsonObj.length;

    while (i--) {
      temp[i] = cloneObj(jsonObj[i]);
    }

    return temp;
  } else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
    temp = {};

    for (var k in jsonObj) {
      temp[k] = cloneObj(jsonObj);
    }

    return temp;
  } else {
    return jsonObj;
  }
}

function isEmptyObj(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false;
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
} //获取当月有多少天


function getCurMonthDays() {
  var curDate = new Date();
  var curMonth = curDate.getMonth();
  curDate.setMonth(curMonth + 1);
  curDate.setDate(0);
  return curDate.getDate();
}

/* harmony default export */ __webpack_exports__["default"] = ({
  timeLabel: timeLabel,
  getCalendars: getCalendars,
  stripHtmlTags: stripHtmlTags,
  stripScriptTags: stripScriptTags,
  escapeHtml: escapeHtml,
  unescapeHtml: unescapeHtml,
  formatTime: formatTime,
  countdown: countdown,
  formatMoney: formatMoney,
  getRandom: getRandom,
  isFunction: isFunction,
  isArray: isArray,
  cloneObj: cloneObj,
  isEmptyObj: isEmptyObj,
  getCurMonthDays: getCurMonthDays
});

/***/ }),

/***/ "./src/compareVersion.js":
/*!*******************************!*\
  !*** ./src/compareVersion.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * compareVersion 是用来比较两个版本号的方法
 * 
 */

/**
 * 比较大
 */
function greater(v1, v2) {
  if (v1 > v2) {
    return true;
  }

  return false;
}
/**
 * 比较小
 */


function smaller(v1, v2) {
  if (v1 < v2) {
    return true;
  }

  return false;
}
/**
 * 相等
 */


function equal(v1, v2) {
  if (v1 === v2) {
    return true;
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  greater: greater,
  smaller: smaller,
  equal: equal
});

/***/ }),

/***/ "./src/debug.js":
/*!**********************!*\
  !*** ./src/debug.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 开启测试模式的方法，开启后可打开VConsole
 */
var vconsoleUrl = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';

function open() {
  var hostname = window.location.hostname;
  var protocol = window.location.protocol;

  if (hostname.indexOf('dev') !== -1 || hostname.indexOf('localhost') !== -1 || hostname.indexOf('test') !== -1 || protocol === 'file:') {
    loadjs(vconsoleUrl, function () {
      if (window.VConsole) {
        new window.VConsole();
      }
    });
  }
}

function close() {
  var vconsole = document.querySelector('#__vconsole');
  vconsole && vconsole.remove();
} // 加载js脚本


var loadjs = function loadjs(url, success, fail) {
  var script = document.createElement('script');

  script.onload = function () {
    success && typeof success === 'function' && success();
  };

  script.onerror = function () {
    fail && typeof fail === 'function' && fail();
  };

  script.async = true;
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  open: open,
  close: close
});

/***/ }),

/***/ "./src/h5.js":
/*!*******************!*\
  !*** ./src/h5.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * web端实现滚动到底部的方法(滚动触底方法)
 * 
 * 实现原理：
 * 
 * 判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。
 *   scrollTop为滚动条在Y轴上的滚动距离。
 *   clientHeight为内容可视区域的高度。
 *   scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
 *   滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight
 *
 */

/**
 * document.body 与 document.documentElement区别介绍
 * 
 * document.body  返回html dom中的body节点 即<body>
 * document.documentElement  返回html dom中的root 节点 即<html>
 * 
 * 获取 scrollTop 方面的具有差异（https://www.cnblogs.com/mrdooo/p/6633688.html）
 * 兼容方法： var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 *      
 */
// 滚动条在Y轴上的滚动距离
function getScrollTop(dom) {
  if (dom) {
    return dom.scrollTop;
  } else {
    var scrollTop = 0;
    var bodyScrollTop = 0;
    var documentScrollTop = 0;

    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }

    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }

    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
} // 文档的总高度


function getScrollHeight(dom) {
  if (dom) {
    return dom.scrollHeight;
  } else {
    var scrollHeight = 0;
    var bodyScrollHeight = 0;
    var documentScrollHeight = 0;

    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }

    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }

    if (bodyScrollHeight - documentScrollHeight > 0) {
      scrollHeight = bodyScrollHeight;
    } else {
      scrollHeight = documentScrollHeight;
    }

    return scrollHeight;
  }
} // 浏览器视口的高度


function getWindowHeight() {
  var windowHeight = 0;

  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }

  return windowHeight;
}

function onReachBottom(callback, dom, offset) {
  var node = dom ? dom : window;
  offset = offset ? offset : 0;

  node.onscroll = function () {
    if (getScrollTop(dom) + getWindowHeight(dom) - offset === getScrollHeight(dom)) {
      console.log('已经到最底部了');

      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  onReachBottom: onReachBottom
});

/***/ }),

/***/ "./src/heart.js":
/*!**********************!*\
  !*** ./src/heart.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/common.js");
/**
 * 在页面点击的时候出现不同颜色的小心心
 */

/**
 * todo: 实现心心每次可以是不同的颜色
 */

var config = {
  width: 20,
  height: 20,
  canClick: true,
  loadCss: false
};
var iconSVG = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1574062685525\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"753\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"20\" height=\"20\"><defs><style type=\"text/css\"></style></defs><path d=\"M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z\" fill=\"#d81e06\" p-id=\"754\"></path></svg>";

function initIcon(x, y) {
  var div = document.createElement('div');
  div.classList.add('icon-heart');
  var id = 'dom_' + getId();
  div.id = id;
  div = addStyle(div, x, y);
  var wrap = document.createElement('div');
  wrap.classList.add('bounceInUp');
  wrap.innerHTML = iconSVG;
  div.appendChild(wrap);
  document.body.appendChild(div);
  addCss();
  clearDom(id);
}

function getId() {
  return Math.random().toString(36).slice(2) + new Date().getTime();
}

function addStyle(dom, x, y) {
  dom.style.position = 'fixed';
  dom.style.left = x + 'px';
  dom.style.top = y + 'px';
  dom.style.width = config.width + 'px';
  dom.style.height = config.height + 'px'; // dom.style.transform = `rotate(${common.getRandom(-30, 30)}deg)`;

  return dom;
}

function addCss() {
  if (config.loadCss) {
    return;
  }

  var style = document.createElement("style");
  style.type = "text/css";

  try {
    style.appendChild(document.createTextNode(".bounceInUp{animation-name: bounceInUp;animation-duration: 1.4s;animation-fill-mode: both;}"));
    style.appendChild(document.createTextNode("@keyframes bounceInUp{from{transform: translate3d(0, 0, 0);} to {transform: translate3d(0, -100px, 0); opacity: 0} }"));
  } catch (ex) {
    style.styleSheet.cssText = ".bounceInUp{animation-name: bounceInUp;animation-duration: 1.4s; animation-fill-mode: both;}"; //针对IE

    style.styleSheet.cssText = "@keyframes bounceInUp{from{transform: translate3d(0, 0, 0);}  to {transform: translate3d(0, -100px, 0); opacity: 0} }";
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
  config.loadCss = true;
}

function start() {
  document.addEventListener('click', function (e) {
    var x = e.clientX,
        y = e.clientY;

    if (config.canClick) {
      initIcon(x - config.width / 2, y - config.height / 2);
    }
  }, false);
}

function stop() {
  config.canClick = false;
}

function restart() {
  config.canClick = true;
} //定时清除多余dom，防止由于dom过多导致浏览器奔溃


function clearDom(id) {
  var node = document.querySelector('#' + id);
  setTimeout(function () {
    node && node.remove();
  }, 5000);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  start: start,
  stop: stop,
  restart: restart
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _compareVersion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compareVersion */ "./src/compareVersion.js");
/* harmony import */ var _h5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./h5 */ "./src/h5.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/common.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug */ "./src/debug.js");
/* harmony import */ var _heart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./heart */ "./src/heart.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  Version: _compareVersion__WEBPACK_IMPORTED_MODULE_0__["default"],
  H5: _h5__WEBPACK_IMPORTED_MODULE_1__["default"],
  Common: _common__WEBPACK_IMPORTED_MODULE_2__["default"],
  Debug: _debug__WEBPACK_IMPORTED_MODULE_3__["default"],
  Heart: _heart__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=Utils.js.map