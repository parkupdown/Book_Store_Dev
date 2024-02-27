import styled from "styled-components";
import { ButtonSchema, ButtonSize } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: ButtonSize;
  schema: ButtonSchema;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  size,
  schema,
  disabled,
  isLoading,
}: Props) {
  return (
    <ButtonStyle
      size={size}
      schema={schema}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].fontSize};
  background-color: ${({ theme, schema }) =>
    theme.buttonSchema[schema].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
