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

/***/ "./src/component/index.js":
/*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _seal_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seal/index */ "./src/component/seal/index.js");
/* harmony import */ var _tablelist_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tablelist/index */ "./src/component/tablelist/index.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  Seal: _seal_index__WEBPACK_IMPORTED_MODULE_0__["default"],
  Tablelist: _tablelist_index__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./src/component/seal/index.js":
/*!*************************************!*\
  !*** ./src/component/seal/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initSeal; });
/**
 * 印章组件
 * type： 方印，圆印
 */
function initSeal(configs) {
  var _configs$type = configs.type,
      type = _configs$type === void 0 ? 'square' : _configs$type;

  if (type === 'square') {
    createSquareSeal(configs, true);
  } else if ('rectangle' === type) {
    createRectangleSeal(configs);
  } else if (type === 'circular') {
    createCircularSeal(configs);
  }
}
/**
 * 生成方形印章
 */

function createSquareSeal(configs, isSquare) {
  configs = configs ? configs : {};
  var div = document.createElement('div');
  div.classList.add('seal-wrap');
  var defaultStyle = {
    border: '4px solid red',
    background: 'transparent',
    borderRadius: '4px',
    lineHeight: 1,
    fontSize: '20px',
    textAlign: 'center',
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    writingMode: 'tb-rl'
  };
  var style = Object.assign(defaultStyle, configs.style ? configs.style : {});

  for (var key in style) {
    div.style[key] = style[key];
  }

  if (isSquare) {
    div.style.width = div.style.height = configs.size ? configs.size + 'px' : '50px';
  }

  div.innerText = configs.text ? configs.text : '天下太平';
  document.body.appendChild(div);
}
/**
 * 生成长方形印章
 * @param {*} configs 
 */


function createRectangleSeal(configs) {
  configs.style.width = configs.width ? configs.width : '100px';
  configs.style.height = configs.height ? configs.height : '40px';
  configs.style.writingMode = 'initial';
  createSquareSeal(configs, false);
}
/**
 * 生成圆形印章
 * @param {*} configs 
 */


function createCircularSeal(configs) {
  var canvas = document.createElement('canvas');
  canvas.height = canvas.width = configs.size ? configs.size : '400';
  var context = canvas.getContext('2d');
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, configs.size, configs.size); // 绘制印章边框   

  var width = canvas.width / 2;
  var height = canvas.height / 2;
  context.lineWidth = 4;
  context.strokeStyle = "#f00";
  context.beginPath(); //创建弧/曲线（用于创建圆形或部分圆）
  //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
  //x,y: 圆心坐标， r：半径，sAngle，eAngle 起始和结束角度（弧度），counterclockwise规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。

  context.arc(width, height, configs.r, 0, Math.PI * 2); //宽、高、半径
  // 绘制已定义的路径

  context.stroke();
  create5star(context, width, height, 20, "#f00", 0); //绘制印章名称   

  context.font = '8px 宋体';
  context.textBaseline = 'middle'; //设置文本的垂直对齐方式

  context.textAlign = 'center'; //设置文本的水平对对齐方式

  context.lineWidth = 1;
  context.fillStyle = '#f00';
  context.save();
  context.translate(width, height + 60); // 平移到此位置,

  context.scale(1, 1.8); //伸缩要先把远点平移到要写字的位置，然后在绘制文字

  context.fillText(configs.text, 0, 0); //原点已经移动

  context.restore(); // 绘制印章单位   

  context.translate(width, height); // 平移到此位置,

  context.font = '16px 宋体';
  var count = configs.title.length; // 字数

  var angle = 4 * Math.PI / (3 * (count - 1)); // 字间角度   

  var chars = configs.title.split("");
  var c;

  for (var i = 0; i < count; i++) {
    c = chars[i]; // 需要绘制的字符 
    //绕canvas的画布圆心旋转  

    if (i == 0) {
      context.rotate(5 * Math.PI / 6);
    } else {
      context.rotate(angle);
    }

    context.save();
    context.translate(60, 0); // 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离

    context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴

    context.scale(1, 1.8); //伸缩画布，实现文字的拉长

    context.fillText(c, 0, 0); // 此点为字的中心点

    context.restore();
  } // 设置画布为最初的位置为原点，旋转回平衡的原位置，用于清除画布


  context.rotate(-Math.PI / 6);
  context.translate(0 - canvas.width / 2, 0 - canvas.height / 2);
  document.body.appendChild(canvas);
} //绘制五角星  

