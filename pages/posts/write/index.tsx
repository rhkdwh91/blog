import { usePostsQuery } from "hooks/usePostsQuery";
import dynamic from "next/dynamic";

const WysiwygEditor = dynamic(
  () => import("components/organisms/WysiwygEditor"),
  {
    ssr: false,
  }
);

function PostWrite() {
  const { postCreate } = usePostsQuery();
  return (
    <div>
      <WysiwygEditor postAction={postCreate} />
    </div>
  );
}

export default PostWrite;
