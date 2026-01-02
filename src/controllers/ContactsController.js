import { Op } from "sequelize";
import Contact from "../models/Contact";
import { parseISO } from "date-fns";
import Customer from "../models/Customer";
import * as Yup from "yup";
const ContactsController = () => {

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

            const data = await Contact.findAll({
                where,
                include: [ {
                    model: Customer,
                    attributes: ["id", "name", "email"]
                }],
                order,
                limit,
                offset: limit * page - limit,
            });
            
            if (!data) {
              return res.status(404).json({Error: "no data"})
            }

            return res.json(data)
        },

        async show(req, res) {
          const contact = await Contact.findOne({
            where: {
              customer_id: req.params.customerId,
              id: req.params.id
            },
            include : [Customer]
          });
          
          if (!contact) {
            return res.status(404).json();
          }
          return res.json(contact)
        },

        async create (req, res) {
          
          const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase()
          });
          
          if (!( await schema.isValid(req.body))) {
            return res.status(400).json({Error: "validing"})
          }
          
          const newContact = await Contact.create({
            customer_id: req.params.customerId,
            ...req.body
          })
          
          return res.status(201).json(newContact
          )
        },

        async update(req, res) {
          const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase()
          });
          
          if (!( await schema.isValid(req.body))) {
            return res.status(400).json({Error: "validing"})
          }
          const contact = await Contact.findOne({
            where: {
              customer_id: req.params.customerId,
              id: req.params.id
            },
            
          });
          
          if (!contact) {
            return res.status(404).json();
          }
          
          await contact.update(req.body);
          
          return res.json(contact);
        },

        async destroy(req, res) {
          const contact = await Contact.findOne({
            where: {
              customer_id: req.params.customerId,
              id: req.params.id
            },
          });
          
          if (!contact) {
            return res.status(404).json();
          }
          
          await contact.destroy();
          return res.json();
        },
    }
}

export default ContactsController;