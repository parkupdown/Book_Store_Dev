const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈
const jwt = require("jsonwebtoken"); // jwt 모듈
const dotenv = require("dotenv");
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  let sql = "INSERT INTO users (email, password) VALUES (?,?)";
  let values = [email, password];

  conn.query(sql, values, (err, result) => {
    console.log(err);
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(result);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end;
    }
    const loginUser = result[0];
    // 한명만 가져올거니까 0번인덱스
    if (loginUser && loginUser.password === password) {
      // 토큰 발행
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.SECRET,
        {
          expiresIn: "5m",
          issuer: "updownpark",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log(token);
      return res.status(StatusCodes.OK).json(result);
    } else {
      //만약 계정정보 일치하지 않는다면?
      return res.status(StatusCodes.UNAUTHORIZED).end();
      // 403: Forbidden (접근권리없음)
      // 401: unauthorized (비인증상태)
    }
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = result[0];
    if (user) {
      return res.status(StatusCodes.OK).json({ email: email });
    } // 여기서 이메일을 넘겨주는 이유는 프론트에서 해당 Email 정보를 저장해야
    // 해당 이메일에 해당하는 비밀번호를 수정할 수 있게된다.
    return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;
  //근데 email은 이미 브라우저가 알고있는 Email이어야함 (input으로 받는거 x)
  let sql = "UPDATE users SET password = ? WHERE email = ?";
  let values = [password, email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).end();
  });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
