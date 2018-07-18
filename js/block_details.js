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
$('#transaction').html(getQueryVariable("blockNum"))
var tableL = function() {
	
	var instance = this;
	
	//初始化
	this.init = function() {
		page = 1;
		instance.tableList(page);
		$('#transaction').html(getQueryVariable("blockNum"))
	}
	this.tableList = function(a){
		$.ajax({
            async: true,
            crossDomain: true,
            url: http +"/chb/api/detail/block?blockNum="+ getQueryVariable("blockNum"),
            type:"get",
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data && data.status =="ok"){
					var result = data['data'];
					var html = '';
					if(result == null){
						html += '<tr><td colspan="3">未获取到数据</td></tr>'
					}else{
						html = '<tr><td>高度</td><td colspan="2">'+result['number']+'</td></tr><tr><td>时间</td><td colspan="2">'+result['timestamp']+'</td></tr><tr><td>包含Tx数目</td><td colspan="2">'+result['transactions_size']+'</td></tr><tr><td>hash</td><td colspan="2">'+result['hash']+'</td></tr><tr><td>父hash</td><td colspan="2">'+result['parentHash']+'</td></tr><tr><td>字节</td><td colspan="2">'+result['size']+'</td></tr><tr><td>订单总价</td><td colspan="2">'+result['blockAmount']+'</td></tr><tr><td>订单均价</td><td colspan="2">'+result['blockPerAmount']+'</td></tr><tr><td>菜品数量</td><td colspan="2">'+result['dishesCount']+'</td></tr>'
					}
                	$('#tbody').html(html);
                	$('#tbody').find('tr').find('td').each(function(){
                		var tableHtml = $(this).html();
                		if(tableHtml == '' || tableHtml == 'null' || tableHtml == 'undefined'){
							$(this).html('-');
						}
                	})
                }else{
                	if( data['data'] == null){
						html += '<tr><td colspan="3">未获取到数据</td></tr>'
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
	
}