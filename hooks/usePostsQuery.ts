import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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
  const router = useRouter();
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
  const [PostCreate] = useMutation(POST_CREATE, {
    onCompleted: () => {
      alert("게시글작성 완료했습니다");
      router.push("/posts");
    },
    onError: (error) => {
      alert(String(error));
    },
  });
  const [PostDelete] = useMutation(POST_DELETE, {
    onCompleted: () => {
      alert("삭제완료했습니다");
      router.push("/posts");
    },
    onError: (error) => {
      alert(String(error));
    },
  });
  const [PostEdit] = useMutation(POST_EDIT, {
    onCompleted: () => {
      alert("수정완료했습니다");
      router.push("/posts");
    },
    onError: (error) => {
      alert(String(error));
    },
  });

  const postCreate = async (payload: PostType) => {
    await PostCreate({
      variables: {
        ...payload,
      },
    });
  };

  const postEdit = async (payload: PostUidType) => {
    await PostEdit({
      variables: {
        ...payload,
      },
    });
  };

  const postDelete = async (uid: number) => {
    if (!confirm("삭제하겠습니까?")) {
      return;
    }
    await PostDelete({ variables: { uid } });
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