/** 
 * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
 * rotate:绕对称轴旋转rotate弧度 
 */


function create5star(context, sx, sy, radius, color, rotato) {
  context.save();
  context.fillStyle = color;
  context.translate(sx, sy); //移动坐标原点

  context.rotate(Math.PI + rotato); //旋转

  context.beginPath(); //创建路径

  var x = Math.sin(0),
      y = Math.cos(0),
      dig = Math.PI / 5 * 4;

  for (var i = 0; i < 5; i++) {
    //画五角星的五条边
    x = Math.sin(i * dig);
    y = Math.cos(i * dig);
    context.lineTo(x * radius, y * radius);
  }

  context.closePath();
  context.stroke();
  context.fill();
  context.restore();
}

/***/ }),

/***/ "./src/component/tablelist/index.js":
/*!******************************************!*\
  !*** ./src/component/tablelist/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TableList; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableList = function TableList(datas) {
  _classCallCheck(this, TableList);

  if (!datas || Object.prototype.toString.call(datas) !== '[object Array]') {
    console.log('参数只能是数组');
    datas = [];
  }

  this.listsize = datas.length;
  this.pos = 0;
  this.dataStore = datas;
  this.clear = clear;
  this.find = find;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.hasNext = hasNext;
  this.hasPrev = hasPrev;
  this.length = length;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.contains = contains;
  this.getCurElement = getCurElement;
  this.getElementByIndex = getElementByIndex;
  this.insertAfterByElement = insertAfterByElement;
  this.insertBeforeByElement = insertBeforeByElement;
  this.insertAfterByIndex = insertAfterByIndex;
  this.insertBeforeByIndex = insertBeforeByIndex;
  this.removeByIndex = removeByIndex;
}; //在最后插入数据




function append(element) {
  this.dataStore[this.listsize++] = element;
} // 返回该元素的索引


function find(element) {
  return this.dataStore.indexOf(element);
} // 删除该元素


function remove(element) {
  var foundAt = this.find(element);

  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1);
    --this.listsize;
    return true;
  }

  return false;
} // 通过索引删除元素


function removeByIndex(index) {
  if (index > -1) {
    this.dataStore.splice(index, 1);
    --this.listsize;
    return true;
  }

  return false;
} // 返回数组长度


function length() {
  return this.listsize;
} // 在原有的元素后面插入新元素


function insertAfterByElement(newElement, afterElement) {
  var index = this.find(afterElement);

  if (index > -1) {
    this.dataStore.splice(index + 1, 0, newElement);
    ++this.listsize;
    return true;
  }

  return false;
} // 在原有的元素前面插入新元素


function insertBeforeByElement(newElement, beforeElement) {
  var index = this.find(beforeElement);

  if (index > -1) {
    this.dataStore.splice(index, 0, newElement);
    ++this.listsize;
    return true;
  }

  return false;
} // 在该索引之后插入新元素


function insertAfterByIndex(index, newElement) {
  if (index > -1) {
    this.dataStore.splice(index + 1, 0, newElement);
    ++this.listsize;
    return true;
  }

  return false;
} // 在该索引之前插入新元素


function insertBeforeByIndex(index, newElement) {
  if (index > -1) {
    this.dataStore.splice(index, 0, newElement);
    ++this.listsize;
    return true;
  }

  return false;
} // 清空


function clear() {
  this.dataStore.length = 0;
  this.listsize = this.pos = 0;
} // 判断是否包含一个元素


function contains(element) {
  return this.find(element) > -1 ? true : false;
} // 返回到第一个元素


function front() {
  this.pos = 0;
} // 返回到最后一个元素


function end() {
  this.pos = this.listsize - 1;
} // 上一个元素


function prev() {
  --this.pos;
} // 下一个元素


function next() {
  if (this.pos < this.listsize) {
    ++this.pos;
  }
} // 当前的位置


function currPos() {
  return this.pos;
} // 移动到该位置


function moveTo(position) {
  this.pos = position;
} // 获取当前的元素


function getCurElement() {
  return this.dataStore[this.pos];
} // 通过索引获取元素


function getElementByIndex(index) {
  return this.dataStore[index];
} // 是否有下一个元素


function hasNext() {
  return this.pos < this.listsize;
} // 是否存在上一个元素


function hasPrev() {
  return this.pos > 0;
}

/***/ }),

