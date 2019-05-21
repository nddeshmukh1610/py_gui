import "bulma/css/bulma.css"
import '../css/main.css'
import $ from 'cash-dom';
import { dragndrop } from './dragndrop';
import { adjustPanelSize } from './helpers';
import { initAppState } from './appstate';
import { jsonToHtml, generateApplicationHtml } from './jsontohtml';

$(document).ready(function () {

    setTimeout(() => {
        $('.mainApp').html(jsonToHtml());
        $('#genxguruNavbar .lazyloadAppTypes').html(generateApplicationHtml())
        adjustPanelSize()
        dragndrop()
        setTimeout(() => {
            initAppState()
        }, 10);
    }, 1000);

    let resizeTimer;
    $(window).on('resize', function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            adjustPanelSize()
        }, 250);

    });

    $('body').on('click', '.menu-list > li > a', function (e) {
        e.preventDefault();
        const self = $(this)
        const target = self.parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')
        target.hasClass('is-expand')
    })

    let isSortable = false;
    $('body').on('click', '.sortBtn', function (e) {
        e.preventDefault();
        if (!isSortable) {
            $('.rightpanel').addClass('stopDragging')
            isSortable = !isSortable;

        } else {
            $('.rightpanel').removeClass('stopDragging')
            isSortable = !isSortable;
        }
    })
})