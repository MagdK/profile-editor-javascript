const pageHeader =
     `
        <header>
            <h1>Edit profile</h1>
            <div class="separator"></div>
        </header>
    `


const formComponent = (profile) => {
    return `
    <form id="form">
        <fieldset class="personal-details">
            <legend>Personal details</legend>
            
            <input type="file" name="picture" class="custom-file-input">

            <label for="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" placeholder="First name" value="${profile.first_name}">

            <label for="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" placeholder="Last name" value="${profile.last_name}">

            <label for="intro">Introduction</label>
            <textarea id="intro" name="intro" rows="6" placeholder="Tell us about yourself...">${profile.intro}</textarea>
        </fieldset>
        <fieldset class="address-details">
            <legend>Address details</legend>

            <label for="country">Country</label>
            <input type="text" id="country" name="country" placeholder="Country" value="${profile.country}">

            <label for="zip">Zip code</label>
            <input type="text" id="zip" name="zip" placeholder="Zip code" value="${profile.zip}">

            <label for="city">City</label>
            <input type="text" id="city" name="city" placeholder="City" value="${profile.city}">

            <label for="address">Address</label>
            <input type="text" id="street" name="address" placeholder="Address" value="${profile.address}">

            <div class="btn-wrapper">
                <button type="reset" class="btn-secondary">Delete</button>
                <button class="btn-primary">Save changes</button>
            </div>
        </fieldset>
    </form>
`;
}

async function loadEvent() {
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", pageHeader);

    const profileResponse = await fetch("/profile");
    const profileData = await profileResponse.json();

    rootElement.insertAdjacentHTML("beforeend", formComponent(profileData));

    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', e => {
        e.preventDefault();

        // formElement parameterkent megadva osszegyujti az osszes infot(key-value parokat csinal beloluk)
        const formData = new FormData();
        formData.append("first_name", e.target.querySelector(`input[name="first-name"]`).value);
        formData.append("last_name", e.target.querySelector(`input[name="last-name"]`).value);
        formData.append("intro", e.target.querySelector(`textarea[name="intro"]`).value);
        formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0]);
        formData.append("country", e.target.querySelector(`input[name="country"]`).value);
        formData.append("zip", e.target.querySelector(`input[name="zip"]`).value);
        formData.append("city", e.target.querySelector(`input[name="city"]`).value);
        formData.append("address", e.target.querySelector(`input[name="address"]`).value);
        
        const fetchSettings = {
            method: "POST",
            body: formData
        };

        fetch("/profile", fetchSettings)
            .then(async data => {
                if(data.status === 200) {
                    console.dir(await data.json());
                    alert("elmentve")
                }
            })
            .catch(error => {
                e.target.innerHTML = "Something went very wrong!"
                console.dir(error);
            })

    });
};

window.addEventListener("load", loadEvent)