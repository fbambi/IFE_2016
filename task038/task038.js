function btnHandle() {
	document.getElementById("tHead").onclick = function() {
		sortData();
	}
}


function getData() {

	var students,
		nameList = [],
		studentsTR = document.getElementsByTagName("tr"),
		studentPoperties = studentsTR[0].getElementsByTagName("th");

	for (var i = 0; i < studentsTR.length - 1; i++) {

		students = studentsTR[i + 1].getElementsByTagName("th");
		nameList[i] = {};

		for (var j = 0; j < students.length; j++) {
			nameList[i][studentPoperties[j].textContent] = students[j].textContent;
		}
	}
	console.log(nameList);
	return nameList;
}


function sortData() {
	var temp;
	nameList = getData(),
		clickPoperty = event.target.textContent;
	//console.log(clickPoperty.textContent);


	for (var i = 1; i < nameList.length; i++) {
		temp = nameList[i][clickPoperty];
		for (var j = 0; j < i - 1; j++) {
			if (parseInt(nameList[j][clickPoperty]) > parse(nameList[j + 1][clickPoperty])){
				
			}
		}
	}

	console.log(nameList[0], nameList[1]);
	temp = nameList[0];
	nameList[0] = nameList[1];
	nameList[1] = nameList[0];
	console.log(nameList[0], nameList[1]);

}

btnHandle();



/*
(function() {

	var students,
		nameList = {},
		studentsTR = document.getElementsByTagName("tr"),
		studentPoperties = studentsTR[0].getElementsByTagName("th");

	for (var i = 1; i < studentsTR.length; i++) {

		students = studentsTR[i].getElementsByTagName("th");
		nameList.i = {};

		for (var j = 0; j < studentsTh.length; j++) {
			nameList.i[studentPoperties[j].textContent] = students[j].textContent;
		}
	}
})();

*/