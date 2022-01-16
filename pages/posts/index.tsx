import { usePostsQuery } from "hooks/usePostsQuery";
import TableListItem from "components/molecule/TableListItem";
import * as Styled from "components/template/board/styled";

function Posts() {
  const { postsData, postsLoading } = usePostsQuery();
  return (
    <div>
      <Styled.TableList>
        {!postsLoading &&
          postsData?.posts?.map((data) => (
            <TableListItem key={data.uid} data={data} />
          ))}
      </Styled.TableList>
    </div>
  );
}

export default Posts;
