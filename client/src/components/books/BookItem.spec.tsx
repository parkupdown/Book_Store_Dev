import React from "react";
import { render } from "@testing-library/react";
import { Book } from "../../models/book.model";
import { BookStoreThemeProvider } from "../../context/themeContext";
import BooksItem from "./BookItem";

const dummyBook: Book = {
  id: 1,
  title: "Dummy Book",
  img: 5,
  category_id: 1,
  summary: "Dummy Summary",
  author: "Dummy Author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "Dummy ISBN",
  detail: "Dummy Detail",
  pages: 100,
  contents: "Dummy Contents",
  pubDate: "2021-01-01",
};

describe("BookItem", () => {
  it("렌더 여부", () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BooksItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(`10,000원`)).toBeInTheDocument();
  });
});
