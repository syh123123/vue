let time={}
  /**
     * 时间日期转换成指定格式的字符串
     * @param {Date} date 时间日期
     * @param {String} fmt 格式化类型，如“yyyy-MM-dd HH:mm:ss” 、“yyyy-MM-dd HH:mm:ss EE”
     */
    time.formatDate=(dates, fmt)=>{
        if (dates === undefined || dates === null || dates === '') return ''
        let  date =  new Date(dates);
        let week = {
            '0': '\u65e5',
            '1': '\u4e00',
            '2': '\u4e8c',
            '3': '\u4e09',
            '4': '\u56db',
            '5': '\u4e94',
            '6': '\u516d'
        }
        let o = {
            '(y+|Y+)':date.getFullYear(),
            'M+': date.getMonth() + 1, // 月份
            '(d+|D+)': date.getDate(), // 日期
        // 'h+': date.getHours(),// % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
            '(h+|H+)': date.getHours(), // 24小时制
            'm+': date.getMinutes(), // 分
            '(s+|S+)': date.getSeconds(), // 秒
            // 'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w':'周'+week[date.getDay()]+'',
            S: date.getMilliseconds() // 毫秒
        }
            for (const key in o) {
                let value=(key!='w'&&key!='q+')?(o[key]>9?o[key]:'0'+o[key]):o[key]
                fmt=fmt.replace(new RegExp(key) ,value)
            }
            return fmt
    }
    //倒计时
    time.countDown=(startTime,endTime, fmt)=>{
        var time = parseInt(endTime - startTime);
        var days = Math.floor(time / (1000 * 60 * 60 * 24));
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var seconds = Math.floor((time / 1000) % 60);
        let o={
            'd+':days,
            'h+':hours,
            'm+':minutes,
            's+':seconds
        }
        if(fmt.indexOf('d')==-1){
            o["h+"]+=o["d+"]*24
        }
        if(fmt.indexOf('h')==-1){
            o["m+"]+=(o["d+"]*24+o["h+"]*60)
        }
        if(fmt.indexOf('m')==-1){
            o["s+"]+=(o["d+"]*24+o["h+"]*60+o["m+"]*60)

        }
        for (const key in o) {
            let value=o[key]>9?o[key]:'0'+o[key]
            fmt=fmt.replace(new RegExp(key) ,value)
        }
        return fmt
    }
    //友好时间
    time.friendlyTime = function(startTime,endTime, fmt) {
        let str=''
        if (endTime - startTime<=0) return str
            var times = parseInt(endTime - startTime);
            var days = Math.floor(times / (1000 * 60 * 60 * 24));
            var hours = Math.floor((times / (1000 * 60 * 60)) % 24);
            var minutes = Math.floor((times / (1000 * 60)) % 60);
            var seconds = Math.floor((times / 1000) % 60);
            if (days > 2) {
                var endYear = new Date(endTime).getFullYear();
                var startYear = new Date(startTime).getFullYear();
                if (endYear != startYear) {
                    str= time.formatDate(endTime,fmt);
                } else {
                    str=time.formatDate(endTime,fmt.replace(/y/g,''));
                }
            } else {
                if (days > 0) {
                    str= days + "天前";
                } else {
                    if (hours > 0) {
                        str= hours + "小时前";
                    } else {
                        if (minutes > 0) {
                            str= minutes + "分钟前";
                        } else {
                            str= "刚刚";
                        }
                    }
                }
            }
            return str;
    }
    //时间段的显示
    time.showTime=function(startTime,endTime, fmt,lineStr){ //fmt时间的格式  //lineStr拼接的字符串
        if (startTime === undefined || startTime === null || startTime === '') return ''
        if (endTime === undefined || endTime === null || endTime === '') return ''
        let startStr=new Date(startTime).toLocaleString();
        let endTimeStr=new Date(endTime).toLocaleString();
        if(startStr.split(' ')[0]==endTimeStr.split(' ')[0]){  //同一天
              return  time.formatDate(startTime,fmt)+lineStr+time.formatDate(endTime,fmt.split(' ')[1])
        }else{
              if(startStr.split('/')[0]==endTimeStr.split('/')[0]){  //同一年
                return  time.formatDate(startTime,fmt)+lineStr+time.formatDate(endTime,fmt.substring(5))
              }else{
                return  time.formatDate(startTime,fmt)+lineStr+time.formatDate(endTime,fmt)
              }
        }

    }
    time.showWeek=function(timedat) {
        let week = {
            '0': '\u65e5',
            '1': '\u4e00',
            '2': '\u4e8c',
            '3': '\u4e09',
            '4': '\u56db',
            '5': '\u4e94',
            '6': '\u516d'
        };
        return '周'+week[timedat.getDay()];
    }
// export default time;