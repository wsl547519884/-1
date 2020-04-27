let $container = $('.container'),
    $wrapper = $('.wrapper'),
    $sliderList = $('.slider'),
    $pagination = $('.pagination'),
    $paginationList = $('li'),
    $changeLeft = $('.changeLeft'),
    $changeRight = $('.changeRight');
let step = 0,
    interval = 1000,
    autoTimer = null,
    len = $sliderList.length;
// 自动轮播
function autoMove() {
    if (step === (len - 1)) {
        step = 0;
        $wrapper.css({
            'transition': '0s',
            'left': 0
        })
        $wrapper.offset();
    }
    step++;
    $wrapper.css({
        'transition': '0.3s',
        'left': -step * 800
    });
    paginationFocus();
}
autoTimer = setInterval(autoMove, interval);
// 焦点对齐
function paginationFocus() {
    let tempStep = step;
    tempStep === (len - 1) ? tempStep = 0 : null;
    $paginationList.each((index, item) => {
        if (index === tempStep) {
            $(item).addClass('active');
            return;
        }
        $(item).removeClass('active');
    });
};
// 鼠标进入到container停止自动轮播,离开后自动轮播可以继续
$container.on('mouseenter', () => clearInterval(autoTimer))
    .on('mouseleave', () => autoTimer = setInterval(autoMove, interval));
// 点击焦点实现对齐
$paginationList.on('click',function(){
    // $(this),index() 当前点击这一项的索引
    let index = $(this).index();
    if(index ===step || (index ===0 && step ===(len-1))){
        return;
    }
    // 点击的索引是谁，就让wrapper切换到哪一张即可
    step = index;
    $wrapper.css({
        'transition':'0.3s',
        'left':-step*800
    })
    paginationFocus();
})
// 点解左右按钮实现切换
$changeRight.on('click',autoMove);
$changeLeft.on('click',function(){
    // 如果当前已经是真实的第一张，在减左侧没东西了，此时我们让其快速移动到克隆的第一张（末尾），紧接着运动到倒数第二张（真实的最后一张）
    if(step ===0){
        step = len -1;
        $wrapper.css({
            'transition':'0s',
            'left':-step*800
        })
        $wrapper.offset();
    }
    step --;
    $wrapper.css({
        'transition':'0.3s',
        'left':-step*800
    })
    paginationFocus();
})