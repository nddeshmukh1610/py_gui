import dragula from 'dragula';

export const dragndrop = () => {

    let blocContainers = document.querySelectorAll('.bloc')
    let dragulaService = dragula([].slice.apply(blocContainers), {
        copy: (el, source) => {
            return !source.classList.contains('rightpanel')
        },
        accepts: (el, target) => {
            return target.classList.contains('rightpanel');
        }
    });

    // dragulaService.on('drag', function (el, src, d) {
    //     console.log(el, src, d)
    //     if (src === dragContainer) {
    //         // for(var i=0;i<el.children.length;i++){
    //         //     if(el.children[i].classList.contains('showEl'))
    //         //         el.children[i].classList.add('showEl');
    //         //         el.children[i].classList.add('hiddenEl')
    //         // }
    //         // el.children.forEach((v) => {
    //         //     console.log(v)
    //         // })
    //     }

    // })

    // dragulaService.on('drop', function (el) {
    //     // el.children[0].style.display = 'inline-block';
    //     for (let i = 0; i < el.children.length; i++) {
    //         if (el.children[i].classList.contains('showEl'))
    //             el.children[i].classList.add('hiddenEl');
    //         el.children[i].classList.add('showEl')
    //     }
    // })

}