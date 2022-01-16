import styled from "styled-components";

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: solid 1px #ddd;
  cursor: pointer;
  background-color: #fff;
  justify-content: space-between;
  > .board_list_id {
    width: 10%;
  }
  > .board_list_title {
    width: 50%;
  }
  > .board_list_username {
    width: 10%;
  }
  > .board_list_time {
    width: 30%;
  }
`;
