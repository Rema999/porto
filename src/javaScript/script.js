'use strict'

$(function () {
    let nav = $(".nav");
    let search = $(".search");
    let burger = $(".burger");
    let loop = $(".loop");

    $(window).resize(function () {
        let width = $(window).width();
        if (width <= 767) {
            nav.hide();
            search.hide();
        }
        if (width >= 768) {
            nav.show();
            search.show();
        }
    });

    $(window).resize();

    burger.click(function () {
        nav.slideToggle(1000);
    });
    loop.click(function () {
        search.slideToggle();
    })
});
