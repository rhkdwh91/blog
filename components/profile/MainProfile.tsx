import * as profileStyle from "./profileStyle";

function MainProfile () {
    return (
        <profileStyle.CardWrap>
            <profileStyle.ImageCard>
                <img src="/images/main.svg" width="600"/>
            </profileStyle.ImageCard>
            <profileStyle.ContentCard>
                <profileStyle.ContentText>
                    <h2>Profile</h2>
                    <br />
                    조광연<br />
                    1991년 7월 4일생<br />
                    신한대학교 산업디자인과 졸업<br />
                    Front-End 개발자, UI / UX 디자이너<br />
                    <br /><br />
                    <h2>About Me</h2>
                    <br />
                    <p style={{textAlign: "left"}}>
                        &nbsp;&nbsp;FE개발은 디자인에 대한 감각 또는 개발 지식 한가지 씩 만으로는 할 수 없는 일이라고 생각합니다.
                        디자이너와 개발자 간의 소통의 어려움은 이러한 지식들의 부재로 인해서 발생한다고 생각하고
                        그리고 이러한 서로의 업무에 대한 이해도 부족으로 인한 소통의 어려움는 프로젝트를 안 좋은 방향으로 흘러가게 만든다고 봅니다.
                        <br /><br />
                        &nbsp;&nbsp;편집 디자이너가 인쇄 공정에 대하여 알고 있어야 하고 제품 디자이너가 그 제품과 관련된 기능과 특징에 대하여
                        파악하고 디자인을 해야 되듯이 FE개발 및 디자인도 프론트 단의 기술에 대한 이해도와 디자인에 대한 이해도를 바탕으로 
                        디자인을 하고 개발을 할 수 있어야 한다고 생각합니다.
                        <br /><br />
                        &nbsp;&nbsp;지금의 저는 디자인과 개발 공부를 병행하며 같이 끌고가고자 하며 두 가지를 동시에 할 수 있는 것이
                        큰 시너지 효과를 내어 어느 곳 에서든지 도움이 될 수 있다고 자신합니다.
                        특히 디자이너와 개발자간의 소통에 있어서 수월하게 할수 있다는 자신이 있습니다.
                    </p>
                </profileStyle.ContentText>
            </profileStyle.ContentCard>
        </profileStyle.CardWrap>
    )
}

export default MainProfile;