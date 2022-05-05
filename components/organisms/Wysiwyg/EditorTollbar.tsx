import React, { useState } from "react";

import styled from "styled-components";

const EditorToolbar = ({ editorState, setEditorState }) => {
  //declare state for conditional rendering of font size menu
  const [isShowingFontSizeMenu, setIsShowingFontSizeMenu] = useState(false);

  //map array of integers to display options for dropdown
  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72];
  const fontSizeOptions = fontSizes.map((fontSize) => (
    <div key={`font-size-${fontSize}`} className="font-size-option">
      {fontSize}
    </div>
  ));

  return (
    <EditorToolbarWrap>
      <div className="font-size-dropdown">
        <button
          //show dropdown menu when button is pressed,
          //keeping cursor focused inside Editor
          onMouseDown={(e) => {
            e.preventDefault();
            setIsShowingFontSizeMenu(!isShowingFontSizeMenu);
          }}
        >
          Font Size
        </button>
        {/* open or close menu if the button is pressed. */}
        {isShowingFontSizeMenu ? (
          <div className="font-size-menu">{fontSizeOptions}</div>
        ) : null}
      </div>
    </EditorToolbarWrap>
  );
};

const EditorToolbarWrap = styled.div`
  .font-size-dropdown {
    display: inline-block;
  }

  .font-size-menu {
    display: inline-block;
    position: absolute;
    top: 3px;
    background: #ffffff;
    box-shadow: 0 0 2px;
    max-height: 150px;
    overflow-y: scroll;
  }

  .font-size-menu::-webkit-scrollbar {
    display: none;
  }

  .font-size-option {
    padding: 3px;
  }

  .font-size-option:hover {
    background: #f0f0f0;
    cursor: pointer;
  }
`;

export default EditorToolbar;
