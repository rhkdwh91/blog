import React, { useEffect, useState } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import * as Styled from "./styled";
import {
  getBlockStyle,
  extendedBlockRenderMap,
} from "components/organisms/Wysiwyg/CustomBlock";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";

import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createFocusPlugin from "@draft-js-plugins/focus";
import createImagePlugin from "@draft-js-plugins/image";

import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createVideoPlugin from "@draft-js-plugins/video";
//import { mediaBlockRenderer } from "components/organisms/WIsywyg/Media";
import { styleMap } from "constants/wysisygLib";
import { blockRendererFn } from "../Wysiwyg/VideoAdd";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  alignmentPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const videoPlugin = createVideoPlugin();

const plugins = [
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  alignmentPlugin,
  videoPlugin,
];

interface IDraftEditor {
  title?: string;
  content?: any;
}

function WisiwigNavi({ blocks }) {
  return (
    <Styled.WingNavWrap>
      <Styled.WingNav>
        {blocks?.map((nav, i) => (
          <li key={i}>{nav.text}</li>
        ))}
      </Styled.WingNav>
    </Styled.WingNavWrap>
  );
}

export default function WysiwygEditor({ title, content }: IDraftEditor) {
  const [state, setState] = useState(EditorState.createEmpty());
  useEffect(() => {
    console.log(JSON.parse(content)?.blocks);
    if (content) {
      setState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, []);
  return (
    <Styled.Wrap>
      <Styled.PostTitle>{title}</Styled.PostTitle>
      <Styled.MyBlock>
        <Editor
          readOnly={true}
          editorState={state}
          blockStyleFn={getBlockStyle}
          blockRenderMap={extendedBlockRenderMap}
          customStyleMap={styleMap}
          blockRendererFn={blockRendererFn}
          plugins={plugins}
          onChange={() => {}}
          handleKeyCommand={() => "not-handled"}
        />
      </Styled.MyBlock>
      <WisiwigNavi
        blocks={JSON.parse(content)?.blocks?.filter(
          (block) => block?.type === "HeaderOne"
        )}
      />
    </Styled.Wrap>
  );
}
