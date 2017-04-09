define(["database", "mask", "qnTry", "charts"], 
function(database, mask, qnTry, charts) {
	var main = document.getElementById("main");

	function isArray(ob) {   
			return Object.prototype.toString.call(ob) === '[object Array]';    
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

	function QnList() {		
		var data = database.data;
		var ul = document.createElement("ul");

		ul.className = "qnList-title";
		main.innerHTML = "";
		main.innerHTML += '<div class="title clear">' + 
					'<div class="dynamic">' + 
						'<span>标题</span>' + 
						'<span>时间</span>' + 
						'<span>状态</span>' + 						
					'</div>' + 
					'<div class="operation-QN">操作<button>+新建问卷</button>' + 
					'</div>' + 				
				'</div>';
		data.forEach(function(item, i) {
			ul.innerHTML += '<li class="clear">' + 
					'<input type="radio">' + 
					'<div class="dynamic">' + 
						'<span>' + item.title + '</span>' + 
						'<span>' + item.time + '</span>' + 
						'<span>' + item.status + '</span>' + 			
					'</div>' + 
					'<div class="operation-QN">' + 
						'<button>查看数据</button>' + 			
						'<button>删除</button>' + 			
						'<button>编辑</button>' + 
					'</div>' + 
				'</li>';
		});
		main.appendChild(ul);

		var list = document.querySelector(".qnList-title").querySelectorAll("li");
		list.forEach(function(item, i) {
			item.querySelectorAll("button")[1].onclick = function() {
				mask.maskCover();
				document.getElementById("dia-container").querySelector("span").innerHTML = "确认要删除此问卷？";
				document.getElementById("dia-choose").querySelectorAll("button")[0].onclick = function() {
					document.body.removeChild(document.querySelector(".mask"));
					document.body.style = "";
					document.body.className = "";					
					data.splice(i);
					localStorage.data = JSON.stringify(data);
					if(database.data.length === 0) {
						var main = document.getElementById("main");
						main.innerHTML = '<button id="addFirst">' +
										'<span>+</span>新建问卷</button>';
						main.style.minHeight = 150 + "px";
						document.getElementById("addFirst").onclick = function() {
							main.style.minHeight = 0;
							database.data.push(clone(database.initData[0]));
							qnTry.qn(database.data, database.data.length - 1, QnList);
						}
					} else {
						//qnTry.qn(database.data, database.data.length - 1, qnList.QnList);
						QnList();
					}
				}			
			};
			item.querySelectorAll("button")[2].onclick = function() {
				qnTry.qn(data, i ,QnList);
			};
			if(data[i].answer.length) {
				item.querySelectorAll("button")[0].onclick = function() {
					charts.charts(i);
				};				
			} else {
				item.querySelectorAll("button")[0].onclick = function() {
					alert("无数据");
				};
			}
				
		});
		var title = document.querySelector(".title");
		title.querySelector("button").onclick = function() {
			database.data.push(clone(database.initData[0]));
			qnTry.qn(database.data, database.data.length - 1, QnList);
		}
	}

	return {
		QnList: QnList
	}
})