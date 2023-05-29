import express, { Application, Response, Request } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/products", logics.listAllItens);
app.post("/products", middlewares.verifyNameExists ,logics.createProduct);

app.get("/products/:id", middlewares.verifyIfIdExists, logics.listItemById);
app.patch("/products/:id",middlewares.verifyIfIdExists, middlewares.verifyNameExists, logics.updateProduct);
app.delete("/products/:id",middlewares.verifyIfIdExists, logics.deleteProduct);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
