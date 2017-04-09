define(function() {
	function stopBubble(e){
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
	}
	var monthes = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
	var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//返回现在时间
	function getMonthDays(mon, year) {
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
		return monthDays[mon - 1]
	}

	function calendar(timeDate) {
		var dateBox = document.getElementById("date"),
			calendarBox = document.createElement("div"),
			curDate = dateBox.querySelectorAll("span")[0].innerHTML,
			dateBoxDate = dateBox.childNodes[0].cloneNode(true);

		if(curDate) {
			var curYear = parseInt(curDate.slice(0, 4)),
				curMon = parseInt(curDate.slice(5, 7)),
				curDay = parseInt(curDate.slice(8, 9)),
				curWeek;
		}else {
			var d = new Date(),
				curYear = d.getFullYear(),
				curMon = d.getMonth() + 1,
				curDay = d.getDate(),
				curWeek;
		}
		calendarBox.id = "calendar";
		calendarBox.innerHTML = '<img src="img/arrowTop.png" alt="arrrow" id="arrowTop">' +
								'<div id="calendarHead" class="clear">' +
									'<div>' +
										'<span>' +
											monthes[curMon - 1] + "月    " + curYear +
										'</span>' +
										'<img src="img/arrowLeft.png" alt="arrowLeft" id="arrowLeft">' +
										'<img src="img/arrowRight.png" alt="arrowRight" id="arrowRight">' +
									'</div>' +
									'<ul class="clear">' +
										'<li>Mon</li>' +
										'<li>Tue</li>' +
										'<li>Wed</li>' +
										'<li>Tue</li>' +
										'<li>Fri</li>' +
										'<li>Sat</li>' +
										'<li>Sun</li>' +
									'</ul>' +
								'</div>' +
								'<ul id="calendarMain" class="clear">' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
									'<li></li><li></li><li></li><li></li><li></li><li></li><li></li>' +
								'</ul>';
		
		dateBox.innerHTML = "";
		dateBox.appendChild(dateBoxDate);
		dateBox.appendChild(calendarBox);

		var yearMon = document.getElementById("calendarHead").querySelectorAll("span")[0];

		function calendarChange(mon, year) {
			var curdays = getMonthDays(mon, year),
				preDays = getMonthDays(mon - 1, year),
				nextDays = getMonthDays(mon + 1, year);

			curWeek = (new Date(year, parseInt(mon) - 1, 1)).getDay() - 1;
			if(curWeek === 0) {
				curWeek = 7;
			}
			if(curWeek === -1) {
				curWeek = 6;
			}
			document.getElementById("calendarMain").querySelectorAll("li").forEach(function(item, i) {
				if(i < curWeek) {
					item.className = "gray";
					item.innerHTML = preDays - curWeek + i + 1;
				} else if(i >= curdays + curWeek) {
					item.className = "gray";
					item.innerHTML = nextDays - (i - curdays - curWeek);
				} else {
					item.className = "";
					item.innerHTML = i - curWeek + 1;
				}
			})
		}
		calendarChange(curMon, curYear);

		document.getElementById("calendar").onclick = function(event) {
			stopBubble(event);
		}
		document.getElementById("arrowLeft").onclick = function(event) {
			curMon--;
			if(curMon < 1) {
				curYear--;
				curMon = 12;
			}
			yearMon.innerHTML = monthes[curMon - 1] + "月    " + curYear;
			calendarChange(curMon, curYear);
		}
		document.getElementById("arrowRight").onclick = function() {
			curMon++;
			if(curMon > 12) {
				curYear++;
				curMon = 1;
			}
			yearMon.innerHTML = monthes[curMon - 1] + "月    " + curYear;
			calendarChange(curMon, curYear);
		}
		document.getElementById("calendarMain").querySelectorAll("li").forEach(function(item, i) {
			item.onclick = function() {
				var showMon = curMon, 
					showYear = curYear,
					showday = item.innerHTML;

				if(item.className === "gray") {
					if(i < 7) {
						if(showMon === 1) {
							showYear--;
							showMon = 12;
						}else {
							showMon--;
						}
					}
					if(i > 21) {
						if(showMon === 12) {
							showYear++;
							showMon = 1;
						}else {
							showMon++;
						}
					}
				}
				if(showMon < 10) {
					showMon = "0" + showMon;
				}
				if(showday < 10) {
					showday = "0" + showday;
				}
				dateBoxDate.innerHTML = showYear + "-" + showMon + "-" + showday;
				timeDate.time = dateBoxDate.innerHTML + " " + timeDate.time.slice(11);
				console.log(timeDate.time)
			}
		})
	}
	return {
		calendar: calendar
	}
})