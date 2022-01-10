import styled, { css } from "styled-components";

export const HeaderWrap = styled.div`
  width: 100%;
`;

export const MenusWrap = styled.ul`
  ${({ theme }) => css`
    width: ${theme.desktopContentSize};
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    ${theme.laptopSize} {
      display: block;
      width: 100%;
    }
  `}
`;

export const MenusItem = styled.li`
  ${({ theme }) => css`
    display: inline-block;
    margin: 0 20px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    &:last-child {
      margin: 0 0 0 20px;
    }
    &:hover {
      border-bottom: solid 2px ${theme.mainColor};
      padding: 5px;
    }
    & a {
      font-style: none;
      text-decoration: none;
      color: #222;
    }
    ${theme.laptopSize} {
      margin: 10px;
      &:last-child {
        margin: 10px;
      }
    }
  `}
`;

export const FooterWrap = styled.div`
  ${({ theme }) => css`
    width: ${theme.desktopContentSize};
    margin: 0 auto;
    text-align: right;
    ${theme.laptopSize} {
      width: 100%;
    }
  `}
`;

export const ContentWrap = styled.div`
  ${({ theme }) => css`
    width: ${theme.desktopContentSize};
    margin: 0 auto;
    padding: 20px 0;
    text-align: center;
    ${theme.laptopSize} {
      width: 100%;
    }
  `}
`;

export const CardList = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 40px 0 100px 0;
    > div {
      width: calc(33% - 56px);
      margin: 10px;
    }
    ${theme.laptopSize} {
      display: block;
      > div {
        width: auto;
        margin: 20px;
      }
    }
  `}
`;
