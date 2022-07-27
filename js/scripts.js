linkStylish();

competitionsCircleOnLoad();
competitionPosCalc();

window.addEventListener('resize', () => {

    competitionPosCalc();
});

let paralaxImages = document.querySelectorAll(".paralax-img");

let paralaxStartPos = new Array();
let paralaxEndPos = new Array();
let scrollPosition = new Array();

paralaxImages.forEach((item) => {

    paralaxStartPos.push(window.pageYOffset + item.getBoundingClientRect().y - window.innerHeight);
    paralaxEndPos.push(window.pageYOffset + item.getBoundingClientRect().y + item.getBoundingClientRect().height + window.innerHeight);
    scrollPosition.push(0);
});

window.addEventListener('scroll', () => {

    paralaxImages.forEach((item, number) => {

        if ((window.pageYOffset > paralaxStartPos[number]) && (window.pageYOffset < paralaxEndPos[number])) {

            let direction = 0;

            if (window.pageYOffset > scrollPosition[number])
            {
                direction = -2;
            }
            else {

                direction = 2;
            }

            scrollPosition[number] = window.pageYOffset;

            let oldPositionY = parseInt(getComputedStyle(item).getPropertyValue("top"));

            item.style.top = oldPositionY + direction + "px";
        }
    });
    
});

