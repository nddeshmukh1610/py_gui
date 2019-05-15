import "bulma/css/bulma.css"
import '../css/main.css'
import $ from 'cash-dom';
import { dragndrop } from './dragndrop';
import { adjustPanelSize } from './helpers';
import tasksList from '../json/config.json';
import appTypes from '../json/tasktypes.json';
import { initAppState } from './appstate';


let s = ''
for (const tlKey in tasksList) {
    const task = tasksList[tlKey]
    const taskGroupTitle = tlKey.replace('-', ' ')
    s += `<li id=${tlKey} class="taskGroup"><a href="#">${taskGroupTitle}</a><ul class="is-hidden dragulaContainers">`
    for (const taskKey in task) {
        const taskProps = task[taskKey]
        const taskTitle = taskKey.replace('-', ' ')
        if (taskKey === 'tasks-attributes') {
            s += `<li class="tasksAttributes" `
            for (const attrKey in taskProps) {
                const attr = taskProps[attrKey];
                if (typeof attr === 'object') {
                    console.log('json error: typeof "tasks-attributes" is object or function')
                    break;
                }
                s += ` ${attrKey}=${attr} `
            }

            s += `></li>`
        } else {
            if (Object.keys(taskProps).indexOf('parameters') !== -1) {
                s += `<li class="draggableEl uniqueTask" taskgroup=${tlKey} ><a href="#" class="dragHandle">${taskTitle}</a>`
                for (const propKey in taskProps) {
                    const parameters = taskProps[propKey]
                    if (propKey === 'parameters') {
                        s += `<div class="dragEl is-hidden">`
                        for (const elKey in parameters) {
                            const elProps = parameters[elKey]
                            const elType = elProps['element']
                            if (typeof elType !== 'undefined') {
                                switch (elType) {
                                    case 'input-text':
                                        s += `<div class="field">
                                                    <label class="label">${elKey}</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="//">
                                                    </div>
                                                </div>`

                                        break;
                                    case 'input-file':
                                        s += `<div class="field">
                                                    <label class="label">${elKey}</label>
                                                    <div class="control">
                                                        <input class="file" type="text" placeholder="//">
                                                    </div>
                                                </div>`

                                        break;
                                    case 'select':
                                        s += `<div class="field">
                                                        <label class="label">${elKey}</label>
                                                        <div class="control">
                                                            <div class="select">
                                                                <select>
                                                                    <option></option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 3</option>
                                                                    <option>Option 4</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>`

                                        break;
                                    case 'textarea':
                                        s += `<div class="field">
                                                    <label class="label">${elKey}</label>
                                                    <div class="control">
                                                        <textarea class="textarea" name="" id=""></textarea>
                                                    </div>
                                                </div>`
                                        break;
                                }
                            }
                            // for (const elPropKey in elProps) {

                            //     const elProp = elProps[elPropKey];
                            //     console.log(elPropKey, elProp)
                            // }

                        }
                        s += `</div>`
                    } else {
                        s += `<span class="taskAttributes is-hidden"  ${propKey}= ${parameters}></span>`
                    }
                }
            } else {
                console.log('json error: missing "parameters" property')
                // break;
            }
        }
        s += `</li>`
    }
    s += `</ul></li>`
}


let leftpanel = `
    <div class="column is-one-fifth leftpanel" id="leftpanel">
        <div class="menu">
            <p class="menu-label">Application Type</p>
            <ul class="menu-list dragulaContainers">
                <li class="draggableEl">
                    <a class="drag-item" href="#">SAS</a>
                </li>
                <li class="draggableEl">
                    <a class="drag-item" href="#">SQL</a>
                </li>
                <li class="draggableEl">
                    <a class="drag-item" href="#">IIS</a>
                </li>
            </ul>

            <p class="menu-label">Available Tasks</p>
            <ul class="menu-list" id="tasksList">${s}</ul>
        </div>
    </div>
`

let rightpanel = `
        <div class="column" id="rightpanel">
            <div>
                <ul class="dragulaContainers rightpanel userTasks"></ul>
            </div>
        </div>
`


$(document).ready(function () {

    setTimeout(() => {
        $('.mainApp').html(leftpanel + rightpanel);
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
        const target = $(this).parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')

    })

    $('body').on('click', '#genxguruNavbar .has-dropdown > a.navbar-link', function (e) {
        e.preventDefault();
        const target = $(this).parent('.navbar-item');
        target.toggleClass('is-active');
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