/***/ "./src/cookies.js":
/*!************************!*\
  !*** ./src/cookies.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
* 对cookies进行封装，使用更方便
*/

/**
 * cookies简介：
 * 存储cookie是浏览器提供的功能。cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的cookie。
 * 每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个
 * JS 原生的 API提供了获取cookie的方法：document.cookie（这个方法只能获取非HttpOnly类型的cookie）
 * 
 */

/**
 * cookies属性简介：
 *  expires：设置“cookie什么时间内有效”。expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过new Date().toGMTString()或者 new Date().toUTCString() 来获得）
 *  domain： 域名， domain的默认值为设置该cookie的网页所在的域名
 *  path： 路径， path默认值为设置该cookie的网页所在的目录
 *  所以domain和path两个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。
 *  secure：用来设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie才能被发送至服务器。
 *  HttpOnly： 用来设置cookie是否能通过 js 去访问
 * 在设置这些属性时，属性之间由一个分号和一个空格隔开。
 */

/**
 * 正则解读：
 * (^| ) ：表示是字符串开头或者空格
 * ([^;]*)：其中[^;]表示除开";"之外的其它字符([^;]*)表示0到多个";"之外的字符
 * (;|\x24)：表示以";"或者"\x24"作为匹配结束。
 */
function getRaw(key) {
  var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
      result = reg.exec(document.cookie);

  if (result) {
    return result[2] || null;
  }

  return null;
}

function setRaw(key, value, options) {
  options = options || {};
  var expires = options.expires;

  if ('number' == typeof options.expires) {
    expires = new Date();
    expires.setTime(expires.getTime() + options.expires);
  }

  document.cookie = key + "=" + value + (options.path ? "; path=" + options.path : "") + (expires ? "; expires=" + expires.toGMTString() : "") + (options.domain ? "; domain=" + options.domain : "") + (options.secure ? "; secure" : '');
}

function set(key, value, options) {
  setRaw(key, encodeURIComponent(value), options);
}

function get(key) {
  var value = getRaw(key);

  if ('string' == typeof value) {
    value = decodeURIComponent(value);
    return value;
  }

  return null;
}

function remove(key, options) {
  options = options || {};
  options.expires = new Date(0);
  setRaw(key, '', options);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  set: set,
  get: get,
  remove: remove
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

function onReachBottom(dom, callback, offset) {
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
  var id = 'heart_' + getId();
  div.id = id;
  div = addStyle(div, x, y);
  var wrap = document.createElement('div');
  wrap.classList.add('bounceInUp');
  wrap.innerHTML = iconSVG;
  div.appendChild(wrap);
  document.body.appendChild(div);
  addCss();
  clearDom(id);
} //随机生成一个id，时间戳防止id重复


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
} //定时清除多余dom，防止由于dom过多导致浏览器崩溃


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
/* harmony import */ var _utils_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfill */ "./src/utils/polyfill.js");
/* harmony import */ var _utils_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./version */ "./src/version.js");
/* harmony import */ var _h5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./h5 */ "./src/h5.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/common.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debug */ "./src/debug.js");
/* harmony import */ var _heart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./heart */ "./src/heart.js");
/* harmony import */ var _waterFull__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./waterFull */ "./src/waterFull.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _mini_performance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mini-performance */ "./src/mini-performance.js");
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cookies */ "./src/cookies.js");
/* harmony import */ var _indexedDB__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./indexedDB */ "./src/indexedDB.js");
/* harmony import */ var _component_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/index */ "./src/component/index.js");












