const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json("장바구니 담기");
});
router.get("/", (req, res) => {
  res.json("장바구니 조회");
});
router.delete("/:id", (req, res) => {
  res.json("장바구니 삭제");
});

// 장바구니에서 선택한 주문 예상 상품 목록 조회
router.get("/", (req, res) => {
  res.json("장바구니 조회");
});

module.exports = router;
