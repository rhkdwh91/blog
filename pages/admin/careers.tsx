import React from "react";
import { gql } from '@apollo/client';
import { getApolloClient } from '../../lib/apolloClient';
import { GetServerSideProps } from "next";

const GET_CAREERS = gql`
  query GetCareers($limit: Int!, $offset: Int!) {
    careers(limit: $limit, offset: $offset) {
        uid,
        companyName,
        companyProject,
        startYear,
        startDate,
        endYear,
        endDate,
        createdAt,
        updatedAt,
    }
  }
`;

export default function Careers (props) {
  if (props?.login_check) {
    return (
      <div>
        {props?.careers?.map((data) => {
              return (
                  <div>
                    <p>{data.companyName}</p>
                    <p>{data.companyProject}</p>
                  </div>
              )  
          })}
      </div>
    )
  } else {
    <div>
      로그인이나 하쇼
    </div>
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
    }
  };
}; 