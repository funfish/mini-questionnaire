import {database, initData, dataTest} from "../database";
import mutations from "./mutations"
export default {
	state: {
		qnDataAll: database.fetch(dataTest),
		releaseFlag: false
	},
	mutations
}