<template>
	<div id="micr">
		<div id="head">
			<img src="./assets/question.png" alt="question">
			<span>问卷管理</span>
			<router-link to="/" style="text-decoration: none">
				<span>我的问卷</span>
			</router-link>
		</div>
		<div id="container">
			<router-view :data="qnDataAll" @show-mask="showMask = true" @save-qn="saveQn" @confirm-delete="removeQn" @confirm-release="releaseQn" @add-qn="addQn"></router-view>		
		</div>
		<maskcover v-if="showMask" @close="showMask = false">
		</maskcover>		
	</div>
</template>

<script>
import "./library";
import {database, initData, dataTest} from "./database";
import maskCover from "./component/mask.vue";

export default {
	name: "app",
	data: function() {
		return {
			qnDataAll: database.fetch(dataTest),
			new: "",
			showMask: false			
		}
	},
	methods: {
		removeQn: function(id) {
			this.qnDataAll.splice(id - 1, 1);
			database.save(this.qnDataAll);
		},
		saveQn: function(qnData, seq) {
			this.qnDataAll[seq - 1] = qnData;
			database.save(this.qnDataAll);
		},
		releaseQn: function(qnData, id) {
			qnData.status = "已发布";
			this.qnDataAll.splice(id - 1, 1, clone(qnData));
		},
		addQn: function() {
			var newQn = clone(initData);
			newQn.id = this.qnDataAll.length + 1;
			this.qnDataAll.push(newQn);
		}
	},
	components: {
		"maskcover": maskCover
	}
}
</script>

<style lang="sass">
@import "./style/veriable.scss";
@import "./style/mixins.scss";

html {
	font-size: 75%;
}
body {
	height: 100%;
	margin: 0;
}
button {
	margin: 0;
	border: 1px solid black;
	padding: 0;
	text-align: center;
}
ul {
	margin: 0;
	padding: 0;
}
li {
	list-style: none;
}
.clear:after {
    clear: both;
    content: "";
    display: table;
}
#micr {
	height: 100%;
}
#head {
	@include size(100%, 2.5rem);
	line-height: 2.5rem; 
	background-color: $orange;
	font-size: 1.6rem;
	color: $white;
	img {
		margin-left: 4rem;
		vertical-align: -3px;
	}
	span:last-child {
		margin-left: 3rem;
		text-decoration: none;
		color: white;
		font-size: 0.8rem;
		cursor: pointer;
	}
}
#container {
	padding: 3.3rem 10% 0 10%;
	width: 80%;
	min-height: 58.3rem;
	background-color: rgba(239, 239, 239, 1);
}
#main {
	position: relative;
	padding-bottom: 4.2rem;
	width: 100%;
	min-width: 52.5rem;
	background-color: white;
}
</style>