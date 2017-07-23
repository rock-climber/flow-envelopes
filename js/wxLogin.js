function weixinLogin(){
	var redirect_uri = "项目地址";
	console.log(redirect_uri);
	window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=appid&redirect_uri= "+encodeURI(redirect_uri)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}
weixinLogin();