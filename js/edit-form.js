$(function () {
    companyInit();
    houseHoldInit();
    IDCardInit();
    //politicalStatusInit();
    nationsInit();
    sequenceListInit();
    initData();
    $("#position-class").triggerHandler("change");
    $("#contract-class").triggerHandler("change");


});

function companyInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getCompamy",
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
                    var company = dataList[i].company;
                    console.log(company)
                    $("#company").append("<option value='" + id + "'>" + company + "</option>");
                }
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}

function houseHoldInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getAnmeldung",
        dataType: "json",
        data: {
            username: username
        },
        async: false,
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var id = dataList[i].id;
                    var anmeldungName = dataList[i].anmeldungName;

                    $("#householdType").append("<option value='" + id + "'>" + anmeldungName + "</option>");
                }
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}

function IDCardInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getCardType",
        dataType: "json",
        data: {
            username: username
        },
        async: false,
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var id = dataList[i].id;
                    var cardType = dataList[i].cardType;

                    $("#ID-type").append("<option value='" + id + "'>" + cardType + "</option>");
                }
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}

// function politicalStatusInit(){
//     $.ajax({
//         url:"http://ty.yunjiglobal.com/newStaff/getPolicitalStatus",
//         dataType:"json",
//         async:false,
//         success:function (data) {
//             var code = data.code;
//             if(code == 0){
//                 var dataList = data.dataList;
//                 for(var i =0;i<dataList.length;i++){
//                     var id=dataList[i].id;
//                     var policitalStatusName = dataList[i].policitalStatusName;
//
//                     $("#ID-type").append("<option value='"+id+"'>"+policitalStatusName+"</option>");
//                 }
//             }else {
//                 showConfirmMessage();
//             }
//         },
//         error:function () {
//             showConfirmMessage();
//         }
//     });
// }

// function politicalStatusInit(){
//     $.ajax({
//         url:"http://ty.yunjiglobal.com/newStaff/getPolicitalStatus",
//         dataType:"json",
//         async:false,
//         success:function (data) {
//             var code = data.code;
//             if(code == 0){
//                 var dataList = data.dataList;
//                 for(var i =0;i<dataList.length;i++){
//                     var id=dataList[i].id;
//                     var policitalStatusName = dataList[i].policitalStatusName;
//
//                     $("#ID-type").append("<option value='"+id+"'>"+policitalStatusName+"</option>");
//                 }
//             }else {
//                 showConfirmMessage();
//             }
//         },
//         error:function () {
//             showConfirmMessage();
//         }
//     });
// }

function nationsInit() {
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getEthnicity",
        dataType: "json",
        data: {
            username: username
        },
        async: false,
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var id = dataList[i].id;
                    var policitalStatusName = dataList[i].ethnicityName;

                    $("#nations").append("<option value='" + id + "'>" + policitalStatusName + "</option>");
                }
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}


function sequenceListInit() {
    var username = $.cookie("username");
    var select = $("#sequence");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getModel",
        dataType: "json",
        data: {
            username: username
        },
        async: false,
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var id = dataList[i].id;
                    var model = dataList[i].model;
                    select.append("<option value='" + id + "'>" + model + "</option>");
                }
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage();
        }
    });
}

