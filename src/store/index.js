import {database, initData, dataTest} from "../database";
import mutations from "./mutations"
export default {
	state: {
		qnDataAll: database.fetch(dataTest),
		releaseFlag: false,
		maskMessage: [""],
		showMask: false,
		maskId: 0
	},
	mutations
}