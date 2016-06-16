function btnHandle() {
	document.getElementById("pop").onclick = function() {
		popOver();
	}
}


function popOver() {
	var block = document.createElement("div");
	block.className = "block";
	document.body.appendChild(block);
	document.getElementById("popUp").style.display = "inline-block";
	block.onclick = function() {
		block.parentNode.removeChild(block);
		document.getElementById("popUp").style.display = "none";
	}
}


btnHandle();