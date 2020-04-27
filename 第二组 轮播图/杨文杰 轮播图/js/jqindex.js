$(function(){
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

//实现自动轮播
function autoMove() {
    if (step === (len - 1)) {
        step = 0;
        $wrapper.css({
            'transitionDuration': '0s',
            'left': 0
        });
        $wrapper.offset();
    }
    step++;
    $wrapper.css({
        'transition': '0.3s',
        'left': -step * 800
    });
    paginationFocus();
}
//焦点对齐
function paginationFocus() {
    let tempStep = step;
    if (tempStep === (len - 1)) {
        tempStep = 0;
    }
    $paginationList.each((index, item) => {

        if (index === tempStep) {
            $(item).attr('class', 'active');
            return
        } else {
            $(item).attr('class', '');
        }
    })
}
//加载页面自动轮播
autoTimer = setInterval(autoMove, interval);
//鼠标进入到container停止自动轮播
$container.on('mouseenter',function(){
    clearInterval(autoTimer);
});
//鼠标离开时再开始自动滚动
$container.on('mouseleave',function(){
    autoTimer = setInterval(autoMove, interval);
});
//点击焦点实现切换
$paginationList.each((index,item)=>{
    let $item=$(item);
    $item.on('click',function(){
        if(step===index||index===0&&step===(len-1)){
            return;
        }
        //单击项的索引是谁，就让谁切换到那一张
        step=index;
        $wrapper.css({
            'transition': '0.3s',
            'left': -step * 800
        });
        paginationFocus();
    })
})
//点击左右按钮实现切换
$changeRight.on('click',function(){
    autoMove();
})
$changeLeft.on('click',function(){
    if(step===0){
        step=len-1;
        $wrapper.css({
            'transition':'0s',
            'left':-step*800,
        });
        $wrapper.offset();
    }
    step--;
    $wrapper.css({
        'transition':'0.3s',
        'left':-step*800,
    });
    paginationFocus();
})
});

