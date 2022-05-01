import React, { useRef, useCallback, useEffect } from "react";
import Prism from "prismjs";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import DOMPurify from "dompurify";
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useMutation, gql } from "@apollo/client";

/*
import S3 from "react-aws-s3-typescript";
import { v4 as uuidv4 } from "uuid";
import s3config from "config/s3config";
*/

import * as Styled from "./styled";

const UPLOAD_FILE = gql`
  mutation fileUpload($file: [Upload]!) {
    fileUpload(file: $file) {
      url
    }
  }
`;

interface IToastEditor {
  postAction: (payload) => Promise<void>;
  uid?: string;
  data?: any;
}

function ToastEditor({ postAction, uid, data }: IToastEditor) {
  const editorRef: any = useRef();
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.board.title);
  const content = useSelector((state: State) => state.board.content);

  const handleChangeContent = () => {
    const editorInstance = editorRef.current.getInstance();
    console.log(editorInstance);
    const getContent_md = editorInstance?.getMarkdown();
    dispatch({ type: CHANGE_CONTENT, data: getContent_md });
    /*
    const getContent_html = editorInstance?.getHtml();
    console.log("-- HTML --");
    console.log(getContent_html);
    */
  };

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: CHANGE_TITLE,
        //data: e.currentTarget.value,
        data: DOMPurify.sanitize(e.currentTarget.value),
      });
    },
    [title]
  );

  const handleClickSave = useCallback(() => {
    uid !== undefined
      ? postAction({
          uid: Number(uid),
          title,
          content,
        })
      : postAction({
          title,
          content,
        });
  }, [title, content]);

  const [fileUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", async (blob, callback) => {
          const file = blob;
          if (!file) return;
          const result: any = await fileUpload({
            variables: { file: [file] },
          });
          console.log(result);
          return callback(result?.data.fileUpload.url[0], "imageURL");
          /*
          const ReactS3Client = new S3(s3config);
          ReactS3Client.uploadFile(blob, uuidv4())
            .then((data) => callback(data.location, "imageURL"))
            .catch((err) => console.log(err));*/
        });
    }
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <Styled.Title
        type="string"
        value={title}
        onChange={handleChangeTitle}
        placeholder="제목을 입력해주세요"
      />
      <Editor
        previewStyle="vertical"
        usageStatistics={false}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={handleChangeContent}
        ref={editorRef}
      />
      <button style={{ marginTop: "10px" }} onClick={handleClickSave}>
        저장
      </button>
    </div>
  );
}

export default ToastEditor;
