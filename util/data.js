import compressorImage from './compressorImage'
let data={}
//去除标签
data.removeLabel = function(content) {
    var temp = content.replace(/<\/?.+?>/g, "");
    var result = temp.replace(/ /g, ""); //result为得到后的内容
    return result;
}
//去除样式
data.removeStyle = function(content, style) {
    if (content) {
        var reg = new RegExp(style, 'g');
        var content1 = content.replace(reg, '');
        return content1;
    }
}
//显示总数
data.showCount = function(count, text) {
    return count ? (count >= 10000 ? (count / 10000).toFixed(1) + (text ? '万' : "w") : count) : 0;
}
//添加参数
data.unshift=(value,type)=>{
    let str=value;
    if(type=='zero'&&value<9){
        str+='0'+value
    }else if('http'&&value.indexOf('http')==-1){
        str+='http'+value
    }
}
//转base64
data.fileToBase64Async=function(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  }
  data.compressorImage=compressorImage

export default data;
