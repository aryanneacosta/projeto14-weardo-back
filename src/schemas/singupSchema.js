import joi from 'joi';

const singUpSchema = joi.object({
  name: joi.string().empty(" ").min(3).max(30).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
    .empty(" ")
    .min(6)
    .max(40)
    .required(),
  password: joi
    .string()
    .empty(" ")
    .min(6)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  address: joi.string().empty(" ").min(3).max(50).required(),
});

export default singUpSchema;
