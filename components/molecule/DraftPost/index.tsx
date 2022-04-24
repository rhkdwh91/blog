import * as Styled from "./styled";

interface IProps {
  title: string;
  content: string;
  height?: number;
}

export default function DraftPost({ title, content, height }: IProps) {
  return (
    <Styled.Wrap>
      <h1>{title}</h1>
      <Styled.ContentBox
        dangerouslySetInnerHTML={{ __html: content }}
        height={height}
      />
    </Styled.Wrap>
  );
}
