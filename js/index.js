$(function () {
    dataInit();

});

function dataInit() {
    var date = $("#order_create_date").val();
    var mobile = $("#mobile_phone").val();
    $.ajax({
        url: "http://localhost:8080/admin/selectOrderList",
        dataType: "json",
        data: {
            date: date,
            mobilePhone:mobile
        },
        async: false,
        success: function (data) {
            var success = data.success;
            var dataArray = new Array();
            if (success == true) {
                var data1 = data.data;
                var total = data.total;
                for (var j = 0; j < data1.length; j++) {
                    var json = data1[j];
                    dataArray.push(json);
                }
            }
            $("#readyenroll-list-table").DataTable({
                "data": dataArray,
                "columns": [
                    {data: "coc"},
                    {data: "name"},
                    {
                        render:function (data, type, row, meta) {
                            return row["taccount"]+","+row["tpwd"];
                        }
                    },
                     //{data:"tpwd"},
                    {data: "tel"},
                    {data: "passenger"},
                    {data:"from_station"},
                    {data:"to_station"},
                    {data:"date"},
                    {data:"seat_class"},
                    {data:"traincode"},
                    {data:"orderDate"},
                    {data:"random_id"},
                    {data:"note"},
                    // {
                    //     "data":"id",
                    //     "render":function (data, type, row, meta) {
                    //         return "";
                    //     }
                    // },
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            return "<button data='"+data+"' class=\"btn btn-primary waves-effect delete-button\" id=\"'\"+data+\"'\">删除</button>";
                        }

                    },
                    {
                        "data":"tel",
                        "render":function (data,type,row,meta) {
                            return "<button data = '"+data+"' class=\"btn btn-info waves-effect success-button\">短信推送（成功）</button>"+
                                "&nbsp;&nbsp;&nbsp;<button data = '"+data+"' class=\"btn btn-warning waves-effect cross-button\">短信推送（跨站）</button>"+
                                "&nbsp;&nbsp;&nbsp;<button data = '"+data+"' class=\"btn btn-danger waves-effect conflict-button\">短信推送（冲突）</button>";
                        }
                    }
                ],
                "language": {
                    "lengthMenu": "每页展示 _MENU_ 条",
                    "info": "展示第 _START_ 到 _END_ 条 总共 _TOTAL_ 条",
                    "infoEmpty": "第 0 页 总共 0 页",
                    "emptyTable": "没有数据返回",
                    "zeroRecords": "未找到匹配数据",
                    "search": "搜索：",
                    "paginate": {
                        "first": "第一页",
                        "last": "最后一页",
                        "next": "下一页",
                        "previous": "上一页"
                    }
                },
                dom: 'Bfrtip',
                responsive: true,
                buttons: [
                          'excel'
                    ]

            });
            // $('#readyenroll-list-table').DataTable({
            //     responsive: true
            // });
            //
            // //Exportable table
            // $('#readyenroll-list-table').DataTable({
            //     dom: 'Bfrtip',
            //     responsive: true,
            //     buttons: [
            //         'copy', 'csv', 'excel', 'pdf', 'print'
            //     ]
            // });
        }

    });


}

function showSuccessMessage(content) {
    swal({
        title: content,
        type: "success",
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: false
    }, function () {
        window.location.reload();
    });
}

function showErrorMessage(content) {
    swal({
        title: content,
        //text: "You will not be able to recover this imaginary file!",
        type: "error",
        //showCancelButton: true,
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: true
    });
}

function showConfirmMessage(id) {
    var id = id;
    console.log(id)
    swal({
        title: "确定要删除数据吗？",
        //text: "You will not be able to recover this imaginary file!",
        type: "error",
        showCancelButton: true,
        cancelButtonText:"取消",
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: false
    },function (isConfirm) {
        //console.log(isConfirm);
        if(isConfirm){
            $.ajax({
                url: "http://localhost:8080/admin/deleteOrderById",
                dataType: "json",
                data: {
                    id: id
                },
                async: false,
                success:function (data) {
                    var success = data.success;
                    console.log(success)
                    if(success == true){
                        showSuccessMessage("删除成功");
                    }else{
                        showErrorMessage("删除失败");
                    }
                }
            });
        }
    });
}

function showCloseMessage() {
    swal({
        title: "你没有管理员权限",
        //text: "You will not be able to recover this imaginary file!",
        type: "error",
        //showCancelButton: true,
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: false
    }, function () {
        window.close();
    });
}


$("body").on("click", ".delete-button", function () {
    console.log("删除按钮");
    var id = $(this).attr("data");
    console.log(id)
    showConfirmMessage(id);

});

$("body").on("click",".success-button",function () {
    var mobile = $(this).attr("data");
    console.log(mobile);
    var rex = /^1\d{10}$/;
    var result = rex.test(mobile);
    if(result == false){
        showErrorMessage("手机号不正确");
    }else {
        var content = "小助手抢票已完成，请尽快去12306官方进行车票支付。" +
            "温馨提示：开车前2小时以外的车票，须在30分钟内完成支付，开车前2小时以内的车票，须在10分钟内完成支付。" +
            "客服电话：19946187917【小助手】";
        sendMsg(mobile, content);
    }
});

