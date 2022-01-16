import Link from "next/link";
import * as commonStyle from "../style/commonStyle";

const menus = [
  { name: "Profile", src: "/" },
  { name: "Careers", src: "/careers" },
  { name: "Portfolio", src: "/portfolio" },
  { name: "Posts", src: "/posts" },
  { name: "Contact", src: "/contact" },
];

function HeaderCommon() {
  const menuList = menus.map((menu) => {
    return (
      <commonStyle.MenusItem key={menu.name}>
        <Link href={menu.src}>{menu.name}</Link>
      </commonStyle.MenusItem>
    );
  });

  return (
    <commonStyle.HeaderWrap>
      <commonStyle.MenusWrap>{menuList}</commonStyle.MenusWrap>
    </commonStyle.HeaderWrap>
  );
}

export default HeaderCommon;
