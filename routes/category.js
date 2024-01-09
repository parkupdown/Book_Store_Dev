const express = require("express");
const allCategory = require("../controller/CategoryController.js");
const router = express.Router();
router.use(express.json());

router.get("/", allCategory); // 카테고리 목록 전체조회

module.exports = router;
