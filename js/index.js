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
            $("#readyenroll-list-table").DataTable({
                "data": dataArray,
                "columns": [
                    {data: "coc"},
                    {data: "name"},
                    {data: "taccount"},
                    {data:"tpwd"},
                    {data: "tel"},
                    {data: "passenger"},
                    {data:"from_station"},
                    {data:"to_station"},
                    {data:"period"},
                    {data:"seat_class"},
                    {data:"traincode"},
                    {data:"date"},
                    {data:"random_id"},
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            return "<button data='"+data+"' class=\"btn btn-primary waves-effect delete-button\" id=\"'\"+data+\"'\"\n" +
                                "                                >删除\n" +
                                "                        </button>";
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
                }

            });
        }

    });


}

function showSuccessMessage() {
    swal({
        title: "删除成功",
        type: "success",
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: false
    }, function () {
        window.location.reload();
    });
}

function showErrorMessage() {
    swal({
        title: "访问数据出错",
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
                        showSuccessMessage();
                    }else{
                        showErrorMessage();
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
                    {data: "taccount"},
                    {data:"tpwd"},
                    {data: "tel"},
                    {data: "passenger"},
                    {data:"from_station"},
                    {data:"to_station"},
                    {data:"period"},
                    {data:"seat_class"},
                    {data:"traincode"},
                    {data:"date"},
                    {data:"random_id"},
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            return "<button data='"+data+"' class=\"btn btn-primary waves-effect delete-button\" id=\"'\"+data+\"'\"\n" +
                                "                                >删除\n" +
                                "                        </button>";
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
                }

            });

        }
    });
});

$("body").on("click", ".enroll-btn", function () {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/editStatus",
        data: {
            id: $(this).attr("data"),
            status: 3,
            username: username
        },
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                showSuccessMessage();
                //window.location.reload();
            }
        }
    });
});






