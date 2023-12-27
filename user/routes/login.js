const express = require("express");
const connection = require("../../db/mariaDB");
const conn = connection;
const router = express.Router();
// 미들웨어 router 생성
router.use(express.json());

router.post("/", (req, res) => {
  let { email, password } = req.body;
  password = parseInt(password);
  // 여기서 DB랑 비교 후
  conn.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    function (err, result) {
      console.log(result);
      if (result.length === 1) {
        //있으면
        res.status(200).end();
        return;
      }
      res.status(400).end();
    }
  );

  // 타당성 검사도 넣어줘야함

  //cookie로 JWT토큰 발행
});

module.exports = router;
