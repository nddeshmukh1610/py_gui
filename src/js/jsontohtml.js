import inventory from '../json/inventory.json';
import applicationTypes from '../json/apps.json';


const generateTasksHtml = () => {
    let s = ''
    for (const tlKey in inventory) {
        const task = inventory[tlKey]
        const taskGroupTitle = tlKey.replace('-', ' ')
        s += `<li id=${tlKey} class="taskGroup is-hidden">
                <a href="#">${taskGroupTitle}
                    <span class="icon"><i class="fas fa-caret-right"></i></span>
                </a>
                <ul class="is-hidden dragulaContainers">`
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
                    s += `<li class="draggableEl uniqueTask" taskname=${taskKey} taskgroup=${tlKey} >
                            <span class="rmTask icon has-text-danger">
                                <i class="fas fa-trash"></i>
                            </span>
                            <a href="#" class="taskHeading dragHandle">
                                <span class="icon"><i class="far fa-copy"></i></span> 
                                <span class="taskOrderNo"></span>
                                ${taskTitle}
                            </a>`
                    for (const propKey in taskProps) {
                        const parameters = taskProps[propKey]
                        if (propKey === 'parameters') {
                            s += `<div class="dragEl is-hidden">`
                            for (const elKey in parameters) {
                                const elProps = parameters[elKey]
                                const elType = elProps['element']
                                const isRequired = elProps['required']
                                const hasPlaceholder = elProps['placeholder']
                                if (typeof elType !== 'undefined') {
                                    switch (elType) {
                                        case 'input-text':
                                            s += `<div class="field">
                                                    <label class="label ${isRequired ? "required" : ""}">${elKey}</label>
                                                    <div class="control">
                                                        <input class="input taskValue" type="text" ${isRequired ? "required" : ""} placeholder=${hasPlaceholder ? hasPlaceholder : ''}>
                                                    </div>
                                                </div>`

                                            break;
                                        case 'input-file':
                                            s += `<div class="field">
                                                    <label class="label ${isRequired ? "required" : ""}">${elKey}</label>
                                                    <div class="control">
                                                        <input class="file taskValue" ${isRequired ? "required" : ""} type="text" placeholder=${hasPlaceholder ? hasPlaceholder : ''}>
                                                    </div>
                                                </div>`

                                            break;
                                        case 'select':
                                            const elOptions = elProps['options']
                                            const options = elOptions.map(opt => `<option>${opt}</option>`)
                                            s += `<div class="field">
                                                        <label class="label ${isRequired ? "required" : ""}">${elKey}</label>
                                                        <div class="control">
                                                            <div class="select">
                                                                <select class="taskValue" ${isRequired ? "required" : ""}><option></option>${options}</select>
                                                            </div>
                                                        </div>
                                                    </div>`

                                            break;
                                        case 'textarea':
                                            s += `<div class="field">
                                                    <label class="label ${isRequired ? "required" : ""}">${elKey}</label>
                                                    <div class="control">
                                                        <textarea class="textarea taskValue" name="" id="" ${isRequired ? "required" : ""}  placeholder=${hasPlaceholder ? hasPlaceholder : ''}></textarea>
                                                    </div>
                                                </div>`
                                            break;
                                    }
                                }
                            }
                            s += `</div>`
                        } else if(propKey === 'action') {
                            s += `<span class="taskAttributes is-hidden"  ${propKey}= ${parameters}></span>`
                        } else if(propKey === 'icon'){
                            
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
    return s;
}

export const generateApplicationHtml = () => {
    let s = ``
    for (const appTypeKey in applicationTypes) {
        const appAttributes = applicationTypes[appTypeKey];
        if (typeof appAttributes['applicable-tasks'] !== 'undefined') {
            const appAttr = appAttributes['applicable-tasks'].join(',')
            s += `<a class="navbar-item" applicableTasks=${appAttr} href="#">${appTypeKey}</a>`

        }
    }
    return s;
}

export const jsonToHtml = () => {
    const tasksHtml = generateTasksHtml()
    const leftpanel = `
        <div class="column is-one-fifth leftpanel" id="leftpanel">
            <div class="menu">
                <p class="menu-label">Tasks</p>
                <ul class="menu-list" id="tasksList">${tasksHtml}</ul>
            </div>
        </div>
    `
    const rightpanel = `
            <div class="column" id="rightpanel">
                <div class="control is-clearfix panelHead">
                    <h2 class="is-pulled-left">Tasks View</h2>
                    <button class="button is-info is-pulled-right" id="generateJson" disabled>Generate JSON</button>
                </div>
                <ul class="dragulaContainers rightpanel userTasks"><p class="alertMsg">Select Application Type</p></ul>
            </div>
    `
    const outlinepanel = `
        <div class="column is-one-fifth outlinepanel" id="outlinepanel">
            <div class="menu">
                <p class="menu-label">Outline</p>
                <ul class="menu-list is-centered" id="tasksPreview"><div>No Tasks Added</div></ul>
            </div>
        </div>
    `

    return leftpanel + rightpanel + outlinepanel;
}