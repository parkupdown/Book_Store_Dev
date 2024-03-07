const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const addLike = (req, res) => {
  // 좋아요 추가
  const bookId = req.params.id; // book_id

  let decodedJwt = decodeJwt(req, res);

  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  }
  if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "잘못된 토큰입니다." });
  }

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES(?,?)";
  let value = [decodedJwt.id, bookId];
  // jwt의 Payload에 id, email, password가 담겨져있어서 Id에 접근이 가능함
  conn.query(sql, value, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};
// 원래는 토큰을 header의 Authorization으로 들어옴

const removeLike = (req, res) => {
  const bookId = req.params.id; // book_id

  let decodedJwt = decodeJwt(req, res);

  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  }
  if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "잘못된 토큰입니다." });
  }

  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let value = [decodedJwt.id, bookId];

  conn.query(sql, value, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).end();
  });
};

function decodeJwt(req, res) {
  // jwt 예외처리를 해주어야함 , expired 됐을 수 도 있으니 !
  // TokenExpiredError: 유효기간이 만료된 토큰
  // JsonWebTokenError: 문제있는토큰
  try {
    let receivedJwt = req.headers["authorization"];
    let decodedJwt = jwt.verify(receivedJwt, process.env.SECRET);

    return decodedJwt;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    // jwt의 에러는 크게 2가지가 있음

    // 1. expired
    // 2. invalid

    // 결국 위 2가지 상황을 다르게 처리해주어야한다.
    // 그리고 여기서 res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인 세션이 만료되었습니다." });
    // 하면 res가 2번 호출되어 오류를 유발함
    return error;
  }
}

module.exports = { addLike, removeLike, decodeJwt };
