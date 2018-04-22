function login(_this){
	var keyVal = $(".key").val()
	if(keyVal === ''){
		alert("密码不能为空")
		return
	}
	$.ajax({
		url: projectName + '/login',
		type: 'POST',
		dataType: 'json',
		data: {key: $(".key").val()},
	})
	.done(function(result) {
		if(result.flag){
			window.location.href = projectName + '/newAct'
		}
		else
		{
			alert(result.message)
		}
	})
	.fail(function() {
		alert("服务器连接失败")
	})
	
}