import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import app from "./app.vue";
import qnlist from "./component/qnlist.vue";
import qn from "./component/qn.vue";
import calendar from "./component/calendar.vue";
import chart from "./component/chart.vue";

Vue.use(VueRouter);
var router = new VueRouter({routes});
Vue.component("qn", qn);
Vue.component("qnlist", qnlist);
Vue.component("calendar", calendar);
new Vue({
	el: "#micr",
	router,
	render: h => h(app)
})
