import { Op } from "sequelize";
import { parseISO } from "date-fns";
import User from "../models/User";
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

            const data = await User.findAll({
                attributes: { exclude: ["password", "password_hash"] },
                where,
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
          const user = await User.findByPk(req.params.id);
          
          if (!User) {
            return res.status(404).json();
          }
          return res.json(user)
        },

        async create (req, res) {
          const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordComfirmation: Yup.string().when("password", 
              (password, field) => (
                password ? field.required().oneOf([Yup.ref("password")]) : field
              )
            )
          });
          if (!( await schema.isValid(req.body))) {
            return res.status(400).json({Error: "validing"})
          }
          
          const { id, name, email, createdAt, updatedAfter } = await User.create(req.body)
          
          return res.status(201).json({ id, name, email, createdAt, updatedAfter })
          
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