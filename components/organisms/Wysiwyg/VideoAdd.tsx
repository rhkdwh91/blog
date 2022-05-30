import {
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  Entity,
  RichUtils,
} from "draft-js";
import React, { useState, useCallback } from "react";

const YOUTUBE_PREFIX = "https://www.youtube.com/embed/";
const VIMEO_PREFIX = "https://player.vimeo.com/video/";

const getSrc = ({ url, srcID, srcType }) => {
  if (srcType === "youtube") {
    return `${YOUTUBE_PREFIX}${srcID}`;
  }
  if (srcType === "vimeo") {
    return `${VIMEO_PREFIX}${srcID}`;
  }
  return undefined;
};

const DefaultVideoCompoent = (props) => {
  const { blockProps } = props;
  const src = getSrc(blockProps?.resizeData);
  const aspectRatio = 16 / 9;
  const paddingTop = `${100 / aspectRatio}%`;
  if (src) {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "block",
            width: "100%",
            padding: `${paddingTop} 0 0 0`,
            margin: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={src}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  return <div>invalid video source</div>;
};
interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Media = (props: BlockComponentProps) => {
  const entity = props.contentState.getEntity(props?.block?.getEntityAt(0));
  const type = entity.getType();
  let media: any = null;
  if (type === "video" || entity.getData().type === "custom-video-type-k") {
    media = <DefaultVideoCompoent {...props} />;
  }
};

export const blockRendererFn = (contentBlock) => {
  if (contentBlock.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};

interface IVideoAddProps {
  editorState: any;
  onChange: any;
}

export default function VideoAdd({ onChange, editorState }: IVideoAddProps) {
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState<string>("");

  const addVideo = (editorState, { srcType, srcID, url }) => {
    if (RichUtils.getCurrentBlockType(editorState) === "atomic") {
      return editorState;
    }

    const entityKey = Entity.create("TOKEN", "IMMUTABLE", {
      type: "custom-video-type-k",
      srcType,
      srcID,
      url,
    });

    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
  };

  const handleChangeVideoLink = useCallback(
    (e) => {
      setVideoLink(e.target.value);
    },
    [videoLink]
  );

  const handleClickShowButton = useCallback(() => {
    setIsShowInput(!isShowInput);
  }, [isShowInput]);

  const handleClickAddButton = useCallback(() => {
    onChange(
      addVideo(editorState, {
        srcType: "youtube",
        srcID: videoLink.replace("https://youtu.be/", ""),
        url: videoLink,
      })
    );
    //onChange(modifier(editorState, { src: videoLink }));
  }, [videoLink]);

  return (
    <div>
      <button onClick={handleClickShowButton}>VIDEO</button>
      {isShowInput && (
        <div>
          <input
            type="text"
            value={videoLink}
            onChange={handleChangeVideoLink}
          />
          <button onClick={handleClickAddButton}>ADD</button>
        </div>
      )}
    </div>
  );
}