$("body").on("click",".cross-button",function () {
    var mobile = $(this).attr("data");
    console.log(mobile);
    var rex = /^1\d{10}$/;
    var result = rex.test(mobile);
    if(result == true) {
        var content = "您的票已完成跨站抢票，请尽快去12306官方进行车票支付。" +
            "温馨提示：开车前2小时以外的车票，须在30分钟内完成支付，开车前2小时以内的车票，须在10分钟内完成支付。" +
            "客服电话：19946187917【小助手】";
        sendMsg(mobile, content);
    }else{
        showErrorMessage("手机号不正确");
    }
});

$("body").on("click",".conflict-button",function () {
    var mobile = $(this).attr("data");
    console.log(mobile);
    var rex = /^1\d{10}$/;
    var result = rex.test(mobile);
    if(result == true) {
        var content = "您的抢票订单与已有行程冲突，请确认行程重新下单。客服电话：19946187917【小助手】";
        sendMsg(mobile, content);
    }else {
        showErrorMessage("手机号不正确");
    }

});

$(".search-btn").on("click",function () {
    var mobilePhone = $("#mobile_phone").val();
    var date = $("#order_create_date").val();
    var dataArray = new Array();
    $.ajax({
        url: "http://localhost:8080/admin/selectOrderList",
        dataType: "json",
        data: {
            date: date,
            mobilePhone:mobilePhone
        },
        async: false,
        success: function (data) {
            var success = data.success;

            if (success == true) {
                var data1 = data.data;
                var total = data.total;
                for (var j = 0; j < data1.length; j++) {
                    var json = data1[j];
                    // var json1 = {
                    //     "name": json.name,
                    //     "department": json.department1 + "-" + json.department2 + "-" + json.department3,
                    //     "jobtitle": json.jobtitle,
                    //     "mobile": json.mobile,
                    //     "beDate": json.beDate,
                    //     "status": json.status,
                    //     "id": json.id
                    // };
                    dataArray.push(json);
                }

            }
            $("#readyenroll-list-table").DataTable().destroy();
            $("#readyenroll-list-table").DataTable({
                "data": dataArray,
                "columns": [
                    {data: "coc"},
                    {data: "name"},
                    {
                        render:function (data, type, row, meta) {
                            return row["taccount"]+","+row["tpwd"];
                        }
                    },
                    // {data:"tpwd"},
                    {data: "tel"},
                    {data: "passenger"},
                    {data:"from_station"},
                    {data:"to_station"},
                    {data:"date"},
                    {data:"seat_class"},
                    {data:"traincode"},
                    {data:"orderDate"},
                    {data:"random_id"},
                    {data:"note"},
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            return "<button data='"+data+"' class=\"btn btn-primary waves-effect delete-button\" id=\"'\"+data+\"'\">删除</button>";
                        }

                    },
                    {
                        "data":"tel",
                        "render":function (data,type,row,meta) {
                            return "<button data = '"+data+"' class=\"btn btn-info waves-effect success-button\">短信推送（成功）</button>"+
                                "&nbsp;&nbsp;&nbsp;<button data = '"+data+"' class=\"btn btn-warning waves-effect cross-button\">短信推送（跨站）</button>"+
                                "&nbsp;&nbsp;&nbsp;<button data = '"+data+"' class=\"btn btn-danger waves-effect conflict-button\">短信推送（冲突）</button>";
                        }
                    }
                ],
                "language": {
                    "lengthMenu": "每页展示 _MENU_ 条",
                    "info": "展示第 _START_ 到 _END_ 条 总共 _TOTAL_ 条",
                    "infoEmpty": "第 0 页 总共 0 页",
                    "emptyTable": "没有数据返回",
                    "zeroRecords": "未找到匹配数据",
                    "search": "搜索：",
                    "paginate": {
                        "first": "第一页",
                        "last": "最后一页",
                        "next": "下一页",
                        "previous": "上一页"
                    }

                },
                dom: 'Bfrtip',
                responsive: true,
                buttons: [
                    'excel'
                ]

            });

        }
    });
});

function sendMsg(mobile,content) {
    var xh;

    //content = encodeURIComponent(content);
    $.ajax({
        url:"http://localhost:8080/admin/sendMsg",
        dataType: "json",
        type:"POST",
        data: {
            content: content,
            mobilePhone:mobile,
            xh:xh
        },
        success:function (data) {
            var success = data.success;
            var result = data.data;
            var resultList = result.split(",");
            if(success == true && resultList[0] == "1"){
                showSuccessMessage("短信发送成功");
            }else{
                showErrorMessage("短信发送失败");
            }
        }
    });
}








