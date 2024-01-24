import { Router } from "express";
import { query, validationResult, checkSchema } from "express-validator";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchemas } from "../utils/validationSchemas.mjs";

const router = Router();

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

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

router.get("/api/users/:id", (req, res) => {
  // console.log(req)
  console.log(typeof req.params.id);
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request" });
  const findUser = users.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  res.send(findUser);
});

// POST Requests
router.post(
  "/api/users",
  checkSchema(createUserValidationSchemas),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    // const {body} = req
    const data = matchedData(req);
    console.log(data);
    const newUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(newUser);
    return res.status(201).send(newUser);
  }
);

// PUT Request - Update Entire Records
router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// PATCH Request - Update Partial Record (Not Update Entire User)
router.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});

// DELETE Request
router.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  users.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
