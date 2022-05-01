import * as profileStyle from "./profileStyle";

function MainProfile() {
  return (
    <profileStyle.CardWrap>
      <profileStyle.ImageCard>
        <img
          src="https://bucket-9gqcvu.s3.ap-northeast-2.amazonaws.com/blog/my_character.png"
          width="50%"
        />
      </profileStyle.ImageCard>
      <profileStyle.ContentCard>
        <profileStyle.ContentText>
          <h2>Profile</h2>
          <br />
          조광연
          <br />
          1991년 7월 4일생
          <br />
          Front-end Developer
          <br />
          <br />
          <br />
          <h2>About Me</h2>
          <br />
          <p style={{ textAlign: "left" }}>
            좋은 FE개발자는 기획자, 디자이너, BE개발자와 원할하고 빠른 소통을
            할수 있는 사람이라고 생각합니다.
            <br />
            <br />
            FE개발은 개발 지식 한가지 만으로는 할 수 없는 일이라고 생각합니다.
            한 예로 디자이너와 개발자 간의 소통의 어려움은 서로에 대한 업무
            이해도 부재로 인해서 발생 한다고 생각하고 이러한 문제점은 프로젝트를
            안 좋은 방향으로 흘러가게 만든다고 봅니다.
            <br />
            <br />
            저는 기술과 예술, 논리와 감성의 균형을 유지하고 아름다움을 추구하되
            사람들의 사용성을 높게 하며 미적인 완성도를 지키면서 세련된
            움직임으로 생명력을 부여하려 합니다. 그리고 일의 목적을 잃지
            않으면서 제가 추구하는 가치도 잃어서는 안됩니다. 이 모든 복잡한 저울
            위에서 균형을 유지하는 것이 저의 과정이자 목표입니다.
          </p>
        </profileStyle.ContentText>
      </profileStyle.ContentCard>
    </profileStyle.CardWrap>
  );
}

export default MainProfile;
