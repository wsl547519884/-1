let _filter = function _filter(arr, callback, context = window) {
    if (arr == null) return;
    if (!Array.isArray(arr)) {
        throw new Error("arr必须是一个数组");
    };
    if (typeof callback !== "function") {
        throw new Error("callback必须是一个函数");
    }
    let arr1 = [];
    for (let i = 0; i < arr.length; i++) {
        let res = callback.call(context, arr[i], i);
        if (res) arr1.push(arr[i]);
    };
    return arr1;
};

let arr = [12, 13, 14];
let arr1 = _filter(arr, (item, index) => {
    return item > 13
});
arr.filter((item, index) => {
    return 1;
});