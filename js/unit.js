window.onload = function() {
	function stopBubble(e){
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
	}
	function addEvent(ele, event, listener) {
		if(ele.addEventListener) {
			ele.addEventListener(event, listener);
		} else if(ele.attachEvent) {
			ele.attachEvent("on" + event, listener);
		} else {
			return Erro
		}
	}
	function stopDefault(e) {
		Window.event ? Window.event.returnValue = flase : e.preventDefault();
	}
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
	function getSibling(flag, ele) {
		var e = flag > 0 ? ele.nextSibling : ele.previousSibling;
		if(e === null) {
			return null;
		}
		if(e.nodeType === 3) {
			var e2 = getSibling(-1, e);
			if(e2.nodeType === 1) {
				return e2;
			}
		} else if(e.nodeType === 1) {
			return e;
		} else {
			return false;
		}
	}
	function isArray(ob) {   
			return Object.prototype.toString.call(ob) === '[object Array]';    
	}
	function getMonthDays(mon, year) {
		var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(mon < 1) {
			mon = 12;
			year--;
		}
		if(mon > 12) {
			mon = 1;
			year++;
		}
		if(mon === 2) {
			return year / 4 !== 0 || year / 400 === 0 ? 28 : 29;
		}
		return monthDays[mon - 1]
	}	
}