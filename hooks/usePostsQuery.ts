import { gql, useQuery, useMutation } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      uid
      title
      content
      userName
      userId
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($uid: Int!) {
    post(uid: $uid) {
      uid
      title
      content
      userName
      userId
      createdAt
      updatedAt
    }
  }
`;

export const POST_CREATE = gql`
  mutation PostCreate($title: String, $content: String) {
    postCreate(title: $title, content: $content)
  }
`;

export const POST_EDIT = gql`
  mutation PostEdit($uid: Int!, $title: String, $content: String) {
    postEdit(uid: $uid, title: $title, content: $content)
  }
`;

export const POST_DELETE = gql`
  mutation PostDelete($uid: Int!) {
    postDel(uid: $uid)
  }
`;

export const usePostsQuery = () => {
  const {
    data: postsData,
    loading: postsLoading,
    refetch: postsRefetch,
  } = useQuery(GET_POSTS, {
    variables: {
      offset: 0,
      limit: 100,
    },
  });
  const [PostCreate, { loading: createLoading, error: createError }] =
    useMutation(POST_CREATE);
  const [PostDelete, { loading: delLoading, error: delError }] =
    useMutation(POST_DELETE);
  const [PostEdit, { loading: editLoading, error: editError }] =
    useMutation(POST_EDIT);

  const postCreate = async (payload: PostType) => {
    try {
      const { data } = await PostCreate({
        variables: {
          ...payload,
        },
      });
      if (!createLoading) {
        if (createError) {
          throw createError;
        }
        alert(data.postCreate);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const postEdit = async (payload: PostUidType) => {
    try {
      const { data } = await PostEdit({
        variables: {
          ...payload,
        },
      });
      if (!editLoading) {
        if (editError) {
          throw editError;
        }
        alert(data.postEdit);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const postDelete = async (uid: number) => {
    try {
      if (!confirm("삭제하겠습니까?")) {
        return;
      }
      const { data } = await PostDelete({ variables: { uid } });
      if (!delLoading) {
        if (delError) {
          throw delError;
        }
        alert(data.postDel);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  return {
    postsData,
    postsLoading,
    postsRefetch,
    postCreate,
    postEdit,
    postDelete,
  };
};
