<template>
	<div id="main" v-if="!data.length" style="min-height: 150px">
		<router-link to="/newqn">
			<button id="addFirst">
				<span>+</span>
				新建问卷
			</button>
		</router-link>
	</div>
	<div id="main" v-else>
		<div class="title clear">
			<div class="dynamic">
				<span>标题</span>
				<span>时间</span>
				<span>状态</span>
			</div>
			<div class="operation-QN">
				操作
				<router-link to="/newqn">
					<button>+新建问卷</button>
				</router-link>
			</div>
		</div>
		<ul class="qnList-title">
			<li class="clear" v-for="(item, i) in data">
				<div class="checkbox-round">
					<input type="checkbox" :id="i" v-model="item.checkStatus">
					<label :for="i"></label>
				</div>
				<div class="dynamic">
					<span>{{ item.title }}</span>
					<span>{{ item.time }}</span>
					<span>{{ item.status }}</span>
				</div>
				<div class="operation-QN">
					<router-link :to="{ name:'chart', params: { id: i + 1 }}">
						<button>查看数据</button>
					</router-link>						
					<button @click="maskHandleQnList(i + 1)">删除</button>
					<router-link :to="{ name:'qn', params: { id: i + 1 }}">
						<button>编辑</button>
					</router-link>	
				</div>
			</li>
			<div class="checkbox-round">
				<input type="checkbox" id="checkAll" v-model="checkAll">
				<label for="checkAll" @click="$emit('check-all', checkAll)"></label>
			</div>
			全选	
			<button @click="maskHandleQnList(-2)">删除</button>
		</ul>
	</div>
</template>

<script>
	import {bus} from "./bus";
	export default { 
		name: "qnlist",
		props: ["data"],
		data() {
			return	{
				maskMessageQnList: ["确认要删除此问卷？"],
				maskMessageQnList2: ["确认要删除这些问卷？"],
				checkAll: false
			}
		},
		created() {
			bus.$on("confirm-delete", (id) => {
				if(id !== -2) {
					this.$emit("confirm-delete", id);
				} else {
					this.$emit("confirm-delete-some");
				}
			})
		},
		methods: {
			maskHandleQnList(id) {
				this.$emit('show-mask');
				setTimeout(() => {
					bus.$emit('mask-handle', id === -2 ? this.maskMessageQnList2 : this.maskMessageQnList, id);				
				}, 0)
			}
		}
	};
</script>

<style lang="sass">
@import "../style/veriable.scss";
@import "../style/mixins.scss";

#addFirst {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -4rem;
	margin-top: -1.1rem;
	@include button;
	@include size(8rem, 2.2rem);
	line-height: 2.2rem;
	text-align: center;
	background-color: $orange;
	color: $white;
	cursor: pointer;
	span{
		margin-right: 0.2rem;
		font-size: 2rem;
		vertical-align: bottom;
	}
}
ul.qnList-title,
.title {
	width: 100%;
}
.title {
	padding: 0 16.7rem 0 .83rem;
	line-height: 3rem;
	background-color: $BackGray;
}
ul.qnList-title > li{
	position: relative;
	border-bottom: 1px solid  $BackGray;
	border-left: .83rem solid white;
	border-right: .83rem solid white;
	padding-right: 15.8rem;
	width: 100%;
	line-height: 3rem;
	&:hover{
		border-left-color: $pink;
		border-right-color: $pink;
		background-color: $pink;
	}
}
.checkbox-round {
	position: absolute;
	top: 1rem;
	left: .3rem;
	border: 1px solid $black;
	border-radius: 100%;
	@include size(1rem, 1rem);
	background-color: $BackGray;
	input {
		visibility: hidden;
		&:checked + label::before {
			content: "";
			display: block;
			margin-left: -1px;
			border-radius: 100%;
			@include size(1.25rem, 1.25rem);
			background-color: $orange;
		}
		&:checked + label::after {
			content: "";
			display: block;
			margin-top: -.92rem;
			margin-left: 2.8px;
			border-radius: 100%;
			@include size(.6rem, .6rem);
			background-color: $white;
		}
	}
	label {
		position: relative;
		top: -3.11rem;
		left: .2px;
		display: block;
		@include size(1.25rem, 1.25rem);
		cursor: pointer;
	}
}
ul.qnList-title > .checkbox-round {
	position: static;
	float: left;
	margin: .3rem 1rem 0 1.13rem;
	label {
		top: -1.7rem;
	}
}
ul.qnList-title > li:last-of-type {
	margin-bottom: .7rem;
}
ul.qnList-title li,
li .dynamic,
.title,
.operation-QN {
	@include box-sizing(border-box);
}
.dynamic {
	float: left;
	width: 100%;
	min-width: 35.4rem;
	span {
		float: left;
	}
}
.dynamic span:nth-of-type(1){
	margin-left: 7%;
	padding-right: 1.3rem;
	width: 46%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	@include box-sizing(border-box);
}
.dynamic span:nth-of-type(2){
	width: 30%;
}
.dynamic span:nth-of-type(3){
	width: 17%;
}
.operation-QN {
	float: right;
	position: relative;
	left: 15.8rem;
	margin-left: -100%;
	width: 15.8rem;
}
.operation-QN button,
#dia-choose button {
	@include button;
	margin: 0.6rem 0 0 0.2rem;
}
ul.qnList-title > button {
	@include button;
	margin-left: 1rem;
}
ul.qnList-title > input {
	margin-left: 1.2rem;
	vertical-align: text-top;
}
.operation-QN button {
	float: right;
}
.title button {
	@include size(7rem, 1.8rem);
	border: 1px solid $orange;
	background-color: $orange;
	color: white;
}
</style>