import $ from 'cash-dom';
import { setState, getState } from './appstate';
import 'whatwg-fetch';

export const serverURL = 'https://example.com'

export const adjustPanelSize = () => {
    const height = window.innerHeight;
    const headerHeight = $('.header').height();
    $('.leftpanel, .outlinepanel').height(height - headerHeight - 2)
    $('.rightpanel').height(height - headerHeight - 14 - 46)
}

export const updateUserTasks = (whichTask, rmTask) => {
    // get & update app state
    let taskCnt = getState()[whichTask]
    let taskCounter = getState()['taskCounter']
    console.log('before state change: ', taskCnt)
    if (rmTask) {
        setState(whichTask, --taskCnt)
        setState('taskCounter', --taskCounter)
    } else {
        setState(whichTask, ++taskCnt)
        setState('taskCounter', ++taskCounter)
    }
    console.log('after state change: ', getState())

    let outlineHtml = ``
    // add or update task number order in UI
    const userTasks = $('#rightpanel .userTasks > .uniqueTask')
    if (userTasks.length <= 0) {
        $('#tasksPreview').html('<div>No Tasks Added</div>')
        $('#rightpanel .userTasks').html('<li class="alertMsg">Drag & Drop a Task</li>')
        return;
    }
    userTasks.each(function (i, e) {
        let self = $(this)
        self.find('.taskOrderNo').html((i + 1) + '. ')

        // outline preview 
        const taskHeading = self.children('.taskHeading').text().trim()
        const dragEl = self.children('.dragEl')
        outlineHtml += `<li><a href="#">${taskHeading}</a><ul>`
        dragEl.children().each(function (i, e) {
            outlineHtml += `<li>`
            const taskParams = $(this).find('label').text()
            outlineHtml += `${taskParams}</li>`
        })
        outlineHtml += `</ul></li>`
    })
    $('#outlinepanel #tasksPreview').html(outlineHtml)
}

export const initResponsiveNavbar = () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
}

export const downloadJson = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export const sanitizeInputRegex = /^[a-zA-Z]:\/(((?![<>:"\\\/|?*]).)+((?<![ .])\/)?)*$/

export const validateTextField = (regex, inputVal) => {
    regex.test(inputVal) ? true : false
}

export const validateForms = () => {
    let enableJsonBtn = true;
    $('.rightpanel.userTasks .taskValue').each(function (e) {
        const self = $(this)
        const val = self.val().trim()
        // if (!val || val == '' || !validateTextField(sanitizeInputRegex, val)) {
        if (!val || val == '') {
            enableJsonBtn = false;
        }
    })
    enableJsonBtn ? setState('enableGenerateJson', true) : setState('enableGenerateJson', false)
}

// enabled Generate json button
export const enableGenJson = () => {
    if ($('#generateJson').length && getState().enableGenerateJson) {
        $('#generateJson').removeAttr('disabled')
    } else {
        $('#generateJson').attr('disabled', '')
    }
}

export const ajaxValidate = async (url, data) => {
    if (window.fetch) {
        try {
            const request = await fetch(url)
            const response = await request.json()
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}