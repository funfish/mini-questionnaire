import qnlist from "./component/qnlist.vue";
import qn from "./component/qn.vue";
import calendar from "./component/calendar.vue";
import chart from "./component/chart.vue";

export default [
		{
			path: "/", component: qnlist
		}, {
			path: "/newqn", component: qn
		}, {
			path: "/qn/:id", name:"qn", component: qn
		}, {
			path: "/chart/:id", name:"chart", component: chart
		}
	]