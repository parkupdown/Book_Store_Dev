const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈
const { decodeJwt } = require("./LikeController");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// 장바구니 담기
// 회원 1명당 장바구니 1개
const addToCart = (req, res) => {
  const { book_id, quantity } = req.body;

  const decodedJwt = decodeJwt(req, res);

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

  const userId = decodedJwt.id;

  let sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  let value = [book_id, quantity, userId];

  conn.query(sql, value, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).end();
  });
};
// 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
  let { selected } = req.body;
  const decodedJwt = decodeJwt(req, res);

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

  const userId = decodedJwt.id;

  const value = [userId, selected];
  let sql =
    "SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id WHERE user_id = ? AND cartItems.id IN (?)";

  conn.query(sql, value, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};
// 장바구니 아이템 삭제
const removeCartItem = (req, res) => {
  let { id } = req.params; // cartItemId
  id = parseInt(id);
  let sql = "DELETE FROM cartItems WHERE id = ? ";

  conn.query(sql, id, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).end();
  });
};

module.exports = { addToCart, getCartItems, removeCartItem };
