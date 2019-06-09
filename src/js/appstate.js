import $ from 'cash-dom';

let appState = {
    taskCounter: 0,
    enableGenerateJson: false,
    taskNumber: null
}

export const initAppState = () => {
    $('#tasksList .taskGroup').each(function (i, e) {
        const tasks = $(this).attr('id')
        appState[tasks] = 0
    })
    console.log('state initialized')
}


export const getState = () => {
    return appState;
}

export const setState = (prop, value) => {
    appState = { ...appState, [prop]: value }
}