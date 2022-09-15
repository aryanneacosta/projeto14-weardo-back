import singUpSchema from "../schemas/singupSchema.js";

function singUpValidation (req,res,next) {
    const { name, email, password, address } = req.body;
    const validation = singUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erroMessage = validation.error.details.map((value) => value.message);
      return res.status(422).send(console.log(erroMessage));
    }
    next();
}

export {singUpValidation};