function linkStylish() {

    document.querySelectorAll('a[href^="#"').forEach(link => {
    
        link.addEventListener('click', function(e) {
    
            e.preventDefault();
    
            let href = this.getAttribute('href').substring(1);
    
            const scrollTarget = document.getElementById(href);
    
            let topOffset;
            let elementPosition;
            let offsetPosition;
    
            if (window.screen.width < 1024) {

                openMobileMenu();
    
                topOffset = 290;
                elementPosition = scrollTarget.getBoundingClientRect().top;
                offsetPosition = elementPosition - topOffset;
            }
            else {
    
                topOffset = parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--menu-height'));
                elementPosition = scrollTarget.getBoundingClientRect().top;
                offsetPosition = elementPosition - topOffset;
            }
    
            window.scrollBy({
    
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function closeMenu() {

    let mobileMenuHiddenPart = document.getElementById("mobileMenuHidden");
    let menuItems = document.querySelectorAll('.mobile-menu-item');
    let burger = document.querySelector('.burger__img');


    if (mobileMenuHiddenPart.classList.contains("opened")) {

        mobileMenuHiddenPart.classList.remove("opened");

        menuItems.forEach(item => {
            item.classList.remove("opened");
        })

        burger.classList.remove("opened");

        document.querySelector('main').style.paddingTop = '120px';
    }
}

function openMobileMenu() {

    let mobileMenuHiddenPart = document.getElementById("mobileMenuHidden");
    let menuItems = document.querySelectorAll('.mobile-menu-item');
    let burger = document.querySelector('.burger__img');

    if (mobileMenuHiddenPart.classList.contains("opened")) {

        mobileMenuHiddenPart.classList.remove("opened");
        mobileMenuHiddenPart.classList.add("hidden");

        menuItems.forEach(item => {

            item.classList.remove("opened");
            item.classList.add("hidden");
        });

        burger.classList.remove("opened");
        burger.classList.add("hidden");

        menuUp();
    }
    else {

        if (mobileMenuHiddenPart.classList.contains("hidden")) {

            mobileMenuHiddenPart.classList.remove("hidden");

            menuItems.forEach(item => {

            item.classList.remove("hidden");
            })

            burger.classList.remove("hidden");
        }

        mobileMenuHiddenPart.classList.add("opened");

        menuItems.forEach(item => {

            item.classList.add("opened");
        });

        burger.classList.add("opened");

        menuDown();
    }
}

function menuDown() {

    let main = document.querySelector('main');

    let paddingOffset = 120;

    let mainPaddingOffsetTimer = setInterval(() => {

        paddingOffset += 1;

        main.style.paddingTop = paddingOffset + 'px';
    }, 5);

    setTimeout(() => {

        clearInterval(mainPaddingOffsetTimer);
    }, 1000);
}

function menuUp() {

    let main = document.querySelector('main');

    let paddingOffset = 320;

    let mainPaddingOffsetTimer = setInterval(() => {

        paddingOffset -= 1;

        main.style.paddingTop = paddingOffset + 'px';
    }, 5);

    setTimeout(() => {

        clearInterval(mainPaddingOffsetTimer);
    }, 1000);
}

function competitionPosCalc() {

    let list = competitionsList;

    let listItmes = list.querySelectorAll(".competition-list-item");

    let radius = list.clientWidth - 70;

    if (window.screen.width < 768) {

        list.style.height = listItmes.length * 80 + 'px';

        listItmes.forEach((item, number) => {

            item.style.setProperty("--position-X-start", 0 + "px");
            item.style.setProperty("--position-Y-start", number * 80 + "px");

            item.style.setProperty("--position-X-end", radius + 70 + "px");
            item.style.setProperty("--position-Y-end", 0 + "px");

            if (item.classList.contains("active")) {
    
                item.style.left = getComputedStyle(item).getPropertyValue('--position-X-end');
                item.style.top = getComputedStyle(item).getPropertyValue('--position-Y-end');
            }
            else if (!item.classList.contains("active")){
    
                item.style.left = getComputedStyle(item).getPropertyValue('--position-X-start');
                item.style.top = getComputedStyle(item).getPropertyValue('--position-Y-start');
            }
        });
    }
    else {

        list.style.height = list.clientWidth + 'px';
    
        let degOffset = 90 / (listItmes.length - 1);
    
        let temp = 0;
        listItmes.forEach((item, number) => {
    
            temp = (listItmes.length - 1) - number;
    
            item.style.setProperty("--position-X-start", Math.round(radius * Math.cos((degOffset * temp) * Math.PI / 180))+ "px");
            item.style.setProperty("--position-Y-start", Math.round(radius * Math.sin((degOffset * temp) * Math.PI / 180)) + "px");
    
            item.style.setProperty("--position-X-end", radius + 70 + "px");
            item.style.setProperty("--position-Y-end", radius + "px");
    
            if (item.classList.contains("active")) {
    
                item.style.left = getComputedStyle(item).getPropertyValue('--position-X-end');
                item.style.bottom = getComputedStyle(item).getPropertyValue('--position-Y-end');
            }
            else if (!item.classList.contains("active")){
    
                item.style.left = getComputedStyle(item).getPropertyValue('--position-X-start');
                item.style.bottom = getComputedStyle(item).getPropertyValue('--position-Y-start');
            }
        });
    }
}

function competitionsCircleOnLoad() {

    let options = {
        root: null,
        threshold: [0.8]
    }

    let observer = new IntersectionObserver((item) => {

        item.forEach(change => {

            if (change.isIntersecting) {

                if (!change.target.classList.contains("show")) {

                    change.target.classList.add('show');
                }

                if (!competitionsList.classList.contains("show")) {

                    competitionsList.classList.add('show');
                }

            }
        });

    }, options);

    let elements = document.querySelectorAll('.competition-list-item');

    for (let element of elements) {
        observer.observe(element);
    }
}

function itemActivator(item) {
    
    if (!item.classList.contains("active")) {

        let listItmes = competitionsList.querySelectorAll(".competition-list-item");

        listItmes.forEach(item => {

            if (item.classList.contains("active")) {

                item.classList.remove("active");
                item.classList.add("inactive");
            }
        });

        if (item.classList.contains("inactive")) {

            item.classList.remove("inactive");
        }

        item.classList.add("active");
    }
    else {

        item.classList.remove("active");
        item.classList.add("inactive"); 
    }

    competitionPosCalc();
}

function accordionItemFunction(item) {

    if (item.firstElementChild.classList.contains("accordion__item__header")) {

        if (item.firstElementChild.classList.contains("open")) {

            item.firstElementChild.classList.remove("open");
            item.firstElementChild.classList.add("hidden");
        }
        else {

            if (item.firstElementChild.classList.contains("hidden")) {

                item.firstElementChild.classList.remove("hidden");
            }

            item.firstElementChild.classList.add("open");
        }
    }

    if (item.lastElementChild.classList.contains("accordion__item__text")) {

        if (item.lastElementChild.classList.contains("open")) {

            item.lastElementChild.classList.remove("open");
            item.lastElementChild.classList.add("hidden");
        }
        else {

            if (item.lastElementChild.classList.contains("hidden")) {

                item.lastElementChild.classList.remove("hidden");
            }

            item.lastElementChild.classList.add("open");
        }
    }
}

function partnerEmitingOn(item) {

    if (item.classList.contains("emitingOff")) {

        item.classList.remove("emitingOff");
    }

    item.classList.add("emitingOn");
}

function partnerEmitingOff(item) {

    if (item.classList.contains("emitingOn")) {

        item.classList.remove("emitingOn");
    }

    item.classList.add("emitingOff");
}

/*function loadParalaxImages() {

    let options = {
        root: null,
        threshold: [0.8]
    }

    let observer = new IntersectionObserver((item) => {

        item.forEach(change => {

            if (change.isIntersecting) {

                scrollParalaxImages();

            }
        });

    }, options);

    let elements = document.querySelectorAll('.paralax-img');

    for (let element of elements) {
        observer.observe(element);
    }
}*/