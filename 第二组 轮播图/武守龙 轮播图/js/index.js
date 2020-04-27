let $container = $('.container'),
    $wrapper = $container.find('.wrapper'),
    $sliderList = $wrapper.find('.slider'),
    $paginationList = $('.pagination li'),
    $changeLeft = $('.changeLeft'),
    $changeRight = $('.changeRight');
let step = 0,
    interval = 1000,
    autoTimer = null,
    len = $sliderList.length;
// 自动切换
function autoMove() {
    if (step === (len - 1)) {
        step = 0;
        $wrapper.css('transitionDuration', '0s');
        $wrapper.css('left', -step * 800);
        $wrapper.outerWidth();
    }
    step++;
    $wrapper.css('transitionDuration', '.3s');
    $wrapper.css('left', -step * 800);
    pagination();
}
// 焦点对齐
function pagination() {
    let step1 = step;
    if (step1 === (len - 1)) {
        step1 = 0;
    }
    $paginationList.eq(step1).addClass('active').siblings().removeClass('active');
}
// 定时器运行
autoTimer = setInterval(autoMove, interval);
// 鼠标滑进去，清除定时器 鼠标移出，重新启动定时器
$container.on('mouseenter', function () {
    clearInterval(autoTimer);
}).on('mouseleave', function () {
    autoTimer = setInterval(autoMove, interval);
});
// 点击焦点实现切换
$paginationList.on('click', function () {
    let index = $(this).index();
    if (index === step || (index === 0 && step === (len - 1))) return;
    step = index;
    $wrapper.css('transitionDuration', '.3s');
    $wrapper.css('left', -step * 800);
    pagination();
});
// 点击左右按钮实现切换
$changeLeft.on('click', function () {
    if (step === 0) {
        step = len - 1;
        $wrapper.css('transitionDuration', '0s');
        $wrapper.css('left', -step * 800);
        $wrapper.outerWidth();
    }
    step--;
    $wrapper.css('transitionDuration', '.3s');
    $wrapper.css('left', -step * 800);
    pagination();
});
$changeRight.on('click', function () {
    autoMove();
});