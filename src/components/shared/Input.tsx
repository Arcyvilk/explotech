import styled from 'styled-components';

const Input = styled.input.attrs(({ empty }: { empty?: boolean }) => {
  return {
    style: {
      border: empty ? '3px double red' : '3px double grey',
    },
  };
})<{ empty?: boolean }>`
  border-radius: 4px;
  margin: 16px 0;
  padding: 12px 4px;
  font-size: 14px;
  text-align: center;
`;

export default Input;
