define(function() {
	function maskCover() {
		var mask = document.createElement("div");
		mask.className = "mask";
		mask.innerHTML = 		
			'<div id="dia-window">' +
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
			'</div>';	
		mask.style.height = document.body.clientHeight + "px";
		document.body.appendChild(mask);

		var maskbox = document.querySelector(".mask");
		document.getElementById('dia-head').querySelector("span").onclick = function() {
			document.body.removeChild(maskbox);
			document.body.style = "";
			document.body.className = "";
		}	
		document.getElementById('dia-choose').querySelectorAll("button")[1].onclick = function() {
			document.body.removeChild(maskbox);
			document.body.style = "";
			document.body.className = "";
		}	
	}

	return {
		maskCover: maskCover
	}
})