'use strict'

$(function () {

    let burger = $('.open-list');
    let cross = $('.close-list');
    let menu = $('.tablet-list');
    let search = $('.open-search');
    let close = $('.close-search');
    let form = $('.hide-form');

    $(".owl-carousel").owlCarousel(
        {
            loop: false,
            responsiveClass: true,
            singleItem: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                },
                600: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 1,
                    nav: true,
                },
            }
        });

    let outs = document.querySelectorAll('.owl-out');
    for (let out of outs) {

        let owl = out.querySelector('.owl-carousel');
        let btns = out.querySelectorAll(':scope .thumb');

        let owlJq = $(owl);
        owlJq.owlCarousel({
            items: 1,
            loop: false,
            margin: 10,
            nav: true,
            dots: false,
        });

        for (let btn of btns) {
            btn.addEventListener('click', function () {
                owlJq.trigger('to.owl.carousel', [$(this).index()]);
            })
        }
    }

/*media check*/
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            $(".show-menu").on("click", function (e) {
                e.preventDefault();
                $(this).find(".show-hide-menu").slideToggle();
            });
        }
    });



    search.click(function () {
        close.show();
        search.hide();
        form.slideToggle();
    });

    close.click(function () {
        search.show();
        close.hide();
        form.slideToggle();
    });


    burger.click(function () {
        burger.hide();
        cross.show();
        menu.slideToggle();

    });

    cross.click(function () {
        cross.hide();
        burger.show();
        menu.slideToggle();
    });
});
