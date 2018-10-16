$(function () {
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var myurl=GetQueryString("url");
    if(myurl !=null && myurl.toString().length>1)
    {
        // alert(GetQueryString("url"));
    }

    var serchUrl = GetQueryString("openid")
    var serchUrl1 = GetQueryString("pid")

    $("#navFirst").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/index.html?pid=" + serchUrl1+"&openid="+serchUrl
    })
    $("#navSecond").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/extension.html?pid=" + serchUrl1+"&openid="+serchUrl
    })
    $("#navSree").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/income.html?pid=" + serchUrl1+"&openid="+serchUrl
    })
    $("#navFour").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/about.html?pid=" + serchUrl1+"&openid="+serchUrl
    })

})