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
			<router-view :data="qnDataAll" @show-mask="showMask = true" @save-qn="saveQn" @confirm-delete="deleteQn" @confirm-release="releaseQn" @check-all="checkAllFn" @confirm-delete-some="deleteSome"></router-view>		
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
			showMask: false,
			checkAll: false			
		}
	},
	methods: {
		deleteQn(id) {
			this.qnDataAll.splice(id - 1, 1);
			database.save(this.qnDataAll);
		},
		deleteSome() {
			for(let i = 0; i < this.qnDataAll.length; i++) {
				if(this.qnDataAll[i].checkStatus) {
					this.qnDataAll.splice(i, 1);
					i--;
				}				
			}
			database.save(this.qnDataAll);
		},
		saveQn(qnData, id) {
			if(id !== -1) {
				this.qnDataAll.splice(id - 1, 1, clone(qnData));
			} else {
				if(qnData.id !== (this.qnDataAll.length === 0 ? 0 : this.qnDataAll[this.qnDataAll.length - 1].id)) {
					qnData.id = this.qnDataAll.length === 0 ? 0 : this.qnDataAll[this.qnDataAll.length - 1].id  + 1
					this.qnDataAll.push(qnData);
				}else {
					this.qnDataAll.splice(this.qnDataAll.length - 1, 1, clone(qnData));
				}
			}
			database.save(this.qnDataAll);				
		},
		releaseQn(qnData, id) {
			qnData.status = "已发布";
			this.saveQn(qnData, id);
		},
		checkAllFn(flag) {
			this.qnDataAll.forEach((item) => item.checkStatus = !flag)
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
	@include size(100%, 4rem);
	line-height: 4rem; 
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