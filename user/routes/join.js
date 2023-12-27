const express = require("express");

const router = express.Router();
// express가 제공하는 Router로 이것은 미들웨어가 된다.

router.use(express.json());
// express.json이라는 미들웨어
// 따로 설정을 해주지 않는 한 모든 요청은 json으로 파싱될거다.

router.post("/", (req, res) => {
  let { email, password } = req.body;
  password = parseInt(password);
  //여기서 db연결에서 query날리기
  res.json({ email: email, password: password });
});

module.exports = router;
