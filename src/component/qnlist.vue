<template>
	<div id="main" v-if="!data.length" style="min-height: 150px">
		<router-link :to="{ name:'qn', params: { id: data.length + 1}}">
			<button id="addFirst" @click="$emit('add-qn')">
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
				<router-link :to="{ name:'qn', params: { id: data.length}}">
					<button @click="$emit('add-qn')">+新建问卷</button>
				</router-link>
			</div>
		</div>
		<ul class="qnList-title">
			<li class="clear" v-for="item in data">
				<input type="radio">
				<div class="dynamic">
					<span>{{ item.title }}</span>
					<span>{{ item.time }}</span>
					<span>{{ item.status }}</span>
				</div>
				<div class="operation-QN">
					<router-link :to="{ name:'chart', params: { id: item.id }}">
						<button>查看数据</button>
					</router-link>						
					<button @click="maskHandleQnList(item.id)">删除</button>
					<router-link :to="{ name:'qn', params: { id: item.id }}">
						<button>编辑</button>
					</router-link>	
				</div>
			</li>
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
				maskMessageQnList: ["确认要删除此问卷？"]
			}
		},
		created() {
			bus.$on("confirm-delete", (id) => {
				this.$emit("confirm-delete", id)
			})
		},
		methods: {
			maskHandleQnList(id) {
				this.$emit('show-mask');
				setTimeout(() => {
					bus.$emit('mask-handle', this.maskMessageQnList, id);				
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
ul.qnList-title li{
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
	input {
		position: absolute;
		top: 0.7rem;
	}

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
	width: 46%;
	text-overflow: ellipsis;
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