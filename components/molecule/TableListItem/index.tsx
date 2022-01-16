import Link from "next/link";
import * as Styled from "./styled";

interface ITableListItemProps {
  data: PostQueryType;
}

export default function TableListItem({ data }: ITableListItemProps) {
  return (
    <Link href={`/posts/read/${data.uid}`}>
      <Styled.ListItem>
        <span className="table_list_id">{data?.uid}</span>
        <span className="table_list_title">{data?.title}</span>
        <span className="table_list_username">
          {data?.userId} / {data?.userName}
        </span>
        <span className="table_list_time">
          {data?.updatedAt?.split(" ")[0] || data?.createAt?.split(" ")[0]}
        </span>
      </Styled.ListItem>
    </Link>
  );
}
