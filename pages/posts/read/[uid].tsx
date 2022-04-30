import React, { useCallback } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
//import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_POST, usePostsQuery } from "hooks/usePostsQuery";
import ToastViewer from "components/organisms/ToastViewer";
import DraftPost from "components/molecule/DraftPost";

function PostsRead({ uid }) {
  //const router = useRouter();
  //const { uid } = router.query;
  const { isLogin } = useSelector((state: State) => state.user);
  const { postDelete } = usePostsQuery();
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      uid: Number(uid),
    },
  });

  const handleClickDeleteButton = useCallback(() => {
    postDelete(Number(uid));
  }, [uid]);

  return (
    <div>
      {!loading && (
        <>
          <ToastViewer content={data?.post?.content} />
          <DraftPost content={data?.post?.content} title={data?.post?.title} />
        </>
      )}
      {isLogin && (
        <div>
          <Link href={`/posts/edit/${uid}`}>
            <button>수정하기</button>
          </Link>
          <button onClick={handleClickDeleteButton}>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { query } = context;

  return {
    props: {
      uid: query.uid,
    },
  };
};

export default React.memo(PostsRead);
