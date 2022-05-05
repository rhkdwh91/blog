import React from "react";
import { DefaultDraftBlockRenderMap } from "draft-js";
import Immutable from "immutable";

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

export const extendedBlockRenderMap =
  DefaultDraftBlockRenderMap.merge(blockRenderMap);

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "new-block-type-name":
      return String({
        component: CustomComponent,
        editable: false,
      });
    default:
      return "";
  }
};
