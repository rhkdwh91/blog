import { usePostsQuery } from "hooks/usePostsQuery";
import dynamic from "next/dynamic";

const WysiwygEditor = dynamic(
  () => import("components/organisms/WysiwygEditor"),
  {
    ssr: false,
  }
);

const ToastEditor = dynamic(() => import("components/organisms/ToastEditor"), {
  ssr: false,
});

/*
const DrafteEditor = dynamic(() => import("components/organisms/DraftEditor"), {
  ssr: false,
});
*/

function PostWrite() {
  const { postCreate } = usePostsQuery();
  return (
    <div>
      <ToastEditor postAction={postCreate} />
      <WysiwygEditor postAction={postCreate}></WysiwygEditor>
    </div>
  );
}

export default PostWrite;
