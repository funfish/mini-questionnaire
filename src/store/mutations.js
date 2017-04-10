import "../library";
import {database, initData, dataTest} from "../database";

export default {
	saveQn(state, payload) {
		if(payload.id !== -1) {
			state.qnDataAll.splice(payload.id - 1, 1, clone(payload.qnData));
		} else {
			if(payload.qnData.id !== (state.qnDataAll.length === 0 ? 0 : state.qnDataAll[state.qnDataAll.length - 1].id)) {
				payload.qnData.id = state.qnDataAll.length === 0 ? 0 : state.qnDataAll[state.qnDataAll.length - 1].id  + 1
				state.qnDataAll.push(payload.qnData);
			}else {
				state.qnDataAll.splice(state.qnDataAll.length - 1, 1, clone(payload.qnData));
			}
		}
		database.save(state.qnDataAll);	
	},
	delete(state, id) {
		if(id !== -2) {
			state.qnDataAll.splice(id - 1, 1);
		}else {
			for(let i = 0; i < state.qnDataAll.length; i++) {
				if(state.qnDataAll[i].checkStatus) {
					state.qnDataAll.splice(i, 1);
					i--;
				}				
			}
		}
		database.save(state.qnDataAll);
	},
	checkAllFn(state, flag) {
		state.qnDataAll.forEach((item) => item.checkStatus = !flag)
	},
	changeReleaseFlag(state) {
		state.releaseFlag = !state.releaseFlag;
	}
}