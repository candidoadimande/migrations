import Customer from "../models/Customer";

const CustomersController = () => {
    return {
        async index(req, res) {
            const data = await Customer.findAll({
                limit: 1000
            });
            return res.json(data)
        },

        show(req, res) {},

        create(req, res) {
            const { name } = req.body;
            const id = customers[customers.length - 1].id + 1;

            const newCustomer = { id, name}
            customers.push(newCustomer)

            return res.json(newCustomer)

        },

        update(req, res) {},

        destroy(req, res) {},
    }
}

export default CustomersController;