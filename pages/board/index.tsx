import { useBoardQuery } from "hooks/useBoardQuery";
import BoardListItem from "components/molecule/BoardListItem";
import * as Styled from "components/template/board/styled";

function Board() {
  const { boardListData, boardListLoading } = useBoardQuery();
  return (
    <div>
      <Styled.BoardList>
        {!boardListLoading &&
          boardListData?.boardList?.map((data) => (
            <BoardListItem key={data.uid} data={data} />
          ))}
      </Styled.BoardList>
    </div>
  );
}

export default Board;
