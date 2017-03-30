(function(){
function clone(ob) {
	var newOb;
	if(isArray(ob)) {
		newOb = [];
	} else {
		newOb = {};
	}
	for(var i in ob) {
		if(ob[i] instanceof Object) {
			newOb[i] = clone(ob[i]);
		} else {
			newOb[i] = ob[i];
		}	
	}
	return newOb;
}
function isArray(ob) {   
	return Object.prototype.toString.call(ob) === '[object Array]';    
} 
//返回现在时间
var calendarTime = {
	hansMonth: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
	eachMonthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	getThisMonthDays: function(mon, year) {
		if(mon < 1) {
			mon = 12;
			year--;
		}
		if(mon > 12) {
			mon = 1;
			year++;
		}
		if(mon === 2) {
			return year % 4 !== 0 || (year % 100 == 0 && year % 400 !== 0) ? 28 : 29;
		}
		return this.eachMonthDays[mon - 1]
	}	
}
window.clone = clone;
window.isArray = isArray;
window.calendarTime = calendarTime;
})(window)

