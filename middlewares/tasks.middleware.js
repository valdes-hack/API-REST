const Joi = require('joi');

const taskSchema = Joi.object({
    titre: Joi.string().required().min(3).max(200),
    statut: Joi.required().valid('en_cours', 'a_faire', 'termine')
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);

    if (error) {
        res.status(422).json({
          error: error.details[0].message,
        });
    }

    next();
};

module.exports = validateTask;