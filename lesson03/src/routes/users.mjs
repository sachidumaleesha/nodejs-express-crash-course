import { Router } from "express";
import { query } from "express-validator";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage("Must not be empty")
    .isLength({ min: 4, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (req, res) => {
    // console.log(req["express-validator#contexts"])
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (!filter && !value) return res.send(users);

    if (filter && value) {
      return res.send(users.filter((user) => user[filter].includes(value)));
    }

    res.send(users);
  }
);

export default router
