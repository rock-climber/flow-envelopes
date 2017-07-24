
$(function(){
	
	function GetQueryString(name){	
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return unescape(r[2]); return null;
	}
	
	var myId=GetQueryString("id");
	if(myId !=null && myId.toString().length>1)
	{
		var openId = GetQueryString("id");
		transferId(openId)
	}
	/*
	 *第一次传送openid到后台
	 * */
	function transferId(openId){
		var data = {
			"openId":openId
		}
		$.ajax({
			type:'post',
			url:'http://server/api/focusWechat.do',
			data:data,		
			success:function(data){
				openId = data.openId
			},
			error:function(msg){
				
			}
		})
	}
	
	/*
	 *邀请好友
	 * wx.onMenuShareAppMessage调用的微信接口
	 * */
	$(".invite").off("click").on("click",function(){
		wx.onMenuShareAppMessage({

		    title: '', // 分享标题
		
		    desc: '', // 分享描述
		
		    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		
		    imgUrl: '', // 分享图标
		
		    type: '', // 分享类型,music、video或link，不填默认为link
		
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	
		    success: function () { 
		
		        // 用户确认分享后执行的回调函数
		        num++;
				 transferBackstage(num)
		    },
		
		    cancel: function () { 
		
		        // 用户取消分享后执行的回调函数
		
		    }
		})
	})
	/*
	 *邀请好友
	 * 成功后将num传给后台
	 * */
	function transferBackstage(){
		var url='http://server/api/inviteFriends.do'
		var data = {
			"openId":openId,
			"num":num
		};
		$.post(url,data,function(request){
			
		})
			
	}
		
	/*
	 *兑换记录
	 * */
	$.ajax({
		type:'post',
		url:'http://server/api/exchangeRecord.do',
		data:{
			"openId":openId,
		},
		success:function(data){
			var allData = data.result;
			for(var i=0;i<data.result.length;i++){
				$(".excFlow").append('<li><div class="excLeft"><span>兑换流量</span><span class="completeFlow">'+data.result[i].size+'MB</span>'
				+'</div><div class="excRight"><span>'+data.result[i].time+'</span></div></li>')
			}
		},
		error:function(msg){
			
		}
	})
	
	//清除“数字”以外的字符
	$("#phone").on("input",function(){		
		this.value = this.value.replace(/[^\d]/g,"");  
	})

	$("#phone").on("blur",function(){
		if(this.value.trim() == ""){
			$(this).val("手机号不能为空")
			$(this).css({"color":"red"})
			$(this).animate({textIndent:"0.3rem"},200,function(){
				$(this).animate({textIndent:"0rem"},200,function(){
					$(this).animate({textIndent:"0.3rem"},200,function(){
						$(this).animate({textIndent:"0rem"},200,function(){
							$(this).animate({textIndent:"0.3rem"},200,function(){
								$(this).animate({textIndent:"0rem"},200,function(){
									$(this).val("")
									$(this).css({"color":"#666666"})
								})
							})
						})
						
					})
				})
				
			})
			$(this).focus()
		}
	})
	/*
	 *验证手机号
	 * */
	function isPhoneNo(phone) { 
	 var pattern = /^1[34578]\d{9}$/; 
	 return pattern.test(phone); 
	}
	/*
	 *选取兑换的流量
	 * */
	var size =null;
	$(".selectFlow li").off("click").on("click",function(){
		size = $(this).children("input").val()
	})
	var phone = $("#phone").val();
	$("#sure").off("click").on("click",function(){
		if($("#phone").val().trim() == ""){
			$("#phone").val("手机号不能为空")
			$("#phone").css({"color":"red"})
			$("#phone").animate({textIndent:"0.3rem"},200,function(){
				$("#phone").animate({textIndent:"0rem"},200,function(){
					$("#phone").animate({textIndent:"0.3rem"},200,function(){
						$("#phone").animate({textIndent:"0rem"},200,function(){
							$("#phone").animate({textIndent:"0.3rem"},200,function(){
								$("#phone").animate({textIndent:"0rem"},200,function(){
									$("#phone").val("")
									$("#phone").css({"color":"#666666"})
								})
							})
						})
						
					})
				})
				
			})
			$(this).focus()
		}else if(isPhoneNo($("#phone").val()) == false){
			
			$("#phone").val("请输入正确手机号")
			$("#phone").css({"color":"red"})
			$("#phone").animate({textIndent:"0.3rem"},200,function(){
				$("#phone").animate({textIndent:"0rem"},200,function(){
					$("#phone").animate({textIndent:"0.3rem"},200,function(){
						$("#phone").animate({textIndent:"0rem"},200,function(){
							$("#phone").animate({textIndent:"0.3rem"},200,function(){
								$("#phone").animate({textIndent:"0rem"},200,function(){
									$("#phone").val("")
									$("#phone").css({"color":"#666666"})
								})
							})
						})
						
					})
				})
				
			})
			$(this).focus()
		}else if(size == null){
			alert("请选择兑换数量")
		}else{
			var data = {
				"phone":phone,
				"size":size,
				"openId":openId,
			};
			
			/*
			 *兑换流量
			 * */
			$.ajax({
				type:'post',
				url:'http://server/api/exchangeFlow.do',				
				data:data,
				success:function(data){
					console.log(data)
				},
				error:function(msg){
					console.log(msg)
				}
			})
		}
		
	})
	
	/*
	 *未兑换流量的大小
	 * */
	$.ajax({
		type:'post',
		url:'http://server/api/canExchangeFlow.do',				
		data:{
			"openId":openId
		},
		success:function(data){
			console.log(data)
			$(".remainder").val(data.result);
		},
		error:function(msg){
			console.log(msg)
		}
	})
})
