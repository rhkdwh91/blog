import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 4px;
  background-color: #fff;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  position: fixed;
  left: 50%;
  z-index: 999;
  width: 300px;
  margin-left: -150px;
  padding: 40px 10px;
  > p {
    margin: 5px 0;
    > textarea {
      width: 100%;
      height: 250px;
    }
    > input {
      width: 100%;
      height: 20px;
    }
    > button {
      margin: 0 5px;
    }
  }
`;

export const AddButton = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #ededed;
  color: #000;
`;
