<template>
	<div class="chart">
		<div style="line-height: 2.5em" v-if="type !=='text'">数据占比</div>
		<div style="line-height: 2.5em" v-else>有效数据占比</div>
		<div class="option clear" v-for="item in answerCopy">
			<div class="zhuzi" :style="{borderRight: item / sum === 1 ? '1px solid rgba(238, 116, 25, 1)' : '1px solid gray', borderLeft: item / sum === 0 ? '1px solid gray' : '1px solid rgba(238, 116, 25, 1)'}">
				<div class="yes" :style="{ width: item / sum * 100 + '%'}"></div>
				<div class="no" :style="{ width: (100 - item / sum * 100) + '%'}"></div>
			</div>
			<span>{{ Math.round(item /sum *100)}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "zhuzi",
		props: ["answer", "type"],
		data: function() {
			let textEfi = 0;
			this.sum = 0;
			this.answerCopy = this.answer;
			if(this.type !== "text") {
				for(let i = 0; i < this.answerCopy.length; i++) {
					this.sum += this.answerCopy[i];
				}				
			}else {
				for(let i = 0; i < this.answerCopy.length; i++) {
					if(this.answerCopy[i].replace(/^\s*|\s*$/g, '') !== '') {
						textEfi++;
					};
					this.sum++;
				}
				this.answerCopy = [textEfi];				
			}
			return {
				answerCopy: this.answerCopy,
				sum: this.sum
			}
		}
	}
</script>

<style lang="sass">
@import "../style/veriable.scss";
@import "../style/mixins.scss";


.zhuzi,
.yes,
.no,
.chart {
	@include box-sizing(border-box);
}
.zhuzi,
.yes,
.no,
.chart {
	float: left;
}
.zhuzi {
	margin-top: 2px;
	margin-right: 0.8em;
	border-left: 1px solid $orange;
	@include size(80%, 80%);
	.yes {
		height: 100%;
		background-color: $orange;
	}
	.no {
		height: 100%;
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
	}
}
</style>