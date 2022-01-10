import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 4px;
  padding: 20px 10px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  > p {
    margin: 10px 0;
    color: #595959;
    white-space: pre-line;
    > textarea {
      width: 100%;
      height: 250px;
    }
    > input {
      width: 100%;
      height: 20px;
    }
  }
  > .career-card-name {
    font-size: 14px;
    font-weight: 500;
  }
  > .carrer-card-project {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
  & button {
    margin: 10px 5px;
  }
`;

export const Date = styled.p`
  font-size: 14px;
  color: #ddd;
`;