function initData() {
    var id = $.getURLParam("id");
    var username = $.cookie("username");
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/getStaff",
        data: {
            id: id,
            username: username
        },
        dataType: "json",
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var info = dataList[i];
                    $("#name").val(info.name);
                    $("#sex").selectpicker("val", info.sex);
                    $("#rehire").selectpicker("val", info.rehire);
                    $("#employeeNo").val(info.staffNo);
                    $("#marriage").selectpicker("val", info.marriage);
                    $("#ID-type").selectpicker("val", info.credentialType);
                    $("#ID-Number").val(info.credentialNumber);
                    $("#birthday").val(info.birthday);
                    $("#nationality").val(info.nationality);
                    $("#nations").selectpicker("val", info.enthnicity);
                    $("#enrollDate").val(info.beDate);
                    $("#socialDate").val(info.workDate);
                    $("#province-select").selectpicker("val", info.province);
                    $("#province-select").triggerHandler("change");
                    $("#city-select").selectpicker("val", info.city);
                    $("#city-select").triggerHandler("change");
                    $("#area-select").selectpicker("val", info.district);
                    $("#province-select-birth").selectpicker("val", info.birthProvince);
                    $("#province-select-birth").triggerHandler("change");
                    $("#city-select-birth").selectpicker("val", info.birhCity);
                    $("#city-select-birth").triggerHandler("change");
                    $("#area-select-birth").selectpicker("val", info.birthDistrict);
                    $("#personalMail").val(info.mail);
                    $("#personalFile").selectpicker("val", info.personnelFile);
                    $("#politicalStatus").selectpicker("val", info.policitalStatus);
                    $("#professionalTitle").val(info.professionalTitle);
                    $("#householdType").selectpicker("val", info.anmeldung);
                    $("#recruitmentType").selectpicker("val", info.source);
                    $("#hrbp").val(info.hrbp);
                    $("#hr").val(info.hr);
                    $("#accountHolder").val(info.bankHolder);
                    $("#bankName").val(info.bankName);
                    $("#bankAccount").val(info.bankAccount);
                    $("#bankFullName").val(info.bankSubName);
                    $("#highestEducation").selectpicker("val", info.highestEducation);
                    $("#highestDegree").selectpicker("val", info.highestDegree);
                    $("#graduateDate").val(info.graduationDate);
                    $("#major").val(info.major);
                    $("#graduateSchool").val(info.graduateSchool);
                    $("#firstEducation").selectpicker("val", info.firstEducation);
                    $("#firstDegree").selectpicker("val", info.firstDegree);
                    $("#firstGraduateDate").val(info.firstGraduationDate);
                    $("#firstMajor").val(info.firstMajor);
                    $("#firstGraduateSchool").val(info.firstSchool);
                    $("#mobile").val(info.mobile);
                    $("#province-select-household").selectpicker("val", info.censusRegisterProvince);
                    $("#province-select-household").triggerHandler("change");
                    $("#city-select-household").selectpicker("val", info.censusRegisterCity);
                    $("#city-select-household").triggerHandler("change");
                    $("#area-select-household").selectpicker("val", info.censusRegisterDistrict);
                    $("#householdAddress").val(info.censusRegisterAddress);
                    $("#province-select-address").selectpicker("val", info.residenceProvince);
                    $("#province-select-address").triggerHandler("change");
                    $("#city-select-address").selectpicker("val", info.residenceCity);
                    $("#city-select-address").triggerHandler("change");
                    $("#area-select-address").selectpicker("val", info.residenceDistrict);
                    $("#residenceAddress").val(info.residenceAddress);
                    $("#contactName").val(info.contactName);
                    $("#contactRelation").val(info.contactRelation);
                    $("#contactNumber").val(info.contactNumber);
                    $("#costCenter").val(info.costCenter);
                    $("#department0").val(info.department0);
                    $("#department1").val(info.department1);
                    $("#department2").val(info.department2);
                    $("#department3").val(info.department3);
                    $("#company").selectpicker("val", info.company);
                    $("#manager").val(info.manager);
                    $("#chineseTitle").val(info.jobtitle);
                    $("#jobTitle").val(info.jobtitleType);
                    $("#position-class").selectpicker("val", info.type);
                    $("#sequence").selectpicker("val", info.model);
                    $("#career-plan").val(info.developWay);
                    $("#property").selectpicker("val", info.property);
                    $("#insuranceAddress").val(info.statutoryInsurance);
                    $("#workCity").val(info.workCity);
                    $("#contractAddress").val(info.contractCity);
                    $("#probation").selectpicker("val", info.probation);
                    $("#probationMonth").selectpicker("val", info.probationMonth);
                    $("#probationEnd").val(info.probationEnd);
                    $("#contract-start").val(info.contractStart);
                    $("#contract-start").triggerHandler("input");
                    $("#contract-start").triggerHandler("propertychange");
                    $("#contract-start").triggerHandler("change");
                    $("#contract-end").val(info.contractEnd);
                    $("#workMail").val(info.workMail);
                    $("#departmentNo").val(info.departmentCode);
                    $("#topJob").html(info.jobtitle + "&nbsp;&nbsp;");
                    $("#topName").html(info.name + "&nbsp;&nbsp;");
                }
            } else {
                showConfirmMessage();
            }

        }, error: function () {
            showConfirmMessage();
        }
    });
}

$('.datepicker').bootstrapMaterialDatePicker({
    format: 'YYYY-MM-DD',
    clearButton: true,
    cancelText: '取消',
    okText: '确定',
    clearText: '清除',
    weekStart: 1,
    time: false,
    monthPicker: true
});

