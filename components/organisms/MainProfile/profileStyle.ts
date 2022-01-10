import styled, { css } from "styled-components";

export const ImageCard = styled.div`
  ${({ theme }) => css`
    width: 40%;
    > img {
      margin: 0 auto;
    }
    ${theme.defaultCard}
    ${theme.laptopSize} {
      width: auto;
      padding: 20px;
      margin: 10px 0;
    }
  `}
`;

export const ContentCard = styled.div`
  ${({ theme }) => css`
    width: 60%;
    ${theme.defaultCard}
    ${theme.laptopSize} {
      width: auto;
      padding: 20px;
      margin: 10px 0;
    }
  `}
`;

export const ContentText = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
`;

export const CardWrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    ${theme.flexCardWrap}
    ${theme.laptopSize} {
      display: block;
    }
  `}
`;
