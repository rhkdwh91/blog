import * as Styled from "./styled";

interface IProps {
  content: string;
}

export default function DraftBoard({ content }: IProps) {
  return <Styled.ContentBoard dangerouslySetInnerHTML={{ __html: content }} />;
}
