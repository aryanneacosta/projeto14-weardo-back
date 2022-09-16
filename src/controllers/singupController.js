import singUpSchema from "../schemas/singupSchema.js";
import bcrypt from "bcrypt";
import db from "../databases/db.js";


async function singUp(req, res) {
  const { name, email, password, address } = req.body;
  try {
    const user = await db.collection(`users`).findOne({ email: email });
    if (user) {
      return res.status(409).send({message: `Email ja cadastrado.`})
    }
    const hashingPassword = bcrypt.hashSync(password, 12);
    await db
      .collection(`users`)
      .insertOne({ ...req.body, password: hashingPassword });
    return res.send(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { singUp };
