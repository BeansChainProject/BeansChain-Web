$(function() {
  var block_ul = $("#block-ul");
  var transaction_ul = $("#transaction-ul");
  var picture_box_left = $("#picture-box-left");
  var myChart = echarts.init(document.getElementById("picture-box-right"));
  var blockNums = [];
  //右上图表
  $.ajax({
    type: "GET",
    url: http +"/chb/api/chart/data", //接口服务器地址
    dataType: "JSON",
    data: {},
    success: function(result) {
      if (result.status == "ok") {
        var data = result.data;
        var option = {
          tooltip : {
        	trigger: 'axis',
        	axisPointer: {
        	   type: 'cross',
        	   label: {
        	       backgroundColor: '#6a7985'
        	   }
        	}
          },
          xAxis: {
            type: 'category',
            data: data.xData,
            axisLabel: {
              interval: 0, //横轴信息全部显示
              rotate: -20, //-30度角倾斜显示
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: data.yData,
            type: 'line',
            smooth: true
          }],

        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {       
          myChart.resize();                
        });
      }
    },
    error: function(data) {
      alert(error);
    }
  });
  //左上图表
  $.ajax({
    type: "GET",
    url: http +"/chb/api/home/countData", //接口服务器地址
    dataType: "JSON",
    data: {},
    success: function(result) {
      if (result.status == "ok") {
        var data = result.data;
        picture_box_left.append(
          "<div class='picture-box-left-databox'>" +
          "<span class='detailed-data'>" +
          "<div class='detailed-data-member' >" +
          "<img src='img/圆.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member'><span class='picture-num'>" + data.dishesNumber + "</span></br>" +
          "菜品总数" +
          "</div>" +
          "</span>" +
          "<span class='detailed-data'>" +
          "<div class='detailed-data-member' >" +
          "<img src='img/圆.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member'><span class='picture-num'>" + data.blockNumber + "</span></br>" +
          "块的高度" +
          "</div>" +
          "</span>" +
          "<span class='detailed-data'>" +
          "<div class='detailed-data-member' >" +
          "<img src='img/圆.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member'><span class='picture-num'>" + data.dishesPrice + "</span></br>" +
          "菜品均价" +
          "</div>" +
          "</span>" +
          "<span class='detailed-data'>" +
          "<div class='detailed-data-member' >" +
          "<img src='img/圆.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member'><span class='picture-num'>" + data.amount + "</span></br>" +
          "交易金额" +
          "</div>" +
          "</span>" +
          "</div>" +
          "<div class='picture-box-left-databox-right'>" +
          "<span class='detailed-data-right'>" +
          "<div class='detailed-data-member-right' >" +
          "<img src='img/五角星-订单总数.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member-right'><span class='picture-num picture-number'>" + data.totalOrder + "</span>" +
          "<h5 style=' margin-top:0px;'>订单总数</h5>" +
          "</div>" +
          "</span>" +
          "<span class='detailed-data-right'>" +
          "<div class='detailed-data-member-right' >" +
          "<img src='img/五角星-订单总价.png' alt=''>" +
          "</div>" +
          "<div class='detailed-data-member-right'><span class='picture-num picture-number'>" + data.totalOrderPrice + "</span>" +
          "<h5 style=' margin-top:0px;'>订单总价</h5>" +
          "</div>" +
          "</span>" +
          "</div>"
        );

      }
    },
    error: function(data) {
      alert(error);
    }
  });
  //左下图表(包含右下图表)
  var info = {
			"pageNumber": 1,
			"pageSize": 10,
		};
  $.ajax({
    type: 'POST',
    url: http +"/chb/api/home/blockList",
    contentType:"application/json",
	dataType: 'json',
	data:JSON.stringify(info),
    success: function(result) {
		console.log(result)
      if (result.status == "ok") {
		  var blockNumStr = "";
		  for(var i in result.data.rows){
			  var blockInfo  = result.data.rows[i];
			  if(blockInfo.transactions_size > 0){
				  blockNums.push(blockInfo.number)
			  }
		  }
		 blockNumStr = blockNums.join(",");
		//右下图表
         $.ajax({
           type: 'GET',
           url: http +"/chb/api/home/transactionList",
           data: {
             blockNums: blockNumStr,
           }, //请求数据s
           dataType: 'JSON',
           success: function(s) {
             if (s.status == "ok") {
           	  console.log(s.data.rows)
               $.each(s.data.rows, function(indexs, value) {
                 transaction_ul.append(
                   "<a href='transaction_details.html?hash="+ value.hash + "&timestamp="+ value.timestamp+"'><li class='transaction-list'>" +
                   "<h4 class='transaction-data'>TX# " + value.hash + "</h4>" +
                   "<h5 class='transaction-data'>订单价格 " + value.transactionPrice + "元</h5>" +
                   "<h5 class='transaction-data'>" + value.timestamp + "</h5>" +
                   "</li></a>"
                 );
               });
             }
           },
         });
         
        $.each(result.data.rows, function(index, data) {
          block_ul.append(
            "<a href='block_details.html?blockNum="+ data.number +"'><li class='block-list'>" +
            "<span class='block-num'>" +
            "<span>" +
            "<img src='img/icon-qukuai-底图.png' alt=''>" +
            "</span>" +
            "<span class='block-number'>NO." + data.number + "</span>" +
            "</span>" +
            "<span class='block-data'>" +
            "<h4>共" + data.transactions_size + "单交易</h4>" +
            "<h5 class='time'>" + data.day + "</h5>" +
            "<h5 class='time'>" + data.hour + "</h5>" +
            "</span>" +
            "</li></a>"
          );

        });
      }
    }
  });
})