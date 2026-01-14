import "./database"
import Customer from "./models/Customer.js"

class Playground {
  static async play() {
    const customer = await Customer.findAll({
      attributes: { exclude: ["status"]  }
    });
    console.log(JSON.stringify(customer, null, 2));
  }
}

Playground.play();