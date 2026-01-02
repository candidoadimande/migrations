import { Router } from "express";
import CustomersController from "./controllers/CustomersController.js";
import ContactsController from "./controllers/ContactsController.js";

const routes = new Router();
const customers = CustomersController();
const contacts = ContactsController();

routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);
export default routes;
