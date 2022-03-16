// // console.log(`${latitude} and ${longitude}`);
// // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
// //Element Selecting
// `use strict`
// ///////////////////////////////////////////////////////////////
// const form = document.querySelector(".form");
// const inputDistance = document.querySelector(".form__input--distance");
// const inputType = document.querySelector(".form__input--type");
// const inputDuration = document.querySelector(".form__input--duration");
// const inputCadence = document.querySelector(".form__input--cadence");
// const inputElevation = document.querySelector(".form__input--elevation");
// const containerWorkouts = document.querySelector(".workouts");
// //////////////////////////////////////////////////////////////
// class Workouts {
//   date = new Date();
//   id = (Date.now() + '').slice(-10);
//   clicks = 0;

//   constructor(coords, distance, duration) {
//     this.coords = coords;
//     this.distance = distance;
//     this.duration = duration;
//   }
//   _setDescription() {
//     // prettier-ignore
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()]
//     } ${this.date.getDate()}`;
//   }

//   click(){
//     this.click++;
//   }
// }

// ////////////////////////////////////////////////////
// class Running extends Workouts {
//   type = "running";
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;
//     this.calcPace();
//     this._setDescription();
//   }
//   calcPace() {
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }
// }

// ///////////////////////////////////////////////
// class Cycling extends Workouts {
//   type = "cycling";
//   constructor(coords, distance, duration, elevation) {
//     super(coords, distance, duration);
//     this.elevation = elevation;
//     this.calcSpeed();
//     this._setDescription();
//   }
//   calcSpeed() {
//     this.speed = this.distance / (this.duration / 60);
//     return this.speed;
//   }
// }

// ////////////////////////////////////////////////////

// class App {
//   #map;
//   #mapZoomLevel = 13;
//   #mapEvent;
//   #workouts = [];

//   constructor() {
//     this._getPosition();

//     form.addEventListener("submit", this._newWorkout.bind(this));

//     inputType.addEventListener("change", function (e) {
//       e.preventDefault();
//       inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
//       inputElevation
//         .closest(".form__row")
//         .classList.toggle("form__row--hidden");
//     });
//     containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
//   }

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert("location is block please allows us");
//         }
//       );
//     }
//   }

//   _loadMap(position) {
//     const { latitude } = position.coords; // =const latitude = position.coords.latitude
//     const { longitude } = position.coords;
//     const coords = [latitude, longitude];
//     console.log(this);
//     this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
//     L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution: '<a href=""></a><a href=""></a>',
//       maxZoom: 18,
//       id: "mapbox/streets-v11",
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken: "your.mapbox.access.token",
//     }).addTo(this.#map);
//     // on clcik on map
//     this.#map.on("click", this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     // e.preventDefault();
//     this.#mapEvent = mapE;
//     form.classList.remove("hidden");
//     inputDistance.focus();
//   }

//   _hideForm() {
//     // Empty inputs
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value ="";
//     form.style.display = "none";
//     form.classList.add("hidden");
//     setTimeout(() => (form.style.display = "grid"), 1000);
//   }

//   _newWorkout(e) {
   
//     // validation function
//     const validInput = (...inputs) =>inputs.every((inp) => console.log(Number.isFinite(inp)));
//     const allPositive = (...input) => input.every((inpt) => inpt > 0);
   

//     e.preventDefault();
   
//     // get date from form
//     const type = inputType.value;
//     const distance = inputDistance.value;
//     const duration = inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;
//     let workout;
//     // console.log(distance,duration);

//     if (type === "running") {
//       const cadence = +inputCadence.value;
//       if (validInput(distance, duration, cadence) ||!allPositive(distance, duration, cadence)) {
//         alert("please Enter Positve Number");
//         //   console.log(distance,duration,cadence); 
//       }
//       workout = new Running([lat, lng], distance, duration, cadence);
//     }
//     if (type === "cycling") {
//       const elevation = +inputElevation.value;
//       if (validInput(distance, duration, elevation) ||!allPositive(distance, duration)) {
//         alert("please Enter Positve Number");
//         //console.log(distance, duration, elevation);
//       }
//       // workout = new Cycling([lat, lng], distance, duration, elevation);
//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }

//     this.#workouts.push(workout);

//     this._renderWorkoutMarker(workout);

//     this._renderWorkout(workout);

//     this._hideForm();

//     inputCadence.value =inputDistance.value =inputDuration.value = inputElevation.value ="";

//   }

//   _renderWorkoutMarker(workout) {
//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 400,
//           minWidth: 30,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`,
//         })
//       )
//       .setPopupContent(
//         `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}
//   )`
//       )
//       .openPopup();
//   }

//   _renderWorkout(workout) {
//     let cmd = `<li class="workout workout--${workout.type} data-id=${workout.id}>
//           <h2 class="workout__title">${workout.description}</h2>
//           <div class="workout__details">
//             <span class="workout__icon">${
//               workout.type === "running" ? "🏃" : "🚴"
//             }</span>
//             <span class="workout__value">"${workout.distance}"</span>
//             <span class="workout__unit">km</span>
//           </div>
//           <div class="workout__details">
//             <span class="workout__icon">⏱</span>
//             <span class="workout__value">${workout.duration}</span>
//             <span class="workout__unit">min</span>
//           </div>`;

//     if (workout.type === "running")
//       cmd += ` <div class="workout__details">
//         <span class="workout__icon">⚡️</span>
//         <span class="workout__value">${workout.pace.toFixed(2)}</span>
//         <span class="workout__unit">min/km</span>
//       </div>
//       <div class="workout__details">
//         <span class="workout__icon">🦶🏼</span>
//         <span class="workout__value">${workout.cadence}</span>
//         <span class="workout__unit">spm</span>
//       </div>
//     </li>`;

//     if (workout.type === "cycling")
//       cmd += `<div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.speed.toFixed(2)}</span>
//       <span class="workout__unit">km/h</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⛰</span>
//       <span class="workout__value">${workout.elevation}</span>
//       <span class="workout__unit">m</span>
//     </div>
//   </li>`;

//     form.insertAdjacentHTML("afterend", cmd);
//   }

//   _toggleElevationField() {}

//   _moveToPopup(e) {
//     if (!this.#map) return;

//     // const workoutEl = e.target.closest(".workout");
//        const workoutEl = e.target.closest('.workout');
//        console.log(workoutEl.dataset.id)
//     if (!workoutEl) return;
//       console.log(this.#workouts)
//      console.log(this.#workouts.id)
//    //const workout = this.#workouts.find(work => {work.id === workoutEl.dataset.id);
//    const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
//    console.log(workout)
//     // const  we = workoutEl.id
//     //  console.log(we)
//   this.#map.setView(workout.coords, this.#mapZoomLevel, {
//       animate: true,
//       pan: {
//         duration: 1,
//       },
//     });
//   }
// }
// //create an object of App class
// const app = new App();

///////////////////////////////////

'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
      
    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

  //   // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;

    const workoutEl = e.target.closest('.workout');
  console.log(workoutEl)
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
        console.log(workoutEl.dataset.id)
        console.log(workout)
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();


// doing step by step code changing