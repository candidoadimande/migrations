import { Op } from "sequelize";
import Customer from "../models/Customer";
import { parseISO } from "date-fns";
import Contact from "../models/Contact";

const CustomersController = () => {

    return {
        async index(req, res) {
            const {
                name,
                email,
                status,
                createdBefore,
                createdAfter,
                updatedBefore,
                updatedAfter,
                sort
            } = req.query
            
            const page = req.query.page || 1;
            const limit = req.query.limit || 25;

            let where = {}
            let order = []

            if (name) {
                where = {
                    ...where,
                    name: {
                    [Op.like]: `%${name}%`
                    }
                }
            }

            if (email) {
                where = {
                    ...where,                    email: {
                    [Op.like]: `%${email}%`
                    }
                }
            }

            if (status) {
                where = {
                    ...where,
                    status: {
                        [Op.in]: status.split(",").map(item => item.toUpperCase())
                    }
                };
            }

            if (createdBefore) {
                where = {
                    ...where,
                    createdAt: {
                    [Op.gte]:  parseISO(createdBefore)
                    }
                }
            }

            if (createdAfter) {
                where = {
                    ...where,
                    createdAt: {
                    [Op.lte]:  parseISO(createdAfter)
                    }
                }
            }

            if (updatedBefore) {
                where = {
                    ...where,
                    updatedAt: {
                    [Op.gte]:  parseISO(updatedBefore)
                    }
                }
            }

            if (updatedAfter) {
                where = {
                    ...where,
                    createdAt: {
                    [Op.lte]:  parseISO(updatedAfter)
                    }
                }
            }

            if (sort) {
                order = sort.split(",").map(item => item.split(","));
            }

            const data = await Customer.findAll({
                where,
                include: [ {
                    model: Contact,
                    attributes: ["id", "name", "email"]
                }],
                order,
                limit,
                offset: limit * page - limit,
            });

            return res.json(data)
        },

        show(req, res) {
          
        },

        create (req, res) {
            const { name, email } = req.body;
            // const id = customers[customers.length - 1].id + 1;

            // const newCustomer = { id, name}
            // customers.push(newCustomer)

            // return res.json(newCustomer)
            const user =  Customer.create({
            name,
            email
            });

            return res.json(user);


        },

        update(req, res) {},

        destroy(req, res) {},
    }
}

export default CustomersController;