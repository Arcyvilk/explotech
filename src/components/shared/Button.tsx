import styled from 'styled-components';

const Button = styled.button.attrs(({ disabled }: { disabled?: boolean }) => {
  return {
    style: {
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };
})<{ disabled?: boolean }>`
  width: 100%;
  height: 64px;
  background-color: #ff9999;
  color: red;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  user-select: none;
  cursor: pointer;
`;

export default Button;
