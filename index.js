
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8304;

app.use(express.json());

let clients = [
        {
                id: "1",
                Name: "Carl",
                LastName: "Smith",
                Email: "carl.s33@gmail.com",
                MobileNo: "440888888",
                Project: "Front-end landpage Developement"
        },
        {
                id: "2",
                Name: "Sarah",
                LastName: "Company",
                Email: "shcompany@gmail.com",
                MobileNo: "440877776",
                Project: "Connection back-end to front end"
        },
        {
                id: "3",
                Name: "Josh",
                LastName: "Martin",
                Email: "Josh.martin@outlook.com",
                MobileNo: "3467777887",
                Project: "Import data from database to front"
        },
        

];

app.get("/client", (req, res) => {
        res.json(clients);
});

app.get("/client/:id", (req, res) => {
        const id = req.params.id;

        for(let client of clients){
                if(client.id == id) {
                        res.json(client)
                        return
                }
        }

        res.status(404).send("clint is not found")
});

app.post("/client", (req, res) => {
        const { Name, LastName, Email, MobileNo, Project } = req.body;
    
       
        if (!Name || !LastName || !Email || !MobileNo || !Project) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        const newClient = {
            id: uuidv4(),
            Name,
            LastName,
            Email,
            MobileNo,
            Project
        };
    
        clients.push(newClient);
    

        res.status(201).json(newClient);
    });

app.patch("/client/:id", (req, res) => {
        const id = req.params.id;
        const { field, value } = req.body;
    
        const clientToUpdate = clients.find(client => client.id === id);
    
   
        if (!clientToUpdate) {
            return res.status(404).json({ error: "Client not found" });
        }
    

        if (!field || !value) {
            return res.status(400).json({ error: "Field and value are required for editing" });
        }
    
        if (clientToUpdate.hasOwnProperty(field)) {
            clientToUpdate[field] = value;
            res.json(clientToUpdate);
        } else {
            res.status(400).json({ error: "Invalid field provided for editing" });
        }
    });
     

app.delete("/client/:id", (req, res) => {
        const id = req.params.id;
    
        clients = clients.filter((client) => {
            if (client.id !== id) {
                return true;
            }
            return false;
        });
        res.send("client is deleted");
    });

app.listen(port, () => console.log(`server running on port ${port}`));

