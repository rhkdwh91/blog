import { useBoardQuery } from "hooks/useBoardQuery";
import dynamic from "next/dynamic";

const DrafteEditor = dynamic(() => import("components/organisms/DraftEditor"), {
  ssr: false,
});

function BoardWrite() {
  const { boardCreate } = useBoardQuery();
  return (
    <div>
      <DrafteEditor boardCreate={boardCreate}></DrafteEditor>
    </div>
  );
}

export default BoardWrite;
