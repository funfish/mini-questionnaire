<template id="chart">
	<div id="main">
		<div id="qnChart">
			<div id="qnTitle">{{ qnData.title }}</div>
			<div class="question-chart clear" v-for="(item, i) in qnData.qn">
				<div class="question">
					<span>Q{{ i + 1 }}</span>
					<div class="question-title">
						{{ item.title }}
					</div>
					<div class="option" v-if="item.type !== 'text'" v-for="(option, index) in item.selection">
						{{ index + 1 }}.{{ option }} 
					</div>	
				</div>
				<zhuzi :answer="qnData.answer[i]" :type="item.type"></zhuzi>
			</div>
		</div>	
	</div>	
</template>

<script>
	import zhuzi from "./zhuzi.vue"
	export default { 
		name: "chart",
		props: ["data"],
		data() {
			return {
				qnData: this.data[this.$route.params.id - 1]
			}
		},
		components: {
			"zhuzi": zhuzi
		}
	};
</script>

<style lang="sass">
@import "../style/veriable.scss";
@import "../style/mixins.scss";
.question-chart .question {
	float: left;
	width: 55%;
}
.chart {
	float: right;
	margin-top: 1em;
	@include size(40%, 10.8rem);
	padding-top: 1em;
	
}
</style>