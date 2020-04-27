let container = document.querySelector('.container'),
    wrapper = container.querySelector('.wrapper'),
    slideList = wrapper.querySelectorAll('.slide'),
    pagination = container.querySelector('.pagination'),
    paginationList = pagination.querySelectorAll('li'),
    btnLeft = container.querySelector('.changeLeft'),
    btnRight = container.querySelector('.changeRight');

let step = 0,
    prev = 0,
    interval = 1000,
    autoTimer = null,
    len = slideList.length;

//此处思想是重点！！
function change() {
    let cur = slideList[step],
        pre = slideList[prev];
    cur.style.zIndex = 1;
    pre.style.zIndex = 0;
    cur.style.opacity = 1;
    cur.addEventListener('transitionend', handle, false)
    function handle() {
        pre.style.transitionDuration = 0;
        pre.style.opacity = 0;
        cur.removeEventListener('transitionend', handle, false);
    }
    //焦点自动对齐
    [].forEach.call(paginationList, (item, index) => {
        if (index === step) {
            item.classList.add("active");
            return;
        }
        item.classList.remove("active");;
    })
};

function autoMove() {
    prev = step;
    step++;
    step > (len - 1) ? step = 0 : null;
    change();
};
autoTimer = setInterval(autoMove, interval);
//鼠标进入和离开自动开启和关闭定时器
container.onmouseenter = function () {
    clearInterval(autoTimer);
}
container.onmouseleave = function () {
    autoTimer = setInterval(autoMove, interval);
}
//绑定左右按钮
btnRight.onclick = function () {
    autoMove();
};

btnLeft.onclick = function () {
    prev = step;
    step--;
    step < 0 ? step = (len - 1) : null;
    change();
};


//点击焦点切换

[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        if (index === step) return;
        prev = step;
        step = index;
        change();
    }
});

// for (let i = 0; i < paginationList.length; i++) {
//     paginationList[i].onclick = function () {
//         if (i === step) return;
//         prev = step;
//         step = i;
//         change();
//     }
// }


// Array.from(paginationList).forEach((item, index) => {
//     item.onclick = function () {
//         if (index === step) return;
//         prev = step;
//         step = index;
//         change();
//     }
// });


