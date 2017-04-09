define(["jquery", "database", "mask", "qn"], 
function($, database, mask, qn) {
	function qnList() {
		var data = database.data,
			main = $("#main"),
			ul = $("<ul></ul>");

		ul.addClass("qnList-title");
		main.html("");
		main.append('<div class="title clear">' + 
					'<div class="dynamic">' + 
						'<span>标题</span>' + 
						'<span>时间</span>' + 
						'<span>状态</span>' + 						
					'</div>' + 
					'<div class="operation-QN">操作<button>+新建问卷</button>' + 
					'</div>' + 				
				'</div>');
		$.each(data, function(i,item) {
			ul.append('<li class="clear">' + 
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
				'</li>');
		});
		main.append(ul);

		$(".qnList-title li").each(function(i, item) {
			$(this).find("button:nth(1)").on("click", function() {
				mask.maskCover();
				$("#dia-container span").text("确认要删除此问卷？")
				$("#dia-choose button:nth(0)").on("click", function() {
					$(".mask").remove();
					$(document.body).removeAttr("style");
					$(document.body).removeClass();
					data.splice(i);
					localStorage.data = JSON.stringify(data);
						if(database.data.length === 0) {
						var main = $("#main");
						main.html('<button id="addFirst"><span>+</span>新建问卷</button>');
						main.css("min-height", "150px");
						$("#addFirst").on("click", function(){
							main.css("min-height", 0);
							database.data.push($.extend(true, {}, database.initData[0]));
							qn.qn(database.data, database.data.length - 1, qnList);
						});
					} else {
						qnList();		
					}
				})
			});
			$(this).find("button:nth(2)").on("click", function() {
				qn.qn(data, i ,qnList);
			});
			if(data[i].answer.length) {

			} else {

			}
		}); 
		$(".title button").on("click", function() {
			database.data.push($.extend(true, {}, database.initData[0]));
			//qnTry.qn(database.data, database.data.length - 1, QnList);
		})
	}

	return {
		qnList: qnList
	}
})