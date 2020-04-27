// 获取元素
let container = document.querySelector('.container'),
    slideList = document.querySelectorAll('.slide'),
    paginationList = document.querySelectorAll('li'),
    changeLeft = document.querySelector('.changeLeft'),
    changeRight = document.querySelector('.changeRight');
let step = 0,
    prev = 0,
    interval = 2000,
    autoTimer = null,
    len = slideList.length;
// change 实现切换
function change() {
    let cur = slideList[step],
        pre = slideList[prev];
    cur.style.zIndex = '1';
    pre.style.zIndex = '0';
    cur.style.transitionDuration = '.3s';
    cur.style.opacity = '1';
    cur.addEventListener('transitionend', handle, false)

    function handle() {
        pre.style.transitionDuration = '0s';
        pre.style.opacity = '0';
    }
    // pre.style.transition = '.3s';
    // pre.style.opacity = '0';
    paginationFocus();

}
// 焦点自动对齐
function paginationFocus() {
    [].forEach.call(paginationList, (item, index) => {
        if (index === step) {
            item.className = 'active';
            return;
        }
        item.className = '';
    });
}
// 自动切换
function autoMove() {
    prev = step;
    step++;
    step > (len - 1) ? step = 0 : null;
    change();
}
// 加载页面开始自动切换
autoTimer = setInterval(autoMove, interval);
// 鼠标进入和离开控制自动的关闭和开启
container.onmouseenter = function () {
    clearInterval(autoTimer);
};
container.onmouseleave = function () {
    autoTimer = setInterval(autoMove, interval);
};
// 点击焦点切换
[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        if (index === step) {
            return;
        }
        prev = step;
        step = index;
        change();
    }
});
// 点击左右按钮切换
changeLeft.onclick = autoMove;
changeRight.onclick = function () {
    prev = step;
    step--;
    step < 0 ? step = len - 1 : null;
    change();
}