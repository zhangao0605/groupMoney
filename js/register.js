$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var myurl = GetQueryString("url");
    if (myurl != null && myurl.toString().length > 1) {
        alert(GetQueryString("url"));
    }

    var item_id = GetQueryString("item_id");
    var serchUrl1 = GetQueryString("pid");
    var serchUrl = GetQueryString("openid");
    $.ajax({
        url: 'http://www.digvita.com/tbk2/user/validate?pid=' + serchUrl1 ,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            console.log(data)
            if (data.msg == "success") {
                window.location.href = "extension.html?pid=" + serchUrl1 + "&openid=" + serchUrl
            } else {
                $(".trueLoge").click(function () {
                    var value1 = $(".logInput").val();
                    var value2 = $(".logInput2").val();
                    var value3 = $(".logInput3").val();
                    var flag_name = $.trim($(".logInput").val());

                    var reg = /^1[34578][0-9]{9}/;

                    if (value1 != '' && value3 != '' && value2 != '') {
                        if (reg.test(flag_name) == false) {
                            $(".tiShi").html("请输入正确手机号").show();
                        }
                        else {
                            $(".tiShi").hide();
                            $.ajax({
                                url: 'http://www.digvita.com/tbk2/user/register',
                                dataType: 'json',
                                contentType: "application/json; charset=utf-8",
                                type: 'POST',
                                data: JSON.stringify({
                                    "tel": "" + value1 + "",
                                    "pay": "" + value2 + "",
                                    "wc": "" + value3 + "",
                                    "item_id": "" + item_id + "",
                                    "openid": "" + serchUrl + ""
                                }),
                                success: function (data) {
                                    if (data.msg == "success") {
                                        window.location.href = "withdrawals.html?pid=" + serchUrl1 + "&openid=" + serchUrl
                                    }
                                    else {
                                        $(".tiShi").html("注册失败").show();
                                    }
                                }
                            })
                        }
                    } else {
                        $(".tiShi").html("请将信息填写完整").show();
                    }


                })
                $(".clean").click(function () {
                    $(".logInput").val('')
                })
                $(".clean2").click(function () {
                    $(".logInput2").val('')
                })
                $(".clean3").click(function () {
                    $(".logInput3").val('')
                })
            }
        }
    })
    var wHeight = window.innerHeight;
    window.addEventListener('resize', function () {
        var hh = window.innerHeight;
        var viewTop = $(window).scrollTop();
        if (wHeight > hh) {
            $(".trueLoge").css("display", "none");
            $(".All").css("height", "110%");
        } else {
            $(".All").css("height", "100%");
            $(".trueLoge").css("display", "block");
        }
        wHeight = hh;
    });


})

