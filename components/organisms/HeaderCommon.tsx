import Link from "next/link";
import * as commonStyle from "../style/commonStyle"; 

const menus = [
    { "name": "Profile", "src": "/" },
    { "name": "Career", "src": "/career" },
    { "name": "Portfolio", "src": "/portfolio" },
    { "name": "Blog / Github", "src": "/blog" },
    { "name": "Contact", "src": "/contact" }
];

function HeaderCommon () {
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
                {menuList}
            </commonStyle.MenusWrap>
        </commonStyle.HeaderWrap>
    )
}

export default HeaderCommon;