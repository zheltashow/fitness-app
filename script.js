document.addEventListener("DOMContentLoaded", function () {
  const workoutForm = document.getElementById("workout-form");
  const workoutInput = document.getElementById("workout");
  const durationInput = document.getElementById("duration");
  const workoutList = document.getElementById("workout-list");

  workoutForm.addEventListener("submit", addWorkout);
  workoutList.addEventListener("click", removeWorkout);
  document.addEventListener("DOMContentLoaded", loadWorkouts);

  function addWorkout(e) {
    e.preventDefault();

    const workout = workoutInput.value;
    const duration = durationInput.value;

    if (workout === "" || duration === "") {
      alert("Please fill in both fields");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `${workout} - ${duration} minutes <button class="delete-btn">X</button>`;

    workoutList.appendChild(li);

    storeWorkoutInLocalStorage(workout, duration);

    workoutInput.value = "";
    durationInput.value = "";
  }

  function removeWorkout(e) {
    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to remove this workout?")) {
        const li = e.target.parentElement;
        workoutList.removeChild(li);

        removeWorkoutFromLocalStorage(li);
      }
    }
  }

  function storeWorkoutInLocalStorage(workout, duration) {
    let workouts = getWorkoutsFromLocalStorage();
    workouts.push({ workout, duration });
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  function getWorkoutsFromLocalStorage() {
    let workouts;
    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    return workouts;
  }

  function loadWorkouts() {
    let workouts = getWorkoutsFromLocalStorage();
    workouts.forEach(function (workoutObj) {
      const li = document.createElement("li");
      li.innerHTML = `${workoutObj.workout} - ${workoutObj.duration} minutes <button class="delete-btn">X</button>`;
      workoutList.appendChild(li);
    });
  }

  function removeWorkoutFromLocalStorage(workoutItem) {
    let workouts = getWorkoutsFromLocalStorage();
    workouts.forEach(function (workoutObj, index) {
      if (
        workoutItem.textContent.includes(workoutObj.workout) &&
        workoutItem.textContent.includes(workoutObj.duration)
      ) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }
});
