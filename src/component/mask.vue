<template>
	<div id="maskCover" :style="{ height: boxHeight }">
		<div id="dia-window">
			<div id="dia-head">
				<b>提示</b>
				<span @click="cancel">×</span>
			</div>
			<div id="dia-container">
				<span v-for="item in showMessage">{{ item }}<br/></span>
				<div id="dia-choose">
					<button @click="confirm">确认</button>
					<button @click="cancel">取消</button>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>	
	import {bus} from "./bus";
	export default { 
		name: "maskCover",
		data() {
			return {
				boxHeight: document.body.clientHeight + "px"
			}
		},
		computed: {
			showMessage() {
				return this.$store.state.maskMessage
			},
			maskId() {
				return this.$store.state.maskId
			}
		},
		beforeCreate() {
			bus.$on("mask-handle", (message, seq) =>{
				this.showMessage = message;
				this.maskId = seq;
			})
		},
		methods: {
			confirm() {
				if(this.$route.path === "/") {
					this.$store.commit("delete", this.maskId);
					this.$store.commit("mask");
					//this.$emit("close");	
					this.$router.push("/");			
				} else {
					if(this.showMessage.length > 1) {
						this.$store.commit("changeReleaseFlag");
						this.$store.commit("mask");
						//this.$emit("close");
						this.$nextTick(() => {
							this.$router.push("/");
							this.$store.commit("changeReleaseFlag");
						})
					} else {
						this.$store.commit("mask");
					}
				}
			},
			cancel() {
				this.$store.commit("mask");
			}
		}
	};
</script>
<style lang="sass">	
@import "../style/veriable.scss";
@import "../style/mixins.scss";

#maskCover {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: $maskGray;
	z-index: 999;
}
#dia-window {
	position: fixed;
	left: 50%;
	top: 50%;
	margin-top: -11rem;
	margin-left: -14.6rem;
	@include size(29.2rem, 13.3rem)
	background-color: $white;
}
#dia-window,
#dia-head {
	border-top-left-radius: .83rem;
	border-top-right-radius: .83rem;
}
#dia-head {
	padding: 0 1.5rem 0 2rem; 
	@include size(100%, 3rem);
	background-color: $lightGray;
	@include box-sizing(border-box);
	span{
		margin-left: 260px;
		vertical-align: sub;
		font-size: 2em;
		color: $maskGray;
		cursor: pointer;
	}
}
#dia-container {
	padding: 1.5rem 2rem 0 2rem;
	width: 100%;
	@include size(100%, 13.3rem);
	@include box-sizing(border-box);	
}
#dia-choose {
	position: absolute;
	left: 9.25rem;
	top: 9.6rem
}
.hidden {
	display: none;
}
</style>