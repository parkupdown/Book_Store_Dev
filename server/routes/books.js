const express = require("express");
const { allBooks, bookDetail } = require("../controller/BookController.js");
const router = express.Router();

router.get("/", allBooks); // 전체 도서 조회
// + 카테고리 도서 목록까지 뽑아줌
router.get("/:id", bookDetail); // 개별 도서 조회

module.exports = router;
