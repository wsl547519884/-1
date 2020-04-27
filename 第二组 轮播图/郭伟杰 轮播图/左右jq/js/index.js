$(function () {
    let $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $sliderList = $wrapper.children('.slider'),
        $pagination = $('.pagination'),
        $paginationList = $pagination.children('li'),
        $changeLeft = $container.children('.changeLeft'),
        $changeRight = $container.children('.changeRight');

    let step = 0,
        interval = 1000,
        autoTimer = null,
        len = $sliderList.length;

    function autoMove() {
        if (step === (len - 1)) {
            step = 0;
            $wrapper.css({
                transitionDuration: '0s',
                left: '0px',
            })
            $wrapper.offset();
        }
        step++;
        $wrapper.css({
            transitionDuration: '.3s',
            left: -step * 800 + 'px',
        })
        paginationFocus();
    }

    function paginationFocus() {
        let tempStep = step;
        tempStep === (len - 1) ? tempStep = 0 : null;
        $paginationList.each((index, item) => {
            if (index === tempStep) {
                $(item).addClass('active');
                return;
            }
            $(item).removeClass('active');
        })
    }

    autoTimer = setInterval(autoMove, interval);

    $container.on('mouseenter', () => clearInterval(autoTimer));
    $container.on('mouseleave', () => autoTimer = setInterval(autoMove, interval));

    $paginationList.each((index, item) => {
        $(item).on('click',function () {
            console.log(1)
            if (index === step || (index === 0 && step === (len - 1))) {
                return;
            }
            step = index;
            // $wrapper.style.transitionDuration = '0.3s';
            // $wrapper.style.left = -step * 800 + 'px';

            $wrapper.css({
                transitionDuration: '.3s',
                left: -step * 800 + 'px',
            })
            paginationFocus();
        })
    })

    $changeRight.on('click', autoMove);
    $changeLeft.on('click', () => {
        if (step === 0) {
            step = len - 1;
            $wrapper.css({
                transitionDuration: '0s',
                left: -step * 800 + 'px',
            })
            $wrapper.offset();
        }
        step--;
        $wrapper.css({
            transitionDuration: '.3s',
            left: -step * 800 + 'px',
        })
        paginationFocus();
    })

})