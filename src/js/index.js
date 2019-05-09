import "bulma/css/bulma.css"
import '../css/main.css'
import $ from 'cash-dom';
import { dragndrop } from './drag';
import { adjustPanelSize } from './helpers';
import config from '../json/config.json';

let leftpanel = `
    <div class="column is-one-fifth leftpanel">
        <div class="menu">
            <p class="menu-label">Application Type</p>
            <ul class="menu-list bloc">
                <li>
                    <a class="drag-item" href="#">SAS</a>
                </li>
                <li>
                    <a class="drag-item" href="#">SQL</a>
                </li>
                <li>
                    <a class="drag-item" href="#">IIS</a>
                </li>
            </ul>

            <p class="menu-label">Available Tasks</p>
            <ul class="menu-list">
                <li>
                    <a href="#">File Tasks</a>
                    <ul class="is-hidden bloc">
                        <li><a href="#">copy File</a></li>
                        <li><a href="#">delete File</a></li>
                        <li><a href="#">move File</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Folder Tasks</a>
                    <ul class="is-hidden bloc">
                        <li><a href="#">copy folder</a></li>
                        <li><a href="#">move folder</a></li>
                        <li><a href="#">delete folder</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
`

let rightpanel = `
    <div class="column rightpanel bloc">
        <div>
            <div class="field">
                <label class="label">Source</label>
                <div class="control">
                    <input class="input" type="text" placeholder="//">
                </div>
            </div>
            <div class="field">
                <label class="label">Destination</label>
                <div class="control">
                    <input class="input" type="text" placeholder="//">
                </div>
            </div>
        </div>
    </div>
`


$(document).ready(function () {

    setTimeout(() => {
        $('.mainApp').html(leftpanel + rightpanel);
        adjustPanelSize()
        dragndrop()
    }, 1000);

    console.log(config)

    let resizeTimer;
    $(window).on('resize', function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            adjustPanelSize()
        }, 250);

    });

    $('body').on('click', '.menu-list > li > a', function (e) {
        e.preventDefault();
        let target = $(this).parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')

    })

    $('body').on('click', '#genxguruNavbar .has-dropdown > a.navbar-link', function (e) {
        e.preventDefault();
        let target = $(this).parent('.navbar-item');
        target.toggleClass('is-active');
    })
})