import { gql } from '@apollo/client';

export const GET_CAREERS = gql`
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