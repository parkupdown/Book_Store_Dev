import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props {
  placeholer?: string;
}

export const InputText = React.forwardRef(
  ({ placeholer }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyled placeholder={placeholer} ref={ref} />;
  }
);

const InputTextStyled = styled.input.attrs({ type: "text" })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 1px solid ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
