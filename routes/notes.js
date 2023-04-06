const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

notes.get("/", (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            return res.json(JSON.parse(data));
        }
    })
});

notes.post("/", (req, res) => {

    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4()
    };
    fs.readFile("./db/db.json", (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (writeError) => {
                if (writeError) {
                    console.log(writeError);
                } else {
                    console.log(`Successfully save notes`);
                }
            })
        }
    })

    const response = {
        status: "success",
        body: newNote
    }

    res.status(200).json(response);
})

notes.delete("/:noteId", (req, res) => {
    const toBeDelete = req.params.noteId;
    fs.readFile("./db/db.json", (error, data) => {
        const parsedData = JSON.parse(data);
        const result = parsedData.filter((note) => note.id !== toBeDelete);
        console.log(result)
        fs.writeFile("./db/db.json", JSON.stringify(result, null, 4), (error) => {
            console.log(error);
        });

        res.json(`Note with ID:${toBeDelete} has been deleted`)
    })
});

module.exports = notes;