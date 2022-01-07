import React from "react";
//import { GET_CAREERS } from "hooks/useCareersQuery";
//import { getApolloClient } from "lib/apolloClient";
import { GetServerSideProps } from "next";
import { useCareersQuery } from "hooks/useCareersQuery";
import CareerCard from "components/organisms/CareerCard";
import CareerAddCard from "components/organisms/CareerAddCard";
import * as Styled from "components/style/styled";

export default function Careers(props) {
  if (props?.login_check) {
    const {
      careersData,
      careersLoading,
      clickHandleCreate,
      clickHandleEdit,
      clickHandleDelete,
    } = useCareersQuery();
    return (
      <div>
        <CareerAddCard clickHandleCreate={clickHandleCreate} />
        <Styled.CardList>
          {!careersLoading &&
            careersData?.careers?.map((data) => (
              <CareerCard
                key={data.uid}
                data={data}
                clickHandleEdit={clickHandleEdit}
                clickHandleDelete={clickHandleDelete}
              />
            ))}
        </Styled.CardList>
      </div>
    );
  } else {
    return <div>로그인이나 하쇼</div>;
  }
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { req } = context;
  let login_check;

  if (req.cookies && req.cookies.authtoken) {
    login_check = true;
  } else {
    login_check = false;
  }

  /*
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_CAREERS,
    variables: { limit: 1, offset: 0 },
  });*/

  return {
    props: {
      login_check,
      //careers: login_check ? data.careers : [],
    },
  };
};
