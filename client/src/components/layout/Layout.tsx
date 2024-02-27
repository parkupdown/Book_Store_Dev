import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayOutProps {
  children: React.ReactNode;
}
//ReactNode라는 타입은 ? 리액트로 만든 리액트 컴포넌트들이 배치될 수 있다.
export default function LayOut({ children }: LayOutProps) {
  return (
    <>
      <Header />
      <LayoutStyled>{children}</LayoutStyled>
      <Footer />
    </>
  );
}

const LayoutStyled = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;
