import * as Styled from "./styled";

interface IProps {
  content: string;
}

export default function DraftPost({ content }: IProps) {
  return <Styled.ContentBox dangerouslySetInnerHTML={{ __html: content }} />;
}
