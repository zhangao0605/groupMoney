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
        window.location.href = "http://www.digvita.com/groupMoney/html/index.html?pid=" + serchUrl1 + "&openid=" + serchUrl
    })
    $("#navSecond").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/extension.html?pid=" + serchUrl1 + "&openid=" + serchUrl
    })
    $("#navSree").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/income.html?pid=" + serchUrl1 + "&openid=" + serchUrl
    })
    $("#navFour").click(function () {
        window.location.href = "http://www.digvita.com/groupMoney/html/about.html?pid=" + serchUrl1 + "&openid=" + serchUrl
    })


    $.ajax({
        url: 'http://www.digvita.com/tbk2/account/yesterday?pid='+serchUrl1,
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            $(".lastMoney").html(data.rec)
            $(".last1").html(data.mixClick);
            $(".last2").html(data.alipayNum);
            $(".last3").html(data.alipayRec)
            $(".last4").html(data.rec)
        }
    })

    $.ajax({
        url: 'http://www.digvita.com/tbk2/account/survey?pid='+serchUrl1,
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            console.log(data)
            $(".three1").html(data.click30Day);
            $(".three2").html(data.aliPay30Day);
            $(".three3").html(data.effectPrediction)
            $(".three4").html(data.estimatedRevenue)
        }
    })
})