<template>
	<div id="calendar">
		<img src="../assets/arrowTop.png" alt="arrrow" id="arrowTop">
		<div id="calendarHead" class="clear">
			<div>
				<span>{{ showYearMonth }}</span>
				<img src="../assets/arrowLeft.png" alt="arrowLeft" id="arrowLeft" @click="changeMonth(-1)">
				<img src="../assets/arrowRight.png" alt="arrowRight" id="arrowRight" @click="changeMonth(1)">
			</div>
			<ul class="clear">
				<li>Mon</li>
				<li>Tue</li>
				<li>Wed</li>
				<li>Thu</li>
				<li>Fri</li>
				<li>Sat</li>
				<li>Sun</li>
			</ul>
		</div>
		<ul id="calendarMain" class="clear">
			<li v-for="item in dayArray.pre" class="gray" @click="$emit('change-date', -1, item, month, year)">{{ item }}</li>
			<li v-for="item in dayArray.cur" @click="$emit('change-date', 0, item, month, year)">{{ item }}</li>
			<li v-for="item in dayArray.next" class="gray" @click="$emit('change-date', 1, item, month, year)">{{ item }}</li>
		</ul>
	</div>
</template>

<script>
	import "../library";
	export default {
		name: "calendar",
		props: ["time"],
		data() {
			return {
				month: parseInt(this.time.slice(5, 7)) || (new Date()).getMonth() + 1,
				year: parseInt(this.time.slice(0, 4)) || (new Date()).getFullYear()
			}
		},
		computed: {
			showYearMonth() {
				return calendarTime.hansMonth[this.month - 1] + "月    " + this.year;
			},
			dayArray() {
				var preMonthDays = calendarTime.getThisMonthDays(this.month - 1, this.year),
					thisMonthDays = calendarTime.getThisMonthDays(this.month, this.year),
					nextMonthDays = calendarTime.getThisMonthDays(this.month + 1, this.year),
					curWeek = (new Date(this.year, this.month - 1, 1)).getDay() - 1,
					preDayArray = [],
					thisDayArray = [],
					nextDayArray = []; 
				if(curWeek === 0) {
					curWeek = 7;
				} 
				if(curWeek === -1) {
					curWeek = 6;
				}
				for(let i = 0; i < 42; i++) {
					if(i < curWeek) {
						preDayArray.push(preMonthDays - curWeek + i + 1)
					} else if(i >= thisMonthDays + curWeek) {
						nextDayArray.push(i - thisMonthDays - curWeek + 1);
					} else {
						thisDayArray.push(i - curWeek + 1)
					}
				}
				return {
					pre: preDayArray,
					cur: thisDayArray,
					next: nextDayArray
				}
			}
		},
		methods: {
			changeMonth(dir) {
				this.month += dir;
				if(this.month === 0) {
					this.month = 12;
					this.year--;
				}
				if(this.month === 13) {
					this.month = 1;
					this.year++
				}
			}
		} 
	}
</script>

<style lang="sass">
@import "../style/veriable.scss";
@import "../style/mixins.scss";

#calendar {
	position: absolute;
	top: 2.2rem;
	@include size(14.1rem, 14.1rem);
	text-align: center;
	ul li {
		float: left;
		width: 2rem;
	}
}
#calendarHead {
	color: white;
	background-color: $orange;
	div {
		line-height: 2rem;
		span {
			white-space: pre;
		}
	}
	li {
		font-size: 0.75rem;
	}
}
#arrowTop {
	position: absolute;
	left: 50%;
	top: -0.3rem;
	margin-left: -0.8rem;
}
#arrowLeft {
	float: left;
	margin: 0.5rem 0 0 0.8rem;
}
#arrowRight {
	float: right;
	margin: 0.5rem 0.8rem 0 0;
}

#calendarMain {
	border-left: 1px solid $BackGray;
	line-height: 1.66rem;
	color: $black;
	li {
		height: 1.66rem;
		border-right: 1px solid $BackGray;
		border-bottom: 1px solid $BackGray;
		font-size: 0.8rem;
		@include box-sizing(border-box);
		&:hover {
			background-color: $orange;
			color: $white;		
		}
	}
}
.gray {
	color: $gray;
}
</style>