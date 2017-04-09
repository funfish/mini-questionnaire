require(["jquery", "database", "qnList"], 
function($, database, qnList){
	function isObject(ob) {   
			return Object.prototype.toString.call(ob) === '[object Object]';    
	} 
	if(typeof localStorage.data !== "string") {
		localStorage.data = JSON.stringify(database.data);
	} else {
		var data = JSON.parse(localStorage.data);

		if((isObject(data[0]) || data === []) && $.isArray(data)) {
			database.data = data;
		}else {
			localStorage.data = JSON.stringify(database.data);
		}
	}
	if(database.data.length === 0) {
		var main = $("#main");
		main.html('<button id="addFirst"><span>+</span>新建问卷</button>');
		main.css("min-height", "150px");
		$("#addFirst").on("click", function(){
			main.css("min-height", 0);
			database.data.push($.extend(true, {}, database.initData[0]));
			qn.qn(database.data, database.data.length - 1, qnList.qnList);			
		});
	} else {
		qnList.qnList();		
	}
	$("#head span:nth(1)").on("click", qnList.qnList)
})