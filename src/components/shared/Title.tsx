import styled from 'styled-components';

type TitleType = {
  centered?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
};
const Title = styled.h4.attrs(({ centered, style }: TitleType) => {
  return {
    style: {
      textAlign: centered ? 'center' : 'left',
      ...style,
    },
  };
})<TitleType>`
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
  user-select: none;
`;

export default Title;
