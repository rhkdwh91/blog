import jwt from "jsonwebtoken";
import statusUtil from "./statusUtil";
import { User } from "../../sqlz/models/User";
const secret = "hot-place-api-token-secret";
const expiresIn = "7 days"; // minutes

export function generateToken({ user_id }) {
  return jwt.sign({ user_id }, secret, { expiresIn });
}

export async function isAuthenticated(context) {
  try {
    if (context.req.cookies && context.req.cookies.authtoken) {
      const authtoken = context.req.cookies.authtoken;
      const decoded = jwt.verify(authtoken, secret);
      const user = await User.findOne({ where: { user_id: decoded.user_id } });
      if (user !== null) {
        const results = statusUtil.success(
          {
            uid: user.uid,
            user_id: user.user_id,
            user_name: user.user_name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          "로그인 성공했습니다."
        );
        return results;
      } else {
        throw "잘못된 접근 입니다..";
      }
    } else {
      throw "로그인 해 주세요.";
    }
  } catch (e) {
    const results = statusUtil.false(
      { uid: 0, user_id: "", user_name: "", createdAt: "", updatedAt: "" },
      String(e),
      400
    );
    return results;
  }
}

export const userCheck = async (user_id, password) => {
  // 인증 정보 체크 로직
  try {
    /*
      const rEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
         
      if (!rEmail.test(user_id)) {
        throw '올바른 이메일 형식이 아닙니다.';
      }
      */
    const user = await User.findOne({
      where: { user_id },
    });
    if (user === null) {
      throw "이메일 혹은 비밀번호가 일치하지 않습니다.";
    }
    if (!user.isValidPassword(password)) {
      throw "이메일 혹은 비밀번호가 일치하지 않습니다.";
    } else {
      const accessToken = generateToken({
        user_id: user.user_id,
      });
      const results = statusUtil.success(accessToken, "로그인 성공했습니다.");
      return results;
    }
  } catch (e) {
    const results = statusUtil.false("", String(e), 400);
    return results;
  }
};
