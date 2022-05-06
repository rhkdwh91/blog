import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { RESET_DRAFT, CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";

import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createFocusPlugin from "@draft-js-plugins/focus";
import createImagePlugin from "@draft-js-plugins/image";
import createAlignmentPlugin from "@draft-js-plugins/alignment";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";

//import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
//import mockUpload from "components/organisms/Wysiwyg/mockUpload";

import DOMPurify from "dompurify";
import * as Styled from "./styled";

import {
  getBlockStyle,
  extendedBlockRenderMap,
} from "components/organisms/Wysiwyg/CustomBlock";
import { gql, useMutation } from "@apollo/client";
import {
  styleMap,
  BLOCK_TYPES,
  INLINE_STYLES,
  removeInlineStyles,
} from "constants/wysisygLib";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  alignmentPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

/*
const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload as any,
  addImage: imagePlugin.addImage as any,
});*/

const plugins = [
  //dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  alignmentPlugin,
];

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

const fontSize = [30, 28, 26, 24, 22, 20, 18, 16, 14, 12];

interface IDraftEditor {
  postAction: (payload) => Promise<void>;
  uid?: string;
  data?: any;
}

const UPLOAD_FILE = gql`
  mutation fileUpload($file: [Upload]!) {
    fileUpload(file: $file) {
      url
    }
  }
`;

export default function WysiwygEditor({ postAction, uid, data }: IDraftEditor) {
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.board.title);
  const content = useSelector((state: State) => state.board.content);
  const [isFontBoxOpen, setIsFontBoxOpen] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imgFile, setImgFile] = useState(null);
  const [fileUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  const htmlToEditor = useCallback(() => {
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(data.post.content))
      )
    );
    dispatch({
      type: CHANGE_CONTENT,
      //data: editorToHtml(editorState),
      data: JSON.stringify(
        editorToHtml(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.post.content))
          )
        )
      ),
    });
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
      return convertToRaw(editorState.getCurrentContent());
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
        data: JSON.stringify(editorToHtml(editorState)),
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
    const newEditorState = removeInlineStyles(editorState);
    setEditorState(RichUtils.toggleBlockType(newEditorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
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

  const imageLoader = (src) => {
    if (!src) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src }
    );
    //const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    return setEditorState(imagePlugin.addImage(newEditorState, src, {}));
  };

  const handleInsertImage = () => {
    const src = prompt("Please enter the URL of your picture");
    imageLoader(src);
  };

  const handleFileInput = async (e: any) => {
    setImgFile(e.target.files[0]);
  };

  const handleInsertS3Image = async () => {
    console.log(imgFile);
    if (!imgFile) return;
    const result: any = await fileUpload({
      variables: { file: [imgFile] },
    });
    console.log(result);
    imageLoader(result?.data.fileUpload.url[0]);
    setImgFile(null);
  };

  const editor: any = useRef();

  const handleClickFontBox = () => {
    setIsFontBoxOpen(!isFontBoxOpen);
  };

  const toggleFontSize = (fontSize) => {
    try {
      setEditorState(
        RichUtils.toggleInlineStyle(editorState, `FONT_SIZE_${fontSize}`)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleFocus = () => {
    editor?.current.editor.focus();
  };

  return (
    <div>
      <Styled.Title
        type="string"
        value={title}
        onChange={handleChangeTitle}
        placeholder="제목을 입력해주세요"
      />
      <Styled.EditTool>
        <button onClick={handleClickFontBox}>FontSize</button>
        <Styled.FontBox isOpen={isFontBoxOpen}>
          {fontSize.map((size) => (
            <button key={size} onClick={() => toggleFontSize(size)}>
              font {size}
            </button>
          ))}
        </Styled.FontBox>
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
        <input
          type="file"
          name="file"
          onChange={handleFileInput}
          accept="image/gif,image/jpeg,image/png"
        />
        <button onClick={handleInsertS3Image}>S3 UPLOAD</button>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      </Styled.EditTool>
      <Styled.MyBlock onClick={handleFocus}>
        <div className="draft-editor-wrap">
          <Editor
            // 초기값 설정
            editorState={editorState}
            onChange={onEditorStateChange}
            handleKeyCommand={handleKeyCommand}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            blockRenderMap={extendedBlockRenderMap}
            //blockRendererFn={mediaBlockRenderer}
            plugins={plugins}
            ref={editor}
          />
          <AlignmentTool />
        </div>
      </Styled.MyBlock>
      <button onClick={handleClickSave}>저장</button>
    </div>
  );
}
