// 변경된 query string을 감지해서
// books를 갱신하는 역할을 한다.

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { useEffect } from "react";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1,
  });
  const [isEmpty, setIsEmpty] = useState(true);
  // 여기서 Location과 useSearchParams의 차이는 버전의 따라 다르다.
  // useSearchParams는 V6부터 지원이 된다.
  // 개발자가 사용하는 React Version에 따라 사용하면될듯
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // 현재 url 위치의 parameter 값을 가져옴
    // 여기서 query에따라서 데이터를 분기함
    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      news: params.get(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      limit: LIMIT,
    }).then(({ books, pagination }) => {
      setBooks(books);
      setPagination(pagination);
      //pagenation 아직 개발안해서 오류발생
      setIsEmpty(books.length === 0);
    });
  }, [location]);

  return { books, pagination, isEmpty };
};
