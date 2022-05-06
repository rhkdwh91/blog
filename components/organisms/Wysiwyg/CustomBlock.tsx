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

const HeaderOneComponent = ({ children }) => {
  return (
    <div>
      <h1
        style={{
          fontSize: 40,
          marginBottom: 20,
          borderBottom: "double #222 5px",
        }}
      >
        {children}
      </h1>
    </div>
  );
};

const HeaderTwoComponent = ({ children }) => {
  return (
    <div>
      <h1
        style={{
          fontSize: 34,
          marginBottom: 20,
          borderBottom: "double #222 5px",
        }}
      >
        {children}
      </h1>
    </div>
  );
};

const HeaderThreeComponent = ({ children }) => {
  return (
    <div>
      <h1
        style={{
          fontSize: 28,
          marginBottom: 20,
          borderBottom: "double #222 5px",
        }}
      >
        {children}
      </h1>
    </div>
  );
};

const blockRenderMap = Immutable.Map({
  "new-block-type-name": {
    element: CustomComponent,
  },
  HeaderOne: {
    element: HeaderOneComponent,
  },
  HeaderTwo: {
    element: HeaderTwoComponent,
  },
  HeaderThree: {
    element: HeaderThreeComponent,
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
    case "HeaderOne":
      return String({
        component: HeaderOneComponent,
        editable: false,
      });
    case "HeaderTwo":
      return String({
        component: HeaderTwoComponent,
        editable: false,
      });
    case "HeaderThree":
      return String({
        component: HeaderThreeComponent,
        editable: false,
      });
    default:
      return "";
  }
};
