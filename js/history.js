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




    $.ajax({
        url: 'http://www.digvita.com/tbk2/account/wh?pid='+serchUrl1,
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {

            if (data == '') {
                $(".nullPress").show()
            }else {
                $(".nullPress").hide()
                var pp='';
                for (var i = 0; i < data.length; i++) {
                    if(data[i].status==0){
                        data[i].status="进行中"
                    }
                    else{
                        data[i].status="完成"
                    }
                   pp+=' <tr class="trWidth">\n' +
                       '                    <th>'+data[i].withdrawTime
                       +'</th>\n' +
                       '                    <th>'+data[i].withdrawAmount+'</th>\n' +
                       '                    <th>'+data[i].name+'</th>\n' +
                       '                    <th>'+data[i].status+'</th>\n' +
                       '                </tr>'
                }
                $(".htmlNum").html(pp)

            }
            // console.log(data)
            // $(".three1").html(data.click30Day);
            // $(".three2").html(data.aliPay30Day);
            // $(".three3").html(data.effectPrediction)
            // $(".three4").html(data.estimatedRevenue)
        }
    })
})