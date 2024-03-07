import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useLocation, useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

export default function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (category_id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category_id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, category_id.toString());
    }
    setSearchParams(newSearchParams);
  };

  const handleNewParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, "true");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            schema={item.isActive ? "primary" : "normal"}
            key={item.category_id}
            onClick={() => handleParams(item.category_id)}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          schema={searchParams.get(QUERYSTRING.NEWS) ? "primary" : "normal"}
          onClick={() => handleNewParams()}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;
  .category {
    display: flex;
    gap: 8px;
  }
`;

// new URLSearchParams
// useSearchParams()

/**
  const handleCategory = (category_id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    // query가 포함된 params string값 넣으면 query string을 찾아준다.
    // searchParams를 사용하는 이유는 일단 query를 변경시켜 url을 변경할 수 있다.
    // 그 url을 통해 데이터를 분기해서 가져올 수 있음
    if (category_id === null) {
      //전체를 클릭한 경우
      newSearchParams.delete("category_id");
    } else {
      newSearchParams.set("category_id", category_id.toString());
      // book?category_id=1
      //요런식으로 추가가됨
    }
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get("news")) {
      newSearchParams.delete("news");
    } else {
      newSearchParams.set("news", "true");
    }
    setSearchParams(newSearchParams);
  };
 */
