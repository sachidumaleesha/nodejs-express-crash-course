import express from "express";
import userRouter from "./routes/users.mjs";

const app = express();

app.use(express.json());
app.use(userRouter);

const middlewareFunction = (req, res, next) => {
  console.log("This is middleware");
  next();
};

// Globally accessed
// app.use(middlewareFunction)

const PORT = process.env.PORT || 3000;

// to work this wen need route path and request handler that is {req, res}
app.get("/", middlewareFunction, (req, res) => {
  res.send("Say Hello");
});

// Second Method - We can have multiple middlewares as we want
// app.get('/', (req, res, next) => {
//     console.log('This is homepage')
//     next()
// },(req, res) => {
//     res.send('Say Hello')
// })

// GET Requests


app.get("/api/products", (req, res) => {
  res.send([{ id: 1, productName: "Flower Vase", category: "Home Decor" }]);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

// localhost:3000 - Base Route
// localhost:3000/users - Users Route
// localhost:3000/products - Products Route
