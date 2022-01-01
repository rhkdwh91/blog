import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { createApolloClient } from "../../lib/apolloClient";
import { GetServerSideProps } from "next";

const LOGIN = gql`
  mutation LogIn($user_id: String!, $password: String!) {
    login(user_id: $user_id, password: $password) {
      data
      result
      code
    }
  }
`;
const LOGOUT = gql`
  mutation LogOut {
    logout {
      data
      result
      code
    }
  }
`;

const GET_USER = gql`
  query GetUser($user_id: String!) {
    user(user_id: $user_id) {
      data {
        user_name
      }
      result
      code
    }
  }
`;
export default function Admin({ login_check }) {
  const [form, setForm] = useState({
    user_id: "",
    password: "",
  });
  const [LogIn, { data: LogInData, loading: LogInLoading, error: LogInError }] =
    useMutation(LOGIN);
  const [
    LogOut,
    { data: LogOutData, loading: LogOutLoading, error: LogOutError },
  ] = useMutation(LOGOUT);
  const [searchUser, setSearchUser] = useState("");
  const [isLogin, setIsLogin] = useState(login_check as boolean);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (LogInData !== undefined) {
      try {
        if (LogInData.login.code === 200) {
          setIsLogin(true);
        } else {
          throw LogInData.login.result;
        }
      } catch (e) {
        alert(e);
      } finally {
        setForm({
          user_id: "",
          password: "",
        });
      }
    }
  }, [LogInData, LogInLoading, LogInError]);

  useEffect(() => {
    if (LogOutData !== undefined) {
      try {
        if (LogOutData.logout.code === 200) {
          setIsLogin(false);
        } else {
          throw LogOutData.logout.result;
        }
      } catch (e) {
        alert(e);
      }
    }
  }, [LogOutData, LogOutLoading, LogOutError]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    setForm(nextForm);
  };
  const handleOnLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    LogIn({ variables: { user_id: form.user_id, password: form.password } });
  };
  const handleOnLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    LogOut();
  };
  const handleOnSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    /*const { loading, error, data, refetch }*/
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: { user_id: form.user_id },
    });
    if (data.user.data.length > 0) {
      setSearchUser(data.user.data[0].user_name);
    } else {
      alert(data.user.result);
    }
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        {!isLogin && (
          <>
            <input
              name="user_id"
              value={form.user_id}
              onChange={handleOnChange}
              type="text"
              placeholder="ID를 입력해주세요"
            ></input>
            <br />
            <input
              name="password"
              type="password"
              autoComplete="off"
              value={form.password}
              onChange={handleOnChange}
              placeholder="비밀번호를 입력해주세요"
            ></input>
            <br />
            <button type="submit" onClick={handleOnLogin}>
              로그인
            </button>
          </>
        )}
        {isLogin && (
          <>
            <button type="submit" onClick={handleOnLogout}>
              로그아웃
            </button>
            {searchUser}
            <input
              name="user_id"
              value={form.user_id}
              onChange={handleOnChange}
              type="text"
              placeholder="ID를 입력해주세요"
            ></input>
            <br />
            <button onClick={handleOnSearch}>검색</button>
            <input name="carerrs" />
          </>
        )}
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { req } = context;
  let login_check;

  if (req.cookies && req.cookies.authtoken) {
    login_check = true;
  } else {
    login_check = false;
  }
  return {
    props: {
      login_check,
    },
  };
};
