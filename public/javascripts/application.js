const trackCards = document.querySelectorAll('.track-card');
const modalCloseBtn = document.querySelectorAll('.modal__close-btn');

const showTrackModal = event => event.target.querySelector('.modal-overlay').classList.add('modal-overlay--active');
const closeTrackModal = event => {
    console.log('hi');
    console.log(event.target.parentElement.parentElement);
    event.target.parentElement.parentElement.classList.remove('modal-overlay--active');
}

modalCloseBtn.forEach(btn => btn.addEventListener('click', closeTrackModal));
trackCards.forEach(card => card.addEventListener('click', showTrackModal));