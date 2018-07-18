var http = '';
$(function(){
	//底部
	$.ajax({
		url: 'nav.html',
		type: 'get',
		cache:true,
		dataType: 'html',
		success: function(data) {
			$(".navbar").html(data);
		}
	});
}) 
