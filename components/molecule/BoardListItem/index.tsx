import Link from "next/link";
import * as Styled from "./styled";

interface BoardListItem {
  data: BoardQueryType;
}

export default function BoardListItem({ data }: BoardListItem) {
  return (
    <Link href={`/board/read/${data.uid}`}>
      <Styled.ListItem>
        <span className="board_list_id">{data?.uid}</span>
        <span className="board_list_title">{data?.title}</span>
        <span className="board_list_username">{data?.userName}</span>
        <span className="board_list_time">
          {data?.updatedAt?.split(" ")[0] || data?.createAt?.split(" ")[0]}
        </span>
      </Styled.ListItem>
    </Link>
  );
}
