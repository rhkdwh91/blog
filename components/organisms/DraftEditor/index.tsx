import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import * as Styled from "./styled";

interface IDraftEditor {
  postCreate: (payload: PostType) => Promise<void>;
}

export default function DrafteEditor({ postCreate }: IDraftEditor) {
  const dispatch = useDispatch();
  const { title, content } = useSelector((state: State) => state.board);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
  const editorToHtml = (editorState) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // 리덕스 changeField
    dispatch({
      type: CHANGE_CONTENT,
      data: DOMPurify.sanitize(editorToHtml(editorState)),
    });
  };

  const handleClickSave = useCallback(() => {
    postCreate({
      title,
      content,
    });
  }, [title, content]);

  return (
    <Styled.MyBlock>
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
    </Styled.MyBlock>
  );
}
