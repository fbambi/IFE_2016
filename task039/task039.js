function isTouched(toward) {

	var head,
	tTable;

	if (document.getElementById("tHead")) {
		head = document.getElementById("tHead");
		tTable = document.getElementsByTagName("table")[0];
	} else if (document.getElementById("frozenThead")) {
		head = document.getElementById("frozenThead");
		tTable = document.getElementById("frozenTable");
	}


	if (toward < 0) {
		if (head.getBoundingClientRect().top < 0) {
			if (!document.getElementById("frozenThead")) {
				head.className = "frozenThead";
				head.id = "frozenThead";
				head.style.left = document.getElementsByTagName("thead").offsetLeft;
				tTable.id = "frozenTable";


			}
		}
	} else if (toward > 0) {
		if (document.getElementById("frozenThead")) {
			if (tTable.getBoundingClientRect().top > -200) {
				head.className = "tHead";
				head.id = "tHead";
				tTable.id = "tTable";
				document.getElementsByTagName("thead")[0].appendchild(head);
			}
		}

	}
	var bbo = document.getElementsByTagName("tbody")[0];
	console.log(bbo.getBoundingClientRect().top);

}

function isWheel() {
	window.onmousewheel = function() {
		if (event.wheelDelta < 0) {
			isTouched(-1);
		} else if (event.wheelDelta > 0) {
			isTouched(1);
		}
	}
}

isWheel();