import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";
const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  { value: "grid", icon: <FaTh /> },
];

export type ViewMode = "list" | "grid";

export default function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    // 현재의 query string을 가져옴
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((options) => (
        <Button
          key={options.value}
          size="medium"
          schema={
            searchParams.get(QUERYSTRING.VIEW) === options.value
              ? "primary"
              : "normal"
          }
          onClick={() => handleSwitch(options.value as ViewMode)}
        >
          {options.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;
  }
`;
