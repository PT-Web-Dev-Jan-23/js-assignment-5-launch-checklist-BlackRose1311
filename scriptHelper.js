// Write your helper functions here!
 require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let theTarget = document.getElementById("missionTarget")

   theTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
   
}

function validateInput(testInput) {
    let maybeNum = Number(testInput)
    if (testInput === "") {
        return "Empty"
    } else if (isNaN(maybeNum) === false) {
        return "Is a Number"
    } else if (isNaN(maybeNum) === true) {
        return "Not a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelStatus = document.getElementById("fuelStatus")
    let cargoStatus = document.getElementById("cargoStatus")
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert('Empty. All fields required')
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert('Invalid input. Cannot be a number.')
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert('Invalid input. Must be a number.')
    } else {
        list.style.visibility = "visible"
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch.`
        let launchStatus = document.getElementById("launchStatus");

        if(fuelLevel < 10000 && cargoLevel >= 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch.";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch.";
            launchStatus.innerHTML = "Shuttle Not Ready";
            launchStatus.style.color = "#D2042D";
        } else if (fuelLevel < 10000 && cargoLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch.";
            cargoStatus.innerHTML = "Cargo mass low enough for launch.";
            launchStatus.innerHTML = "Shuttle Not Ready";
            launchStatus.style.color = "#D2042D";
        } else if (fuelLevel >= 10000 && cargoLevel >= 10000) {
            fuelStatus.innerHTML = "Fuel level is adequate for launch.";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch.";
            launchStatus.innerHTML = "Shuttle Not Ready";
            launchStatus.style.color = "#D2042D";
        } else {
            fuelStatus.innerHTML = "Fuel level is adequate for launch.";
            cargoStatus.innerHTML = "Cargo mass low enough for launch.";
            launchStatus.innerHTML = "Shuttle Is Ready For Launch";
            launchStatus.style.color = "#4CCB17";
        }
    }
  };

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response){
        if (response.status >= 400) {
            throw new Error ("Bad promise")
        } else {
            return response.json()
        }
});

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.floor(Math.random()*planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
