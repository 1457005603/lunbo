window.onload = function() {
    var focus = document.querySelector('.focus');
    var btn = document.querySelector('.btn');
    var focusUl = focus.querySelector('ul');
    var picli = focus.querySelectorAll('ul li');
    var circleol = focus.querySelector('ol');
    var num = 0; //图片计数器
    var circle = 0; //小圆点计数器
    //进入盒子btn显示隐藏
    focus.addEventListener('mouseenter', function() {
        btn.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave', function() {
        btn.style.display = 'none';
        clearInterval(timer);
        timer = setInterval(function() {
            btn.children[1].click();
        }, 500)
    })

    //动态创建小圆点
    for (var i = 0; i < picli.length; i++) {

        var li = document.createElement('li');
        circleol.appendChild(li);

        li.setAttribute('index', i);
        //排他思想
        li.addEventListener('click', function() {

            for (var i = 0; i < circleol.children.length; i++) {
                circleol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = circle = index;
            console.log(-index * focus.offsetWidth),
                animation(focusUl, {
                        data: {
                            left: -index * focus.offsetWidth
                        },
                        option: {
                            easing: "Back",
                            speed: 1
                        }
                    }, 500,
                    function() {
                        console.log('动画执行了');
                    })
        })
    }
    circleol.children[0].className = 'current';
    //console.log(btn.children[0]);
    //克隆最后一张图片
    var clone = focusUl.children[0].cloneNode(true);
    console.log(clone);

    focusUl.appendChild(clone);


    console.log(picli.length);
    var flag = true; //节流阀防止用户连续点击
    //右侧点击移动
    btn.children[1].addEventListener('click', function() {
        if (flag) {
            flag = false;

            circleol.children[circle].className = '';
            num++;
            circle++;
            console.log(num);
            if (circle === circleol.children.length) {
                circle = 0;
            }
            circleol.children[circle].className = 'current';


            animation(focusUl, {
                    data: {
                        left: -num * focus.offsetWidth
                    },
                    option: {
                        easing: "Circ",
                        speed: 1
                    }
                }, 500,
                function() {
                    if (num === picli.length) {
                        focusUl.style.left = 0;
                        num = 0;
                    }
                    flag = true;
                })
        }

    })

    //左侧按钮 
    btn.children[0].addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num === 0) {
                focusUl.style.left = -(focusUl.children.length - 1) * focus.offsetWidth + 'px';
                num = focusUl.children.length - 1;
            }
            circleol.children[circle].className = '';
            circle--;
            num--;
            if (circle < 0) {

                circle = circleol.children.length - 1;

            }


            circleol.children[circle].className = 'current';



            animation(focusUl, {
                data: {
                    left: -num * focus.offsetWidth
                },
                option: {
                    easing: "Circ",
                    speed: 1
                }
            }, 500, function() {
                console.log(1);

                flag = true;
            })
        }




    })

    var timer = setInterval(function() {
        btn.children[1].click();
    }, 500)










}