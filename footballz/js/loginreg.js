$(function() {
	reg("#reg_sub");
	login("#login");
	search("#search");
	hotspot(".bd-nav > a"); //首页发现接口
	hotOrAtt("header > a");//首页热点/关注
})

/**
 * 注册接口封装
 * @param {Object} $id	触发的btn的id
 */
function reg($id) {
	console.log("注册页面");
	$($id).on("click", function(e) {
		console.log("注册按钮");
		e.preventDefault();
		var uid = $("#reg_uid").val(),
			pwd = $("#reg_pwd").val(),
			nname = $("#reg_nname").val();
		$.ajax({
			url: "http://localhost:8080/Proxy/FootBall/user/json/reg.do",
			data: {
				"loginname": uid,
				"password": pwd,
				"nickname": nname
			},
			success: function(d) {
				console.info("注册返回", d);
			}
		});
	})
}

/**
 * 登陆接口的封装
 * @param {Object} $id	触发的btn的id
 */
function login($id) {
	console.log("登陆页面");
	$($id).on("click", function(e) {
		console.log("登陆按钮");
		e.preventDefault();
		var uid = $("#login_uid").val(),
			pwd = $("#login_pwd").val();
		$.ajax({
			url: "http://localhost:8080/Proxy/FootBall/user/json/login.do",
			data: {
				"loginname": uid,
				"password": pwd
			},
			success: function(d) {
				console.info("登陆返回", d);
			}
		});
		//查询用户信息		(net::ERR_CONNECTION_REFUSED--2016-03-18)
		/*$.ajax({
			type: "get",
			url: "http://localhost:80/FootBall/user/json/userinfo.do",
			async: true,
			data: {
				"id": "906"
			},
			success: function(d) {
				console.info("查询用户信息", d);
			}
		});*/
		//测试上传文件	(net::ERR_CONNECTION_REFUSED--2016-03-18)
		/*$.ajax({
			url: "http://localhost:80/FootBall/file/ json/upload/single.do",
			data: {
				"myfile": "../img/lili.png"
			},
			success: function(d) {
				console.info("上传头像", d);
			}
		});*/

	})
}

function search($id) {
	console.log("发现界面");
	$($id).on("click", function(e) {
		console.log("发现按钮");
		e.preventDefault();
		var nname = $(s_nname).val();
		$.ajax({
			url: "http://localhost:8080/Proxy/FootBall/user/json/queryall.do",
			data: {
				"keyword": nname,
				"loginsuserid": 906,
				"page.pageNo": 1
			},
			success: function(d) {
				console.info("search接口", d);
				console.info("userlist", JSON.parse(d).data.userlist);
			}
		});
	})
}

/**
 * 热点数据
 * @param {Object} $a	
 */
function hotspot($a) {
	$($a).each(function(i) {
		$(this).on("click", function(e) {
			e.preventDefault();
			console.info(i);
			$.ajax({
				url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
				async:true,
				data:{"category":i+1},
				success:function(d){
					console.info(d)
				}
			});
		});
	});
}
/**
 * 热点/关注切换
 * @param {Object} $hAnda
 */
function hotOrAtt($hAnda) {
	$($hAnda).each(function (i) {
		$(this).on("click",function (e) {
			e.preventDefault();
			if(i==0){//热点
				$(".bd-att").hide();
				$(".bd-hot").show();
			}else if(i==1){
				$(".bd-hot").hide();
				$(".bd-att").show();
			}
		});
	})
}