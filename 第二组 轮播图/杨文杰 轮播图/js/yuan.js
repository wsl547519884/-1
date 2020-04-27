let container = document.querySelector('.container'),
    slideList = document.querySelectorAll('.slide'),
    paginationList = container.querySelectorAll('.pagination>li'),
    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');
let step = 0,
    prev = 0,
    interval = 1000,
    autoTimer = null,
    len = slideList.length;

//实现切换
function change() {
    let cur = slideList[step],
        pre = slideList[prev];
    cur.style.zIndex = '1';
    pre.style.zIndex = '0';
    cur.style.transition = '.3s';
    cur.style.opacity = '1';
    pre.style.transition = '0.3s';
    pre.style.opacity = '0';
    paginationFocus();
}
//AUTOMOVE自动切换
function autoMove() {
    prev = step;
    step++;
    step > (len - 1) ? step = 0 : null;
    change();
}
autoTimer = setInterval(autoMove, interval);
//焦点对齐
function paginationFocus() {
    let tempStep = step;
    if (tempStep === len) {
        tempStep = 0;
    }
    paginationList.forEach((item, index) => {
        if (index === tempStep) {
            item.className = 'active';
            return;
        } else {
            item.className = '';
        }

    })
}
//鼠标进入时停止
container.onmouseenter = function () {
    clearInterval(autoTimer);
}
//鼠标离开时开始渐变切换
container.onmouseleave = function () {
    autoTimer = setInterval(autoMove, interval);
}
//点击焦点切换
Array.from(paginationList).forEach((item, index) => {
    item.onclick = function () {
        if (index === step) {
            return
        }
        prev = step;
        step = index;
        change();
    }
})

//点击右边按钮实现切换
changeRight.onclick = function () {
    autoMove();
}
//点击左边按钮实现切换
changeLeft.onclick = function () {
    prev = step;
    step--;
    step < 0 ? step = len - 1 : null;
    change();
}