/* harmony default export */ __webpack_exports__["default"] = ({
  Version: _version__WEBPACK_IMPORTED_MODULE_1__["default"],
  H5: _h5__WEBPACK_IMPORTED_MODULE_2__["default"],
  Common: _common__WEBPACK_IMPORTED_MODULE_3__["default"],
  Debug: _debug__WEBPACK_IMPORTED_MODULE_4__["default"],
  Heart: _heart__WEBPACK_IMPORTED_MODULE_5__["default"],
  WaterFull: _waterFull__WEBPACK_IMPORTED_MODULE_6__["default"],
  LocalStorage: _localStorage__WEBPACK_IMPORTED_MODULE_7__["default"],
  MiniAppPerformance: _mini_performance__WEBPACK_IMPORTED_MODULE_8__["default"],
  Cookies: _cookies__WEBPACK_IMPORTED_MODULE_9__["default"],
  IndexedDB: _indexedDB__WEBPACK_IMPORTED_MODULE_10__["default"],
  Comp: _component_index__WEBPACK_IMPORTED_MODULE_11__["default"]
});

/***/ }),

/***/ "./src/indexedDB.js":
/*!**************************!*\
  !*** ./src/indexedDB.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
* 对indexedDB进行封装，使用更方便
*/

/**
 * indexedDB简介：
 *  IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。
 *  
 * IndexedDB 具有以下特点：
 *  1. 键值对储存， IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
 *  2. 异步，IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，异步设计是为了防止大量数据的读写，拖慢网页的表现
 *  3. 支持事务， IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
 *  4. 同源限制，IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
 *  5. 储存空间大，IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
 *  6. 支持二进制储存， IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。
 */
