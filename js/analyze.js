$(function() {
	var block_ul = $("#block-ul");
	var transaction_ul = $("#transaction-ul");
	var picture_box_left = $("#picture-box-left");
	var myChart = echarts.init(document.getElementById("picture-box-right"));
	//右上图表
	$.ajax({
		type: "GET",
		url: http + "/chb/api/chart/data", //接口服务器地址
		dataType: "JSON",
		data: {},
		success: function(result) {
			if(result.status == "ok") {
				var data = result.data;
				var option = {
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
		url: http + "/chb/api/home/countData", //接口服务器地址
		dataType: "JSON",
		data: {},
		success: function(result) {
			if(result.status == "ok") {
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
					"区块高度" +
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
	$.ajax({
		async: true,
		crossDomain: true,
		url: http + "/chb/api/detail/hotDishes",
		type: "post",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify({
			"pageNumber": 1,
			"pageSize": 100,
		}),
		success: function(data) {
			console.log(data);
			if(data && data.status == "ok") {
				for(var i=0; i < data.data.length;i++){
					$('#block-ul').append('<li class="block-list"><div class="list_left">'+data.data[i].dishName+'</div><div class="list_right">'+data.data[i].saleNum+'</div></li>');
					/*$('#transaction-ul').append('<li class="block-list"><div class="list_left">'+data.data[i].dishName+'</div><div class="list_right">'+data.data[i].ceilPrice+'</div></li>');*/
				}
			}
		},
		error: function() {}
	});
})