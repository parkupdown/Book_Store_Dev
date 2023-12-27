const express = require("express");
const app = express();

const joinRouter = require("./user/routes/join.js");
const loginRouter = require("./user/routes/login.js");
// Express는 미들웨어를 사용할 수 있다는게 큰 장점
app.use("/join", joinRouter);
app.use("/login", loginRouter);

app.listen(2346);
