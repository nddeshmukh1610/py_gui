import "bulma/css/bulma.css"
import '../css/main.css'
import $ from 'cash-dom';
import { dragndrop } from './dragndrop';
import {
    adjustPanelSize, initResponsiveNavbar, downloadJson, enableGenJson,
    validateForms, updateUserTasks, serverURL, ajaxValidate, sanitizeInputRegex,
    validateTextField
} from './helpers';
import { initAppState } from './appstate';
import { jsonToHtml, generateApplicationHtml } from './jsontohtml';
import { generateTasksJson, jsonFormatter } from './generateTasksJson';

$(document).ready(function () {

    setTimeout(() => {
        $('.mainApp').html(jsonToHtml());
        $('#genxguruNavbar .lazyloadAppTypes').html(generateApplicationHtml())
        adjustPanelSize()
        initResponsiveNavbar()
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

    $('body').on('click', '#leftpanel .menu-list > li > a', function (e) {
        e.preventDefault();
        const self = $(this)
        const target = self.parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')
        const icon = self.find('.icon i')
        if (icon.hasClass('fa-caret-right')) {
            icon.removeClass('fa-caret-right').addClass('fa-caret-down')
        } else {
            icon.removeClass('fa-caret-down').addClass('fa-caret-right')
        }

    })

    $('body').on('click', '#tasksPreview.menu-list > li > a', function(e){
        e.preventDefault();
        const self = $(this)
        const target = self.parent('li');
        target.children('ul').toggleClass('is-hidden')
        target.toggleClass('is-expand')
    })

    // tasks initialized based on selected application type
    $('body').on('click', '.lazyloadAppTypes > a', function (e) {
        e.preventDefault()
        const self = $(this)
        const applicableTasks = self.attr('applicabletasks').split(',')

        // ajaxValidate(serverURL, self.html())

        let tasksNotSelector = ``
        let tasksAttrSelector = ``
        applicableTasks.forEach((e, i, arr) => {
            tasksAttrSelector += (i === arr.length - 1) ? `#${e}` : `#${e},`
            tasksNotSelector += `:not(#${e})`
        })
        const addTasks = $('#tasksList').children(tasksAttrSelector)
        const removeTasks = $(`#tasksList > li${tasksNotSelector}`)
        addTasks.removeClass('is-hidden')
        removeTasks.addClass('is-hidden')

        $('.alertMsg').html('Drag & Drop a Task');
    })

    $('body').on('click', '#generateJson', function (e) {
        e.preventDefault()
        global.generateJson = generateTasksJson()
        const jsonViewer = $('.jsonViewer')
        const formattedJson = jsonFormatter(global.generateJson)
        const modalBody = jsonViewer.children().find('.modal-card-body')
        modalBody.html('')
        modalBody.append(formattedJson)
        jsonViewer.addClass('is-active')

    })

    $('body').on('click', '#jsonDownload', function (e) {
        e.preventDefault()
        downloadJson('tasks.json', JSON.stringify(global.generateJson))
    })

    $('body').on('click', '.exit-modal', function (e) {
        e.preventDefault()
        const jsonViewer = $('.jsonViewer')
        const modalBody = jsonViewer.children().find('.modal-card-body')
        modalBody.html('')
        jsonViewer.removeClass('is-active')

    })

    $('body').on('click', '.rmTask', function (e) {
        e.preventDefault()
        const self = $(this)
        const rmTaskEl = self.parent('li.taskSection')
        const whichTask = rmTaskEl.attr('taskgroup')
        rmTaskEl.remove()
        updateUserTasks(whichTask, true)
    })

    $('body').on('blur', '.taskValue', function (e) {
        // e.preventDefault() 
        const self = $(this)
        const val = self.val()

        if (self[0].nodeName === 'SELECT') {
            (typeof val === 'undefined' || val === '') ? self.parent('.select').addClass('is-danger') : self.parent('.select').removeClass('is-danger')
        } else {
            (typeof val === 'undefined' || val === '') ? self.addClass('is-danger') : self.removeClass('is-danger')
        }

        validateForms()
        enableGenJson()
    })
})