import { GET_POST, usePostsQuery } from "hooks/usePostsQuery";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { CHANGE_TITLE, CHANGE_CONTENT } from "store/reducer/board";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

/*
const DrafteEditor = dynamic(() => import("components/organisms/DraftEditor"), {
  ssr: false,
});
*/
const WysiwygEditor = dynamic(
  () => import("components/organisms/WysiwygEditor"),
  {
    ssr: false,
  }
);

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { query } = context;

  return {
    props: {
      uid: query.uid,
    },
  };
};

function PostEdit({ uid }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      uid: Number(uid),
    },
    onCompleted: (data) => {
      dispatch({
        type: CHANGE_CONTENT,
        data: data.post.content,
      });
      dispatch({
        type: CHANGE_TITLE,
        data: data.post.title,
      });
    },
    onError: () => {
      router.push("/posts");
    },
  });
  const { postEdit } = usePostsQuery();

  return (
    <div>
      {!loading && (
        <WysiwygEditor postAction={postEdit} uid={uid} data={data} />
      )}
    </div>
  );
}

export default PostEdit;
