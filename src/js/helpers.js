import $ from 'cash-dom';

export const adjustPanelSize = () => {
    let height = window.innerHeight;
    let headerHeight = $('.header').height();
    $('.leftpanel, .rightpanel').height(height - headerHeight - 2)
}