import { Router } from "express";
import auth from "./middlewares/auth.js"
import CustomersController from "./controllers/CustomersController.js";
import ContactsController from "./controllers/ContactsController.js";
import UsersController from "./controllers/UsersController.js";
import SessionsController from "./controllers/SessionsController.js";

const routes = new Router();

const customers = CustomersController();
const contacts = ContactsController();
const users = UsersController();
const sessions = SessionsController()

routes.post("/sessions", sessions.create);

//Controla o acesso apartir deste ponto
routes.use(auth);

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


routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
