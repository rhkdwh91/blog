import { useState, useCallback } from "react";
import * as Styled from "./styled";

interface ICareerCardProps {
  clickHandleCreate: (payload: CareerType) => Promise<void>;
}

function CareerCard({ clickHandleCreate }: ICareerCardProps) {
  const [addLayerOn, setAddLayerOn] = useState<boolean>(false);
  const [form, setForm] = useState<CareerType>({
    companyName: "",
    companyProject: "",
    startYear: "",
    startDate: "",
    endYear: "",
    endDate: "",
  });

  const clickHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClickCreateButton = useCallback(() => {
    clickHandleCreate(form);
    setAddLayerOn(false);
    setForm({
      companyName: "",
      companyProject: "",
      startYear: "",
      startDate: "",
      endYear: "",
      endDate: "",
    });
  }, [form]);

  const handleClickLayerButton = useCallback(
    (value: boolean) => () => {
      setAddLayerOn(value);
      setForm({
        companyName: "",
        companyProject: "",
        startYear: "",
        startDate: "",
        endYear: "",
        endDate: "",
      });
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
              onChange={clickHandleChange}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="경력내용"
              name="companyProject"
              value={form.companyProject}
              onChange={clickHandleChange}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="시작년도"
              name="startYear"
              value={form.startYear}
              onChange={clickHandleChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="시작월일"
              name="startDate"
              value={form.startDate}
              onChange={clickHandleChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="종료년도"
              name="endYear"
              value={form.endYear}
              onChange={clickHandleChange}
              maxLength={4}
            />
          </p>
          <p>
            <input
              type="string"
              placeholder="종료월일"
              name="endDate"
              value={form.endDate}
              onChange={clickHandleChange}
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
