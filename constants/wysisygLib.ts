import { Modifier, EditorState } from "draft-js";

export const BLOCK_TYPES = [
  { label: "H1", style: "HeaderOne" },
  { label: "H2", style: "HeaderTwo" },
  { label: "H3", style: "HeaderThree" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
  { label: "Fire", style: "new-block-type-name" },
];

export const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

export const PRESET_SIZES = [30, 28, 26, 24, 22, 20, 18, 16, 14, 12];

const fontSizeStyleMap = PRESET_SIZES.reduce((pre, cur) => {
  return {
    ...pre,
    [`FONT_SIZE_${cur}`]: {
      fontSize: cur,
    },
  };
}, {});

export const PRESET_COLORS = [
  "FF00AA",
  "F5A623",
  "F8E71C",
  "8B572A",
  "7ED321",
  "417505",
  "BD10E0",
  "9013FE",
  "4A90E2",
  "50E3C2",
  "B8E986",
  "000000",
  "4A4A4A",
  "9B9B9B",
  "FFFFFF",
];

const fontColorStyleMap = PRESET_COLORS.reduce((pre, cur) => {
  return {
    ...pre,
    [`FONT_COLOR_${cur}`]: {
      color: `#${cur}`,
    },
  };
}, {});

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  ...fontSizeStyleMap,
  ...fontColorStyleMap,
};

export type removeType = "all" | "color" | "size";

const removeType = (type: removeType) => {
  if (type === "all") {
    return styleMap;
  }
  if (type === "color") {
    return fontColorStyleMap;
  }
  if (type === "size") {
    return fontSizeStyleMap;
  }
  return styleMap;
};

export const removeInlineStyles = (editorState, type: removeType = "all") => {
  try {
    const styleMap = removeType(type);
    const contentState = editorState.getCurrentContent();
    const contentWithoutStyles = Object.keys(styleMap).reduce(
      (newContentState, style) =>
        Modifier.removeInlineStyle(
          newContentState,
          editorState.getSelection(),
          style
        ),
      contentState
    );
    const removeEditorState = EditorState.push(
      editorState,
      contentWithoutStyles,
      "change-inline-style"
    );
    return removeEditorState;
  } catch (e) {
    console.log(e);
    return editorState;
  }
};

export const setInlineStyles = (
  editorState,
  type: removeType = "all",
  inlineStyle = ""
) => {
  try {
    const styleMap = removeType(type);
    const contentState = editorState.getCurrentContent();
    const contentWithoutStyles = Object.keys(styleMap).reduce(
      (newContentState, style) =>
        style !== inlineStyle
          ? Modifier.removeInlineStyle(
              newContentState,
              editorState.getSelection(),
              style
            )
          : newContentState,
      contentState
    );
    const disableUndoEditorState = EditorState.set(editorState, {
      allowUndo: false,
    });
    const removeEditorState = EditorState.push(
      disableUndoEditorState,
      contentWithoutStyles,
      "change-inline-style"
    );
    const allowUndoEditorState = EditorState.set(removeEditorState, {
      allowUndo: true,
    });
    return allowUndoEditorState;
  } catch (e) {
    console.log(e);
    return editorState;
  }
};
