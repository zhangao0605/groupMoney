$(function () {
    //
    // $(".clickAl").click(function () {
    //     var timestamp = $("#timestamp").val();//时间戳
    //     var nonceStr = $("#noncestr").val();//随机串
    //     var signature = $("#signature").val();//签名
    //
    //     wx.config({
    //         debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId : 'wx112d2c20ada8b089', // 必填，公众号的唯一标识
    //         timestamp : timestamp, // 必填，生成签名的时间戳
    //         nonceStr : nonceStr, // 必填，生成签名的随机串
    //         signature : signature,// 必填，签名，见附录1
    //         jsApiList : [ 'scanQRCode','onMenuShareAppMessage','onMenuShareTimeline' ]
    //         // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    //
    //     wx.ready(function(){
    //         // wx.hideOptionMenu();
    //         wx.onMenuShareTimeline({
    //             title: '这是一个测试的标题--程高伟的博客',
    //             link: 'http://blog.csdn.net/frankcheng5143',
    //             imgUrl: 'http://avatar.csdn.net/E/B/6/1_frankcheng5143.jpg',
    //             success: function () {
    //                 // 用户确认分享后执行的回调函数
    //                 alert('分享到朋友圈成功');
    //             },
    //             cancel: function () {
    //                 // 用户取消分享后执行的回调函数
    //                 alert('你没有分享到朋友圈');
    //             }
    //         });
    //         wx.onMenuShareAppMessage({
    //             title: '这是一个测试的标题--百度',
    //             desc: '这个是要分享内容的一些描述--百度一下，你就知道',
    //             link: 'http://www.baidu.com',
    //             imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
    //             trigger: function (res) {
    //                 // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
    //             },
    //             success: function (res) {
    //                 alert('分享给朋友成功');
    //             },
    //             cancel: function (res) {
    //                 alert('你没有分享给朋友');
    //             },
    //             fail: function (res) {
    //                 alert(JSON.stringify(res));
    //             }
    //         });
    //     });
    // $.ajax({
    //     method: "GET",
    //     url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx112d2c20ada8b089&redirect_uri=http://www.digvita.com/taobaoke/html/extension.html&response_type=code&scope=snsapi_bas\n" +
    //     "e&state=123#wechat_redirect ",
    //     dataType:"jsonp",
    //     success: function (data) {
    //         console.log(data)
    //     },
    //     error: function () {
    //         console.log("error")
    //     }
    // });
    // })
    // $("#returnLast").click(function () {
    //     window.history.go(-1)
    // })
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var myurl = GetQueryString("url");
    if (myurl != null && myurl.toString().length > 1) {
        // alert(GetQueryString("url"));
    }

    var serchUrl = GetQueryString("openid")
    var serchUrl1 = GetQueryString("pid")
    var item_id = GetQueryString("item_id")
    // console.log(serchUrl,serchUrl1,item_id)
    $.ajax({
        url: 'http://www.digvita.com/tbk2/goods/detail?item_id=' + item_id + '&pid=' + serchUrl1,
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
	if(data.itemImgList==''){
var Items=[]
}else{
 var Items=$.parseJSON( data.itemImgList );
}
       

            var sayPrice=''
            if(data.coupon_denomination=="无"){
                sayPrice="专柜价"
            }else {
                sayPrice="劵后价"
            }

        
            var htmlNum = '<div class="imagesLag">\n' +
     '  <a name="toTop1" id="toTop1"></a>\n'+
                '            <img src=' + data.item_main_pic + '\n' +
                '                 alt="">\n' +
                '        </div>\n' +
                '        <div class="shopCon">\n' +
                '             ' + data.item_name + '\n' +
                '        </div>\n' +
                '        <div class="lastPrice">\n' +
                '            <div class="lastPrice1">劵后价</div>\n' +
                '            <div class="lastPrice2">￥<span>' + data.pcp + '</span></div>\n' +
                '        </div>\n' +
                '        <div class="nowPrice">\n' +
                '            <div class="nowPrice1"><span class="nowPrice1fir">原价</span> <span class="nowPrice3">￥' + data.item_price + '</span></div>\n' +
                '            <div class="nowPrice2">已售<span class="nowPrice4">' + data.sales_volume
                + '</span>件</div>\n' +
                '        </div>\n' +
                '        <div class="getMoney">\n' +
                '            <div class="getMoney1">\n' +
                '                <img src="../images/coupon.png" alt="">\n' +
                '                <div class="getMoney1one">优惠券<span class="changeClorl">\n' +
                '                </div>\n' +
                '                <div class="getMoney1two">' + data.coupon_denomination + '</div>\n' +
                '            </div>\n' +
                '            <div class="getMoney1 getMoney2">\n' +
                '                <img src="../images/money.png" alt="" style="height:23px;width: 23px">\n' +
                '                <div class="getMoney1one">佣金\n' +
                '                </div>\n' +
                '                <div class="getMoney1two"><span class="getIn">￥' + data.commission + '</span></div>\n' +
                '            </div>\n' +     
                '        </div>\n' +
                '            <div class="lastPriceOneGo" id="fgfg"><span id="fuckT">查看商品详情</span></div>\n' + 
                '            <div class="moreImg">\n' +
               // '<img  class="moreImgAll" src="../images/TB1wON8cNsIL1JjSZFqXXceCpXa_!!0-item_pic%20(1).jpg">\n'+
                '            </div>\n' +
                '        <div id="trueMsg">\n' +
                '            <div id="trueClose">\n' +
                '                <img src="../images/close.png">\n' +
                '            </div>\n' +
                '            <div class="trueTitle">\n' +
                '                推广信息\n' +
                '            </div>\n' +
                '            <div id="textCon">\n' +
                '            <textarea id="textCon1" readonly="readonly" cols="40" rows="3" style="background-color: transparent">\n' +
               "" + data.item_name + "\n" +
                ""+sayPrice+"【" + data.pcp + "】元\n" +
                "月销售【" + data.sales_volume + "】件\n" +
                " -----------------\n" +
                "商品详情链接：" + data.tbk_short_url + "\n" +
                " -----------------\n" +
                "复制这条信息," + data.tbk_token + ",打开【手机淘宝】即可查看\n" +
                '            </textarea>\n' +
                '            </div>\n' +
                '            <div class="truePrice">\n' +
                '               ' + data.pcp + '<span class="ucc">劵后</span>\n' +
                '            </div>\n' +
                '            <div class="trueSay">\n' +
                '                在点击一键复制后,将信息<br><br>\n' +
                '                分享到群或朋友圈\n' +
                '            </div>\n' +
                '            <button class="trueButton" onclick="select_all_and_copy(document.getElementById(\'textCon1\'))">一键复制</button>\n' +
                '        </div>'
            var price = data.item_price
            // htmlNum += ""
            $(".conAll").html(htmlNum)
            if (data.coupon_denomination == "无") {
                $(".nowPrice1fir").css("display", "none");
                $(".nowPrice3").css("display", "none");
                $(".ucc").css("display", "none");
                $(".lastPrice1").html("专柜价");
            }


            $(".nav").click(function () {
                $("#trueMsg").show();
                $("#mengBan").show();


            });
            $(document).on('click', '#trueClose', function () {
                $("#trueMsg").hide();
                $("#mengBan").hide();
            });
            $(document).on('click', '.trueButton', function () {
                $(this).css("background", "#FF5000")
                $(this).html("复制成功")
            })


 $(document).on('click', '#fuckT', function () {

                //var myscrollTop = $(this).scrollTop()
                // console.log($(this).prop("scrollHeight"))
                //var myscrollHeight = $(this).prop("scrollHeight")
                // console.log($(this).height())
                //var myheight = $(this).height()
               // if (myheight + myscrollTop >= myscrollHeight) {
                    $(".load").show()
                    setTimeout(function () {
                        var ll=''
                        if(Items.length==0){
                            $(".moreImg").html("无图片详情").css({"text-align":"center","font-size":"14px","color":"#FF5000"})

                        }else{
                            for (var i=0;i<Items.length;i++){
                                ll+='<img class="moreImgAll" src='+Items[i].ItemImg+'>'
                            }
                            $(".moreImg").html(ll)
                        }
                        $(".load").hide()
                    }, 1000)
               

            })

        }
    });



});
// $(".nav").click(function () {
//     $(".nav").html("复制成功").css("background", "#b6dfdd");
//
// })
