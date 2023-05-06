'use strict';

const text = document.querySelector('p');
const movieTypeSelect = document.querySelector('select');
let selectedMovieNumber = 0;

let selectedMovie = +movieTypeSelect.value;


const renderUI = function () {
    if (localStorage.getItem('selectedIndex') != null && localStorage.getItem('selectedMovieNumber') != null && localStorage.getItem('moviePrice') != null) {
        selectedMovieNumber = localStorage.getItem('selectedMovieNumber');
        selectedMovie = localStorage.getItem('moviePrice')
        text.innerHTML = `<p>You have selected <span>${selectedMovieNumber}</span> seats for a price of <span>${selectedMovie}$</span> </p>`

        let seatId = JSON.parse(localStorage.getItem('selectedIndex'))
        const seats = document.querySelectorAll('.container .seat');
        seats.forEach(seat => {
            seatId.forEach(id => {
                if (seat.dataset.id === id)
                    seat.classList.add('selected')
            })
        })
    }
}
renderUI()


if (localStorage.getItem('movieIndex') != null) {
    movieTypeSelect.selectedIndex = localStorage.getItem('movieIndex')
}

movieTypeSelect.addEventListener('change', function (e) {
    selectedMovie = +e.target.value;
    localStorage.setItem('movieIndex', e.target.selectedIndex)
    updateSelectedSeat()

})


const updateSelectedSeat = function () {
    const selectedSeat = [...document.querySelectorAll('.container .seat.selected')];
    const selectedIndex = [...selectedSeat.map(seat => seat.dataset.id)]
    selectedMovieNumber = selectedIndex.length;
    localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedMovieNumber', selectedMovieNumber);
    localStorage.setItem('moviePrice', selectedMovie * selectedMovieNumber)
    text.innerHTML = `<p>You have selected <span>${selectedMovieNumber}</span> seats for a price of <span>${selectedMovie * selectedMovieNumber}$</span> </p>`
}



const seatsContainer = document.querySelector('.container');
seatsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('occupied') && e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected')
        updateSelectedSeat()
    }
})