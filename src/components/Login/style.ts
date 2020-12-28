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
