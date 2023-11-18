// material icons 'uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name'
// so changing the text changes the icon
const hamburgerMenuButton = document.querySelector('.navbar-toggler');
const hamburgerMenuButtonSpan = document.querySelector('.navbar-toggler span');

hamburgerMenuButton.addEventListener('click', () => {
    hamburgerMenuButtonSpan.textContent = hamburgerMenuButtonSpan.textContent === 'menu' ? 'close' : 'menu';
});