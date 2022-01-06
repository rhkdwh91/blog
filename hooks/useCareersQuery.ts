import { gql, useQuery, useMutation } from "@apollo/client";

export const GET_CAREERS = gql`
  query GetCareers($limit: Int!, $offset: Int!) {
    careers(limit: $limit, offset: $offset) {
      uid
      companyName
      companyProject
      startYear
      startDate
      endYear
      endDate
      createdAt
      updatedAt
    }
  }
`;

export const CAREER_CREATE = gql`
  mutation CareerCreate(
    $companyName: String
    $companyProject: String
    $startYear: String
    $startDate: String
    $endYear: String
    $endDate: String
  ) {
    careerCreate(
      companyName: $companyName
      companyProject: $companyProject
      startYear: $startYear
      startDate: $startDate
      endYear: $endYear
      endDate: $endDate
    )
  }
`;

export const CAREER_DELETE = gql`
  mutation CareerDelete($uid: Int!) {
    careerDel(uid: $uid)
  }
`;

export const CAREER_EDIT = gql`
  mutation CareerEdit(
    $uid: Int!
    $companyName: String
    $companyProject: String
    $startYear: String
    $startDate: String
    $endYear: String
    $endDate: String
  ) {
    careerEdit(
      uid: $uid
      companyName: $companyName
      companyProject: $companyProject
      startYear: $startYear
      startDate: $startDate
      endYear: $endYear
      endDate: $endDate
    )
  }
`;

export const useCareersQuery = () => {
  const {
    data: careersData,
    loading: careersLoading,
    refetch: careersRefetch,
  } = useQuery(GET_CAREERS, {
    variables: {
      offset: 0,
      limit: 100,
    },
  });
  const [CareerCreate, { loading: createLoading, error: createError }] =
    useMutation(CAREER_CREATE);
  const [CareerDelete, { loading: delLoading, error: delError }] =
    useMutation(CAREER_DELETE);
  const [CareerEdit, { loading: editLoading, error: editError }] =
    useMutation(CAREER_EDIT);

  const clickHandleCreate = async (payload: CareerType) => {
    try {
      const { data } = await CareerCreate({
        variables: {
          ...payload,
        },
      });
      if (!createLoading) {
        if (createError) {
          throw createError;
        }
        alert(data.careerCreate);
        careersRefetch({
          offset: 0,
          limit: 100,
        });
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const clickHandleEdit = async (payload: CareerUidType) => {
    try {
      const { data } = await CareerEdit({
        variables: {
          ...payload,
        },
      });
      if (!editLoading) {
        if (editError) {
          throw editError;
        }
        alert(data.careerEdit);
        careersRefetch({
          offset: 0,
          limit: 100,
        });
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const clickHandleDelete = async (uid: number) => {
    try {
      if (!confirm("삭제하겠습니까?")) {
        return;
      }
      const { data } = await CareerDelete({ variables: { uid } });
      if (!delLoading) {
        if (delError) {
          throw delError;
        }
        alert(data.careerDel);
        careersRefetch({
          offset: 0,
          limit: 100,
        });
      }
    } catch (err) {
      alert(String(err));
    }
  };

  return {
    careersData,
    careersLoading,
    careersRefetch,
    clickHandleCreate,
    clickHandleEdit,
    clickHandleDelete,
  };
};
