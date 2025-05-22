const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");

const app = express();
const PORT = 9000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(express.json());

app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUser);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
