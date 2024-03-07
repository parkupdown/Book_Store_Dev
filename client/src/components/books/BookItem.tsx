import styled from "styled-components";
import { Book } from "../../models/book.model";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa";

export default function BooksItem({ book }: { book: Book }) {
  return (
    <BooksItemStyle>
      <div className="img">
        <img src={getImgSrc(book.img)} alt={book.title} />
      </div>
      <div className="content">
        <h2 className="title">{book.title}</h2>
        <p className="summary">{book.summary}</p>
        <p className="author">{book.author}</p>
        <p className="price">{formatNumber(book.price)}원</p>
        <div className="likes">
          <FaHeart />
          <span>{book.likes}</span>
        </div>
      </div>
    </BooksItemStyle>
  );
}

const BooksItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }

  .content {
    padding: 16px;
    position: relative;
    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    .summary {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 rpx 0;
    }

    .author {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 rpx 0;
    }
    .price {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 rpx 0;
      font-weight: 700;
    }

    .likes {
      display: inline-flex;
      //내부의 자식들의 너비 만큼만 영역이 커짐
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primary};
      margin: 0 0 4px 0;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute;
      bottom: 16px;
      right: 16px;

      svg {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;