var createIndexedDB = function createIndexedDB(config) {
  var databaseName = config.databaseName,
      version = config.version,
      success = config.success,
      fail = config.fail;
  var request = window.indexedDB.open(databaseName, version);
  var db = '';

  request.onerror = function (e) {
    console.log('数据库打开失败');
    fail && fail({
      msg: '数据库打开失败',
      e: e
    });
  };

  request.onsuccess = function (e) {
    console.log('数据库打开成功');
    db = request.result;
    success && success();
  };

  var objectStore = null;

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    var table_header = config.table_header,
        table_name = config.table_name,
        main_key = config.main_key;

    if (!db.objectStoreNames.contains(table_name)) {
      objectStore = db.createObjectStore(table_name, {
        keyPath: main_key,
        autoIncrement: true
      });

      if (table_header && Object.prototype.toString.call(table_header) === '[object Array]') {
        table_header.length > 0 && table_header.map(function (item) {
          objectStore.createIndex(item.key, item.key, {
            unique: item.unique ? item.unique : false
          });
        });
      }
    }
  }; //获取所有数据


  var getAll = function getAll(table_name, success, fail) {
    var objectStore = db.transaction(table_name).objectStore(table_name);
    var result = [];

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;

      if (cursor) {
        result.push(cursor.value);
        cursor["continue"]();
      } else {
        console.log('没有更多数据了！');
        success && success(result);
      }
    };

    objectStore.openCursor().onerror = function (event) {
      fail && fail(event);
    };
  };

  return {
    /**
     * options
     *      table_name: 表名， string
     *      data：要添加的数据, array
     *      callback： 回调函数，成功返回的code为1，其他返回的code为-1， function
     */
    add: function add(options) {
      var data = options.data,
          table_name = options.table_name,
          callback = options.callback;

      if (!table_name || !data) {
        callback && callback({
          code: -1,
          msg: 'table_name或data不能为空'
        });
        return;
      }

      var transaction = db.transaction([table_name], 'readwrite');
      var store = transaction.objectStore(table_name);
      var _request = null;

      if (Object.prototype.toString.call(data) === '[object Array]') {
        data.length > 0 && data.map(function (item) {
          _request = store.add(item);
        });
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        _request = store.add(data);
      }

      _request.onsuccess = function (event) {
        console.log('数据写入成功');
        callback && callback({
          code: 1,
          e: event
        });
      };

      _request.onerror = function (event) {
        console.log('数据写入失败');
        callback && callback({
          code: -1,
          e: event
        });
      };
    },

    /**
     * options
     *      table_name: 表名
     *      index_key: 索引
     *      index_value: 索引值
     *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
     */
    get: function get(options) {
      var table_name = options.table_name,
          callback = options.callback,
          index_key = options.index_key,
          index_value = options.index_value;

      if (!table_name) {
        callback && callback({
          code: -1,
          msg: 'table_name不能为空'
        });
        return;
      }

      getAll(table_name, function (res) {
        if (res && res.length > 0) {
          var result = [];

          if (index_value) {
            result = res.filter(function (item) {
              return item[index_key] === index_value;
            });
          } else {
            result = res;
          }

          callback && callback({
            code: 1,
            data: result
          });
        } else {
          callback && callback({
            code: 1,
            data: []
          });
        }
      }, function (err) {
        callback && callback({
          code: -1,
          e: err
        });
      }); // const transaction = db.transaction([table_name]);
      // const objectStore = transaction.objectStore(table_name);
      // let request = null;
      // if (index_key === objectStore.keyPath) {
      //     request = objectStore.get(index_value);
      // } else {
      //     const index = objectStore.index(index_key);//获取索引
      //     request = index.get(index_value);
      // }
      // request.onerror = function(event) {
      //     console.log('获取数据失败');
      //     callback && callback({
      //         code: -1,
      //         e: event,
      //     });
      // };
      // request.onsuccess = function( event) {
      //     console.log('获取数据成功');
      //     if (request.result) {
      //         console.log('获取数据成功：有数据');
      //         callback && callback({
      //             code: 1,
      //             e: event,
      //             data: request.result
      //         });
      //     } else {
      //         console.log('获取数据成功：无数据');
      //         callback && callback({
      //             code: 1,
      //             e: event,
      //             data: {}
      //         });
      //     }
      // };
    },

    /**
     * options
     *      table_name: 表名
     *      data: 要更新的数据
     *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
     */
    update: function update(options) {
      var table_name = options.table_name,
          data = options.data,
          callback = options.callback;

      if (!table_name || !data) {
        callback && callback({
          code: -1,
          msg: 'table_name或data不能为空'
        });
        return;
      }

      var transaction = db.transaction([table_name], 'readwrite');
      var objectStore = transaction.objectStore(table_name);
      var request = null;

      if (Object.prototype.toString.call(data) === '[object Array]') {
        data.length > 0 && data.map(function (item) {
          request = objectStore.put(item);
        });
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        request = objectStore.put(data);
      }

      request.onsuccess = function (event) {
        console.log('数据更新成功');
        callback && callback({
          code: 1,
          data: data,
          e: event
        });
      };

      request.onerror = function (event) {
        console.log('数据更新失败');
        callback && callback({
          code: -1,
          e: event
        });
      };
    },

    /**
     * options
     *      table_name: 表名
     *      id： 要删除数据的id
     *      callback： 回调函数，成功返回的code为1，其他返回的code为-1
     */
    "delete": function _delete(options) {
      var table_name = options.table_name,
          ids = options.ids,
          callback = options.callback;

      if (!table_name || !ids) {
        callback && callback({
          code: -1,
          msg: 'table_name或id不能为空'
        });
        return;
      }

      var transaction = db.transaction([table_name], 'readwrite');
      var objectStore = transaction.objectStore(table_name);
      var request = null;

      if (ids && Object.prototype.toString.call(ids) === '[object Array]') {
        ids.length > 0 && ids.map(function (item) {
          request = objectStore["delete"](item);
        });
      } else {
        request = objectStore["delete"](ids);
      }

      request.onsuccess = function (event) {
        console.log('数据删除成功');
        callback && callback({
          code: 1,
          e: event
        });
      };

      request.onerror = function (event) {
        console.log('数据删除失败');
        callback && callback({
          code: -1,
          e: event
        });
      };
    },
    clear: function clear(table_name) {
      var transaction = db.transaction(table_name, 'readwrite');
      var store = transaction.objectStore(table_name);
      store.clear();
    },
    remove: function remove(table_name) {
      var transaction = db.transaction(table_name, 'versionchange');
      db.deleteObjectStore(table_name);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = ({
  createIndexedDB: createIndexedDB
});

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
* 对localStorage进行封装，使用更方便
*/
function set(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return null;
  }
}

function get(key) {
  try {
    var value = window.localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  } catch (e) {
    return null;
  }
}

function remove(key) {
  window.localStorage.removeItem(key);
  return true;
}

function clear() {
  window.localStorage.clear();
  return true;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  set: set,
  get: get,
  remove: remove,
  clear: clear
});

