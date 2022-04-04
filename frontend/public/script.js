const e = require("express");

function pageHeader() {
    return `
        <header>
            <h1>Edit profile</h1>
            <div class="separator"></div>
        </header>
    `
}


function formComponent() { 
    return `
        <form id="form">
            <fieldset class="personal-details">
                <legend>Personal details</legend>

                <label for="first-name">First name</label>
                <input type="text" id="first-name" name="first-name" placeholder="First name">

                <label for="last-name">Last name</label>
                <input type="text" id="last-name" name="last-name" placeholder="Last name">

                <label for="intro">Introduction</label>
                <textarea id="intro" name="intro" rows="6"></textarea>

                <label for="picture">Upload a profile image</label>
                <input type="file" name="picture">
            </fieldset>
            <fieldset class="address-details">
                <legend>Address details</legend>

                <label for="country">Country</label>
                <input type="text" id="country" name="country" placeholder="Country">

                <label for="zip">Zip code</label>
                <input type="text" id="zip" name="zip" placeholder="Zip code">

                <label for="city">City</label>
                <input type="text" id="city" name="city" placeholder="City">

                <label for="street">Street name and house number</label>
                <input type="text" id="street" name="street" placeholder="Street name">

                <button>Clear</button>
                <button>Save changes</button>
            </fieldset>
        </form>
    `
}

// event listener on save button




function loadEvent() {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = pageHeader();

    rootElement.insertAdjacentHTML("beforeend", formComponent());

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', event => {
        event.preventDefault();

        // formElement parameterkent megadva osszegyujti az osszes infot(key-value parokat csinal beloluk)
        const formData = new FormData(formElement);
        formData.append("First name", e.target.querySelector(`input[name="first-name"]`).value);
        formData.append("Last name", e.target.querySelector(`input[name="last-name"]`).value);
        formData.append("Introduction", e.target.querySelector(`textarea[name="intro"]`).value);
        formData.append("Picture", e.target.querySelector(`textarea[name="picture"]`).files[0]);
        formData.append("Country", e.target.querySelector(`textarea[name="counrty"]`).value);
        formData.append("Zip", e.target.querySelector(`textarea[name="zip"]`).value);
        formData.append("City", e.target.querySelector(`textarea[name="city"]`).value);
        formData.append("Street name and house number", e.target.querySelector(`textarea[name="street"]`).value);
        
        const fetchSettings = {
            method: "POST",
            body: formData
        };

        fetch("/", fetchSettings)
            .then(data => {
                if(data.status === 200) {
                    e.target.outerHTML = "done"
                    console.dir(data);
                }
            })
            .catch(error => {
                e.target.outerHTML = "Error"
                console.dir(error);
            })

    });
};

window.addEventListener("load", loadEvent)