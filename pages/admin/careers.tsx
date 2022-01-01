import React from "react";
import { getApolloClient } from "lib/apolloClient";
import { GetServerSideProps } from "next";
import { GET_CAREERS } from "hooks/useCareersQuery";

export default function Careers(props) {
  if (props?.login_check) {
    return (
      <div>
        {props?.careers?.map((data) => {
          return (
            <div>
              <p>{data.companyName}</p>
              <p>{data.companyProject}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    <div>로그인이나 하쇼</div>;
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

  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_CAREERS,
    variables: { limit: 1, offset: 0 },
  });
  return {
    props: {
      login_check,
      careers: login_check ? data.careers : [],
    },
  };
};
