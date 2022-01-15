import styled from "styled-components";

export const ContentBoard = styled.div`
  position: relative;
  background-color: #fff;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 100%;
  max-width: 700px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 4rem;
  text-align: left;
  outline: none;
  user-select: text;
  overflow-wrap: break-word;
  line-height: 2;
  & strong {
    font-weight: bold;
  }
  & span {
    line-height: 1.2;
  }
  > ul {
    > li {
      list-style-type: disc;
      margin-left: 1.5em;
      position: relative;
      direction: ltr;
    }
    > ul {
      > li {
        margin-left: 3em;
        list-style-type: circle;
        position: relative;
        direction: ltr;
      }
      > ul > li {
        margin-left: 4.5em;
        list-style-type: square;
        position: relative;
        direction: ltr;
      }
    }
  }
  & p {
    padding: 0;
    min-height: 16px;
  }
  > ol {
    counter-reset: ol0;
    > li {
      margin-left: 1.5em;
      list-style-type: none;
      position: relative;
      direction: ltr;
      counter-increment: ol0;
      &::before {
        left: -36px;
        position: absolute;
        text-align: right;
        width: 30px;
        content: counter(ol0) ". ";
      }
    }
    > ol {
      counter-reset: ol1;
      > li {
        margin-left: 3em;
        list-style-type: none;
        position: relative;
        direction: ltr;
        counter-increment: ol1;
        &::before {
          left: -36px;
          position: absolute;
          text-align: right;
          width: 30px;
          content: counter(ol1) ". ";
        }
      }
      > ol {
        counter-reset: ol2;
        > li {
          margin-left: 4.5em;
          list-style-type: none;
          position: relative;
          direction: ltr;
          counter-increment: ol2;
          &::before {
            left: -36px;
            position: absolute;
            text-align: right;
            width: 30px;
            content: counter(ol2) ". ";
          }
        }
      }
    }
  }
`;
