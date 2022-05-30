import React from "react";
import { ContentBlock, ContentState } from "draft-js";
interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}
const Video = (props) => {
  return (
    <figure>
      <iframe
        src={props.src}
        width="100%"
        height="411px"
        allowFullScreen
        frameBorder="0"
      />
    </figure>
  );
};
export const Image = (props: BlockComponentProps) => {
  const { block, contentState } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
  return <img src={src} alt={src} role="presentation" />;
};
const Media = (props: BlockComponentProps) => {
  const entity = props.contentState.getEntity(props?.block?.getEntityAt(0));
  const type = entity.getType();
  let media: any = null;
  if (type === "image") {
    media = <Image {...props} />;
  }
  if (type === "video") return (media = <Video {...props} />);
};
export const mediaBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};
