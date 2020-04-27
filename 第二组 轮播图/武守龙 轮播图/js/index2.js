let container = document.querySelector('.container'),
    slideList = container.querySelectorAll('.wrapper .slide'),
    paginationList = container.querySelectorAll('.pagination li'),
    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');
let step = 0,
    prev = 0,
    interval = 1000,
    autoTimer = null,
    len = slideList.length;
// 实现渐隐渐显
function change() {
    let slidePrev = slideList[prev],
        slideStep = slideList[step];
    slidePrev.style.zIndex = 0;
    slideStep.style.zIndex = 1;
    slideStep.style.transitionDuration = '.3s';
    slideStep.style.opacity = 1;
    // slidePrev.style.opacity = 0;
    slideStep.addEventListener('transitionend', handle, false);

    function handle() {
        slidePrev.style.transitionDuration = '0s';
        slidePrev.style.opacity = 0;
    }
    pagination();
}
// 实现自动渐隐渐显
function autoFunc() {
    prev = step;
    step++;
    step === len ? step = 0 : null;
    change();
}
// 实现焦点对齐
function pagination() {
    [...paginationList].forEach((item, index) => {
        index === step ? item.className = 'active' : item.className = '';
    });
};
autoTimer = setInterval(autoFunc, interval);
// 鼠标移上时，不动，移开时，接着动
container.onmouseenter = function () {
    clearInterval(autoTimer);
};
container.onmouseleave = function () {
    autoTimer = setInterval(autoFunc, interval);
};
// 点击焦点实现切换
[...paginationList].forEach((item, index) => {
    item.onclick = function () {
        if (step === index) return;
        prev = step;
        step = index;
        change();
    };
});
// 点击实现左右切换
changeLeft.onclick = function () {
    prev = step;
    step--;
    step < 0 ? step = len - 1 : null;
    change();
};
changeRight.onclick = function () {
    autoFunc();
}