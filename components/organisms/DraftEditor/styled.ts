import styled from "styled-components";

export const MyBlock = styled.div`
  display: flex;
  > .draft-editor-wrap {
    width: 100%;
    max-width: 700px;
    .wrapper-class {
      margin: 20px auto 0 auto;
      margin-bottom: 4rem;
      box-sizing: border-box;
    }
    .editor {
      height: 500px !important;
      border: 1px solid #f1f1f1 !important;
      padding: 5px !important;
      border-radius: 2px !important;
    }
    & h1 {
      font-size: 32px;
    }
    & h2 {
      font-size: 24px;
    }
    & h3 {
      font-size: 21px;
    }
    & h4 {
      font-size: 18px;
    }
    & h5 {
      font-size: 14px;
    }
  }
`;

export const Title = styled.input`
  border: 1px solid #f1f1f1;
  width: 600px;
  height: 35px;
`;
