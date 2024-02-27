import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholer?: string;
  inputType?: "text" | "email" | "password" | "number";
}

export const InputText = React.forwardRef(
  (
    { placeholer, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyled
        placeholder={placeholer}
        ref={ref}
        type={inputType}
        {...props}
        onChange={onChange}
      />
    );
  }
);

const InputTextStyled = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 1px solid ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
