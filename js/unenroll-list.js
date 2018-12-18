$(function () {
    dataInit();
    reasonInit();
    $(".qrcode").qrcode({
        width: 150,
        height: 150,
        text: $(".link-div input").val()
    });

    $(".link-div input").on("change", function () {
        $(".qrcode").empty();
        $(".qrcode").qrcode({
            width: 150,
            height: 150,
            text: $(".link-div input").val()
        });
    });

    var clipboard = new ClipboardJS(".copy-btn");
    clipboard.on("success", function () {
        alert("复制成功");
    });
});

function dataInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getAbandon",
        data: {
            username: username
        },
        dataType: "json",
        async: false,
        success: function (data) {
            var code = data.code;
            var dataArray = new Array();
            if (code == 0) {
                var data1 = data.data;
                for (var j = 0; j < data1.length; j++) {
                    var json = data1[j];
                    var json1 = {
                        "name": json.name,
                        "department": json.department1 + "-" + json.department2 + "-" + json.department3,
                        "jobtitle": json.jobtitle,
                        "mobile": json.mobile,
                        "beDate": json.beDate,
                        "status": json.status,
                        "reason": json.reason,
                        "id": json.id
                    };
                    dataArray.push(json1);
                }
            }
            $("#unenroll-table").DataTable({
                "data": dataArray,
                "columns": [
                    {data: "name"},
                    {data: "department"},
                    {data: "jobtitle"},
                    {data: "mobile"},
                    {data: "beDate"},
                    {
                        "data": "status",
                        "render": function (data, type, row, meta) {
                            if (data == 0) {
                                return "待填写";
                            } else if (data == 1) {
                                return "已提交";
                            } else if (data == 2) {
                                return "放弃入职";
                            } else {
                                return "已办理入职";
                            }
                        }
                    },
                    {data: "reason"},
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            return "<a href='view-form.html?id=" + data + "'>查看登记表</a>";
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


function reasonInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getReason",
        data: {
            username: username
        },
        dataType: "json",
        async: false,
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var id = dataList[i].id;
                    var reasonname = dataList[i].reasonname;
                    $("#reason").append("<option value='" + id + "'>" + reasonname + "</option>");
                }
                $("#reason").selectpicker("refresh");
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}


$('.datepicker').bootstrapMaterialDatePicker({
    format: 'YYYY-MM',
    clearButton: true,
    cancelText: '取消',
    okText: '确定',
    clearText: '清除',
    weekStart: 1,
    time: false,
    monthPicker: true
});

function showConfirmMessage() {
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

$(".search-btn").on("click", function () {
    var jsonArray = new Array();
    var table = $("#unenroll-table").DataTable();
    table.clear().draw();
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getAbandon",
        data: {
            username: username
        },
        dataType: "json",
        data: {
            beDate: $("#date").val(),
            department: $("#department").val(),
            reason: $("#reason").val()
        },
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    var json = dataList[i];
                    var status = json.status;
                    if (status == 0) {
                        status = "待填写";
                    } else if (status == 1) {
                        status = "已提交";
                    } else if (status == 2) {
                        status = "放弃入职";
                    } else {
                        status = "已办理入职";
                    }
                    var json_new = {
                        "name": json.name,
                        "department": json.department1 + "-" + json.department2 + "-" + json.department3,
                        "jobtitle": json.jobtitle,
                        "mobile": json.mobile,
                        "beDate": json.beDate,
                        "status": status,
                        "reason": json.reason,
                        "id": json.id
                    };
                    jsonArray.push(json_new);
                }
                table.rows.add(jsonArray).draw();
            }
        }
    })
});

$(".download-btn").on("click", function () {
    //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
    var type = "png";
    var d = $(".qrcode").find("canvas")[0];
    var imageData = d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };
    imageData = imageData.replace(fixtype(type), 'image/octet-stream');

    //3.0 将图片保存到本地
    var savaFile = function (data, filename) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

    var filename = '' + new Date().getDate() + '.' + type;
    savaFile(imageData, filename);
});
