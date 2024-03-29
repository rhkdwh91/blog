import Link from "next/link";
import { usePostsQuery } from "hooks/usePostsQuery";
import TableListItem from "components/molecule/TableListItem";
import * as Styled from "components/template/posts/styled";
import { useSelector } from "react-redux";
import { State } from "store/reducer";

function Posts() {
  const { isLogin } = useSelector((state: State) => state.user);
  const { postsData, postsLoading } = usePostsQuery();
  return (
    <div>
      <Styled.TableList>
        {!postsLoading &&
          postsData?.posts?.map((data) => (
            <TableListItem key={data.uid} data={data} />
          ))}
        {isLogin && (
          <Link href="/posts/write">
            <Styled.Button>글 쓰기</Styled.Button>
          </Link>
        )}
      </Styled.TableList>
    </div>
  );
}

export default Posts;
