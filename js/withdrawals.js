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

    var inputNum = ''

    $.ajax({
        url: 'http://www.digvita.com/tbk/account/income?pid='+serchUrl1,
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            $(".ooo").html(data.ra)
            inputNum = data.ra;
        }
    })




    $(".truePost").click(function () {

        $.ajax({
            url: 'http://www.digvita.com/tbk/user/validate?pid='+serchUrl1 ,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                // console.log(data)
                if(data.msg!="success"){
                    window.location.href="register.html?pid="+serchUrl1+"&openid="+serchUrl
                }else{
                    $(".tishi3").hide()
                    var maxNum1 = $(".maxNum").val();
                    var text1 = $(".text1").val();
                    var text2 = $(".text2").val();
                    if (text1 == '' || text2 == '') {
                        $(".tishi2").show()
                        $(".tishi1").hide()

                    } else {
                        if (maxNum1 > inputNum || maxNum1 <= 0) {
                            $(".tishi2").hide();
                            $(".tishi1").show();
                        } else {
                            $.ajax({
                                url: 'http://www.digvita.com/tbk2/account/withdrawals',
                                dataType: 'json',
                                data: {
                                    'name': text2,
                                    'withdrawAmount': maxNum1,
                                    'aliNum': text1,
                                    'pid': serchUrl1
                                },
                                type: 'POST',
                                success: function (data) {

                                },
                                error: function (data) {
                                    console.log(data)
                                }
                            });
                            $(".tishi3").show()
                            $(".tishi1").hide()
                            $(".tishi2").hide()
                            var maxNum1 = $(".maxNum").val('');
                            var text1 = $(".text1").val('');
                            var text2 = $(".text2").val('');
                        }
                    }
                }

            }
        })
    })
    $(".clean").click(function () {
        $(".input-box>input").val("");
        $(".tishi2").hide()
        $(".tishi3").hide()
        $(".tishi1").hide()
    })
})