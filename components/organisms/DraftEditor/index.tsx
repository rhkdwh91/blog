import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { RESET_DRAFT, CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import DOMPurify from "dompurify";
import * as Styled from "./styled";
import DraftPost from "components/molecule/DraftPost";

interface IDraftEditor {
  postAction: (payload) => Promise<void>;
  uid?: string;
  data?: any;
}

export default function DrafteEditor({ postAction, uid, data }: IDraftEditor) {
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.board.title);
  const content = useSelector((state: State) => state.board.content);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const htmlToEditor = useCallback(() => {
    const blocksFromHtml = htmlToDraft(data.post.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const convertState = EditorState.createWithContent(contentState);
    setEditorState(convertState);
  }, [data]);

  useEffect(() => {
    uid !== undefined
      ? htmlToEditor()
      : dispatch({
          type: RESET_DRAFT,
        });
  }, []);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: CHANGE_TITLE,
        data: DOMPurify.sanitize(e.currentTarget.value),
      });
    },
    [title]
  );

  // HTML 변환 공통 함수
  const editorToHtml = useCallback(
    (editorState) => {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    },
    [editorState]
  );

  const onEditorStateChange = useCallback(
    (editorState) => {
      setEditorState(editorState);
      // 리덕스 changeField
      dispatch({
        type: CHANGE_CONTENT,
        data: DOMPurify.sanitize(editorToHtml(editorState)),
      });
    },
    [editorState]
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

  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: "http://dummy_image_src.com" } });
    });
  };

  return (
    <Styled.MyBlock>
      <div className="draft-editor-wrap">
        <Styled.Title
          type="string"
          value={title}
          onChange={handleChangeTitle}
          placeholder="제목을 입력해주세요"
        />
        <Editor
          // 에디터와 툴바 모두에 적용되는 클래스
          wrapperClassName="wrapper-class"
          // 에디터 주변에 적용된 클래스
          editorClassName="editor"
          // 툴바 주위에 적용된 클래스
          toolbarClassName="toolbar-class"
          // 툴바 설정
          toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
            image: { uploadCallback: uploadCallback },
          }}
          placeholder="내용을 작성해주세요."
          // 한국어 설정
          localization={{
            locale: "ko",
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
        />
        <button onClick={handleClickSave}>저장</button>
      </div>
      <DraftPost title={title} content={content} height={uid ? 640 : 0} />
    </Styled.MyBlock>
  );
}
