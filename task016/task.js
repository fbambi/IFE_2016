/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
//数据标识
var i = 0;
var city;
var aqi;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {


  /**
   * city&aqi 全局变量，方便renderAqiList()使用
   * 原来尝试在addAaiData()的return加city和aqi做接口（见本函数最后）
   * 但每次被调用的时候都会跑一遍，即addAqiData中的alert也会执行    
   * 如果您有更好的方法请告诉我:)
   */

  city = document.getElementById("aqi-city-input").value;
  aqi = document.getElementById("aqi-value-input").value;
  //带空格正则匹配
  var city_regexp_en = /^[\s]*[A-z]+[\s]*$/;
  var city_regexp_cn = /^[\s]*[\u4E00-\u9FA5]+[\s]*$/;
  var aqi_regexp = /^[\s]*[0-9]+[\s]*$/;
  //正则判断输入 city布尔值决定renderAqiList()是否执行
  if (!city_regexp_en.test(city) && !city_regexp_cn.test(city)) {
    alert("请输入正确的城市名");
    city = false;
  } else if (!aqi_regexp.test(aqi)) {
    alert("请输入正确的空气质量指数");
    city = false;
    //去空格
  } else {
    if (city_regexp_en.test(city)) {
      city = city.match(/[A-z]+/)[0];
    } else if (city_regexp_cn.test(city)) {
      city = city.match(/[\u4E00-\u9FA5]+/)[0];
    }
    aqi = aqi.match(/[0-9]+/)[0];
    //存储至aqiData
    aqiData[city] = aqi;

    //尝试的接口
    /*

    return{
      aqi:aqi,
      city:city
    }

    */
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  //数据输入不合格的情况下不执行函数
  if (city) {
    //监测表头
    if (!document.getElementById("tr_1")) {
      var tabl = document.getElementById("aqi-table");
      var tr_head = document.createElement("tr");
      var head_city = document.createElement("td");
      var head_aqi = document.createElement("td");
      var head_operate = document.createElement("td");
      var text_head_city = document.createTextNode("城市");
      var text_head_aqi = document.createTextNode("空气质量");
      var text_head_operate = document.createTextNode("操作");
      head_city.appendChild(text_head_city);
      head_aqi.appendChild(text_head_aqi);
      head_operate.appendChild(text_head_operate);
      tr_head.appendChild(head_city);
      tr_head.appendChild(head_aqi);
      tr_head.appendChild(head_operate);
      tabl.appendChild(tr_head);
      tr_head.id = "tr_1";
    }
    //检测同名城市
    if (document.getElementById(city)) {
      alert("您已输入该城市数据，请更换新的城市！");
    } else {
      var arr_aqiData = Object.keys(aqiData);
      var tabl = document.getElementById("aqi-table");
      var tr_new = document.createElement("tr");
      var td_city = document.createElement("td");
      var td_aqi = document.createElement("td");
      var td_delete = document.createElement("td");
      var btn_delete = document.createElement("button");
      var text_delete = document.createTextNode("删除");
      var text_city = document.createTextNode(arr_aqiData[arr_aqiData.length - 1]);
      var text_aqi = document.createTextNode(aqiData[city]);

      td_city.appendChild(text_city);
      td_aqi.appendChild(text_aqi);
      btn_delete.appendChild(text_delete);
      td_delete.appendChild(btn_delete);
      tr_new.appendChild(td_city);
      tr_new.appendChild(td_aqi);
      tr_new.appendChild(td_delete);
      tabl.appendChild(tr_new);
      td_city.id = city;
      td_aqi.id = aqi;
      //tr加ID，方便后期删除
      tr_new.id = i + "th.tr";
      btn_delete.id = i;
      i = i + 1;
      //成功输入数据即清空
      document.getElementById("aqi-city-input").value = "";
      document.getElementById("aqi-value-input").value = "";
      //删除按钮绑定delBtnHandle()
      btn_delete.onclick = function() {
        delBtnHandle();
      }
    }
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  //获取冒泡按钮
  var x = event.target.id + "th.tr";
  var tr_delete = document.getElementById(x);
  //删除记录
  document.getElementById("aqi-table").removeChild(tr_delete);
  var city_delete = tr_delete.childNodes[0].id;
  //从对象中删除
  delete aqiData[city_delete];
  arr_aqiData = Object.keys(aqiData);
  //if对象为空then删除表头
  if (arr_aqiData.length == 0) {
    document.getElementById("aqi-table").removeChild(document.getElementById("tr_1"));
  }


}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick = function() {
      addBtnHandle();
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementsByTagName("button").onclick = function() {
    delBtnHandle();
  }

}

init();