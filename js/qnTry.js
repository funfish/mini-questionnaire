define(["mask", "calendar"], function(mask, calendar) {
	function qn(data, seq, fn) {
		var main = document.getElementById("main"),
			qnBox = document.createElement("div"),
			qnData = data[seq],
			copy = {};

		main.innerHTML = "";
		qnBox.id = "qn";
		copy = clone(qnData);

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
		function questionAddEvent(question, num) {
			question.querySelector(".question-title").onchange = function() {
				copy.qn[num].title = this.value;
			}
			if(question.querySelectorAll(".option")[0]) {
				question.querySelectorAll(".option").forEach(function(option, index) {
					option.querySelectorAll("input")[1].onchange = function() {
						copy.qn[num].selection[index] = this.value;
					}
				});
				question.querySelector(".question-op").querySelectorAll("span")[3].onclick = function() {
					var newOption = question.querySelectorAll(".option")[0].cloneNode(true);

					newOption.querySelectorAll("input")[1].value = "新选项";
					copy.qn[num].selection.push("新选项");
					question.insertBefore(newOption , question.querySelector(".question-op"));
				}
			}
			question.querySelector(".question-op").querySelectorAll("span")[2].onclick = function() {
				var questionSeq = parseInt(question.childNodes[0].innerHTML.slice(1)),
					tempArry = {};

				if(questionSeq > 1) {
					var preNode = getSibling(-1, question).cloneNode(true),
						curNode = question.cloneNode(true);

					tempArry = clone(copy.qn[questionSeq - 1])
					copy.qn[questionSeq - 1] = clone(copy.qn[questionSeq - 2]);
					copy.qn[questionSeq - 2] = clone(tempArry);
					curNode.childNodes[0].innerHTML = "Q" + (questionSeq - 1);
					preNode.childNodes[0].innerHTML = "Q" + questionSeq;
					document.getElementById("qn").removeChild(getSibling(-1, question));
					document.getElementById("qn").insertBefore(curNode, question);
					document.getElementById("qn").insertBefore(preNode, question);
					document.getElementById("qn").removeChild(question);
					questionAddEvent(document.querySelectorAll(".question")[questionSeq - 2], questionSeq - 2);
					questionAddEvent(document.querySelectorAll(".question")[questionSeq - 1], questionSeq - 1);
					//document.getElementById("qn").insertBefore(question, getSibling(-1, question));
				}	
			}	
			question.querySelector(".question-op").querySelectorAll("span")[1].onclick = function() {
				var questionSeq = parseInt(question.childNodes[0].innerHTML.slice(1)),
					tempArry = {};

				if(questionSeq < copy.qn.length) {
					var nextNode = getSibling(1, question).cloneNode(true),
						curNode = question.cloneNode(true);

					tempArry = clone(copy.qn[questionSeq])
					copy.qn[questionSeq] = clone(copy.qn[questionSeq - 1]);
					copy.qn[questionSeq - 1] = clone(tempArry);
					curNode.childNodes[0].innerHTML = "Q" + (questionSeq + 1);
					nextNode.childNodes[0].innerHTML = "Q" + questionSeq;
					document.getElementById("qn").removeChild(getSibling(1, question));
					document.getElementById("qn").insertBefore(nextNode, question);
					document.getElementById("qn").insertBefore(curNode, question);
					document.getElementById("qn").removeChild(question);
					questionAddEvent(document.querySelectorAll(".question")[questionSeq], questionSeq);
					questionAddEvent(document.querySelectorAll(".question")[questionSeq - 1], questionSeq - 1);
					//document.getElementById("qn").insertBefore(getSibling(1, question), question);					
				}	
			}
			question.querySelector(".question-op").querySelectorAll("span")[0].onclick = function() {
				var newHTML = question.cloneNode(true);

				copy.qn.push(clone(copy.qn[num]));	
				questionAddEvent(newHTML, copy.qn.length - 1)
				newHTML.childNodes[0].innerHTML = "Q" + copy.qn.length;
				document.getElementById("qn").insertBefore(newHTML, document.getElementById("addQ"))
			}			
		}


		if(qnData) {
			qnBox.innerHTML += '<input type="text" id="qnTitle" value="' + qnData.title + '">';		
			qnData.qn.forEach(function(item, i) {
				switch(item.type) {
					case "single": 
						qnBox.innerHTML += '<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +				
							'</div>';
						item.selection.forEach(function(option, index) {
							qnBox.querySelectorAll(".question")[i].innerHTML += '<div class="option">' +
							'<input type="radio" name=Q"'+ (parseInt(i) + 1) +'">' +'<input type="text" value="' + option + '">' +
							'</div>';
						});
						qnBox.querySelectorAll(".question")[i].innerHTML += '<div class="question-op clear">' + 
																				'<span>复用</span>' + 
																				'<span>下移</span>' + 
																				'<span>上移</span>' + 
																				'<span>增加选项</span>' + 
																			 '</div>';
						break;

					case "multi": 
						qnBox.innerHTML += '<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +				
							'</div>';
						item.selection.forEach(function(option, index) {
							qnBox.querySelectorAll(".question")[i].innerHTML += '<div class="option">' +
							'<input type="checkbox" name=Q"'+ (parseInt(i) + 1) +'">' +'<input type="text" value="' + option + '">' +
							'</div>';
						});
						qnBox.querySelectorAll(".question")[i].innerHTML += '<div class="question-op clear">' + 
																				'<span>复用</span>' + 
																				'<span>下移</span>' + 
																				'<span>上移</span>' + 
																				'<span>增加选项</span>' + 
																		 	'</div>';
						break;
																		 
					case "text":
						qnBox.innerHTML += '<div class="question">' +
								'<span>Q' + (parseInt(i) + 1) +'</span>' +
								'<input type="text" name="" class="question-title" value="' + item.title + '">' +
								'<textarea cols="50" rows="10"></textarea>' +				
							'</div>';
						qnBox.querySelectorAll(".question")[i].innerHTML += '<div class="question-op clear">' + 
																			'<span>复用</span>' + 
																			'<span>下移</span>' + 
																			'<span>上移</span>' + 
																		 '</div>';						
						break;																		 
				}
			});
			qnBox.innerHTML += 
				'<div id="addQ">' + 
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
				'</div>';

			main.appendChild(qnBox);
			var questionList = document.querySelectorAll(".question");
			
			questionList.forEach(questionAddEvent);
		}

		document.getElementById("qnTitle").onchange = function(){
			copy.title = this.value;
		}

		document.getElementById("addQ").onclick = function() {
			document.getElementById("addSelection").className = "";
		}
		var addButton = document.getElementById("addCenter").querySelectorAll("button");

		addButton[0].onclick = function() {
			var single = {
				type: "single",
				title:"这个问题怎么选择",
				selection: ["选线1", "选线2", "选项3"]
			}
			var createQuestion = document.createElement("div");

			copy.qn.push(single);
			createQuestion.className = "question";
			createQuestion.innerHTML = '<span>Q' + copy.qn.length +'</span>' +
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
									   '</div>';
			document.getElementById("qn").insertBefore(createQuestion, document.getElementById("addQ"));								   									   
			questionAddEvent(document.querySelectorAll(".question")[copy.qn.length - 1], copy.qn.length - 1);
		}
		addButton[1].onclick = function() {
			var multi = {
				type: "multi",
				title:"这个问题怎么选择",
				selection: ["选线1", "选线2", "选项3"]
			}
			var createQuestion = document.createElement("div");

			copy.qn.push(multi);

			createQuestion.className = "question";
			createQuestion.innerHTML = '<span>Q' + copy.qn.length +'</span>' +
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
									   '</div>';
			document.getElementById("qn").insertBefore(createQuestion, document.getElementById("addQ"));
			questionAddEvent(document.querySelectorAll(".question")[copy.qn.length - 1], copy.qn.length - 1);
		}
		addButton[2].onclick = function() {
			var text = {
				type: "text",
				title:"这个问题怎么选择"				
			}
			var createQuestion = document.createElement("div");

			copy.qn.push(text);
			createQuestion.className = "question";
			createQuestion.innerHTML = '<span>Q' + copy.qn.length +'</span>' +
									   '<input type="text" name="" class="question-title" value="' + text.title + '">' +
									   '<textarea cols="50" rows="10"></textarea>' +
									   '<div class="question-op clear">' + 
											'<span>复用</span>' + 
											'<span>下移</span>' + 
											'<span>上移</span>' + 
									 	'</div>';	
			document.getElementById("qn").insertBefore(createQuestion, document.getElementById("addQ"));
			questionAddEvent(document.querySelectorAll(".question")[copy.qn.length - 1], copy.qn.length - 1);
		}
		if(!qnData.time) {
			copy.time = qnData.time = '2017-01-04 12:00:00';
		}
		document.getElementById("date").querySelectorAll("span")[0].innerHTML = qnData.time.slice(0, 10);
		document.getElementById("date").onclick = function() {
			if(!document.getElementById("calendar")) {
				document.getElementById("main").style.paddingBottom = 150 + "px";
				calendar.calendar(copy);					
			}
		}		
		document.getElementById("foot").querySelectorAll("button")[1].onclick = function() {
			data[seq] = clone(copy);
			localStorage.data = JSON.stringify(data);
		}
		document.getElementById("foot").querySelectorAll("button")[0].onclick = function(event) {
			mask.maskCover();
			document.getElementById("dia-container").querySelector("span").innerHTML = "是否发布问卷</br>(此问卷截至日期为" + copy.time.slice(0, 10) + ")";
			document.getElementById("dia-choose").querySelectorAll("button")[0].onclick = function() {
				document.body.removeChild(document.querySelector(".mask"));
				copy.status = "已发布";
				data[seq] = clone(copy);
				localStorage.data = JSON.stringify(data);
				fn(data);
				document.getElementById("main").style.paddingBottom = "";
			}
		}
	}

	return {
		qn: qn
	}
})