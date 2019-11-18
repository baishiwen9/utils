	
	/* 
	* 获取时间label
	* timestemp（number）: 时间戳
	*/

	function timeLabel (timestemp = new Date().getTime()) {
		const diff = ((new Date().getTime() - timestemp) / 1000),
			day_diff = Math.floor(diff/(24*60*60));

		switch(day_diff) {
			case 0: 
				return ( 
					diff < 60 && '刚刚' || 
					diff < 120 && '1分钟前' || 
					diff < 3600 && Math.floor(diff / 60) + '分钟前' || 
					diff < 7200 && '1小时前' || 
					diff < 86400 && Math.floor(diff/3600) + '小时前'
				);
				break;
			case 1: 
				return "昨天";
				break;
			default: 
				return (
					day_diff < 7 && day_diff + '天前' || 
					Math.ceil(day_diff / 7) + '周前'
				); 
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

  	function getCalendars(timestemp, days = 7, type = 1){
	    const today = new Date(timestemp),
	      todayTimeStamp = new Date().getTime(),
	      allTime = [],
	      curDate = new Date(todayTimeStamp),
	      curH = curDate.getHours(),
	      curM = curDate.getMinutes(),
	      curS = curDate.getSeconds(),
	      curMs = curDate.getMilliseconds();

	    for (let i = 0; i < days; i++) {
	      const target = timestemp + 1000*60*60*24*i*type;
	      today.setTime(target);
	      today.setTime(today.setHours(curH));
	      today.setTime(today.setMinutes(curM));
	      today.setTime(today.setSeconds(curS));
	      today.setTime(today.setMilliseconds(curMs));
	      
	      const year = today.getFullYear(),
	         tMonth = today.getMonth() + 1,
	         tDate = today.getDate(),
	         timeDiff = today.getTime() - todayTimeStamp,
	         offset =  Math.floor(timeDiff/(24*60*60*1000)),
	         curTime = year+''+(tMonth>= 10 ? tMonth : '0'+tMonth)+''+(tDate>= 10 ? tDate : '0'+ tDate);
	   
	      if (type === -1) {
	        allTime.unshift( {ts: target, d: curTime, td: offset});
	      } else {
	        allTime.push( {ts: target, d: curTime, td: offset });
	      }
	    }
    	return allTime;
	}

	/**
	 * 移除字符串中的html标签
	 * bug： script标签中间的内不也会被替换掉  
	 */

	function stripHtmlTags(target) {
		const rtag = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi;
		return String(target || "").replace(rtag, '');
	}
	//  stripScriptTags('11<script>22</script>33')   =>  112233

	/**
	 * 移除字符串中的script标签(script标签中间的内容也会被替换掉)
	 */

	 function stripScriptTags(target) {
		return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
	 }
	//  stripScriptTags('11<script>22</script>33')   =>  1133
	// 在对字符串进行去除html标签的时候，先执行stripScriptTags方法，再执行stripHtmlTags方法



	/**
	 * 将字符串经过html转义（例如将"<"转义成"&lt;"）
	 * 作用： 可以防止xss攻击
	 */
	function escapeHtml(target) {
		return target.replace(/&/g, '&amp;')
								.replace(/</g, '&lt;')
								.replace(/>/g, '&gt;')
								.replace(/"/g, '&quot;')
								.replace(/'/g, '&#39');
	}

	/**
	 * 将转义字符还原
	 */
	function unescapeHtml(target) {
		return target.replace(/&#39/g, '\'')
								.replace(/&quot/g, '"')
								.replace(/&lt;/g, '<')
								.replace(/&gt/g, '>')
								.replace(/&amp;/g, '&');
	}


	/**
 * 格式化时间
 * @time {Number|String|Date}  待格式化的时间
 * @pattern {String}           格式化格式 年：(yyyy | yy) 月：(MM) 日：(dd) 小时：(HH 24h | hh 12h) 分：(mm) 秒：（ss）毫秒：(f)
 * @return String
*/
function formatTime(time, pattern = 'yyyy-MM-dd HH:mm:ss') {
	if (isNaN(time)){
		return '';
	}
	let builtTime = build(time)
	let formatPattern = encodePattern(pattern)
	const timeFileds = {
		year: builtTime.getFullYear(),
		month: builtTime.getMonth()+1,
		date: builtTime.getDate(),
		day: builtTime.getDay(),
		hour: builtTime.getHours(),
		minute: builtTime.getMinutes(),
		second: builtTime.getSeconds(),
		millisecond: builtTime.getMilliseconds(),
	};

	const timeSlices = {
		'(?:h(?!\0))+': timeFileds.hour > 12 ? timeFileds.hour - 12 : timeFileds.hour,
		'(?:H(?!\0))+': timeFileds.hour,
		'(?:m(?!\0))+': timeFileds.minute,
		'(?:s(?!\0))+': timeFileds.second,
		'(?:M(?!\0))+': timeFileds.month,
		'(?:d(?!\0))+': timeFileds.date,
	};

	// 处理两位的
	for ( let slice in timeSlices ) {
		formatPattern = formatPattern.replace(new RegExp(slice, 'g'), m => {
			return pad(timeSlices[slice], Math.min(2, m.length));
		});
	}

	// millisecods
	formatPattern = formatPattern.replace(/(?:f(?!\0))+/g, m => {
		return pad(timeFileds.millisecond, 3).substr(0, Math.min(m.length, 3));
	});

	// year
	formatPattern = formatPattern.replace(/(?:y(?!\0))+/g, m => {
		const { year } = timeFileds;
		return m.length < 3 ? pad(year % 1000, Math.min(m.length, 2)) : pad(year, m.length);
	});

	return decodePattern(formatPattern);
}


// 处理 pattern 中的占位符 '\\hh\\dd' 等
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
	let builtTime;
	switch(typeof time) {
		case 'number':
	  		builtTime = new Date(parseInt(time));
	  		break
		case 'string':
			if (!isNaN(time)) {
				builtTime = build(parseInt(time));
			}else {
				time = time.replace(/-/g, '/').replace(/\+\d+/, '');
				const tMatch = time.match(/^(.+?)\.(\d+)$/);
				if (tMatch && tMatch[2]) {
					builtTime = new Date(+new Date(tMatch[1]) + parseInt(tMatch[2]));
				}else {
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

function pad(num, len, char) {
    const numStr = num2str(num);
    const numParts = numStr.split('.');
  
    numParts[0] = numParts[0].replace(/([+-]?)([\da-f]*)/i, function(m, $1, $2) {
		const prefixLen = Math.max((len || 0) - numStr.length, 0);
		return `${$1}${Array(prefixLen + 1).join(char || '0').substr(0, prefixLen)}${$2}`;
    });
    return numParts[1] ? numParts.join('.') : numParts[0];
}

function num2str(num) {
    if (typeof(num) == 'number' && Math.abs(num) > (Number.MAX_SAFE_INTEGER || 9007199254740991)) {
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

	const diff = future - present;

	let diff_year = 0, 
		diff_month = 0, 
		diff_day = 0, 
		diff_hour = 0, 
		diff_minute = 0, 
		diff_second = 0;

	let year_ms = 365*24*60*60*1000,
		month_ms = 30*24*60*60*1000,
		day_ms = 24*60*60*1000,
		hour_ms = 60*60*1000,
		minute_ms = 60*1000,
		second_ms = 1000;

	let surplus_ms = 0; //剩余毫秒数

	if (diff > 0) {

		diff_year = Math.floor(diff / year_ms);

		if (diff_year > 0) {
			surplus_ms = diff - diff_year*year_ms;
		} else {
			surplus_ms = diff;
		}

		diff_month = Math.floor(surplus_ms / month_ms);

		if (diff_month > 0) {
			surplus_ms = surplus_ms - diff_month*month_ms;
		}

		diff_day = Math.floor(surplus_ms / day_ms);

		if (diff_day > 0) {
			surplus_ms = surplus_ms - diff_day*day_ms;
		}

		diff_hour = Math.floor(surplus_ms / hour_ms);

		if (diff_hour > 0) {
			surplus_ms = surplus_ms - diff_hour*hour_ms;
			if (diff_hour > 24) {
				const day = Math.floor(diff_hour / 24);
				diff_day += day;
				surplus_ms = surplus_ms - day*day_ms;
				diff_hour = Math.floor(surplus_ms / hour_ms);
				surplus_ms = surplus_ms - diff_hour*hour_ms;
			}
		}

		diff_minute = Math.floor(surplus_ms / minute_ms);

		if (diff_minute > 0) {
			surplus_ms = surplus_ms - diff_minute*minute_ms;

			if (diff_minute > 59) {
				const hour = Math.floor(diff_minute / 60);
				diff_hour += hour;
				surplus_ms = surplus_ms - hour*hour_ms;
				diff_minute = Math.floor(surplus_ms / minute_ms);
				surplus_ms = surplus_ms - diff_minute*minute_ms;
			}

		}

		diff_second = Math.floor(surplus_ms / second_ms);

		if (diff_second > 0) {
			surplus_ms = surplus_ms - diff_second*second_ms;

			if (diff_second > 59) {
				const minute = Math.floor(diff_second / 60);
				diff_minute += minute;
				surplus_ms = surplus_ms - minute*minute_ms;
				diff_second = Math.floor(surplus_ms / second_ms);
				surplus_ms = surplus_ms - diff_second*minute_ms;
			}
		}
	}
	
	const res = {
		'arr_time': [diff_year, diff_month, diff_day, diff_hour, diff_minute, diff_second],
		'str_time': diff_year+ '年'+diff_month+'月'+diff_day+'天'+diff_hour+'小时'+diff_minute+'分'+diff_second+ '秒',
	}
	console.log(res);
	return res;
}

/**
*
* 金钱格式化
* eg: 123456789 =>  1,234,456,789
*/

function formatMoney(moneyNum) {
	return (moneyNum+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// function formatMoney(moneyNum) {
// 	return moneyNum.split('').reverse().reduce((prev, next, index) => {
// 		return ((index % 3) ? next : (next + ',')) + prev;
//     });
// }

//返回指定范围内的随机整数，[min, max]
function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
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
	let temp;
	if (isArray(jsonObj)) {
		temp = [];
		let i = jsonObj.length;
		while(i--) {
			temp[i] = cloneObj(jsonObj[i]);
		}
		return temp;
	} else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
		temp = {};
		for (const k in jsonObj) {
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
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}




//获取当月有多少天
function getCurMonthDays() {
    const curDate = new Date();
    const curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

export default{
	timeLabel,
	getCalendars,
	stripHtmlTags,
	stripScriptTags,
	escapeHtml,
	unescapeHtml,
	formatTime,
	countdown,
	formatMoney,
    getRandom,
    isFunction,
	isArray,
	cloneObj,
	isEmptyObj,
	getCurMonthDays,
}
