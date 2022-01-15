import React from "react";
import { GetServerSideProps } from "next";
//import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_BOARD } from "hooks/useBoardQuery";
import DraftBoard from "components/molecule/DraftBoard";

function BoardRead({ uid }) {
  //const router = useRouter();
  //const { uid } = router.query;
  const board = useQuery(GET_BOARD, {
    variables: {
      uid: Number(uid),
    },
  });
  return (
    <div>
      <h1>{!board?.loading && board?.data?.title}</h1>
      {!board?.loading && <DraftBoard content={board?.data?.board?.content} />}
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

export default React.memo(BoardRead);
