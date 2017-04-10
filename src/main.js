import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from "./routes";
import stores from "./store";
import app from "./app.vue";
import qnlist from "./component/qnlist.vue";
import qn from "./component/qn.vue";
import calendar from "./component/calendar.vue";
import chart from "./component/chart.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

var router = new VueRouter({routes});
var store = new Vuex.Store(stores);
Vue.component("qn", qn);
Vue.component("qnlist", qnlist);
Vue.component("calendar", calendar);
new Vue({
	el: "#micr",
	router,
	store,
	render: h => h(app)
})
