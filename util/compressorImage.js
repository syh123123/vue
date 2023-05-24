import Compressor from '../js/compressorImage/compressor.min.js';
/**
 * @param image 图片
 * @param backType 需要返回的类型blob,file
 * @param quality 图片压缩比 0-1,数字越小，图片压缩越小
 * @returns
 */
 let compressorImage=function(image, backType, quality) {
    var maxSize=20*1024*1024   //>20M 使用最小压缩
    var quality=image.size>maxSize?0.6:0.8;
    return new Promise((resolve, reject) => {
        new Compressor(image, {
            quality:quality,
            success(result) {
                let file = new File([result], image.name, { type: image.type })

                if (!backType || backType == 'blob') {
                    resolve(result)
                } else if (backType == 'file') {
                    resolve(file)
                } else {
                    resolve(file)
                }
            },
            error(err){
                console.log('图片压缩失败---->>>>>',err)
                reject(err)
            }
        })
    })
}
export default compressorImage