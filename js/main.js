require(["database", "qnList", "qnTry"], 
function(database, qnList, qnTry, charts) {
	function isArray(ob) {   
			return Object.prototype.toString.call(ob) === '[object Array]';    
	} 
	function isObject(ob) {   
			return Object.prototype.toString.call(ob) === '[object Object]';    
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
/*	if(typeof localStorage.data !== "string") {
		localStorage.data = JSON.stringify(database.data);
	} else {
		var data = JSON.parse(localStorage.data);

		if((isObject(data[0]) || data === []) && isArray(data)) {
			database.data = data;
		}else {
			localStorage.data = JSON.stringify(database.data);
		}
	}
*/	if(database.data.length === 0) {
		var main = document.getElementById("main");
		main.innerHTML = '<button id="addFirst">' +
						'<span>+</span>新建问卷</button>';
		main.style.minHeight = 150 + "px";
		document.getElementById("addFirst").onclick = function() {
			main.style.minHeight = 0;
			database.data.push(clone(database.initData[0]));
			qnTry.qn(database.data, database.data.length - 1, qnList.QnList);
		}
	} else {
		//qnTry.qn(database.data, database.data.length - 1, qnList.QnList);
		qnList.QnList();
	}
	document.getElementById("head").querySelectorAll("span")[1].onclick = qnList.QnList;
})