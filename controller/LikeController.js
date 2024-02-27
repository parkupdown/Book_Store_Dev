const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈

const addLike = (req, res) => {
  // 좋아요 추가
  const { id } = req.params;
  let { user_id } = req.body;
  user_id = parseInt(user_id);

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES(?,?)";
  let value = [user_id, id];

  conn.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  let { user_id } = req.body;
  user_id = parseInt(user_id);

  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let value = [user_id, id];

  conn.query(sql, value, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).end();
  });
};

module.exports = { addLike, removeLike };
