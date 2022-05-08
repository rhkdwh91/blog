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
