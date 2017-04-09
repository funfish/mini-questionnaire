define(function() {
	function maskCover() {
		var mask = $('<div class="mask"></div>');
		mask.addClass("mask");
		mask.html('<div id="dia-window">' +
				'<div id="dia-head">' +
					'<b>提示</b>' +
					'<span>×</span>' +
				'</div>' +
				'<div id="dia-container">' +
					'<span>确认要</span>' +
					'<div id="dia-choose">' +
						'<button>确认</button>' +
						'<button>取消</button>' +		
					'</div>' +
				'</div>' +
			'</div>');
		mask.css("height", $(document).height() + "px");
		$(document.body).append(mask);

		$("#dia-head span").on("click", function() {
			mask.remove();
			$(document.body).removeAttr("style");
			$(document.body).removeClass();
		});
		$("#dia-choose button:nth(1)").on("click", function() {
			mask.remove();
			console.log(1);
			$(document.body).removeAttr("style");
			$(document.body).removeClass();
		});
	}

	return {
		maskCover: maskCover
	}
})