import { gql, useQuery, useMutation } from "@apollo/client";

export const GET_BOARD_LIST = gql`
  query GetBoardList($limit: Int!, $offset: Int!) {
    boardList(limit: $limit, offset: $offset) {
      uid
      title
      content
      userName
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOARD = gql`
  query GetBoard($uid: Int!) {
    board(uid: $uid) {
      uid
      title
      content
      userName
      createdAt
      updatedAt
    }
  }
`;

export const BOARD_CREATE = gql`
  mutation BoardCreate($title: String, $content: String, $userName: String) {
    boardCreate(title: $title, content: $content, userName: $userName)
  }
`;

export const BOARD_EDIT = gql`
  mutation BoardEdit(
    $uid: Int!
    $title: String
    $content: String
    $userName: String
  ) {
    boardEdit(uid: $uid, title: $title, content: $content, userName: $userName)
  }
`;

export const BOARD_DELETE = gql`
  mutation BoardDelete($uid: Int!) {
    boardDel(uid: $uid)
  }
`;

export const useBoardQuery = () => {
  const {
    data: boardListData,
    loading: boardListLoading,
    refetch: boardListRefetch,
  } = useQuery(GET_BOARD_LIST, {
    variables: {
      offset: 0,
      limit: 100,
    },
  });
  const [BoardCreate, { loading: createLoading, error: createError }] =
    useMutation(BOARD_CREATE);
  const [BoardDelete, { loading: delLoading, error: delError }] =
    useMutation(BOARD_DELETE);
  const [BoardEdit, { loading: editLoading, error: editError }] =
    useMutation(BOARD_EDIT);

  const boardCreate = async (payload: BoardType) => {
    try {
      const { data } = await BoardCreate({
        variables: {
          ...payload,
        },
      });
      if (!createLoading) {
        if (createError) {
          throw createError;
        }
        alert(data.boardCreate);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const boardEdit = async (payload: BoardUidType) => {
    try {
      const { data } = await BoardEdit({
        variables: {
          ...payload,
        },
      });
      if (!editLoading) {
        if (editError) {
          throw editError;
        }
        alert(data.boardEdit);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const boardDelete = async (uid: number) => {
    try {
      if (!confirm("삭제하겠습니까?")) {
        return;
      }
      const { data } = await BoardDelete({ variables: { uid } });
      if (!delLoading) {
        if (delError) {
          throw delError;
        }
        alert(data.boardDel);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  return {
    GET_BOARD,
    boardListData,
    boardListLoading,
    boardListRefetch,
    boardCreate,
    boardEdit,
    boardDelete,
  };
};
