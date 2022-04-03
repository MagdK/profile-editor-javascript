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


        // fomrElement parameterkent megadva osszegyujti az osszes infot(key-value parokat csinal beloluk)
        const formData = new FormData(formElement)
        // for (const pair of formData) {
        //     console.log(pair)
        // }


        fetch("/", { method: 'POST', body: formData})
            .then(async serverResponse => {
                console.log(serverResponse.status);
                console.log(await serverResponse.json());
            })
    })
}

window.addEventListener("load", loadEvent)