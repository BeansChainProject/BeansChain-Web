$(function() {
	MyGraph = new tableL();
	MyGraph.init();
});
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
console.log(getQueryVariable("blockNum"))
var tableL = function() {
	var instance = this;
	var tool = false;
	var page;
	var page_size;
	page_size = 10;
	var total;
	
	//初始化
	
	this.init = function() {
		page = 1;
		instance.tableList(page);
	}
	this.tableList = function(a){
		var info = {
			"pageNumber": a,
			"pageSize": page_size,
		};
		console.log(info)
		$.ajax({
            async: true,
            crossDomain: true,
            url: http +"/chb/api/home/allTransactionList",
            type:"post",
            contentType:"application/json",
    		dataType: 'json',
    		data:JSON.stringify(info),
            success:function(data){
                console.log(data);
                if(data && data.status =="ok"){
                	var html = '';
					var result = data['data']['rows'];
					if(result.length == 0){
						html += '<tr><td colspan="5">未获取到数据</td></tr>'
					}
					for(var i = 0; i < result.length;i++){
						html += '<tr><td><a href="transaction_details.html?hash='+result[i]['hash']+'&timestamp='+ result[i]['timestamp']+'">'+result[i]['hash']+'</a></td><td>'+result[i]['timestamp']+'</td><td>'+result[i]['blockNumber']+'</td><td>'+result[i]['transactionPrice']+'</td><td>'+result[i]['dishesNumer']+'</td></tr>'
					}
                	$('#tbody').html(html);
                	$('#tbody').find('tr').find('td').each(function(){
                		var tableHtml = $(this).html();
                		if(tableHtml == '' || tableHtml == 'null' || tableHtml == 'undefined'){
							$(this).html('-');
						}
                	})
                	var result1 = data.data.total;
					if(result1 < 1) return false;
//					var total = parseInt((result1 - 1) / page_size + 1);
//					$('#number').val(page);
//					instance.setPageBtn(page, total);
//					console.log(page, total)
                }else{
                	if( data['data'] == null){
						html += '<tr><td colspan="5">未获取到数据</td></tr>'
					}
                	$('#tbody').html(html);
                	if(data['message'] != ''){
                		layer.msg(data['message'])
                	}
                }
            },
            error:function(){
            }
        });
	}
	
	this.toPage = function(k) {
		page = k;
		$(document).scrollTop(0);
		instance.tableList(k);
	};
	this.setPageBtn = function (a,b) {
        console.log(a,b);
        var i,s;
        var info = '';
        var info1 = '';
        var info2 = '';
        var info3 = '';
        var info4 = '';
        if(a == 0) info1 = '<button type="button" ><a href="javascript:void(0)">上一页</a></button>';
        else  info1 = '<button type="button" ><a href="javascript:void(0)"onclick="MyGraph.toPage('+ (a - 1) + ')">上一页</a></button>';
        var t = 9;
        if(b <= t){
            s = 0;
            t = b;
            for(i = 0;i < t;++i){
                if(a == i)info += '<option><a href="javascript:void(0)" class="result-page-select">'+ (s + i + 1) +'</a></option>';
                else info += '<option><a href="javascript:void(0)"  onclick="MyGraph.toPage(' + (s + i) + ')">'+ (s + i + 1) +'</a></option>';
            }
        }
        else {
            if(a >= b - 4){
                a = 8 - (b - a) + 1;
                s = b - t;
            }
            else if(a >= 4 && a < b - 4){
                s = a - 4;
                a = 4;
            }
            else {
                s = 0;
            }
            for(i = 0;i < t;++i){
                if(a == i)info += '<option><a href="javascript:void(0)" class="result-page-select">'+ (s + i + 1) +'</a></option>';
                else info += '<option><a href="javascript:void(0)"  onclick="MyGraph.toPage(' + (s + i) + ')">'+ (s + i + 1) +'</a></option>';
            }
            info2 += '<select id="number">'+info+'</select>'
        }
        if((a + s) == (b - 1))info3 += '<button type="button"><a href="javascript:void(0)">下一页</a></button>';
        else  info3 += '<button type="button"><a href="javascript:void(0)" onclick="MyGraph.toPage('+ (a + s + 1) + ')">下一页</a></button>';
        info4 += '<select id="size"><option>10</option><option>20</option><option>50</option><option>100</option></select>'
        $('.table_right').html(info1 + info4 + info3);
        $('#size').val(page_size)
        $('#size').change(function(){
			page_size = $('#size').val();
			instance.tableList(page);
		})
        if(b == null||b == 0){
		    $('.table_right').html(" ");
		    return false;
		}
    }
}