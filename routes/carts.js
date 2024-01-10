const express = require("express");
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controller/CartController.js");
const router = express.Router();

router.post("/", addToCart); // 장바구니 담기

router.get("/", getCartItems); // 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회

router.delete("/:id", removeCartItem); // 장바구니 목록 삭제

module.exports = router;
