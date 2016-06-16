/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/



// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}


/**
 * 渲染图表
 */
function renderChart() {



  var arrCity = Object.keys(chartData[pageState.nowSelectCity][
    [pageState.nowGraTime]
  ]);



  var wrap = document.getElementById("aqi-chart-wrap");
  var wdt = 1000;
  var hgt = 600;
  var wdtEach = 10;
  var num;

  var color = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "cyan",
    6: "blue",
    7: "purple"
  }

  var graPre = {
    day: {
      wdt: 1000,
      hgt: 600,
      wdtEach: 10
    },
    week: {
      wdt: 800,
      hgt: 800,
      wdtEach: 100
    },
    month: {
      wdt: 300,
      hgt: 300,
      wdtEach: 100
    }
  }
  var gra = {}

  switch (pageState.nowGraTime) {
    case "day":
      num = 91;
      gra = graPre.day;
      break;
    case "week":
      num = 14;
      gra = graPre.week;
      break;
    case "month":
      num = 3;
      gra = graPre.month;
      break;
  }


  var whichColor;
  var block;

  


    block = wrap.getContext("2d");
    block.beginPath();
    block.lineWidth = 3000;
    block.strokeStyle = "white";
    block.moveTo(0,0);
    block.lineTo(0,3000);
    block.stroke();

    //console.log(document.getElementById("aqi-chart-wrap").style.width,document.getElementById("aqi-chart-wrap").style.height);


  for (var i = 0; i < num; i++) {
    block = wrap.getContext("2d");
    block.beginPath();
    block.lineWidth = gra.wdtEach;
    whichColor = i % 7;
    block.strokeStyle = color[whichColor];
    block.moveTo(20 * i, gra.hgt);
    block.lineTo(20 * i, gra.hgt * (chartData[pageState.nowSelectCity][pageState.nowGraTime][arrCity[i]] / 500));
    block.stroke();
  }
  /*
  block = wrap.getContext("2d");
  block.beginPath();
  block.lineWidth = gra.wdtEach;
  whichColor = i % 7;
  block.strokeStyle = color[whichColor]; // 红色路径
  block.moveTo(20*i, 100);
  block.lineTo(250, 75);
  block.stroke(); // 进行绘制
  console.log(color[1]);
  */



  //var wrap = document.getElementById("aqi-chart-wrap");
  /*
  var ctx = wrap.getContext("2d");
  ctx.beginPath();
  ctx.lineWidth = "5";
  ctx.strokeStyle = "red"; // 红色路径
  ctx.moveTo(0, 75);
  ctx.lineTo(250, 75);
  ctx.stroke(); // 进行绘制

  ctx.beginPath();
  ctx.strokeStyle = "blue"; // 蓝色路径
  ctx.moveTo(50, 0);
  ctx.lineTo(150, 130);
  ctx.stroke(); // 进行绘制
  */



}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  x = event.target;
  if (x.value !== pageState.nowGraTime) {
    pageState.nowGraTime = x.value;
    renderChart();
  }
  // 设置对应数据
  return;

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  var slc = document.getElementById("city-select");
  for (var i = 0; i < slc.length; i++) {
    if (slc[i].selected) {
      pageState.nowSelectCity = slc[i].id;
      renderChart();
      return;
    }
  }
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var arrRadio = document.getElementsByName("gra-time");
  for (var i = 0; i < arrRadio.length; i++) {
    arrRadio[i].onclick = function() {
      graTimeChange();
    }
  }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var arrCity = Object.keys(aqiSourceData);
  var textCity;
  var btnCity;
  var citySelect = document.getElementById("city-select");
  for (var i = 0; i < arrCity.length; i++) {
    textCity = document.createTextNode(arrCity[i]);
    optionCity = document.createElement("option");
    optionCity.appendChild(textCity);
    optionCity.id = arrCity[i];
    citySelect.appendChild(optionCity);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = function() {
      citySelectChange();
    }
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //alert(ave([1,2,3,4], 4));

  function aveWeek(j) {
    var sum = 0;
    for (var k = 1; k < 8; k++) {
      sum += aqiSourceData[arrCity[i]][arrDay[-4 + 7 * j + k]];
    }
    return Math.ceil(sum / 7);
  }

  function aveMonth(start, end) {
    var sum = 0;
    for (var j = start; j < end + 1; j++) {
      sum += aqiSourceData[arrCity[i]][arrDay[j]];
    }
    return Math.ceil(sum / (end - start + 1));
  }

  var arrCity = Object.keys(aqiSourceData);
  var arrDay,
    weekOneSum = 0,
    weekLastSum = 0,
    monthOneSum = 0;
  for (var i = 0; i < arrCity.length; i++) {

    chartData[arrCity[i]] = new Object();
    chartData[arrCity[i]].day = new Object();

    chartData[arrCity[i]].week = new Object();
    chartData[arrCity[i]].month = new Object();
    chartData[arrCity[i]].day = aqiSourceData[arrCity[i]];

    arrDay = Object.keys(chartData[arrCity[i]].day);
    for (var j = 0; j < 3; j++) {
      weekOneSum += aqiSourceData[arrCity[i]][arrDay[j]];
    }
    chartData[arrCity[i]].week[0] = Math.ceil(weekOneSum / 3);
    for (var j = 1; j < Math.floor((arrDay.length - 3) / 7) + 1; j++) {
      chartData[arrCity[i]].week[j] = aveWeek(j);
    }
    for (var j = 0; j < 4; j++) {
      weekLastSum += aqiSourceData[arrCity[i]][arrDay[87 + j]];
    }
    chartData[arrCity[i]].week[13] = Math.ceil(weekLastSum / 4);
    chartData[arrCity[i]].month[0] = aveMonth(0, 30);
    chartData[arrCity[i]].month[1] = aveMonth(31, 59);
    chartData[arrCity[i]].month[2] = aveMonth(60, 90);
  }
  //console.log(arrCity[0], chartData[arrCity[0]]);
  //console.log(cou);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();