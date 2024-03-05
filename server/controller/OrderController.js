const conn = require("../mariadb"); // db 모듈
const { StatusCodes } = require("http-status-codes"); //http 상태코드 모듈

const order = async (req, res) => {
  const getResult = (sql, values) => {
    return new Promise((resolve, reject) => {
      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        resolve(result);
      });
    });
  };

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let delivery_id;
  let order_id;
  let sql = "INSERT INTO delivery (address, receiver,contact) VALUES (?,?,?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  // 비동기함수니까 처리해줘야지

  // delivery 테이블 삽입
  const insertDeliveryResult = await getResult(sql, values);
  delivery_id = insertDeliveryResult.insertId;

  sql =
    "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  // ordered 테이블 삽입
  const insertOrderResult = await getResult(sql, values);
  order_id = insertOrderResult.insertId;

  // items를 가지고, 장바구니에서 book_id, quantity를 조회
  sql = "SELECT book_id, quantity FROM cartItems WHERE id IN (?)";
  let orderItems = await getResult(sql, [items]);
  console.log(orderItems);

  sql = "INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?";
  // items.. 배열 : 요소들을 하나씩 꺼내서 foreach문을 돌림
  values = [];
  orderItems.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  // 이렇게 하면 여러번의 query를 보내지 않아도 이중배열을 이용해서 여러번의 데이터를 한번에 넣어줄 수 있다.
  // orderedBook 테이블 삽입
  const insertOrderedBookResult = await getResult(sql, [values]);

  // 장바구니 삭제
  let result = await deleteCartItems(getResult, items);

  return res.status(StatusCodes.OK).json(result);
};

const deleteCartItems = async (getResult, items) => {
  let sql = "DELETE FROM cartItems WHERE id IN (?)";
  let values = [items];

  return await getResult(sql, values);
};

const getOrders = (req, res) => {
  let sql =
    "SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity ,total_price FROM orders LEFT JOIN delivery ON orders.delivery_id=delivery.id;";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

const getOrderDetail = (req, res) => {
  const { id } = req.params;
  let sql =
    "SELECT book_id, title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?";
  conn.query(sql, id, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { order, getOrders, getOrderDetail };
