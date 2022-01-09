import { useState, useCallback } from "react";
import useForm from "hooks/useForm";
import * as Styled from "./styled";

interface ICareerCardProps {
  careerCreate: (payload: CareerType) => Promise<void>;
}

function CareerCard({ careerCreate }: ICareerCardProps) {
  const [addLayerOn, setAddLayerOn] = useState<boolean>(false);
  const [form, { onChange, reset }] = useForm({
    companyName: "",
    companyProject: "",
    startYear: "",
    startDate: "",
    endYear: "",
    endDate: "",
  } as CareerType);

  const handleClickCreateButton = useCallback(() => {
    careerCreate(form);
    setAddLayerOn(false);
    reset();
  }, [form]);

  const handleClickLayerButton = useCallback(
    (value: boolean) => () => {
      setAddLayerOn(value);
      reset();
    },
    [form]
  );

  return (
    <>
      <Styled.AddButton onClick={handleClickLayerButton(true)}>
        Career 추가
      </Styled.AddButton>
      {addLayerOn && (
        <Styled.Card>
          <p>
            <input
              type="string"
              placeholder="회사이름"
              name="companyName"
              value={form.companyName}
              onChange={onChange}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="경력내용"
              name="companyProject"
              value={form.companyProject}
              onChange={onChange}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="시작년도"
              name="startYear"
              value={form.startYear}
              onChange={onChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="시작월일"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="종료년도"
              name="endYear"
              value={form.endYear}
              onChange={onChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="종료월일"
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              maxLength={4}
            />
          </p>
          <p>
            <button onClick={handleClickCreateButton}>추가</button>
            <button onClick={handleClickLayerButton(false)}>취소</button>
          </p>
        </Styled.Card>
      )}
    </>
  );
}

export default CareerCard;
