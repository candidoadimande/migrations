import { Sequelize } from "sequelize";
import config from "../config/database"

import Customer from "../models/Customer";
import Contact from "../models/Contact";
import User from "../models/User";

const models = [Customer, Contact, User];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
    }
    init() {
        models.forEach(model => model.init(this.connection))
    }
}

export default new Database();