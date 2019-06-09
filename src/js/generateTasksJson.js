import $ from 'cash-dom';
import JSONFormatter from 'json-formatter-js';

export const generateTasksJson = () => {
    let jsonObj = {}
    const usertasksList = $('.userTasks li.uniqueTask')
    usertasksList.each(function (i, e) {
        const obj = {}
        const self = $(this)
        const taskName = self.attr('taskname').trim()
        const taskGroup = self.attr('taskgroup').trim()
        const taskOrder = ++i;
        const taskInfoDom = self.children('div.dragEl')
        const taskAttrs = self.children('.taskAttributes')
        const action = taskAttrs.attr('action').trim()
        obj['task-order-no'] = taskOrder
        obj['task-group'] = taskGroup
        const paramsObj = {}
        taskInfoDom.children().each(function (i, e) {
            const key = $(this).find('label').text().trim()
            const value = $(this).find('.taskValue').val().trim()
            paramsObj[key] = value
        })
        obj[taskName] = paramsObj
        obj['action'] = action
        jsonObj[taskOrder] = obj
    })

    return jsonObj;
}

export const jsonFormatter = (json) => {
    const formatter = new JSONFormatter(json, 'Infinity', {
        hoverPreviewEnabled: false,
        animateOpen: true,
        animateClose: true,
        useToJSON: false
    })
    return formatter.render()
}