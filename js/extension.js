$(function () {
    var tagId = 901;

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var myurl = GetQueryString("url");
    if (myurl != null && myurl.toString().length > 1) {
    }
    var serchUrl = GetQueryString("openid")
    var serchUrl1 = GetQueryString("pid")
    var callbackAll = ''
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
    var pageNum = 0;

    var dangers = ''
    var wuxianJia = 0


    $.ajax({
        url: 'http://www.digvita.com/tbk2/goods/list?pid=' + serchUrl1 + '&num=' + pageNum + '&tag_id=901',
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            var thisValues = ''
            console.log(data)
            callbackAll = data
            thisValues = data
            var pp = ""
            for (var i = 0; i < data.length; i++) {
                pp += "  <div class=\"conList\" >\n" +
                    "<div class=\"gogo\"value=" + data[i].item_id + ">\n" +
                    "                <img class=\"conImg\"\n" +
                    "                     src=" + data[i].item_main_pic + ">\n" +
                    "                <div class=\"conFirstLine\">\n" +
                    "                    <span class=\"conTitleSpan\">" + data[i].item_name + "</span>\n" +
                    "                </div>\n" +
                    "                <div class=\"conSecondLine\">\n" +
                    "                    <div class=\"secondLineFirst\" >\n" +
                    "                        <span class=\'zhuangui\'>专柜价</span>：<span id=\"secondLineFirst\" class=\'biubiu\'>￥" + data[i].item_price + "</span>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"secondLineSecond\">\n" +

                    "                        销量：<span>" + data[i].sales_volume + "</span>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"conFourLine\">\n" +
                    "                    <div class=\"secondLineFirst\">\n" +
                    "                       <span class=\'juanhou\'>劵后价</span><span class=\'juanhou1\'>：</span><span class='priLast'>￥" + data[i].pcp + "</span>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"getMoney\">\n" +
                    "                        &nbsp;佣金￥ <span>" + data[i].commission + "</span>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "\n" +
                    "            </div>\n" +
                    "                <div class=\"conThreeLine\">\n" +
                    "                    <img class=\"conThreeImg\" value=" + data[i].item_id + " data=" + i + " src=\"../images/good.png\"><span class=\"goodsNum\" data=" + i + ">" + data[i].count + "</span>\n" +
                    "<div class=\"conThreeImgAll\">\n" +
                    "</div>\n" +
                    "                </div>\n" +
                    "            </div>"

            }
            $(".shopList").html(pp)


            //渲染点赞人的头像
            for (var i = 0; i < data.length; i++) {
                if (data[i].coupon_denomination == "无" && data[i].item_price == data[i].pcp) {
                    $(".juanhou:eq(" + i + ")").css("display", "none")
                    $(".juanhou1:eq(" + i + ")").css("display", "none")
                    $(".priLast:eq(" + i + ")").css("display", "none")
                    $("#secondLineFirst:eq(" + i + ")").css("font-size", "15px")

                } else {
                    if (data[i].coupon_denomination != "无") {
                        $(".biubiu:eq(" + i + ")").css("text-decoration", "line-through")
                    }
                }


                var m = ''
                if (data[i].headimgurl.length == 0) {
                    continue
                } else {
                    for (var k1 = 0; k1 < data[i].headimgurl.length; k1++) {
                        if (k1 <= 6) {
                            m += ' <img class=\"conThreeImg1 no1\" value=' + k1 + '  src=' + data[i].headimgurl[k1] + '>'
                        }
                    }
                }

                if (data[i].praise == 1) {
                    $(".conThreeImg:eq(" + i + ")").attr("src", "../images/good-on.png")
                }
                $(".conThreeImgAll:eq(" + i + ")").html(m)
            }
            //点击商品进入商品详情页面，携带商品信息，pid ，openid
            $(".gogo").click(function () {
                var updata = $(this).attr("value");
                window.location.href = 'share.html?item_id=' + updata + '&pid=' + serchUrl1 + '&openid=' + serchUrl
            })
            $(document).on('touchstart', '.conThreeImg', function (e) {
                e.preventDefault();
                    var updata = $(this).attr("value");
                    var myData = $(this).attr("data");
                    if (thisValues[myData].praise == 1) {
                        return
                    }
                    else {
                        $(this).attr("data","1000000")
                        $(this).attr("src", "../images/good-on.png")
                        $.ajax({
                            url: 'http://www.digvita.com/tbk2/goods/thumb',
                            dataType: 'json',
                            data: {
                                item_id: updata,
                                pid: serchUrl1
                            },
                            type: 'POST',
                            success: function (data) {
                                var datas = data.data
                                if (thisValues[myData].headimgurl.length <= 6) {
                                    console.log(datas.tcnt)
                                    $(".goodsNum:eq(" + myData + ")").html(datas.tcnt);
                                    //点击一次头像渲染一次
                                    m = ' <img class=\"conThreeImg1 no1\" src=' + datas.headimgurl[0] + '>'
                                    $(".conThreeImgAll:eq(" + myData + ")").append(m)
                                    thisValues[myData].praise = 1
                                }
                                else {
                                    $(".goodsNum:eq(" + myData + ")").html(datas.tcnt);
                                    thisValues[myData].praise = 1
                                }

                            },
                            error: function (data) {
                            }
                        });
                    }


            })
        }
    })


    var thisValues1 = ''
    //点击切换请求数据
    $(".table-click ul li").click(function () {
        wuxianJia = 0
        var pp = $(".table-click ul li").index(this)
        $(this).css("color", "#4787c5").siblings().css('color', "grey");
        tagId = $(this).attr("data");
        $.ajax({
            url: 'http://www.digvita.com/tbk2/goods/list?pid=' + serchUrl1 + '&num=' + wuxianJia + '&tag_id=' + tagId,
            dataType: 'jsonp',
            type: 'GET',
            success: function (data) {
                console.log(data)
                thisValues1 = data
                var pp = ""
                for (var i = 0; i < data.length; i++) {
                    pp += "  <div class=\"conList\" >\n" +
                        "<div class=\"gogo\"value=" + data[i].item_id + ">\n" +
                        "                <img class=\"conImg\"\n" +
                        "                     src=" + data[i].item_main_pic + ">\n" +
                        "                <div class=\"conFirstLine\">\n" +
                        "                    <span class=\"conTitleSpan\">" + data[i].item_name + "</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"conSecondLine\">\n" +
                        "                    <div class=\"secondLineFirst\" >\n" +
                        "                        <span class=\'zhuangui\'>专柜价</span>：<span id=\"secondLineFirst\" class=\'biubiu\'>￥" + data[i].item_price + "</span>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"secondLineSecond\">\n" +

                        "                        销量：<span>" + data[i].sales_volume + "</span>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "\n" +
                        "                <div class=\"conFourLine\">\n" +
                        "                    <div class=\"secondLineFirst\">\n" +
                        "                       <span class=\'juanhou\'>劵后价</span><span class=\'juanhou1\'>：</span><span class='priLast'>￥" + data[i].pcp + "</span>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"getMoney\">\n" +
                        "                        &nbsp;赚￥ <span>" + data[i].commission + "</span>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "\n" +
                        "            </div>\n" +
                        "                <div class=\"conThreeLine\">\n" +
                        "                    <img class=\"conThreeImg11\" value=" + data[i].item_id + " data=" + i + " src=\"../images/good.png\"><span class=\"goodsNum\" data=" + i + ">" + data[i].count + "</span>\n" +
                        "<div class=\"conThreeImgAll\">\n" +
                        "</div>\n" +
                        "                </div>\n" +
                        "            </div>"

                }
                $(".shopList").html(pp)
                //渲染点赞人的头像
                for (var i = 0; i < data.length; i++) {
                    if (data[i].coupon_denomination == "无" && data[i].item_price == data[i].pcp) {
                        $(".juanhou:eq(" + i + ")").css("display", "none")
                        $(".juanhou1:eq(" + i + ")").css("display", "none")
                        $(".priLast:eq(" + i + ")").css("display", "none")
                        $("#secondLineFirst:eq(" + i + ")").css("font-size", "15px")
                    } else {
                        if (data[i].coupon_denomination != "无") {
                            $(".biubiu:eq(" + i + ")").css("text-decoration", "line-through")
                        }
                    }
                    var m = ''
                    if (data[i].headimgurl.length == 0) {
                        continue
                    } else {
                        for (var k1 = 0; k1 < data[i].headimgurl.length; k1++) {
                            if (k1 <= 6) {
                                m += ' <img class=\"conThreeImg1 no1\" value=' + k1 + '  src=' + data[i].headimgurl[k1] + '>'
                            }
                        }
                    }

                    if (data[i].praise == 1) {
                        $(".conThreeImg11:eq(" + i + ")").attr("src", "../images/good-on.png")
                    }
                    $(".conThreeImgAll:eq(" + i + ")").html(m)
                }
                //点击商品进入商品详情页面，携带商品信息，pid ，openid
                $(".gogo").click(function () {
                    var updata = $(this).attr("value");
                    window.location.href = 'share.html?item_id=' + updata + '&pid=' + serchUrl1 + '&openid=' + serchUrl
                })
            }
        })

    })

    $(document).on(' touchstart', '.conThreeImg11', function (e) {
        e.preventDefault();
            var updata = $(this).attr("value");
            var myData = $(this).attr("data");
            if (thisValues1[myData].praise == 1) {
                return
            }
            else {
                $(this).attr("data","1000000")
                $(this).attr("src", "../images/good-on.png")

                $.ajax({
                    url: 'http://www.digvita.com/tbk2/goods/thumb',
                    dataType: 'json',
                    data: {
                        item_id: updata,
                        pid: serchUrl1
                    },
                    type: 'POST',

                    success: function (data) {
                        var m1 = ''
                        var datas = data.data
                        if (thisValues1[myData].headimgurl.length <= 6) {
                            console.log(datas.tcnt)
                            $(".goodsNum:eq(" + myData + ")").html(datas.tcnt);
                            //点击一次头像渲染一次
                            m1 = ' <img class=\"conThreeImg1 no1\" src=' + datas.headimgurl[0] + '>'
                            $(".conThreeImgAll:eq(" + myData + ")").append(m1)
                            thisValues1[myData].praise = 1
                            m1 = ''
                        }
                        else {
                            $(".goodsNum:eq(" + myData + ")").html(datas.tcnt);
                            thisValues1[myData].praise = 1
                        }

                    },
                    error: function (data) {
                    }
                });
            }



    })


//无限加载
    $(".wrapper").scroll(function () {
        var myscrollTop = $(this).scrollTop()
        // console.log($(this).prop("scrollHeight"))
        var myscrollHeight = $(this).prop("scrollHeight")
        // console.log($(this).height())
        var myheight = $(this).height()
        if (myheight + myscrollTop >= myscrollHeight) {
            $(".load").show()
            wuxianJia++
            setTimeout(function () {
                getList()
                $(".load").hide()
            }, 1000)
        }
    })


    var thisValues2 = '';
    var isEnd = false
    var getList = function () {

        if (isEnd == true) {
            $(".load").hide()
            return;

        }
        $.ajax({
            url: 'http://www.digvita.com/tbk2/goods/count?pid=' + serchUrl1 + '&tag_id=' + tagId,
            dataType: 'jsonp',
            type: 'GET',
            success: function (data) {
                if (wuxianJia * 10 >= data) {
                    isEnd = true;
                    $(".load").hide();
                } else {
                    $.ajax({
                        url: 'http://www.digvita.com/tbk2/goods/list?pid=' + serchUrl1 + '&num=' + wuxianJia + '&tag_id=' + tagId,
                        dataType: 'jsonp',
                        type: 'GET',
                        success: function (data) {
                            thisValues2 = data
                            var pp = ""
                            for (var i = 0; i < data.length; i++) {
                                pp += "  <div class=\"conList\" >\n" +
                                    "<div class=\"gogo\"value=" + data[i].item_id + ">\n" +
                                    "                <img class=\"conImg\"\n" +
                                    "                     src=" + data[i].item_main_pic + ">\n" +
                                    "                <div class=\"conFirstLine\">\n" +
                                    "                    <span class=\"conTitleSpan\">" + data[i].item_name + "</span>\n" +
                                    "                </div>\n" +
                                    "                <div class=\"conSecondLine\">\n" +
                                    "                    <div class=\"secondLineFirst\" >\n" +
                                    "                        <span class=\'zhuangui\'>专柜价</span>：<span id=\"secondLineFirst\" class=\'biubiu\'>￥" + data[i].item_price + "</span>\n" +
                                    "                    </div>\n" +
                                    "                    <div class=\"secondLineSecond\">\n" +

                                    "                        销量：<span>" + data[i].sales_volume + "</span>\n" +
                                    "                    </div>\n" +
                                    "                </div>\n" +
                                    "\n" +
                                    "                <div class=\"conFourLine\">\n" +
                                    "                    <div class=\"secondLineFirst\">\n" +
                                    "                       <span class=\'juanhou\'>劵后价</span><span class=\'juanhou1\'>：</span><span class='priLast'>￥" + data[i].pcp + "</span>\n" +
                                    "                    </div>\n" +
                                    "                    <div class=\"getMoney\">\n" +
                                    "                        &nbsp;赚￥ <span>" + data[i].commission + "</span>\n" +
                                    "                    </div>\n" +
                                    "                </div>\n" +
                                    "\n" +
                                    "            </div>\n" +
                                    "                <div class=\"conThreeLine\">\n" +
                                    "                    <img class=\"conThreeImg22\" value=" + data[i].item_id + " data=" + i + " src=\"../images/good.png\"><span class=\"goodsNum\" data=" + i + ">" + data[i].count + "</span>\n" +
                                    "<div class=\"conThreeImgAll\">\n" +
                                    "</div>\n" +
                                    "                </div>\n" +
                                    "            </div>"

                            }
                            $(".shopList").append(pp)
                            //渲染点赞人的头像
                            var jueLe = wuxianJia * 10
                            for (var i = 0; i < data.length; i++) {
                                var tt = jueLe + i

                                if (data[i].coupon_denomination == "无" && data[i].item_price == data[i].pcp) {
                                    $(".juanhou:eq(" + tt + ")").css("display", "none")
                                    console.log(jueLe + i)
                                    $(".juanhou1:eq(" + tt + ")").css("display", "none")
                                    $(".priLast:eq(" + tt + ")").css("display", "none")
                                    $("#secondLineFirst:eq(" + tt + ")").css("font-size", "15px")
                                } else {
                                    if (data[i].coupon_denomination != "无") {
                                        $(".biubiu:eq(" + tt + ")").css("text-decoration", "line-through")
                                    }
                                }
                                var m = ''
                                if (data[i].headimgurl.length == 0) {
                                    continue
                                } else {
                                    for (var k1 = 0; k1 < data[i].headimgurl.length; k1++) {
                                        if (k1 <= 6) {
                                            m += ' <img class=\"conThreeImg1 no1\" value=' + k1 + '  src=' + data[i].headimgurl[k1] + '>'
                                        }
                                    }
                                    $(".conThreeImgAll:eq(" + tt + ")").html(m)
                                }

                                if (data[i].praise == 1) {
                                    $(".conThreeImg22:eq(" + i + ")").attr("src", "../images/good-on.png")
                                }

                            }
                            //点击商品进入商品详情页面，携带商品信息，pid ，openid
                            $(".gogo").click(function () {
                                var updata = $(this).attr("value");
                                window.location.href = 'share.html?item_id=' + updata + '&pid=' + serchUrl1 + '&openid=' + serchUrl
                            })

                            $(document).on(' touchstart', '.conThreeImg22', function (e) {
                                e.preventDefault();
                                var updata = $(this).attr("value");
                                var myData = $(this).attr("data");
                                if (thisValues2[myData].praise == 1) {
                                    return
                                }
                                else {
                                    $(this).attr("src", "../images/good-on.png")
                                    var m1 = ''
                                    $.ajax({
                                        url: 'http://www.digvita.com/tbk2/goods/thumb',
                                        dataType: 'json',
                                        data: {
                                            item_id: updata,
                                            pid: serchUrl1
                                        },
                                        type: 'POST',
                                        success: function (data) {
                                            console.log(data)
                                            var datas = data.data
                                            var juelr1 = (wuxianJia-1) * 10;
                                            console.log(juelr1)
                                            var juele2 = Number(juelr1) + Number(myData)
                                            console.log(juele2)
                                            console.log(wuxianJia)
                                            console.log(wuxianJia-1)
                                            if (thisValues2[myData].headimgurl.length <= 6) {

                                                $(".goodsNum:eq(" + juele2 + ")").html(datas.tcnt);
                                                console.log(datas.tcnt)
                                                //点击一次头像渲染一次
                                                m1 = ' <img class=\"conThreeImg1 no1\" src=' + datas.headimgurl[0] + '>'
                                                $(".conThreeImgAll:eq(" + juele2 + ")").append(m1)
                                                thisValues2[myData].praise = 1
                                            }
                                            else {
                                                $(".goodsNum:eq(" + juele2 + ")").html(datas.tcnt);
                                                thisValues2[myData].praise = 1
                                            }

                                        },
                                        error: function (data) {
                                        }
                                    });
                                }

                            })


                        }
                    })


                }

            }

        })


    }


})


