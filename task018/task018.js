var data = [];


function addData() {
  var clickBtn = event.target;
  var number = document.getElementById("textInput").value;
  var regExp = /^[\s]*[0-9]+[\s]*$/;

  if (!regExp.test(number)) {
    if (!(clickBtn.id == "leftOutput") && !(clickBtn.id == "rightOutput")) {
      alert("请输入正确的数字");
      return;
    }
  } else {
    number = number.match(/[0-9]+/)[0];
  }
  //alert("1232");

  switch (clickBtn.id) {

    case "leftInput":
      data.splice(0, 0, number);
      break;

    case "leftOutput":
      alert(data[0]);
      data.splice(0, 1);
      break;

    case "rightInput":
      data.splice(data.length, 0, number);
      break;

    case "rightOutput":
      alert(data[data.length - 1]);
      data.splice(-1, 1);
      break;

  }


  console.log(data);
  console.log("addData");
  renderList();
}

function btnHandle() {
  var btn = document.getElementsByTagName("input");
  for (var i = 1; i < btn.length; i++) {
    if (btn[i].className == "btn") {
      btn[i].onclick = function() {
        addData();
      }
    }
  }
}


function renderList() {

  var numText;
  var numBlock;
  var numberArea;
  var list = document.getElementById("wrap");
  console.log("1213123");
  if (document.getElementById("number")) {
    list.removeChild(document.getElementById("number"));
  }
  numberArea = document.createElement("div");
  numberArea.id = "number";
  document.getElementById("wrap").appendChild(numberArea);

  for (var i = 0; i < data.length; i++) {
    numText = document.createTextNode(data[i]);
    numBlock = document.createElement("div");
    numBlock.appendChild(numText);
    numBlock.className = "numberBtn";
    numBlock.id = i;
    numberArea.appendChild(numBlock);
    numBlock.onclick = function() {
      deleteNum();
    }
  }
  document.getElementById("textInput").value = "";
}

function deleteNum() {
  var clkNum = event.target;
  data.splice(clkNum.id, 1);
  renderList();
}


function init() {
  btnHandle();
}

init();