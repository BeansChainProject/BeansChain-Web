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
console.log(getQueryVariable("timestamp"))
$('#transaction').html(getQueryVariable("hash"))
var tableL = function() {
	
	var instance = this;
	
	//初始化
	this.init = function() {
		page = 1;
		instance.tableList(page);
		$('#transaction').html(getQueryVariable("hash"))
	}
	this.tableList = function(a){
		$.ajax({
            async: true,
            crossDomain: true,
            url: http +"/chb/api/detail/transaction?hash="+getQueryVariable("hash"),
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
					result.timestamp = getQueryVariable("timestamp").replace("%20"," ");
					console.log(result)
					var html = '';
					if( data['data'] == null){
						html += '<tr><td colspan="5">未获取到数据</td></tr>'
					}else{
						html = '<tr><td>交易hash</td><td colspan="2">'+result['hash']+'</td></tr><tr><td>状态</td><td colspan="2">'+result['status']+'</td></tr><tr><td>区块号</td><td colspan="2"><a href="block_details.html?blockNum='+result['blockNumber']+'">'+result['blockNumber']+'</a></td></tr><tr><td>时间</td><td colspan="2">'+result['timestamp']+'</td></tr><tr><td>订单价格</td><td colspan="2">'+result['transactionPrice']+'</td></tr><tr><td>菜品总数</td><td colspan="2">'+result['dishesNumer']+'</td></tr><tr><td>输入数据</td><td colspan="2">'+result['input']+'</td></tr>'
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
	
}