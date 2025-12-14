import { Router } from "express";
import CustomersController from "./controllers/CustomersController.js";

const routes = new Router();
const customers = CustomersController();

routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);


export default routes;
