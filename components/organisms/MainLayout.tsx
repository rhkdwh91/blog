import FooterCommon from "components/organisms/FooterCommon";
import HeaderCommon from "components/organisms/HeaderCommon";
import * as commonStyle from "components/style/commonStyle";

interface IMainLayoutProps {
  children: any;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderCommon />
        <commonStyle.ContentWrap>
          { children }
        </commonStyle.ContentWrap>
      <FooterCommon />
    </>
  );
};

export default MainLayout;