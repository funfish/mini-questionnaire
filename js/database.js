define(function(){
	var data = [{
		title: "测试",
		time: "2016-05-21 20:21:22",
		status: "已结束",
		qn: [{
			type: "single",
			title:"这个问题怎么选择",
			selection: ["选线1", "选线2", "选项3"]
		}, {
			type: "multi",
			title:"这个问题怎么选择",
			selection: ["选线1", "选线2", "选项3"]
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
	var initData = [{
		title: "这里是标题",
		time: "",
		status: "未发布",
		qn: [],
		answer: {
			
		} 
	}];
	return {
		data: data,
		initData: initData
	}
})