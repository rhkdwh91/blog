import * as commonStyle from "./commonStyle"; 
import menus from "./menus.json";

function HeaderCommon () {
    const menuList = menus.map((menu) => {
        return (<commonStyle.MenusItem key={menu.name}>{menu.name}</commonStyle.MenusItem>);
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