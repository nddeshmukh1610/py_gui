import dragula from 'dragula';
import $ from 'cash-dom';
import autoScroll from 'dom-autoscroller';
import { getState, setState } from './appstate';

export const dragndrop = () => {

    const dragulaContainers = document.querySelectorAll('.dragulaContainers')
    const dragulaService = dragula([].slice.apply(dragulaContainers), {
        copy: (el, source) => {
            return !source.classList.contains('rightpanel')
        },
        accepts: (el, target) => {
            return target.classList.contains('rightpanel');
        },
        invalid: function (el, handle) {
            return handle.classList.contains('dragHandle') ? false : true;
        }
    });

    const Scroll = autoScroll([document.querySelector('.rightpanel')], {
        margin: 100,
        maxSpeed: 15,
        pixels: 100,
        scrollWhenOutside: true,
        autoScroll: function () {
            //Only scroll when the pointer is down, and there is a child being dragged.
            return this.down && dragulaService.dragging;
        }
    })

    dragulaService.on('drag', function (el, src) {
    })

    dragulaService.on('drop', (el, target) => {
        let dropEl = $(el)
        let whichTask = dropEl.attr('taskgroup');
        let incTaskCnt = getState()[whichTask]
        console.log('before state change: ', incTaskCnt)
        setState(whichTask, ++incTaskCnt)
        console.log('after state change: ', getState())
        dropEl.removeClass('draggableEl').addClass('taskSection')
        dropEl.children('.dragEl').removeClass('is-hidden')
    })

}