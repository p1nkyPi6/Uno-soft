document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function(e) {

        e.preventDefault();

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        let topOffset;
        let elementPosition;
        let offsetPosition;

        CloseMenu();

        if (window.screen.width < 1024) {
            topOffset = 120;
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

function CloseMenu() {
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
        })

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
        })

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