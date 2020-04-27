$(function () {
    let $container = $(".container"),
        $wrapper = $container.find('.wrapper'),
        $sliderList = $container.find('.wrapper>div'),
        $paginationList = $container.find('.pagination>li'),
        $changeLeft = $container.children('.changeLeft'),
        $changeRight = $container.children('.changeRight');

    let step = 0,
        interval = 1000,
        autoTimer = null,
        len = $sliderList.length;

    //自动轮播
    function autoMove() {
        if (step === (len - 1)) {
            step = 0;
            $wrapper.css('transition', '0s');
            $wrapper.css('left', '0px');
            $wrapper.offset().top;
        }
        step++;
        $wrapper.css('transitionDuration', '0.3s');
        $wrapper.css('left', function () {
            return -step * 800 + 'px';
        });
        paginationFocus();
    }

    //焦点对齐
    function paginationFocus() {
        let tempStep = step;
        tempStep === (len - 1) ? tempStep = 0 : null;
        $paginationList.each((index, item) => {
            if (index === tempStep) {
                item.className = 'active';
                return;
            }
            item.className = '';
        })
    }
    //加载页面自动轮播
    autoTimer = setInterval(autoMove, interval);
    // 鼠标进入到CONTAINER停止自动轮播，离开后自动轮播可以继续
    $container.on('mouseenter', function () {
        clearInterval(autoTimer);
    });
    $container.on('mouseleave', function () {
        autoTimer = setInterval(autoMove, interval);
    });
    //点击左右按钮切换
    $changeRight.on('click', function () {
        autoMove();
    });
    $changeLeft.on('click', function () {
        if (step === 0) {
            step = len - 1;
            $wrapper.css('transition', '0s');
            $wrapper.css('left', function () {
                return -step * 800 + 'px';
            });
            $wrapper.offset().top;
        }
        step--;
        $wrapper.css('transitionDuration', '0.3s');
        $wrapper.css('left', function () {
            return -step * 800 + 'px';
        });
        paginationFocus();
    });

    //点击焦点切换
    $paginationList.each((index, item) => {
        item.onclick = function () {
            if (index === step || (index === 0 && step === (len - 1))) {
                return;
            }
            step = index;
            $wrapper.css('transitionDuration', '0.3s');
            $wrapper.css('left', function () {
                return -step * 800 + 'px';
            });
            paginationFocus();
        }
    });




});
