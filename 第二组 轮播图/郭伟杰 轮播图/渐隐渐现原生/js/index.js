let container = document.querySelector('.container'),
    sliderList = container.querySelectorAll('.slide'),
    pagination = container.querySelector('.pagination'),
    paginationList = pagination.querySelectorAll('li'),
    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');

let step = 0,
    prev = 0,
    interval = 2000,
    autoTimer = null,
    len = sliderList.length;

function change() {
    let cur = sliderList[step],
        pre = sliderList[prev];
    cur.style.zIndex = 1;
    pre.style.zIndex = 0;

    cur.style.transitionDuration = '.3s';
    cur.style.opacity = 1;
    cur.addEventListener('transitionend', function () {
        pre.style.transitionDuration = '0s';
        pre.style.opacity = 0;
    });


    paginationList.forEach((item, index) => {
        if (index === step) {
            item.setAttribute('class', 'active');
            return;
        }
        item.removeAttribute('class');
    })

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
        if (index === step) {
            return;
        }
        prev = step;
        step = index;
        change();
    };
});

changeRight.onclick = autoMove;
changeLeft.onclick = function () {
    prev = step;
    step--;
    step < 0 ? step = len - 1 : null;
    change();
};