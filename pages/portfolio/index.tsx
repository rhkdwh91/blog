import React from "react";
import { GetServerSideProps } from "next";
import { getApolloClient } from '../../lib/apolloClient';
import { gql } from '@apollo/client';

const GET_PORTFOLIOS = gql`
  query GetPortfolios($limit: Int!, $offset: Int!) {
    portfolios(limit: $limit, offset: $offset) {
        uid,
        content,
        image,
        createdAt,
        updatedAt,
    }
  }
`;

export default function Portfolio ({ login_check, portfolios }) {
    return (
        <div>
            Portfolio 페이지, {login_check}
            {portfolios?.map((data) => {
                return (
                    <div key={data.uid}>
                        {data.content}
                        <img src={data.image} />
                    </div>
                )  
            })}
        </div>
    );
};

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
      query: GET_PORTFOLIOS,
      variables: { limit: 1, offset: 0 },
    });
    console.log(data.portfolios);
    return {
      props: {
        login_check,
        portfolios: data.portfolios,
      }
    };
  }; 