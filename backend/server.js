const express  = require("express");
// const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();

const dataLocation = path.join(`${__dirname}/../frontend/data/`);


// app.use(fileUpload);


// Az alabbi sor kiszolgalja  a frontend/public konyvtarbol a fajlokat
app.use("/pub", express.static(`${__dirname}/../frontend/public`));


// // Minden ami az upload folderben van, azt teszi ez a sor elerhetove. De csak a pontos url-t megadva eri el a bongeszo
// app.use("/upload", express.static(`${__dirname}/../frontend/upload`));


// Igy sozlgaljuk ki az index.html-t
function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}
app.get("/", getFunction);


const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});