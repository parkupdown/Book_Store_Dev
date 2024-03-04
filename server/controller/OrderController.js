const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈

const order = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let delivery_id;
  let order_id;
  let sql = "INSERT INTO delivery (address, receiver,contact) VALUES (?,?,?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    delivery_id = result.insertId;

    sql =
      "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];

    conn.query(sql, values, (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      order_id = result.insertId;

      sql = "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
      // items.. 배열 : 요소들을 하나씩 꺼내서 foreach문을 돌림
      values = [];
      items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
      });

      // 이렇게 하면 여러번의 query를 보내지 않아도 이중배열을 이용해서 여러번의 데이터를 한번에 넣어줄 수 있다.
      conn.query(sql, [values], (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(result);
      });
    });
  });
};

const getOrders = () => {
  res.json("주문 목록 조회");
};

const getOrderDetail = () => {
  res.json("주문 상세 상품 조회");
};

module.exports = { order, getOrders, getOrderDetail };