/***/ }),

/***/ "./src/mini-performance.js":
/*!*********************************!*\
  !*** ./src/mini-performance.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 小程序性能监控方法，主要监控小程序的启动时间，白屏时间，首屏时间
 * 
 */

/**
 * SDK 公共信息
 *    sv: 版本号
 *    baseUrl: 上报数据的url
 */
var SDK_config = {
  sv: '1.0.0',
  baseUrl: 'https://xxx.xxxxx.com/performance.gif'
};
/**
 * 用来存储性能的所有信息的obj
 */

var performanceObj = {};
/**
 * 获取公共信息
 */

var getCommonInfo = function getCommonInfo(options) {
  var wxInfo, network, commonInfo;
  return regeneratorRuntime.async(function getCommonInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wxInfo = wx.getSystemInfoSync();
          _context.next = 3;
          return regeneratorRuntime.awrap(getNetworkType());

        case 3:
          network = _context.sent;
          commonInfo = {
            ts: new Date().getTime(),
            //时间戳
            sv: SDK_config.sv,
            //该SDK的版本号
            nt: network,
            //网络类型
            os: wxInfo.platform,
            //操作系统，ios，android
            dm: wxInfo.brand + '-' + wxInfo.model,
            //机型
            wv: wxInfo.version,
            //微信版本号
            sdkv: wxInfo.SDKVersion,
            //基础库SDK版本号
            ov: wxInfo.system,
            //操作系统版本号
            appid: '',
            //项目id
            type: 'miniApp' //小程序标志

          };
          Object.assign(performanceObj, commonInfo, options);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * 获取网络状态
 */


var getNetworkType = function getNetworkType() {
  return new Promise(function (resolve, reject) {
    wx.getNetworkType({
      success: function success(_ref) {
        var networkType = _ref.networkType;
        resolve(networkType);
      },
      fail: function fail() {
        reject('unknown');
      }
    });
  });
};
/**
 * 初始化
 * @param {*} options 
 */


var init = function init(options) {
  if (options && Object.prototype.toString.call(options) === "[object Object]") {
    getCommonInfo(options);
  }
};
/**
 * 计时开始
 * @param {*} pi 当前页面的id
 */


var start = function start(pi) {
  if (!pi || Object.prototype.toString.call(pi) !== '[object String]') {
    throw Error('pi不能为空&pi只能为字符串');
  }

  Object.assign(performanceObj, {
    startTime: new Date().getTime(),
    pi: pi
  });
};
/**
 * 统计时间并且发送请求上报
 * @param {*} type 计时的类型，分为：启动时间，白屏时间，首屏时间 
 */
//每个页面只发送一次请求，所以会等到首屏时间统计完成后一起发送


var send = function send(type) {
  var endTime = new Date().getTime();
  var diffTime = endTime - performanceObj.startTime;
  var isSend = false; //启动时间

  if (!type || type == 0 || type === 'st') {
    performanceObj.st = diffTime;
    isSend = true;
  } //白屏时间


  if (type === 'frt' || type == 1) {
    performanceObj.frt = diffTime;
    isSend = false;
  } //首屏时间


  if (type === 'fst' || type == 2) {
    performanceObj.fst = diffTime;
    isSend = true;
  } //上报数据


  if (isSend) {
    delete performanceObj.startTime;
    console.log('性能监控上报的数据: ', performanceObj);
    imgLog(SDK_config.baseUrl, performanceObj);
  }
};
/**
 * 格式化参数
 * @param {*} dataObj 
 */


var jsonToUrlString = function jsonToUrlString(dataObj) {
  if (Object.prototype.toString.call(dataObj) != "[object Object]") {
    console.log('invalid param type, expected object.');
    return '';
  }

  var arr = [];

  for (var i in dataObj) {
    arr.push(i + '=' + encodeURIComponent(dataObj[i]));
  }

  return arr.join('&');
};
/**
 * 图片打点发送数据
 * @param {*} baseUrl 
 * @param {*} data  
 */


var imgLog = function imgLog(baseUrl, data) {
  if (data && Object.prototype.toString.call(data) != "[object Object]") {
    console.log('invalid param type, expected object.');
    return;
  }

  ;
  wx.getImageInfo({
    src: baseUrl + '?' + jsonToUrlString(data),
    success: function success(res) {
      console.log('性能数据上报成功', res);
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  init: init,
  start: start,
  send: send
});

/***/ }),

/***/ "./src/utils/polyfill.js":
/*!*******************************!*\
  !*** ./src/utils/polyfill.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target
    /*, varArgs*/
    ) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}

