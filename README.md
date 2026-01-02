# migrations

async show(req, res) {
          const contact = await Contact.findByPk(req.params.id);
          
          if (!contact) {
            return res.status(404).json();
          }
          return res.json(contact)
        },
        
e:

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