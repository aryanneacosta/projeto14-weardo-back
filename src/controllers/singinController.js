import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from "../databases/db.js";


async function singIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.collection(`users`).findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidv4();
      await db
        .collection(`sessions`)
        .insertOne({ userId: user._id, token, address: user.address });
      return res.send({ token: token, name: user.name, address: user.address, email: email  });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { singIn };
