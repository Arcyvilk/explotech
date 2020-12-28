import styled from 'styled-components';

const Title = styled.h4.attrs(({ centered }: { centered?: boolean }) => {
  return {
    style: {
      textAlign: centered ? 'center' : 'left',
    },
  };
})<{ centered?: boolean }>`
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
  user-select: none;
`;

export default Title;