$("#position-class").on("change", function () {
    var position = $("#position-class").find("option:selected").text();
    var sequence = $("#sequence").find("option:selected").text();
    $("#career-plan").val(position + "-" + sequence);
});

$("#sequence").on("change", function () {
    var position = $("#position-class").find("option:selected").text();
    var sequence = $("#sequence").find("option:selected").text();
    $("#career-plan").val(position + "-" + sequence);
});
$("#contract-class").on("change", function () {
    var contract_class = $("#contract-class").val();
    var contract_policy = $("#contract-policy");
    var contract_status = $("#contract-status");
    if (contract_class == 1) {
        contract_policy.val("劳动合同");
        contract_status.val("原始合同");
    } else if (contract_class == 4) {
        contract_policy.val("派遣合同");
        contract_status.val("原始合同");
    } else if (contract_class == 2) {
        contract_policy.val("实习协议");
        contract_status.val("实习协议");
    } else if (contract_class == 5) {
        contract_policy.val("兼职协议");
        contract_status.val("兼职协议");
    } else if (contract_class == 3) {
        contract_policy.val("无");
        contract_status.val("无");
    }
});

$("#contract-start").bind("input propertychange change", function () {
    var contract_start = $("#contract-start").val();
    var probationMonth = $("#probationMonth").val();
    if (contract_start.substr(8) <= "15") {
        $("#social-sercurity").val(contract_start.substr(0, 7));
    } else {
        var date = new Date(Date.parse(contract_start.replace(/-/g, "/")));
        date.setMonth(date.getMonth() + 1, 1);
        var month = parseInt(date.getMonth()) + 1;
        if ((parseInt(date.getMonth()) + 1) < 10) {
            month = "0" + (parseInt(date.getMonth()) + 1);
        }
        $("#social-sercurity").val(date.getFullYear() + "-" + month);
    }
    var date1 = new Date(Date.parse(contract_start.replace(/-/g, "/")));
    date1.setMonth(date1.getMonth() + Number(probationMonth));
    date1.setDate(date1.getDate() - 1);
    var month1 = parseInt(date1.getMonth()) + 1;
    var day1 = parseInt(date1.getDate());
    if (parseInt(day1) < 10) {
        day1 = "0" + day1;
    }
    if (parseInt(month1) < 10) {
        month1 = "0" + month1;
    }
    $("#probationEnd").val(date1.getFullYear() + "-" + month1 + "-" + day1);


});

