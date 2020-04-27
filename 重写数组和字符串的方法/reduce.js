// 第一种
/* let _reduce = function _reduce(arr, callback, content) {
    if (arr == null) return;
    if (!Array.isArray(arr)) {
        throw new Error("arr必须是一个数组");
    };
    if (typeof callback !== "function") {
        throw new Error("callback必须是一个函数");
    };
    let cont = 0;
    let res1 = 0;
    if (content) {
        res1 = callback(content, arr[cont]);
        for (cont++; cont < arr.length; cont++) {
            res1 = callback(res1, arr[cont]);
        };
    } else {
        res1 = callback(arr[cont], arr[++cont]);
        for (cont++; cont < arr.length; cont++) {
            res1 = callback(res1, arr[cont]);
        }
    }
}*/
// 第二种
Array.prototype.reduce = function reduce(callback, base) {
    if (typeof callback !== "function") {
        throw new TypeError("给老子一个函数能死吗？");
    }
    let initArr = this;
    let arr = initArr.concat();
    if (base) arr.unshift(base);
    let index, newValue;
    while (arr.length > 1) {
        index = initArr.length - arr.length + 1;
        newValue = callback.call(null, arr[0], arr[1], index, initArr);
        arr.splice(0, 2, newValue);
    }

    return newValue;
};
let arr = [12, 13, 14, 15];
arr.reduce((prev, next, index) => {
    console.log(prev, next, index);
    return next;
});