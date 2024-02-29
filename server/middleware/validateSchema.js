const validateSchema = (schema) => {
    return (req, res, next) => {

        let { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            //Validation before connecting to database
            //Example of how error message should be:
            /*
                errors=[
                    {
                        params:"name",
                        "message":"required"
                    }
                ]
                OR,
                errors=[
                    {
                        "name":"required"
                    },
                    {
                        email:"invalid E-mail"
                    }
                ]
            */
            let errors = error.details.map(validation_error => {
                return {
                    params: validation_error.context.key,
                    message: validation_error.message
                }
            })

            return res.status(400).send({
                msg: "Bad request",
                errors
            })
        } else {
            next()
        }

    }

}

module.exports = validateSchema