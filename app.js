const express = require("express"); // express 모듈
const dotenv = require("dotenv");
const router = require("./routes/users.js");

const app = express();
dotenv.config();
app.listen(process.env.PORT, () => console.log("연결완료"));

app.use(express.json());

const userRouter = router;
app.use("/users", userRouter);
