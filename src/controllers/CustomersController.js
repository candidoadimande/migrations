const CustomersController = () => {
    const customers = [
        {id: 1, name: "Dev Samurai"},
        {id: 2, name: "UOL"},
    ]

    return {
        index(req, res) {
            return res.json(customers)
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