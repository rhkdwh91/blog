import { usePostsQuery } from "hooks/usePostsQuery";
import dynamic from "next/dynamic";

const DrafteEditor = dynamic(() => import("components/organisms/DraftEditor"), {
  ssr: false,
});

function PostWrite() {
  const { postCreate } = usePostsQuery();
  return (
    <div>
      <DrafteEditor postAction={postCreate}></DrafteEditor>
    </div>
  );
}

export default PostWrite;
