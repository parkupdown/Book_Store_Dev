const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈

const bookDetail = (req, res) => {
  let { user_id } = req.params;
  let book_id = req.params.id;

  user_id = parseInt(user_id);
  book_id = parseInt(book_id);
  let sql =
    "SELECT *,(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, (SELECT EXISTS (SELECT * FROM likes WHERE user_id= ? AND liked_book_id= ?))AS likes FROM books LEFT JOIN category ON books.category_id = category.category_id WHERE books.id = ? ";
  // LEFT JOIN을 한 후에 WHERE로 한정해야함
  // 한정한 후 LEFT JOIN은 안됨
  let values = [user_id, book_id, book_id];

  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result[0]) {
      return res.status(StatusCodes.OK).json(result[0]);
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;
  // limit => page 당 도서 수
  // currentPage => 현재 몇 페이지
  // oofset = >limit*(currentPage-1)
  console.log(news);
  category_id = parseInt(category_id);
  limit = parseInt(limit);
  let offset = limit * (currentPage - 1);
  // offset을 받지 않고 Front에서는 currentPage를 보내고 Back에서 offset을 처리한다.
  let sql =
    "SELECT *, (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books";
  // LIMITE, OFFSET은 마지막에 나와야한다.
  let value = [];

  if (category_id && news) {
    sql =
      "SELECT *,(SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    value = [category_id];
    // 신작 카테고리별
  } else if (category_id) {
    sql =
      "SELECT *,(SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books WHERE category_id = ?";
    value = [category_id];
    // 카테고리별
  } else if (news) {
    sql =
      "SELCET *,(SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes FROM books WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }
  // 신작
  if (limit && currentPage) {
    sql = sql + " LIMIT ? OFFSET ?";
    value.push(limit, offset);
  }
  // LIMIT 이만큼 OFFSET 여기서부터
  //그래서 1부터 5개씩?
  // LIMIT 5 OFFSET 0;
  // 6부터 5개씩?
  // LIMIT 5 OFFSET 5;
  // 나눠서 받을거니?
  conn.query(sql, value, (err, result) => {
    console.log(sql);
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  });
  // allBooks API가 여기로 들어옴
};

/*
const allBooks = (req, res) => {
  // 요약된 전체 도서 리스트
  let sql = "SELECT * FROM books";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};
 */

module.exports = { allBooks, bookDetail };
