const pageHeader =
     `
        <header>
            <h1>Edit profile</h1>
            <div class="separator"></div>
        </header>
    `


const formComponent =
    `
    <form id="form">
        <fieldset class="personal-details">
            <legend>Personal details</legend>
            
            <label for="picture" id="img-upload-btn" hidden>Upload a profile image</label>
            <input type="file" name="picture">

            <label for="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" placeholder="First name">

            <label for="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" placeholder="Last name">

            <label for="intro">Introduction</label>
            <textarea id="intro" name="intro" rows="6" placeholder="Please tell us about yourself..."></textarea>
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

            <div class="btn-wrapper">
                <button class="btn-secondary">Clear</button>
                <button class="btn-primary">Save changes</button>
            </div>
        </fieldset>
    </form>
`;

function loadEvent() {
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", pageHeader);

    rootElement.insertAdjacentHTML("beforeend", formComponent);

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', e => {
        e.preventDefault();

        // formElement parameterkent megadva osszegyujti az osszes infot(key-value parokat csinal beloluk)
        const formData = new FormData();
        formData.append("First name", e.target.querySelector(`input[name="first-name"]`).value);
        formData.append("Last name", e.target.querySelector(`input[name="last-name"]`).value);
        formData.append("Introduction", e.target.querySelector(`textarea[name="intro"]`).value);
        formData.append("Picture", e.target.querySelector(`input[name="picture"]`).files[0]);
        formData.append("Country", e.target.querySelector(`input[name="country"]`).value);
        formData.append("Zip", e.target.querySelector(`input[name="zip"]`).value);
        formData.append("City", e.target.querySelector(`input[name="city"]`).value);
        formData.append("Street name and house number", e.target.querySelector(`input[name="street"]`).value);
        
        const fetchSettings = {
            method: "POST",
            body: formData
        };

        fetch("/", fetchSettings)
            .then(async data => {
                if(data.status === 200) {
                    e.target.outerHTML = "Your changes have been saved."
                    console.dir(data);
                }
            })
            .catch(error => {
                e.target.outerHTML = "Something went very wrong!"
                console.dir(error);
            })

    });
};

window.addEventListener("load", loadEvent)