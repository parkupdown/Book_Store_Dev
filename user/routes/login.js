const express = require("express");

const router = express.Router();
// 미들웨어 router 생성
router.use(express.json());

router.post("/", (req, res) => {
  let { email, password } = req.body;
  //여기서 DB랑 비교 후
  //cookie로 JWT토큰 발행
  password = parseInt(password);

  res.json({ email: email, password: password, message: "hi" });
});

module.exports = router;
