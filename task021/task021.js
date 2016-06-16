var tag = [];
var hobby = [];



function textHandle() {
  document.getElementById("tagInput").onkeyup = function() {
    trigger();
  }
}


function trigger() {
  if (document.getElementById("tagInput").value == " ") {
    document.getElementById("tagInput").value = "";
  }
  if (document.getElementById("tagInput").value.match(/[\s]/)) {
    addtag();
  }
  if (document.getElementById("tagInput").value.match(",")) {
    addtag();
  }
  if (document.getElementById("tagInput").value.match("，")) {
    addtag();
  }
  if (document.getElementById("tagInput").value.match(/\n/)) {
    addtag();
  }
}

//添加输入数据
function addtag() {

  var content = document.getElementById("tagInput").value;
  var regExp = /[0-9a-zA-Z\u4E00-\u9FA5]+/g;
  var arrtag = content.match(regExp);
  tag = tag.concat(arrtag);
  document.getElementById("tagInput").value = "";


  //重复处理



  if (tag.length > 10) {
    var rest = tag.length - 10;
    for (var i = 0; i < 10; i++) {
      tag[i] = tag[i + rest];

    }
  }
  showTag();
}

//输入结果展示
function showTag() {
  if (document.getElementById("showTag")) {
    document.getElementById("tagArea").removeChild(document.getElementById("showTag"));
  }
  var showTag = document.createElement("div");
  showTag.id = "showTag";
  document.getElementById("tagArea").appendChild(showTag);

  for (var i = 0; i < tag.length; i++) {
    var tagBlock = document.createElement("div");
    tagBlock.id = tag[i];
    tagBlock.className = "tag_block";
    tagBlock.textContent = tag[i];
    tagBlock.onmouseover = function() {
      onMouseOver();
    }
    tagBlock.onmouseout = function() {
      onMouseOut();
    }
    tagBlock.onclick = function() {
      btnDlt();
    }
    document.getElementById("showTag").appendChild(tagBlock);
  }
}


function onMouseOver() {
  var block = event.target;
  block.textContent = "点击删除 " + block.textContent;
  block.className = "on_mouse_over";
}

function onMouseOut() {
  var block = event.target;
  block.textContent = block.textContent.slice(4);
  block.className = "tag_block";
}

function btnDlt() {


  var block = event.target;

  for (var i = 0; i < tag.length; i++) {
    if ("点击删除 " + tag[i] == block.textContent) {
      tag.splice(i, 1);
      showTag();
      return;
    }
  }

}

function btnHandle() {
  document.getElementById("hobbyClick").onclick = function() {
    showHobby();
  }
}

function hobbyTrigger() {
  var hobbyValue = document.getElementById("hobbyInput").value;
  if (hobbyValue == "") {
    alert("NO Blank");
  } else {
    var regExp = /[0-9a-zA-Z\u4E00-\u9FA5]/g;
  }
}


function showHobby() {}



function init() {
  textHandle();

}

init();