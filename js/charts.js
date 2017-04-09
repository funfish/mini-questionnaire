define(["database"], function(database) {
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

	function charts(seq) {
		var main = document.getElementById("main"),
			qnChart = document.createElement("div"),
			data = database.data[seq],
			answer = data.answer,
			length = answer.length,
			copyAnswer = clone(answer);

		main.innerHTML = "";
		qnChart.id = "qnChart";
		qnChart.innerHTML += '<div id="qnTitle">' + data.title + '</div>';
		data.qn.forEach(function(item, i) {
			var sum = 0;
			var chart = document.createElement("div");

			qnChart.innerHTML += '<div class="question-chart clear"><div class="question">' + 
										'<span>Q' + (i + 1) + '</span>' +
										'<div class="question-title">' +
											item.title + 
										'</div>' +
									'</div>' +
								 '</div>';
			chart.className = "chart";
			if(item.type !== "text") {
				item.selection.forEach(function(option, index) {
					qnChart.querySelectorAll(".question")[i].innerHTML +=  '<div class="option">' +
																			+ (index + 1) + "." + option +
																			'</div>';	
				});	
				for(var j = 0; j < length; j++) {
					sum += answer[i][j];
				}
				chart.innerHTML = '<div style="line-height: 2.5em">数据占比</div>';
			} else {
				for(var j = 0; j < length; j++) {
					if(copyAnswer[i][j].replace(/^\s*|\s*$/g, '') !== '') {
						sum++;
					};
				}
				copyAnswer[i] = [sum];
				sum = data.answer[i].length;
				chart.innerHTML = '<div style="line-height: 2.5em">有效数据占比</div>';
			}
			copyAnswer[i].forEach(function(value, index) {
				var percentage = copyAnswer[i][index] / sum * 100;
				chart.innerHTML += '<div class="option clear"><div class="zhuzi"><div class="yes"></div>' +
																	'<div class="no"></div></div><span></span></div>';
				chart.querySelectorAll(".yes")[index].style.width = percentage + "%";
				chart.querySelectorAll(".no")[index].style.width = (100 - percentage) + "%";
				chart.querySelectorAll("span")[index].innerHTML = Math.round(percentage) + "%";
				if(percentage === 100) {
					chart.querySelectorAll(".zhuzi")[index].style.borderRight = "1px solid rgba(238, 116, 25, 1)";
					chart.querySelectorAll(".zhuzi")[index].style.borderLeft = "1px solid rgba(238, 116, 25, 1)";
				} else if(percentage === 0) {
					chart.querySelectorAll(".zhuzi")[index].style.borderRight = "1px solid gray";
					chart.querySelectorAll(".zhuzi")[index].style.borderLeft = "1px solid gray";
				} else {
					chart.querySelectorAll(".zhuzi")[index].style.borderRight = "1px solid gray";
					chart.querySelectorAll(".zhuzi")[index].style.borderLeft = "1px solid rgba(238, 116, 25, 1)";
				}
			});			
			qnChart.querySelectorAll(".question-chart")[i].appendChild(chart); 	
		});
		main.appendChild(qnChart);
	}
	return {
		charts: charts
	}
})