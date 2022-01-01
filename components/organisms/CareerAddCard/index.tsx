import { useState } from "react";
import * as Styled from "./styled";

function CareerCard() {
  const [addLayerOn, setAddLayerOn] = useState<boolean>(false);

  const handleClickLayerButton = (value: boolean) => () => {
    setAddLayerOn(value);
  };

  return (
    <>
      <Styled.AddButton onClick={handleClickLayerButton(true)}>
        Career 추가
      </Styled.AddButton>
      {addLayerOn && (
        <Styled.Card>
          <p>
            <input type="string" value="" placeholder="회사이름" />
          </p>
          <p>
            <input type="string" value="" placeholder="경력내용" />
          </p>
          <p>
            <input
              type="string"
              value=""
              placeholder="시작년도"
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              value=""
              placeholder="시작월일"
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              value=""
              placeholder="종료년도"
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              value=""
              placeholder="종료월일"
              maxLength={4}
            />
          </p>
          <p>
            <button>추가</button>
            <button onClick={handleClickLayerButton(false)}>취소</button>
          </p>
        </Styled.Card>
      )}
    </>
  );
}

export default CareerCard;
