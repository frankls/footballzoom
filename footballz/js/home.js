window.onload = function() {
	setHomeListTop();
	waterfall("hotlist", "li");
	var scr = new iScroll("i_scroll_hot", {
		"scrollBars": true
	});
	scr.refresh();
}

function waterfall(parent, tag) {
	//将main下的所有class为box的元素出来

	var oParent = document.getElementById(parent);
	var oLis = oParent.getElementsByTagName(tag);
	var hArr = []; //存放每一列高度
	for (var i = 0; i < oLis.length; i++) {
		if (i < 2) {
			hArr.push(oLis[i].offsetHeight + 5); //父元素的border
		} else {
			var minH = Math.min.apply(null, hArr);
			var index = getMinhIndex(hArr, minH);
			oLis[i].style.position = "absolute";
			oLis[i].style.top = minH + "px";
			oLis[i].style.left = oLis[index].offsetLeft + "px";
			hArr[index] += oLis[i].offsetHeight;
		}
	}
	
}

function getMinhIndex(arr, val) {
	for (var i in arr) {
		if (arr[i] == val) {
			return i;
		}
	}
}

function setHomeListTop() {
	var height,
		ohomeList = document.getElementById("hotlist"),
		oUl = document.getElementById("i_scroll_hot"),
		oFtr = document.getElementById("ftr");
	height = oFtr.offsetTop - oUl.offsetTop;
	oUl.style.height = height + "px";
	var oLiLast = $("#hotlist li:last-child");
	document.getElementById("hotlist").style.height = oLiLast.offset().top+oLiLast.height()+"px";
	console.log(oLiLast.offset().top+oLiLast.height());

}