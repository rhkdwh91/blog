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

export const BLOCK_TYPES = [
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

export const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];
