import { Modifier, EditorState } from "draft-js";

export const emptyContents = {
  blocks: [
    {
      key: "9oo8c",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "4k1d8",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "2c6b4",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "74e5m",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "2rfcs",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "5qfrr",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "9dmpo",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "chqhi",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "fp13b",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "9qlka",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "dj3o",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "1mj6i",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "52krn",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "b0sc6",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "eueel",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "9l1i2",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "3c0c7",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  FONT_SIZE_30: {
    fontSize: 30,
  },
  FONT_SIZE_28: {
    fontSize: 28,
  },
  FONT_SIZE_26: {
    fontSize: 26,
  },
  FONT_SIZE_24: {
    fontSize: 24,
  },
  FONT_SIZE_22: {
    fontSize: 22,
  },
  FONT_SIZE_20: {
    fontSize: 20,
  },
  FONT_SIZE_18: {
    fontSize: 18,
  },
  FONT_SIZE_16: {
    fontSize: 16,
  },
  FONT_SIZE_14: {
    fontSize: 14,
  },
  FONT_SIZE_12: {
    fontSize: 12,
  },
};

export const removeInlineStyles = (editorState) => {
  try {
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

    const newEditorState = EditorState.push(
      editorState,
      contentWithoutStyles,
      "change-inline-style"
    );

    return newEditorState;
  } catch {
    return editorState;
  }
};

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
