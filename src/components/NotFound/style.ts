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
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 3px double #666;
  background-color: black;
  box-shadow: 0 0 10px 3px #000;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  user-select: none;
`;