const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const api = require("./routes/routes");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", api);

app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// app.get("/api/notes", (req, res) => {
//     fs.readFile('./db/db.json', (error, data) => {
//         if (error) {
//             console.log(error);
//         } else {
//             return res.json(JSON.parse(data));
//         }
//     })
// });

// app.post("/api/notes", (req, res) => {

//     const { title, text } = req.body;
//     const newNote = {
//         title,
//         text,
//         id: uuidv4()
//     };
//     fs.readFile("./db/db.json", (error, data) => {
//         if (error) {
//             console.log(error);
//         } else {
//             const parsedData = JSON.parse(data);
//             parsedData.push(newNote);

//             fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (writeError) => {
//                 if (writeError) {
//                     console.log(writeError);
//                 } else {
//                     console.log(`Successfully save notes`);
//                 }
//             })
//         }
//     })

//     const response = {
//         status: "success",
//         body: newNote
//     }

//     res.status(200).json(response);
// })

// app.delete("/api/notes/:noteId", (req, res) => {
//     const toBeDelete = req.params.noteId;
//     fs.readFile("./db/db.json", (error, data) => {
//         const parsedData = JSON.parse(data);
//         const result = parsedData.filter((note) => note.id !== toBeDelete);
//         console.log(result)
//         fs.writeFile("./db/db.json", JSON.stringify(result, null, 4), (error) => {
//             console.log(error);
//         });

//         res.json(`Note with ID:${toBeDelete} has been deleted`)
//     })
// });

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
});