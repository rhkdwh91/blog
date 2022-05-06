import styled, { css } from "styled-components";

export const EditTool = styled.div`
  background-color: #fff;
  max-width: 700px;
  margin: 0 auto;
  & .RichEditor-controls {
    font-family: "Helvetica", sans-serif;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
  }

  & .RichEditor-styleButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
  }

  & .RichEditor-activeButton {
    color: red;
    font-weight: 700;
  }
`;

export const FontBox = styled.div<{ isOpen: boolean }>(
  ({ isOpen }) => css`
    ${isOpen
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
    background-color: #fff;
  `
);

export const MyBlock = styled.div`
  position: relative;
  height: 600px;
  overflow-y: auto;
  width: 730px;
  margin: 0 auto;
  & .awlhfjh {
    position: absolute;
    display: flex;
    transform: translate(-50%) scale(0);
    > div {
      margin: 0 2px;
    }
  }
  & .RichEditor-root {
    position: absolute;
    background: #fff;
    border: 1px solid #ddd;
    font-family: "Georgia", serif;
    font-size: 14px;
    padding: 15px;
  }

  & .DraftEditor-root {
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }

  & .public-DraftStyleDefault-pre {
    background: #f1f1f1;
    border-radius: 3px;
    padding: 1px 10px;
    border-left: solid 4px #00dd6d;
    padding: 5px 20px;
  }

  > div {
    width: 100%;
    position: relative;
    background-color: #fff;
    border: 0.0625rem solid #d7e2eb;
    border-radius: 0.75rem;
    overflow: hidden;
    padding: 1.5rem;
    width: 100%;
    max-width: 700px;
    min-height: 600px;
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
      line-height: 1.8;
    }

    & ul {
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
    & ol {
      counter-reset: ol0;
      > li {
        margin-left: 1.5em;
        list-style-type: none;
        position: relative;
        direction: ltr;
        counter-increment: ol0;
        display: flex;
        align-items: center;
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
          display: flex;
          align-items: center;
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
            display: flex;
            align-items: center;
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
  }
`;

export const Title = styled.input`
  border: 1px solid #f1f1f1;
  width: 600px;
  height: 35px;
`;
