const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈
const jwt = require("jsonwebtoken"); // jwt 모듈
const crypto = require("crypto"); // 기본 내장모듈로 암호화를 담당
const dotenv = require("dotenv");

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString("base64");
  // randomBytes => 매개변수로들어오는 숫자를 가지고 랜덤바이트를 만들어줌 (64만큼의 길이를)
  // toString() => 문자열로 바꾸는데 base64로 바꾼다.

  // salt때문에 계속 password가 바뀌게됨
  // 그럼 salt를 고정시키는방법 1
  // salt를 데이터베이스에 저장하는방법 2

  // 2번방법 => 회원가입 시 비밀번호를 암호화해서 암호회된 비밀번호와 Salt값을 저장

  // 로그인시 salt값을 가져와서 이메일 & 비밀번호(날것) => slat값 꺼내서 비밀번호 암호화 해보고 DB에 저장된 비밀번호와 비교

  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
  // pbkdf2Sync => password -based key derivation function 2

  let sql = "INSERT INTO users (email, password, salt) VALUES (?,?,?)";
  let values = [email, hashPassword, salt];
  // password = > hashPassword
  conn.query(sql, values, (err, result) => {
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
      return res.status(StatusCodes.BAD_REQUEST).end;
    }
    const loginUser = result[0];
    // 한명만 가져올거니까 0번인덱스

    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === hashPassword) {
      // 토큰 발행
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.SECRET,
        {
          expiresIn: "20m",
          issuer: "updownpark",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });

      return res
        .status(StatusCodes.OK)
        .json({ ...result[0], token, token: token });
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
    // 이미 user의 pwd는 해싱된 값

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
  let sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  let values = [hashPassword, salt, email];
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
