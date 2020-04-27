let container = document.querySelector('.container'),
    slideList = container.querySelectorAll('.slide'),
    pagination = container.querySelector('.pagination'),
    paginationList = Array.from(pagination.querySelectorAll('li')),
    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');

let step = 0,
    prev = 0,
    interval = 3000,
    autoTimer = null,
    len = slideList.length;

function change() {
    let cur = slideList[step],
        pre = slideList[prev];
    cur.style.zIndex = 1;
    pre.style.zIndex = 0;
    cur.style.opacity = 1;
    cur.style.transitionDuration = '0.5s';
    if (cur.style.opacity = 1) {
        pre.style.transitionDuration = '0s';
        pre.style.opacity = 0;
    }
    paginationList.forEach((item, index) => {
        if (index === step) {
            item.className = 'active';
            return;
        }
        item.className = '';
    });
}

    function autoMove() {
        prev = step;
        step++;
        step > (len - 1) ? step = 0 : null;
        change();
    }
    autoTimer = setInterval(autoMove, interval);

    container.onmouseenter = function () {
        clearInterval(autoTimer);
    };
    
    container.onmouseleave = function () {
        autoTimer = setInterval(autoMove, interval);
    };
    paginationList.forEach((item, index) => {
        item.onclick = function () {
            let btnIndex = this.index;
            if (index === step) return;
            prev = step;
            step = index;
            change();
        }
    });
    changeRight.onclick = function () {
        autoMove();
    }
    changeLeft.onclick = function () {
        prev = step;
        step--;
        step < 0 ? step = len - 1 : null;
        change();
    }