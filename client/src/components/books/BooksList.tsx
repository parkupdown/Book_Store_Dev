import styled from "styled-components";
import BooksItem from "./BookItem";
import { Book } from "../../models/book.model";

interface Props {
  books: Book[];
}

export default function BooksList({ books }: Props) {
  return (
    <BooksListStyle>
      {books?.map((item) => {
        return <BooksItem key={item.id} book={item} />;
      })}
    </BooksListStyle>
  );
}
const BooksListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
