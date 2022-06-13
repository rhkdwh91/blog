import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 auto;
`;

export const WingNavWrap = styled.div`
  position: absolute;
  right: -20px;
`;

export const WingNav = styled.ul`
  position: fixed;
  top: 200px;
  border-left: solid 3px rgb(0, 221, 109);
  text-align: left;
  > li {
    margin: 0 0 20px 10px;
    font-size: 20px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const PostTitle = styled.h1`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const MyBlock = styled.div`
  display: flex;

  & .RichEditor-root {
    position: absolute;
    background: #fff;
    border: 1px solid #ddd;
    font-family: "Georgia", serif;
    font-size: 14px;
    padding: 15px;
  }

  & .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: "Hoefler Text", "Georgia", serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
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
    & pre {
      word-break: break-all;
      white-space: break-spaces;
    }
  }

  > div {
    width: 100%;
    max-width: 700px;
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
