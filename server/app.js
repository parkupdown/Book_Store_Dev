const express = require("express"); // express 모듈
const dotenv = require("dotenv");
const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");
const categoryRouter = require("./routes/category.js");
const cartRouter = require("./routes/carts.js");
const likeRouter = require("./routes/likes.js");
const orderRouter = require("./routes/orders.js");
const cors = require("cors");

const app = express();
dotenv.config();
app.listen(process.env.PORT, () => console.log("연결완료"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/likes", likeRouter);
app.use("/orders", orderRouter);
