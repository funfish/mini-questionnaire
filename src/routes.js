import qnlist from "./component/qnlist.vue";

export default [{
		path: "/",
		component: qnlist,
	}, {
		path: "/newqn", 
		component: resolve => require.ensure([], () => resolve(require("./component/qn.vue")))
	}, {
		path: "/qn/:id",
		name: "qn",
		component: resolve => require(["./component/qn.vue"], resolve)
	}, {
		path: "/chart/:id", 
		name:"chart",
		component: r => require.ensure(["./component/chart.vue"], () => r(require("./component/chart.vue")))
	}
]