/***/ }),

/***/ "./src/version.js":
/*!************************!*\
  !*** ./src/version.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * version 是用来比较两个版本号的方法
 * 
 */

/**
 * 比较大
 */
function greater(v1, v2) {
  if (compare(v1, v2) > 0) {
    console.log('v1 > v2');
    return true;
  }

  return false;
}
/**
 * 比较小
 */


function smaller(v1, v2) {
  if (compare(v1, v2) < 0) {
    console.log('v1 < v2');
    return true;
  }

  return false;
}
/**
 * 相等
 */


function equal(v1, v2) {
  if (compare(v1, v2) === 0) {
    console.log('v1 === v2');
    return true;
  }

  return false;
}

function compare(v1, v2) {
  var vArr1 = v1 && v1.replace(/[A-Za-z]/, '').split('.');
  var vArr2 = v2 && v2.replace(/[A-Za-z]/, '').split('.');
  var $length = Math.max(vArr2.length, vArr1.length);
  var vi1 = 0;
  var vi2 = 0;
  var i = 0;

  for (i = 0; i < $length; i += 1) {
    vi1 = Number(vArr1[i]) ? Number(vArr1[i]) : 0;
    vi2 = Number(vArr2[i]) ? Number(vArr2[i]) : 0;

    if (vi2 > vi1) {
      return 1;
    }

    if (vi2 < vi1) {
      return -1;
    }
  }

  return 0;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  greater: greater,
  smaller: smaller,
  equal: equal
});

/***/ }),

/***/ "./src/waterFull.js":
/*!**************************!*\
  !*** ./src/waterFull.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * h5实现瀑布流布局
 * 
 * todo: 优化代码（修复bug），实现屏幕大小改变的时候瀑布流自适应
 */
var heightArr = [];

function createWaterFull(root, src, index, configs) {
  var div = document.createElement('div');
  div.classList.add('item');
  div.style.position = 'absolute';
  div.style.width = configs.width + 'px';
  var img = document.createElement('img');
  img.src = src;
  img.style.width = '100%';

  img.onload = function () {
    var height = img.clientHeight;

    if (index < configs.column) {
      div.style.top = '0px';
      heightArr.push(height);
    } else {
      var minV = getMin(heightArr);
      var minIndex = heightArr.indexOf(minV);
      index = minIndex;
      div.style.top = configs.diffY + minV + 'px';
      heightArr[minIndex] = minV + height + configs.diffY;
    }

    div.style.left = (configs.width + configs.diffX) * index + 'px';
  };

  img.classList.add('item-img');
  img.classList.add('img' + index);
  div.appendChild(img);
  root.appendChild(div);
}

function getMin(arr) {
  return Math.min.apply(null, arr);
}

function init(id, datas, config) {
  var root = document.querySelector('#' + id);
  root.style.position = 'relative';
  root.style.width = '100%';
  root.style.height = innerHeight + 'px';
  datas.map(function (item, index) {
    createWaterFull(root, item, index, config);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=Utils.js.map