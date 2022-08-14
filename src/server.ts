import express from "express" 


const app = express();
const PORT = 8080

app.listen(PORT, () => console.log("Server online em http://localhost:8080"));

app.get("/", (req,res) => res.sendStatus(200))
