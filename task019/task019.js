//data为存储数据的数组
//dataObj存储排序中每个状态的数组
var data = [];
var dataObj = {};
var k = 0;
var dataBlack = [];


//获取测试用随机数组
function getRandomNum(n, min, max) {
  var num;
  var arr = [];
  for (var j = 0; j < n; j++) {
    num = Math.ceil(Math.random() * 100);
    if (num >= min) {
      arr[j] = num;
      j += 1;
    }
    j -= 1;
  }
  return arr;
}



function addData() {
  var clickBtn = event.target;
  var number = document.getElementById("textInput").value;
  var regExp = /^[\s]*[0-9]+[\s]*$/;

  if (!regExp.test(number)) {
    if (!(clickBtn.id == "leftOutput") && !(clickBtn.id == "rightOutput")) {
      alert("请输入正确的数字");
      document.getElementById("textInput").value = "";
      return;
    }
  } else {
    number = number.match(/[0-9]+/)[0];
    if (number < 10) {
      alert("数字太小");
      document.getElementById("textInput").value = "";
      return;
    } else if (number > 100) {
      alert("数字太大");
      document.getElementById("textInput").value = "";
      return;
    }
  }


  switch (clickBtn.id) {

    case "leftInput":
      if (data.length > 59) {
        alert("元素超过60个，请删除");
        return;
      }
      data.splice(0, 0, number);
      break;

    case "leftOutput":
      alert(data[0]);
      data.splice(0, 1);
      break;

    case "rightInput":
      if (data.length > 59) {
        alert("元素超过60个，请删除");
        return;
      }
      data.splice(data.length, 0, number);
      break;

    case "rightOutput":
      alert(data[data.length - 1]);
      data.splice(-1, 1);
      break;

  }
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
  document.getElementById("notice").innerHTML = "当前共有 <span>" + data.length + "</span> 个元素";
  renderChart(data,-1);
}



function deleteNum() {
  var clkNum = event.target;
  data.splice(clkNum.id, 1);
  renderList();
}

//渲染函数
function renderChart(data, n) {
  var height;
  var width;
  var chartDiv;
  var chartLine;
  var chartArea;
  var divplaceholder;

  if (document.getElementById("chart")) {
    document.getElementById("wrapChart").removeChild(document.getElementById("chart"));
  }

  chartArea = document.createElement("div");
  chartArea.id = "chart";
  divplaceholder = document.createElement("div");
  divplaceholder.className = "divplshder";
  chartArea.appendChild(divplaceholder);

  for (var i = 0; i < data.length; i++) {
    chartDiv = document.createElement("div");
    chartDiv.id = i + 1;
    chartDiv.className = "chartDiv";
    chartLine = document.createElement("div");
    chartLine.className = "chartLine";
    if (i == n) {
      chartLine.style.backgroundColor = "black";
    }
    chartLine.style.height = ((data[i] / 100)) * 500;
    chartDiv.appendChild(chartLine);
    chartArea.appendChild(chartDiv);

  }
  document.getElementById("wrapChart").appendChild(chartArea);
}


//插入排序
//k记录交换次数
function insertionSort(arr) {
  var temp;

  for (var i = 1; i < arr.length; i++) {
    temp = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > temp; j--) {

      (function(p) {
        dataObj[p] = [];
        for (var i = 0; i < arr.length; i++) {
          dataObj[p][i] = arr[i];

        }
        console.log(" ");
        console.log("~~~~~~~下一次排序开始~~~~~~~~");
        console.log("***** 排序前，data=", arr);
        //console.log(arr);
      })(k);

      (function(i, j, temp) {
        console.log("***** 现在排序的是原数组的第" + (i + 1) + "项，值为" + temp + "，将其染成黑色 *****");
        console.log("***** 将" + temp + "插入到第" + (j + 1) + "项(" + arr[j] + ")之前 *****");

      })(i, j, temp);


      arr[j + 1] = arr[j];
      arr[j] = temp;
      dataBlack[k + 1] = j;

      (function(j) {
        console.log("     ===========插入完成===========");
        if (j > 0) {
          console.log("     ||   前一项(第" + (j) + "项)的值为" + arr[j - 1]+"   ||");
        }
        if (j < arr.length) {
          console.log("     ||   后一项(第" + (j + 2) + "项)的值为" + arr[j + 1]+"   ||");
        }
        if (j > 1) {
          console.log("     ||   前二项(第" + (j - 1) + "项)的值为" + arr[j - 2]+"   ||");
        }
        if (j < arr.length - 1) {
          console.log("     ||   后二项(第" + (j + 3) + "项)的值为" + arr[j + 2]+"   ||");
        }

        console.log("     =============================");
        console.log("***** 排序后，data=", arr);

      })(j);



      k = k + 1;
      // console.log("k=", k);

    }

    if (i == arr.length - 1) {
      console.log("-----排序完成-----");
      console.log("总共进行了" + k + "次排序");
    }
  }
  //console.log(k);

}


//主程序
function init() {
  data = getRandomNum(10, 10, 100);

  btnHandle();

  insertionSort(data);
  for (let i = 1; i < Object.keys(dataObj).length; i++) {
    setTimeout(function timer() {
      renderChart(dataObj[i], dataBlack[i + 1]);
    }, 0);
  }
  console.log(dataObj[0]);
  console.log(data.length);
  document.getElementById("re").onclick = function() {
    for (let i = 1; i < Object.keys(dataObj).length; i++) {
      setTimeout(function timer() {
        renderChart(dataObj[i], dataBlack[i + 1]);
        //console.log(i + 1);
      }, 0);
    }
    console.log(dataObj[0]);
    console.log(data.length);
  }



  /*
  setTimeout(renderChart(dataObj[1]), 1000);
  alert("");
  setTimeout(renderChart(dataObj[2]), 1000);
   alert("");
  setTimeout(renderChart(dataObj[3]), 1000);
   alert("");
  setTimeout(renderChart(dataObj[4]), 1000);
   alert("");
  setTimeout(renderChart(dataObj[5]), 1000);

  */


  //for(var i=0;i<data.length;i++){

  //}

}

init();