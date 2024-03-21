import {
    addUser,
    getUser,
    updateUser,
    deleteUser
} from "./controllers/user_controller.js";

export default function router(app) {
    app.post("/add-user", addUser);
    app.get("/get-user/:user_id", getUser);
    app.put("/update-user/:user_id", updateUser);
    app.delete("/delete-user/:user_id", deleteUser);
}