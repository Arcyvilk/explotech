import styled from 'styled-components';
import background from '../../shared/images/city.jpg';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
  background-image: url(${background});
  background-size: cover;
  overflow: auto;
`;
export const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 3px double #666;
  background-color: black;
  box-shadow: 0 0 10px 3px #000;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
`;
export const Input = styled.input.attrs(({ empty }: { empty?: boolean }) => {
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
export const Title = styled.h4`
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
  user-select: none;
`;
export const Button = styled.button`
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
export const Hover = styled.span`
  cursor: help;
  color: red;
`;
