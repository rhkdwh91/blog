import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { RESET_DRAFT, CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  //DefaultDraftBlockRenderMap,
} from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import DOMPurify from "dompurify";
import * as Styled from "./styled";
import DraftPost from "components/molecule/DraftPost";
import { mediaBlockRenderer } from "./Media";
//import { linkDecorator } from "./Link";

const StyleButton = ({ style, onToggle, active, label }) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  const className = !active
    ? "RichEditor-styleButton"
    : "RichEditor-styleButton RichEditor-activeButton";

  return (
    <span className={className} onMouseDown={onMouseDown}>
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
  { label: "Fire", style: "new-block-type-name" },
];

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  var currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

interface IDraftEditor {
  postAction: (payload) => Promise<void>;
  uid?: string;
  data?: any;
}

export default function WysiwygEditor({ postAction, uid, data }: IDraftEditor) {
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.board.title);
  const content = useSelector((state: State) => state.board.content);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const htmlToEditor = useCallback(() => {
    setEditorState(
      EditorState.createWithContent(convertFromHTML(data.post.content))
    );
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
        //data: e.currentTarget.value,
        data: DOMPurify.sanitize(e.currentTarget.value),
      });
    },
    [title]
  );

  // HTML 변환 공통 함수
  const editorToHtml = useCallback(
    (editorState) => {
      return convertToHTML(editorState.getCurrentContent());
    },
    [editorState]
  );

  const onEditorStateChange = useCallback(
    (editorState) => {
      setEditorState(editorState);
      // 리덕스 changeField
      dispatch({
        type: CHANGE_CONTENT,
        //data: editorToHtml(editorState),
        data: String(editorToHtml(editorState)),
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

  /*
  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: "http://dummy_image_src.com" } });
    });
  };*/

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, inlineStyle));
  };

  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = prompt("Please enter the URL of your link");
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "apply-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const handleInsertImage = () => {
    const src = prompt("Please enter the URL of your picture");
    if (!src) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
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
        <button
          disabled={editorState.getUndoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.undo(editorState))}
        >
          undo
        </button>
        <button
          disabled={editorState.getRedoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.redo(editorState))}
        >
          redo
        </button>
        <button
          disabled={editorState.getSelection().isCollapsed()}
          onMouseDown={(e) => {
            e.preventDefault();
            handleAddLink();
          }}
        >
          link
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleInsertImage();
          }}
        >
          image
        </button>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <Editor
          // 초기값 설정
          editorState={editorState}
          onChange={onEditorStateChange}
          handleKeyCommand={handleKeyCommand}
          //blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          //ref="editor"
          //blockRenderMap={extendedBlockRenderMap}
          blockRendererFn={mediaBlockRenderer}
        />
        <button onClick={handleClickSave}>저장</button>
      </div>
      <DraftPost title={title} content={content} height={uid ? 640 : 0} />
    </Styled.MyBlock>
  );
}

/*
const CustomComponent = ({ children }) => {
  return (
    <div>
      <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 </span>
      {children}
      <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 </span>
    </div>
  );
};

const blockRenderMap = Immutable.Map({
  "new-block-type-name": {
    element: CustomComponent,
  },
});

  const extendedBlockRenderMap =
    DefaultDraftBlockRenderMap.merge(blockRenderMap);

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "new-block-type-name":
      return {
        component: CustomComponent,
        editable: false,
      };
    default:
      return null;
  }
};
*/
