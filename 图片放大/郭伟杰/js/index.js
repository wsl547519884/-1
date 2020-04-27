let img1 = document.querySelector('.img1'),
    img2 = document.querySelector('.img2');

let box1 = document.querySelector('.box1'),
    box2 = document.querySelector('.box2');
box1.onmousemove = function (e) {
    let x = e.clientX + 15,
        y = e.clientY - 15;
    img1.style.display = 'block';
    img1.style.left = `${x}px`;
    img1.style.top = `${y}px`;
}
box1.onmouseleave = function (e) {
    img1.style.display = 'none';
}
box2.onmousemove = function (e) {
    let x = e.clientX + 15,
        y = e.clientY - 15;
    img2.style.display = 'block';
    img2.style.left = `${x}px`;
    img2.style.top = `${y}px`;
}
box2.onmouseleave = function (e) {
    img2.style.display = 'none';
}