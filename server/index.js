import express from "express";
import cors from "cors";
import router from "./routes.js";

// initialize server
const app = express();

// plugin for parsing JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); 
// initialize router
router(app);

app.listen(3000, () => {
    console.log("Server has started on port 3000.")
})