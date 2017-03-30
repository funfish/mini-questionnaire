<template>
	<div id="main">
		<div id="qn">
			<input type="text" id="qnTitle" v-model="copy.title">
			<div class="question" v-for="(item, i) in copy.qn">
				<span>Q{{ i + 1 }}</span>
				<input type="text" :name="i" class="question-title" v-model="item.title">
				<div class="option" v-if="item.type === 'single' || item.type === 'multi'" v-for="(option, index) in item.selection">
					<input type="radio" v-if="item.type === 'single'" :name="i">
					<input type="checkbox" v-else :name="i">
					<input type="text" v-model="item.selection[index]">
				</div>
				<textarea v-if="item.type === 'text'" cols="50" rows="10"></textarea>
				<div class="question-op clear">
					<span @click="copyQuestion(i)">复用</span>
					<span @click="down(i)">下移</span>
					<span @click="up(i)">上移</span>
					<span v-if="item.type !== 'text'" @click="addOption(i)">增加选项</span>
				</div>
			</div>
			<div id="addQ" @click="hiddenAdd = false"> 
				<div id="addSelection" :class="{ hidden: hiddenAdd }">
					<div id="addCenter"> 
						<button @click="addQuestion('single')">
							<img src="../assets/QN单选.png" alt="single">单选
						</button>
						<button @click="addQuestion('multi')">
							<img src="../assets/QN多选.png" alt="multi">多选
						</button>
						<button @click="addQuestion('text')">
							<img src="../assets/QN文本.png" alt="text">文本题
						</button>		
					</div>
				</div>
				<img src="../assets/QN加号.png" alt="plus">
				添加问题
			</div>
			<div id="foot" class="clear" :class="{ calendaring: showCalendar }">问卷截止日期
				<div id="date" @click="showCalendar = true">
					<span>{{ copy.time.slice(0, 10) }}</span>
					<calendar v-if="showCalendar" :time="copy.time" @change-date="changeDate"></calendar>
				</div>
				<button @click="maskRlease">发布问卷</button>
				<button @click="$emit('save-qn', copy, $route.params.id)">保存问卷</button>
			</div>
		</div>
	</div>
</template>

<script>
	import "../library";
	import {bus} from "./bus";

	export default { 
		name: "qn",
		props: ["data"],
		data() {
			return {
				maskMessageQn: [],
				qnData: this.data[this.$route.params.id - 1],
				copy: {},
				showCalendar: false,
				hiddenAdd: true
			}
		},
		created() {
			this.copy = clone(this.qnData);
			bus.$on("confirm-release", () => {this.$emit("confirm-release", this.copy, this.$route.params.id)}
			)
		},
		methods: {
			up(seq) {
				if(seq > 0) {
					this.temp = this.copy.qn[seq - 1];
					this.copy.qn.splice(seq - 1, 1, this.copy.qn[seq]);
					this.copy.qn.splice(seq, 1, this.temp);
				}
			},
			down(seq) {
				if(seq < this.copy.qn.length - 1) {
					this.temp = this.copy.qn[seq];
					this.copy.qn.splice(seq, 1, this.copy.qn[seq + 1]);
					this.copy.qn.splice(seq + 1, 1, this.temp);
				}
			},
			addOption(seq) {
				this.copy.qn[seq].selection.push("新选项")
			},
			copyQuestion(seq) {
				this.copy.qn.push(clone(this.copy.qn[seq]))
			},
			addQuestion(type) {
				var newQuestion = {
					single: {
						type: "single",
						title:"这个问题怎么选择",
						selection: ["选项1", "选项2", "选项3"]
					},
					multi: {
						type: "multi",
						title:"这个问题怎么选择",
						selection: ["选线1", "选线2", "选项3"]
					},
					text: {
						type: "text",
						title:"这个问题怎么选择"
					}
				}
				this.copy.qn.push(newQuestion[type])
			},
			changeDate(dir, val, mon, year) {
				dir = dir || 0;
				mon += dir;
				if(mon < 1) {
					mon = 12;
					year--;
				}
				if(mon > 12) {
					mon = 1;
					year++;
				}
				if(mon < 10) {
					mon = "0" + mon;
				}
				if(val < 10) {
					val = "0" + val;
				}
				this.copy.time = year + "-" + mon + "-" + val + (this.copy.time.slice(10) || " 12:00:00");		
			},
			maskRlease() {
				if(this.copy.time) {
					this.maskMessageQn =["是否发布此卷？", "(此问卷截至日期为" + this.copy.time.slice(0, 10) + ")"] 					
				} else {
					this.maskMessageQn = ["请选择发布时间"]
				}

				this.$emit('show-mask');
				setTimeout(() => {
					bus.$emit('mask-handle', this.maskMessageQn, this.$route.params.id - 1);
				}, 0)
			}
		} 
	};
</script>

<style lang="sass">
@import "../style/veriable.scss";
@import "../style/mixins.scss";

#qn {
	position: relative;
	padding: 0 2.5% 3rem 2.5%;
}
.question input,
#qnTitle {
	border: none;
	outline: none;
	background-color: inherit;
}
.question,
.option .option-text,
#addSelection{
	@include box-sizing(border-box)
}
#qnTitle {
	margin-bottom: 1rem;
	border-bottom: 1px solid $BackGray;
	padding-bottom: .5rem; 
	width: 100%;
	line-height: 5rem;
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
}
.question {
	margin: 1rem;
	padding: 1rem 1.5rem 1.5rem 8%;
	&:hover {
		background-color: $pink;
	}
	span,
	.question-title {
		line-height: 2.5rem;
		font-weight: bold;
	}
	.question-title {
		width: 100%;
	}
}
.question > span:first-child {
	position: absolute;
	left: 7%;
}
.option {
	position: relative;
	height: 2rem;
	line-height: 2rem;
	input[type="radio"],
	input[type="checkbox"] {
		position: absolute;
		top: .25rem;
	}
	input[type="text"] {
		padding-left: 2rem;
		width: 100%;
	}
}
.question-op span {
	float: right;
	margin-left: 1rem;
	cursor: pointer;
}
.question textarea {
	display: block;
	resize: none;
}
#addQ {
	position: relative;
	margin: 1rem;
	border: 1px solid $BackGray;
	background-color: $BackGray;
	line-height: 6rem;
	font-size: 2rem;	
	text-align: center;
	img {
		vertical-align: sub;
	}
}
#addSelection {
	padding-top: 1.2rem;
	@include size(100%, 4rem);
	font-size: .5rem;
	background-color: $white;
}
#addCenter {
	line-height: 1rem;
	button {
		margin-left: 1rem;
		@include size(6rem, 1.5rem);
		text-align: center;
		background-color: $BackGray;
		cursor: pointer;
		img {
			margin: 0 .42rem 1px 0;
		}
	}
}
#foot {
	border-top: 1px solid $BackGray;
	padding: 2rem 16% 2rem 10%;
	button {
		float: right;
		@include button;
		margin-left: 1em;
		width: 6em;
	}
}
.calendaring {
	margin-bottom: 10rem;
}
#date {
	position: relative;
	display: inline-block;
	margin-left: 0.2rem;
	border: 1px solid $BackGray;
	@include size(14rem, 1.5rem);
	line-height: 1.5rem;
	vertical-align: middle;
}	
</style>