define(["jquery", "mask", "calendar"],
function($, mask, calendar) {
	function qn(data, seq, fn) {
		var main = $("#main"),
			qnBox = $('<div id="qn"></div>'),
			qnData = data[seq],
			copy = {};

		main.html("");
		copy = $.extend(true, {}, qnData);
		function questionAddEvent(num, question) {
			question = $(question);
			question.find(".question-title").on("change", function() {
				copy.qn[num].title = this.value;
			});
			if(question.find(".option:nth(0)")) {
				question.find(".option").each(function(index) {
					$(this).find("input:nth(1)").on("change", function() {
						copy.qn[num].selection[index] = this.value;
					});
				});
				question.find(".question-op span:nth(3)").on("click", function() {
					var newOption = question.find(".option:nth(0)").clone();
					newOption.find("input:nth(1)").attr("value", "新选项");
					newOption.insertBefore(question.find(".question-op"));
				});
			}
			question.find(".question-op span:nth(2)").on("click", function() {
				var questionSeq = parseInt(question.children().eq(0).text().slice(1)),
					tempArry = {};
				if(questionSeq > 1) {
					question.off().children().eq(0).text("Q" + (questionSeq - 1));
					question.prev().off().children().eq(0).text("Q" + questionSeq);
					tempArry = $.extend(true, {}, copy.qn[questionSeq - 1])
					copy.qn[questionSeq - 1] = $.extend(true, {}, copy.qn[questionSeq - 2]);
					copy.qn[questionSeq - 2] = $.extend(true, {}, tempArry);					
					question.insertBefore(question.prev());
					questionAddEvent(questionSeq - 2, $(".question:nth(questionSeq - 2)"));
					questionAddEvent(questionSeq - 1, $(".question:nth(questionSeq - 1)"));
				}
			});
			question.find(".question-op span:nth(1)").on("click", function() {
				var questionSeq = parseInt(question.children().eq(0).text().slice(1)),
					tempArry = {};
				if(questionSeq < copy.qn.length) {
					question.off().children().eq(0).text("Q" + (questionSeq + 1));
					question.next().off().children().eq(0).text("Q" + questionSeq);
					tempArry = $.extend(true, {}, copy.qn[questionSeq])
					copy.qn[questionSeq] = $.extend(true, {}, copy.qn[questionSeq - 1]);
					copy.qn[questionSeq - 1] = $.extend(true, {}, tempArry);					
					question.next().insertBefore(question);
					questionAddEvent(questionSeq, $(".question:nth(questionSeq)"));
					questionAddEvent(questionSeq - 1, $(".question:nth(questionSeq - 1)"));
				}
			});

			question.find(".question-op span:nth(0)").on("click", function() {
				copy.qn.push($.extend(true, {}, copy.qn[num]));
				var newHTML = question.clone();
				newHTML.children().eq(0).text("Q" + copy.qn.length);
				newHTML.insertBefore($("#addQ"));
				questionAddEvent(copy.qn.length - 1, newHTML)
			});
		}
		if(qnData) {
			qnBox.html('<input type="text" id="qnTitle" value="' + qnData.title + '">');
			$.each(qnData.qn, function(i, item) {
				switch(item.type) {
					case "single":
						qnBox.append('<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +				
							'</div>');
						$.each(item.selection, function(index, option) {
							qnBox.find(".question:nth(" + i + ")").append('<div class="option">' +
								'<input type="radio" name=Q"'+ (parseInt(i) + 1) +'">' +'<input type="text" value="' + option + '">' +
								'</div>');
						});
						qnBox.find(".question:nth(" + i + ")").append('<div class="question-op clear">' + 
																	'<span>复用</span>' + 
																	'<span>下移</span>' + 
																	'<span>上移</span>' + 
																	'<span>增加选项</span>' + 
																 '</div>');
						break;

					case "multi":
						qnBox.append('<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +				
							'</div>');
						$.each(item.selection, function(index, option) {
							qnBox.find(".question:nth(" + i + ")").append('<div class="option">' +
								'<input type="checkbox" name=Q"'+ (parseInt(i) + 1) +'">' +'<input type="text" value="' + option + '">' +
								'</div>');
						});	
						qnBox.find(".question:nth(" + i + ")").append('<div class="question-op clear">' + 
																	'<span>复用</span>' + 
																	'<span>下移</span>' + 
																	'<span>上移</span>' + 
																	'<span>增加选项</span>' + 
																 '</div>');
						break;

					case "text":
						qnBox.append('<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +
								'<textarea cols="50" rows="10"></textarea>' +				
							'</div>');
						qnBox.find(".question:nth(" + i + ")").append('<div class="question-op clear">' + 
																	'<span>复用</span>' + 
																	'<span>下移</span>' + 
																	'<span>上移</span>' + 
																 '</div>')		
						break;
				}
			});
			qnBox.append('<div id="addQ">' + 
							'<div id="addSelection" class="hidden">' + 
								'<div id="addCenter">' + 
									'<button><img src="img/QN单选.png" alt="single">单选</button>' + 
									'<button><img src="img/QN多选.png" alt="multi">多选</button>' + 
									'<button><img src="img/QN文本.png" alt="text">文本题</button>' + 							
								'</div>' + 
							'</div>' + 
							'<img src="img/QN加号.png" alt="plus">添加问题' +
						'</div>' + 
						'<div id="foot" class="clear">问卷截止日期' + 
							'<div id="date"><span></span></div>' + 
							'<button>发布问卷</button>' + 
							'<button>保存问卷</button>' + 
						'</div>');
			main.append(qnBox);
			$(".question").each(questionAddEvent)
		}
		$("#qnTitle").on("change", function() {
			copy.title = this.value;
		});
		$("#addQ").on("click", function() {
			$("#addSelection").removeClass();
		});
		var addButton = $("#addCenter button");
		$(addButton[0]).on("click", function() {
			var single = {
				type: "single",
				title:"这个问题怎么选择",
				selection: ["选线1", "选线2", "选项3"]
			}
			var createQuestion = $('<div class="question"></div>');
			copy.qn.push(single);
			createQuestion.append('<span>Q' + copy.qn.length +'</span>' +
									   '<input type="text" name="" class="question-title" value="' + single.title + '">' +
									   '<div class="option">' +
									   		'<input type="radio" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + single.selection[0] + '">' +
									   '</div>' +
									   '<div class="option">' +
									   		'<input type="radio" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + single.selection[1] + '">' +
									   '</div>' +
									   '<div class="option">' +
									   		'<input type="radio" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + single.selection[2] + '">' +
									   '</div>' +
									   '<div class="question-op clear">' + 
											'<span>复用</span>' + 
											'<span>下移</span>' + 
											'<span>上移</span>' + 
											'<span>增加选项</span>' + 
									   '</div>');
			createQuestion.insertBefore($("#addQ"));
			questionAddEvent(copy.qn.length - 1, $(".question").eq(copy.qn.length - 1));
		});
		$(addButton[1]).on("click", function() {
			var multi = {
				type: "multi",
				title:"这个问题怎么选择",
				selection: ["选线1", "选线2", "选项3"]
			}
			var createQuestion = $('<div class="question"></div>');
			copy.qn.push(multi);
			createQuestion.append('<span>Q' + copy.qn.length +'</span>' +
									   '<input type="text" name="" class="question-title" value="' + multi.title + '">' +
									   '<div class="option">' +
									   		'<input type="checkbox" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + multi.selection[0] + '">' +
									   '</div>' +
									   '<div class="option">' +
									   		'<input type="checkbox" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + multi.selection[1] + '">' +
									   '</div>' +
									   '<div class="option">' +
									   		'<input type="checkbox" name=Q"'+ copy.qn.length +'">' +'<input type="text" value="' + multi.selection[2] + '">' +
									   '</div>' +
									   '<div class="question-op clear">' + 
											'<span>复用</span>' + 
											'<span>下移</span>' + 
											'<span>上移</span>' + 
											'<span>增加选项</span>' + 
									   '</div>');
			createQuestion.insertBefore($("#addQ"));
			questionAddEvent(copy.qn.length - 1, $(".question").eq(copy.qn.length - 1));
		});
		$(addButton[2]).on("click", function() {
			var text = {
				type: "text",
				title:"这个问题怎么选择"				
			}
			var createQuestion = $('<div class="question"></div>');
			copy.qn.push(text);
			createQuestion.append('<span>Q' + copy.qn.length +'</span>' +
									   '<input type="text" name="" class="question-title" value="' + text.title + '">' +
									   '<textarea cols="50" rows="10"></textarea>' +
									   '<div class="question-op clear">' + 
											'<span>复用</span>' + 
											'<span>下移</span>' + 
											'<span>上移</span>' + 
									 	'</div>');
			createQuestion.insertBefore($("#addQ"));
			questionAddEvent(copy.qn.length - 1, $(".question").eq(copy.qn.length - 1));
		});
		if(!qnData.time) {
			copy.time = qnData.time = '2017-01-04 12:00:00';
		}
		$("#date span:nth(0)").text(qnData.time.slice(0, 10));
		$("#date").on("click", function() {
			if(!$("#calendar")) {
				$("#main").css("padding-bottom", "150px");
				//calendar.calendar(copy);
			}
		})
		$("#foot button:nth(1)").on("click", function() {
			data[seq] = $.extend(true, {}, copy);
			localStorage.data = JSON.stringify(data);			
		});
		$("#foot button:nth(0)").on("click", function() {
			mask.maskCover();
			$("#dia-container span").html('是否发布问卷</br>(此问卷截至日期为' + copy.time.slice(0, 10) + ')');
			$("#dia-choose button:nth(0)").on("click", function() {
				$(".mask").remove();
				copy.status = "已发布";
				data[seq] = $.extend(true, {}, copy);
				localStorage.data = JSON.stringify(data);
				fn(data);
				$("#main").css("padding-bottom", 0);
			})
		})
	}
	return {
		qn: qn
	}
})