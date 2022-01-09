import styled from "styled-components";

export const HeaderWrap = styled.div`
  width: 100%;
`;

export const MenusWrap = styled.ul`
  width: ${({ theme }) => theme.desktopContentSize};
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenusItem = styled.li`
  display: inline-block;
  margin: 0 20px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  &:last-child {
    margin: 0 0 0 20px;
  }
  &:hover {
    border-bottom: solid 2px ${({ theme }) => theme.mainColor};
    padding: 5px;
  }
  & a {
    font-style: none;
    text-decoration: none;
    color: #222;
  }
`;

export const FooterWrap = styled.div`
  width: ${({ theme }) => theme.desktopContentSize};
  margin: 0 auto;
  text-align: right;
`;

export const ContentWrap = styled.div`
  width: ${({ theme }) => theme.desktopContentSize};
  margin: 0 auto;
  padding: 20px 0;
  text-align: center;
`;

export const CardList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 100px 0 200px 0;
  > div {
    width: calc(25% - 40px);
    margin: 10px;
  }
`;
