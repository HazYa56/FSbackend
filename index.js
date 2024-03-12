const express = require("express")
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = [
    {
      "id": "1",
      "name": "Samir",
      "number": "0693259691"
    },
    {
      "id": "2",
      "name": "Talha",
      "number": "0656884217"
    },
    {
      "id": "3",
      "name": "Anis",
      "number": "0698325698"
    },
    {
      "id": "4",
      "name": "Baki",
      "number": "0565962367"
    },
    {
      "id": "5",
      "name": "Moumin",
      "number": "0594875614"
    },
    {
      "id": "6",
      "name": "Fatih",
      "number": "0698325589"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id == id);
    if (person) {
        res.json(person)
    } else {
        res.status(200).end()
    }
})

app.post("/api/persons/", (req,res) => {
    const id = Math.floor(Math.random()*100).toString();
    const person = req.body;
    person.id = id;
    if (person.name && person.number) {
        persons = persons.concat(person)
        res.json(person)
    } else {
        res.status(400).send({ error: 'missing values' }).end();
    }
})

app.get("/api/info", (req, res) =>{
    const time = new Date()
    res.send("<p>Phonebook has info for "
             + persons.length.toString()
             + " persons.</p>"
             + "<p>"
             + time.toString()
             + "</p>")
})

app.delete("/api/persons/:id", (req, res) => {
    const person = persons[Number(req.params.id)-1]
    persons = persons.filter(person => person.id != req.params.id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send({ error: 'Error deleting resource' }).end();
    }
})

app.put("/api/persons/:id", (req, res) => {
    persons = persons.map(person => person.id != req.params.id ? person : req.body)
    res.json(persons[Number(req.params.id)-1])
})