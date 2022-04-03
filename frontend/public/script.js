function pageHeader() {
    return `
        <header>
            <h1>Edit profile</h1>
        </header>
    `
}


function formComponent() { 
    return `
        <form id="form">
            <label for="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" placeholder="First name">

            <label for="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" placeholder="Last name">

            <label for="last-name">Country</label>
            <input type="text" id="country" name="country" placeholder="country">

            <label for="zip">Zip code</label>
            <input type="text" id="zip" name="zip" placeholder="Zip code">

            <label for="city">City</label>
            <input type="text" id="city" name="city" placeholder="City">

            <label for="street">Street name and house number</label>
            <input type="text" id="street" name="street" placeholder="Street name">

            <label for="intro">Introduction</label>
            <textarea id="intro" name="intro" rows="6"></textarea>
            <button>Send</button>
        </form>
    `
}


function loadEvent() {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = pageHeader();

    rootElement.insertAdjacentHTML("beforeend", formComponent());
}

window.addEventListener("load", loadEvent)