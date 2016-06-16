function getData() {
  /*
  coding here
  */
  source = document.getElementById("source");
  list = source.getElementsByTagName("li");
  var arr_list = new Array();
  for (var i = 0; i < list.length; i++) {
    arr_list[i] = list[i].textContent;
  }
  var data = new Array();
  for (var i = 0; i < arr_list.length; i++) {
    var colon_pos = arr_list[i].indexOf("：");
    var pos_city = colon_pos - 4;
    var pos_aqi = colon_pos + 1;
    data[i] = new Array();
    data[i][0] = arr_list[i].slice(0, pos_city);
    data[i][1] = arr_list[i].slice(pos_aqi);
  }

  /*
  data = [
    ["北京", 90],
    ["北京", 90]
    ……
  ]
  */

  return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  function sortNumber(a, b) {
    return a[1] - b[1];
  }
  data = data.sort(sortNumber);
  return data;

}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var number = new Array("一", "二",
    "三", "四",
    "五", "六",
    "七", "八");
  var ul_list = document.getElementById("source");
  var li_list = source.getElementsByTagName("li");
  for (var i = 0; i < li_list.length; i++) {
    li_list[i].textContent = "第" + number[i] + "名："
     + data[i][0] + " 空气质量：" + data[i][1]
  }
  /* 
      <li>第一名：北京空气质量：<b>90</b></li>
      <li>第二名：北京空气质量：<b>90</b></li>
      <li>第三名：北京空气质量：<b>90</b></li>
       */
}



function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
};

function init() {
  document.getElementById("sort-btn").onclick = function() {
    btnHandle();
    document.getElementById("sort-btn").onclick = function() {

    }
  }
}

init();