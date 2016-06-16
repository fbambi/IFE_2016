var data = [];



function btnHandle() {
  document.getElementById("inputBtn").onclick = function() {
    addData();

  }
}

//添加输入数据
function addData() {
  var content = document.getElementById("textarea").value;
  var regBlank = /^[\s]*$/;
  data = [];
  if (regBlank.test(content)) {
    alert("Please input something");
    return;
  } else {
    var regExp = /[0-9a-zA-Z\u4E00-\u9FA5]+/g;
    var arrData = content.match(regExp);
    data = data.concat(arrData);
    document.getElementById("textarea").value = "";
  }
  addInputResault();
}

//输入结果展示
function addInputResault() {
  var showData = document.getElementById("showData");


  if (document.getElementById("searchDiv")) {
    document.getElementById("wrap").removeChild(document.getElementById("searchDiv"));
    console.log("del searchDiv");
  }
  if (document.getElementById("showSearch")) {
    document.getElementById("wrap").removeChild(document.getElementById("showSearch"));
  }

  var labelLength = document.getElementsByTagName("label").length;
  for (var i = 0; i < labelLength; i++) {
    if (document.getElementsByTagName("label")[i].className) {
      console.log(document.getElementsByTagName("label")[i].className);
      if (document.getElementsByTagName("label")[i].className == "labelINput") {
        document.getElementById("showData").removeChild(document.getElementsByTagName("label")[i]);
        labelLength--;
      }
    }
  }



  labelLength = document.getElementsByTagName("label").length;
  for (var i = 0; i < labelLength; i++) {
    console.log(i);
    if (document.getElementsByTagName("label")[i].className) {
      if (document.getElementsByTagName("label")[i].className == "line") {
        document.getElementById("showData").removeChild(document.getElementsByTagName("label")[i]);
        labelLength--;
      }
    }

  }

  if (!document.getElementById("showDataText")) {
    var showDataText = document.createElement("label");
    showDataText.id = "showDataText";
    showDataText.textContent = "您输入的内容为:  ";
    showData.appendChild(showDataText);
  }

  for (var i = 0; i < data.length; i++) {
    var showDataLabel = document.createElement("label");
    showDataLabel.textContent = data[i] + "  ,  ";
    showDataLabel.className = "labelINput";
    showDataLabel.id = i;
    //if(document.getElementById(data[i])){
    // showDataLabel.id
    // }
    showData.appendChild(showDataLabel);
    //var line = document.createElement("label");
    //line.textContent = "  |  ";
    // line.className = "line";
    //showData.appendChild(line);
  }

  addSearch();
}

//添加搜索关键词
function addSearch() {

  //创建搜索框
  var search = document.createElement("input");
  search.id = "searchInput";
  search.type = "text";
  search.placeholder = "请输入查询关键字";
  if (!document.getElementById("searchDiv")) {
    var searchDiv = document.createElement("div");
    searchDiv.id = "searchDiv";
    document.getElementById("wrap").appendChild(searchDiv);
  }
  document.getElementById("searchDiv").appendChild(search);
  //创建搜索按钮
  var searchBtn = document.createElement("input");
  searchBtn.id = "searchBtn";
  searchBtn.type = "button";
  searchBtn.value = "查询";
  document.getElementById("searchDiv").appendChild(searchBtn);
  searchBtn.onclick = function() {
    searchWord();
  }
}


//展示搜索结果
function searchWord() {
  if (document.getElementById("showSearch")) {
    document.getElementById("wrap").removeChild(document.getElementById("showSearch"));
  }
  var showSearch = document.createElement("div");
  showSearch.id = "showSearch";
  document.getElementById("wrap").appendChild(showSearch)


  var searchValue = document.getElementById("searchInput").value;

  if (!document.getElementById("showSearchText")) {
    var showSearchText = document.createElement("label");
    showSearchText.id = "showSearchText";
    showSearchText.textContent = "匹配到的结果为：  ";
    showSearch.appendChild(showSearchText);

  }

  //alert(searchValue);
  for (var i = 0; i < data.length; i++) {
    document.getElementById(i).className = "nothing";
    //document.getElementById(data[i]).style.fontWeight = "normal";
    if (data[i].match(searchValue)) {
      var showDataText = document.createElement("label");
      showDataText.textContent = "  " + data[i] + "  |";
      showDataText.className = "showDataText";
      showSearch.appendChild(showDataText);
      document.getElementById(i).className = "onget";
    }
  }
}



function init() {
  btnHandle();


}

init();