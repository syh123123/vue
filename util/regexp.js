let regexp={
     date:'^(19[0-9]{2}|2[0-9]{3})(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)$', //日期格式校验错误
     dateValue:'^\\d{4}\\d{2}\\d{2}$', //日期值校验错误
     name:'^[\\u4e00-\\u9fa5()（）]+$', //全中文，但可以有中英文（）()字符
     name1:'^[\\u4e00-\\u9fa5.·]+$', //全中文，但可以有中英文.·
     name:'^[\\u4e00-\\u9fa5]+$',//全中文
     code:'^[a-zA-Z0-9]+$',//只能包含英文和数字
     english:'^[a-zA-Z.·\\u0020]+$',//全英文，但可以有空格和中英文.·
     email:'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',//邮箱验证
     phoneReg: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[189])[0-9]{8}$/,//手机号验证
     telReg:/^0\d{2,3}-?\d{7,8}$/, //座机校验
     telReg400:/^400[0-9]{7}/,  //400电话校验
     telReg800:/^800[0-9]{7}/,//800电话校验
}
regexp.checkIDCard=idCard=>{
      var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
    var sum = 0; // 声明加权求和变量
    for (var i = 0; i < 17; i++) {
        var tempnum = idCard.substring(i, i + 1);
        if (tempnum == 'x' || tempnum == 'X') {
            tempnum = 10; // 将最后位为x的验证码替换为10方便后续操作
        }
        sum += Wi[i] * tempnum; // 加权求和
    }
    var valCodePosition = sum % 11; // 得到验证码所位置
    var a_idCard_num = idCard[17];
    if (a_idCard_num == 'x' || a_idCard_num == 'X') {
        a_idCard_num = 10;
    }
    if (a_idCard_num == ValideCode[valCodePosition]) {
        return true;
    } else if (idCard.length > 18) {
        return false;
    } else {
        return false;
    }
}


export default regexp;