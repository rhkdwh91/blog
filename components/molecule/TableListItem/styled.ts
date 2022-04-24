import styled from "styled-components";

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: solid 1px #ddd;
  cursor: pointer;
  background-color: #fff;
  justify-content: space-between;
  word-break: break-all;
  > .table_list_id {
    width: 10%;
  }
  > .table_list_title {
    width: 50%;
  }
  > .table_list_username {
    width: 20%;
  }
  > .table_list_time {
    width: 20%;
  }
`;
