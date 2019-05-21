import tasksList from '../json/config.json';
import applicationTypes from '../json/tasktypes.json';


const generateTasksHtml = () => {
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
                    s += `<li class="draggableEl uniqueTask" taskgroup=${tlKey} ><a href="#" class="dragHandle"><span class="taskOrderNo"></span> ${taskTitle}</a>`
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
                <ul class="menu-list" id="tasksList">${tasksHtml}</ul>
            </div>
        </div>
    `
    const rightpanel = `
            <div class="column" id="rightpanel">
                <div>
                    <ul class="dragulaContainers rightpanel userTasks"></ul>
                </div>
            </div>
    `
    return leftpanel + rightpanel;
}