$(function () {
    $(".trueLoge").click(function () {
        $.ajax({
            url:"http://10.1.9.135:8080/tbk2/account/getGoods",
            dataType: 'jsonp',
            type: 'GET',
            success: function (data) {
                console.log(data)
            },
            error: function () {
                console.log("error")
            }
        })
        var flag_name = $.trim($(".logInput").val());
        var flag_password = $.trim($(".logInput1").val());
        var reg = /^1[34578][0-9]{9}/;
        var reg1 = /^[A-Za-z0-9]{6,20}$/;
        if (flag_password.length >= 6 && flag_password.length <= 20 && flag_name.length == 11) {
            if (reg.test(flag_name) == false || reg1.test(flag_password) == false) {
                $(".tiShi").show();
            }
            else {
                $(".tiShi").hide();
//ajxax







            }
        }
        else {
            $(".tiShi").show();
        }
    })
    $(".clean").click(function () {
        $(".logInput").val('')
    })
    $(".clean1").click(function () {
        $(".logInput1").val('')
    })

})


