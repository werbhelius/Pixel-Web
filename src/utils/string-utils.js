const URL_REG = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g
const AT_REG = /@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}/g
const TAG_REG = /#[^#]+#/g

export const getUrlKey = (key) => {
    return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export const formatContent = (content) => {

    let format = content.replace(URL_REG, function ($0) {
        return '<a href="$0" >' + $0 + '</a>'
    })

    format = format.replace(AT_REG, function ($0) {
        return '<a href="$0" >' + $0 + '</a>'
    })

    format = format.replace(TAG_REG, function ($0) {
        return '<a href="$0" >' + $0 + '</a>'
    })

    return format;
}

export const formatImgThumb = (img) => {

    let format = img.replace('thumbnail', 'thumb180');
    format = format.replace('wx1', 'wx3')
    return format
}

export const formatImgMiddle = (img) => {

    let format = img.replace('thumbnail', 'bmiddle');
    return format
}

export const formatNum = (num) => {
    let result
    if (num > 999) {
        if (num > 9999) {
            result = "9k+"
        } else {
            result = Math.round(num / 1000) + "k+"
        }
    } else {
        result = num
    }
    return result;
}