const express  = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const publicFolder = path.join(`${__dirname}/../frontend/public/`);
const uploadFolder = path.join(`${__dirname}/../frontend/upload/`);
const dataFolder = path.join(`${__dirname}/../frontend/data/`);

// Create and load the initial database state
let jsonData = [];
try {
    let data = fs.readFileSync(`${dataFolder}profile.json`, error => {
        if (error) {
            console.log(error);
        }
    });
    jsonData = JSON.parse(data);
} catch (error) {
    fs.writeFile(`${dataFolder}profile.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
}

// Define the WEB application: middlewares and routes
const app = express();

// USE REQUESTS
// Logs every request path
app.use((req, res, next) => {
    next()
    console.log(`${req.method} ${req.path} => ${res.statusCode}`)
});
// Parses form data and files from the request body
app.use(fileUpload());

// Az alabbi sor kiszolgalja  a frontend/public konyvtarbol a fajlokat
app.use("/pub", express.static(publicFolder));

// Minden ami az upload folderben van, azt teszi ez a sor elerhetove. De csak a pontos url-t megadva eri el a bongeszo
app.use("/upload", express.static(uploadFolder));


// GET REQUESTS
app.get("/", (request, response) => {
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

//az első elemnek ugyanannak kell lennie mint a fetchnél a script.js-ben ("/")
//req jön a frontend oldalról, res a válasz a backendről
app.get("/profile", (req, res) => {
    res.json(jsonData[0] || {});
});


// POST REQUESTS
app.post("/profile", (req, res) => {
    const answer = {};
    const picture = req.files.picture;

    // Move the picture to the upload dir
    if (picture) {
        picture.mv(uploadFolder + picture.name, error => {
            return res.status(500).send(error);
        });
        answer.pictureName  = picture.name;
    }

    // Upload data from form
    const formData = req.body;
    console.log(typeof req.body);
    formData.image_name = picture.name;
    jsonData.push(formData);

    fs.writeFile(`${dataFolder}profile.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });

    //network/response-nál látszik ez
    res.send(answer)
});


// DELETE REQUESTS
app.delete("/profile", (req, res) => {
    jsonData = [];
    fs.writeFile(`${dataFolder}profile.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
    res.json({deleted: true});
});



const port = 3000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});