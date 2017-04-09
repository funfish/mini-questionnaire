export var dataTest = [{
		checkStatus: false,
		title: "测试",
		time: "2016-05-21 20:21:22",
		status: "已结束",
		qn: [{
			type: "single",
			title:"这个问题怎么选择",
			selection: ["选项1", "选项2", "选项3"]
		}, {
			type: "multi",
			title:"这个问题怎么选择",
			selection: ["选项1", "选项2", "选项3"]
		}, {
			type: "text",
			title:"这个问题怎么选择"
		}],
		answer: [
			[1, 2, 4],
			[2, 3, 1],
			["1","1","1"]
		]
	}];
export var initData = {
		checkStatus: false,
		title: "这里是标题",
		time: "",
		status: "未发布",
		qn: [],
		answer: {
			
		} 
	};
export var database = {
		fetch: function(data) {
			var dataChoose = JSON.parse(localStorage.getItem("data")) || data;
			dataChoose.forEach(function(item, i) {
				item.id = i + 1;
			})
			return dataChoose
		},
		save: function(data) {
			localStorage.setItem("data", JSON.stringify(data));
		} 
	}