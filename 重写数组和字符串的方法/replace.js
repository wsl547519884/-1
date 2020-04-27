let str = "wu111wu111";
/* str.replace(/(wu)(\d+)/g, (item, index, a, b) => {
    return index;
}) */
let _replace = function _replace(str, content, callback) {
    if (str == null) return;
    if (typeof str !== "string") {
        throw new Error("str必须是一个字符串");
    };
    let arr = [];
    let cont = 0;
    if (content instanceof RegExp) {
        // content是一个正则时
        let res = content.exec(str);
        let index = null;
        let value = null;
        let str1 = str;
        while (res) {
            let arr1 = [];
            // 判断是否有全局修饰符g
            if (index === res.index) return str1;
            index = res.index;
            // 当正则有小括号时
            for (let i = 0; i < res.length; i++) {
                arr1.push(res[i]);
            };
            // 当callback不为函数时，直接获取第一个值
            value = res[0];
            res = content.exec(str);
            cont = str1.indexOf(value);
            arr = str1.split('');
            if (typeof callback === "function") {
                let res1 = callback(...arr1, index, str);
                if (res1 == null) res1 = res1 + '';
                arr.splice(cont, value.length, res1);
            } else {
                arr.splice(cont, value.length, callback);
            }
            str1 = arr.join('');
        }
        return str1;
    } else {
        // content不为正则时
        cont = str.indexOf(content);
        arr = str.split('');
        if (typeof callback === "function") {
            let res1 = callback(content, cont, str);
            if (res1 == null) res1 = res1 + '';
            arr.splice(cont, content.length, res1);
        } else {
            arr.splice(cont, content.length, callback);
        }
        str = arr.join('');
        console.log(str);
        return str;
    }
}
/* _replace(str, 'wu', (item, index, a, b) => {
    console.log(item, index, a, b);
}); */
_replace(str, /(wu)(\d+)/g, (item, index, a, b) => {
    console.log(item, index, a, b);
    return index;
});