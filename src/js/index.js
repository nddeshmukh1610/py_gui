import "bulma/css/bulma.css"
import '../css/main.css'
import $ from 'cash-dom';

let leftpanel = `
    <div class="column is-one-fifth leftpanel">
        <div class="menu">
            <ul class="menu-list">
                <li>
                    <a href="#">File Operations</a>
                    <ul class="is-hidden">
                        <li><a href="#">copy File</a></li>
                        <li><a href="#">delete File</a></li>
                        <li><a href="#">move File</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">folder Operations</a>
                    <ul class="is-hidden">
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
    <div class="column rightpanel">
        <div class="columns column">
            <div class="column">
                Task Number
            </div>
        </div>
    </div>
`


$(document).ready(function () {

    setTimeout(() => {
        $('.mainApp').html(leftpanel + rightpanel);

    }, 1000);

    $('body').on('click', '.menu-list > li > a', function (e) {
        e.preventDefault();
        let target = $(this).parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')

    })
})