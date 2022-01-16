import React from "react";
import { GetServerSideProps } from "next";
//import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_POST } from "hooks/usePostsQuery";
import DraftPost from "components/molecule/DraftPost";

function PostsRead({ uid }) {
  //const router = useRouter();
  //const { uid } = router.query;
  const post = useQuery(GET_POST, {
    variables: {
      uid: Number(uid),
    },
  });
  return (
    <div>
      <h1>{!post?.loading && post?.data?.title}</h1>
      {!post?.loading && <DraftPost content={post?.data?.post?.content} />}
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
