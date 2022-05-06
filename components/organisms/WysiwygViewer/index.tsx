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
//import { mediaBlockRenderer } from "components/organisms/WIsywyg/Media";
import { styleMap } from "components/organisms/Wysiwyg/styleMap";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  alignmentPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [focusPlugin, resizeablePlugin, imagePlugin, alignmentPlugin];

interface IDraftEditor {
  title?: string;
  content?: any;
}

export default function WysiwygEditor({ title, content }: IDraftEditor) {
  const [state, setState] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (content) {
      setState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, []);
  return (
    <div>
      <Styled.PostTitle>{title}</Styled.PostTitle>
      <Styled.MyBlock>
        <Editor
          readOnly={true}
          editorState={state}
          blockStyleFn={getBlockStyle}
          blockRenderMap={extendedBlockRenderMap}
          customStyleMap={styleMap}
          //blockRendererFn={mediaBlockRenderer}
          plugins={plugins}
          onChange={() => {}}
          handleKeyCommand={() => "not-handled"}
        />
      </Styled.MyBlock>
    </div>
  );
}
