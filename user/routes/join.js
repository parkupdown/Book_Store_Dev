const express = require("express");
const connection = require("../../db/mariaDB.js");
const conn = connection;
const router = express.Router();
// express가 제공하는 Router로 이것은 미들웨어가 된다.
router.use(express.json());
// express.json이라는 미들웨어
// 따로 설정을 해주지 않는 한 모든 요청은 json으로 파싱될거다.

router.post("/", (req, res) => {
  let { email, password } = req.body;
  password = parseInt(password);
  //여기서 db연결에서 query날리기
  conn.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    function (err, result) {
      // 정상적으로 db가져옴 이제 만약 Db에 없으면 넣는걸로
      if (result.length === 0) {
        //없는거
        conn.query(
          "INSERT INTO users (email,password) VALUES (?,?)",
          [email, password],
          function (err, result) {
            res.status(201).end();
          }
        );
        return;
      }
      res.status(400).end();
    }
  );
});

module.exports = router;
