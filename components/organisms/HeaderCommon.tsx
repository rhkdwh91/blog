import Link from "next/link";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import * as commonStyle from "../style/commonStyle";

const menus = [
  { name: "Profile", src: "/" },
  { name: "Careers", src: "/careers" },
  { name: "Portfolio", src: "/portfolio" },
  { name: "Posts", src: "/posts" },
  { name: "Contact", src: "/contact" },
];

function HeaderCommon() {
  const { isLogin } = useSelector((root: State) => root.user);
  const menuList = menus.map((menu) => {
    return (
      <commonStyle.MenusItem key={menu.name}>
        <Link href={menu.src}>{menu.name}</Link>
      </commonStyle.MenusItem>
    );
  });

  return (
    <commonStyle.HeaderWrap>
      <commonStyle.MenusWrap>
        {menuList}{" "}
        {isLogin ? (
          <Link href="/admin">Logout</Link>
        ) : (
          <Link href="/admin">Login</Link>
        )}
      </commonStyle.MenusWrap>
    </commonStyle.HeaderWrap>
  );
}

export default HeaderCommon;