$("#probationMonth").bind("input propertychange change", function () {
    var contract_start = $("#contract-start").val();
    var probationMonth = $("#probationMonth").val();
    var date1 = new Date(Date.parse(contract_start.replace(/-/g, "/")));
    date1.setMonth(date1.getMonth() + Number(probationMonth));
    date1.setDate(date1.getDate() - 1);
    var month1 = parseInt(date1.getMonth()) + 1;
    var day1 = parseInt(date1.getDate());
    if (parseInt(day1) < 10) {
        day1 = "0" + day1;
    }
    if (parseInt(month1) < 10) {
        month1 = "0" + month1;
    }
    $("#probationEnd").val(date1.getFullYear() + "-" + month1 + "-" + day1);
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

function showSuccessMessage(id) {
    swal({
        title: "修改成功",
        type: "success",
        confirmButtonColor: "#03a8f3",
        confirmButtonText: "确定",
        closeOnConfirm: false
    }, function () {
        window.location.href = "../pages/view-form.html?id=" + id;
    });
}

$(".save-btn").on("click", function () {
    var id = $.getURLParam("id");
    var username = $.cookie("username");
    var jsonObj = {};
    jsonObj.id = id;
    jsonObj.username = username;
    jsonObj.name = $("#name").val();
    jsonObj.sex = $("#sex").val();
    jsonObj.rehire = $("#rehire").val();
    jsonObj.staffNo = $("#employeeNo").val();
    jsonObj.marriage = $("#marriage").val();
    jsonObj.credentialType = $("#ID-type").val();
    jsonObj.credentialNumber = $("#ID-Number").val();
    jsonObj.birthday = $("#birthday").val();
    jsonObj.nationality = $("#nationality").val();
    jsonObj.ethnicity = $("#nations").val();
    jsonObj.beDate = $("#enrollDate").val();
    jsonObj.workDate = $("#socialDate").val();
    jsonObj.province = $("#province-select").val();
    jsonObj.city = $("#city-select").val();
    jsonObj.district = $("#area-select").val();
    jsonObj.birthProvince = $("#province-select-birth").val();
    jsonObj.birhCity = $("#city-select-birth").val();
    jsonObj.birthDistrict = $("#area-select-birth").val();
    jsonObj.mail = $("#personalMail").val();
    jsonObj.personnelFile = $("#personalFile").val();
    jsonObj.policitalStatus = $("#politicalStatus").val();
    jsonObj.professionalTitle = $("#professionalTitle").val();
    jsonObj.anmeldung = $("#householdType").val();
    jsonObj.source = $("#recruitmentType").val();
    jsonObj.hrbp = $("#hrbp").val();
    jsonObj.hr = $("#hr").val();
    jsonObj.bankHolder = $("#accountHolder").val();
    jsonObj.bankName = $("#bankName").val();
    jsonObj.bankAccount = $("#bankAccount").val();
    jsonObj.bankSubName = $("#bankFullName").val();
    jsonObj.highestEducation = $("#highestEducation").val();
    jsonObj.highestDegree = $("#highestDegree").val();
    jsonObj.graduationDate = $("#graduateDate").val();
    jsonObj.major = $("#major").val();
    jsonObj.graduateSchool = $("#graduateSchool").val();
    jsonObj.firstEducation = $("#firstEducation").val();
    jsonObj.firstDegree = $("#firstDegree").val();
    jsonObj.firstGraduationDate = $("#firstGraduateDate").val();
    jsonObj.firstMajor = $("#firstMajor").val();
    jsonObj.firstSchool = $("#firstGraduateSchool").val();
    jsonObj.mobile = $("#mobile").val();
    jsonObj.censusRegisterProvince = $("#province-select-household").val();
    jsonObj.censusRegisterCity = $("#city-select-household").val();
    jsonObj.censusRegisterDistrict = $("#area-select-household").val();
    jsonObj.censusRegisterAddress = $("#householdAddress").val();
    jsonObj.residenceProvince = $("#province-select-address").val();
    jsonObj.residenceCity = $("#city-select-address").val();
    jsonObj.residenceDistrict = $("#area-select-address").val();
    jsonObj.residenceAddress = $("#residenceAddress").val();
    jsonObj.contactName = $("#contactName").val();
    jsonObj.contactRelation = $("#contactRelation").val();
    jsonObj.contactNumber = $("#contactNumber").val();
    jsonObj.costCenter = $("#costCenter").val();
    jsonObj.department0 = $("#department0").val();
    jsonObj.department1 = $("#department1").val();
    jsonObj.department2 = $("#department2").val();
    jsonObj.department3 = $("#department3").val();
    jsonObj.company = $("#company").val();
    jsonObj.manager = $("#manager").val();
    jsonObj.jobtitle = $("#chineseTitle").val();
    jsonObj.jobtitleType = $("#jobTitle").val();
    jsonObj.type;
    $("#position-class").val();
    jsonObj.nodel = $("#sequence").val();
    jsonObj.developWay = $("#career-plan").val();
    jsonObj.property = $("#property").val();
    jsonObj.contractPolicy = $("#contract-policy").val();
    jsonObj.contractStatus = $("#contract-status").val();
    jsonObj.statutoryInsurance = $("#insuranceAddress").val();
    jsonObj.workCity = $("#workCity").val();
    jsonObj.contractCity = $("#contractAddress").val();
    jsonObj.probation = $("#probation").val();
    jsonObj.probationMonth = $("#probationMonth").val();
    jsonObj.probationEnd = $("#probationEnd").val();
    jsonObj.contractStart = $("#contract-start").val();
    jsonObj.contractEnd = $("#contract-end").val();
    jsonObj.workMail = $("#workMail").val();
    jsonObj.insuranceMonth = $("#social-sercurity").val();
    jsonObj.departmentCode = $("#departmentNo").val();
    $.ajax({
        url: "http://ty.yunjiglobal.com/newStaff/editStaff?username=" + username,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonObj),
        dataType: "json",
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                showSuccessMessage(id);
            } else {
                showConfirmMessage();
            }
        },
        error: function () {
            showConfirmMessage()
        }
    });
});

$(".view-btn").on("click", function () {
    var id = $.getURLParam("id");
    window.open("view-form.html?id=" + id);
});

