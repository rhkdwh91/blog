import styled from "styled-components";

export const MyBlock = styled.div`
  display: flex;
  & .RichEditor-root {
    background: #fff;
    border: 1px solid #ddd;
    font-family: "Georgia", serif;
    font-size: 14px;
    padding: 15px;
  }

  & .RichEditor-editor {
    border-top: 1px solid #ddd;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }

  & .RichEditor-editor .public-DraftEditorPlaceholder-root,
  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
  }

  & .RichEditor-editor .public-DraftEditor-content {
    min-height: 100px;
  }

  & .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }

  & .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: "Hoefler Text", "Georgia", serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
  }

  & .RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: "Inconsolata", "Menlo", "Consolas", monospace;
    font-size: 16px;
    padding: 20px;
  }

  & .public-DraftStyleDefault-pre {
    > pre {
      background: #f1f1f1;
      border-radius: 3px;
      padding: 1px 10px;
      border-left: solid 4px #00dd6d;
      padding: 5px 20px;
    }
  }

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
    & ol {
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
  }
`;

export const Title = styled.input`
  border: 1px solid #f1f1f1;
  width: 600px;
  height: 35px;
`;
