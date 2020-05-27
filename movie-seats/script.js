const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

popletUI();

let ticketPrice = +movieSelect.value;

//save selected movie + price

function setMovieData(movieIndex, moviePrice) {
   localStorage.setItem("selectedMovieIndex", movieIndex);
   localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count
function updeteSelectedCount() {
   const selectedSeats = document.querySelectorAll(".row .seat.selected");

   const seatsIndex = [...selectedSeats].map((seat) =>
      [...seats].indexOf(seat)
   );
   //save selected seats
   localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

   const selectedSeatsCount = selectedSeats.length;
   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate UI

function popletUI() {
   const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

   if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
         if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");
         }
      });
   }

   const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

   if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
   }
}

//movie select event
movieSelect.addEventListener("change", (e) => {
   ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
   updeteSelectedCount();
});

// seat click event
container.addEventListener("click", (e) => {
   if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
   ) {
      e.target.classList.toggle("selected");

      updeteSelectedCount();
   }
});

// initial count and total set
updeteSelectedCount();
