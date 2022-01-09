import "styled-components";

// and extend them!
declare module "styled-components" {
  // 디폴트 테마를 지정할 수 있음
  export interface DefaultTheme {
    mainColor: string;
    mobileSize: string;
    tabletSize: string;
    laptopSize: string;
    desktopSize: string;
    desktopContentSize: string;
    defaultCard: string;
    flexMenuWrap: string;
    flexCardWrap: string;
  }
}
