import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagination.model";
import { LIMIT } from "../../constants/pagination";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

interface Props {
  pagination: IPagination;
}

export default function Pagenation({ pagination }: Props) {
  const { totalCount, currentPage } = pagination;

  const [searchParams, setSearchParams] = useSearchParams();

  const pages: number = Math.ceil(totalCount / LIMIT);
  // 전체 page의 숫자
  const handleClickPage = (page: number) => {
    //page역시 Querystring에 넣음
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li>
                <Button
                  key={index}
                  size="small"
                  schema={index + 1 == currentPage ? "primary" : "normal"}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px;
  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
