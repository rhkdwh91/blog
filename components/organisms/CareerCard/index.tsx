import React, { useState, useCallback } from "react";
import useForm from "hooks/useForm";
import * as Styled from "./styled";

interface ICareerCardProps {
  data: CareerQueryType;
  careerEdit?: (payload: CareerUidType) => Promise<void>;
  careerDelete?: (uid: number) => Promise<void>;
}

function CareerCard({ data, careerEdit, careerDelete }: ICareerCardProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form, { onChange, reset }] = useForm({
    uid: data.uid,
    companyName: data.companyName,
    companyProject: data.companyProject,
    startYear: data.startYear,
    startDate: data.startDate,
    endYear: data.endYear,
    endDate: data.endDate,
  } as CareerType);

  const handleClickEditButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setEditMode(true);
    },
    [editMode]
  );

  const handleClickCancelButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setEditMode(false);
      reset();
    },
    [editMode]
  );

  const handleClickDeleteButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (careerDelete) careerDelete(data.uid);
    },
    [data]
  );

  const handleClickSaveButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (careerEdit) careerEdit(form);
      setEditMode(false);
    },
    [form]
  );

  return (
    <Styled.Card>
      {editMode ? (
        <>
          <p className="career-card-name">{data.companyName}</p>
          <p className="carrer-card-project">{data.companyProject}</p>
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
            <textarea
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
        </>
      ) : (
        <>
          <p className="career-card-name">{data.companyName}</p>
          <p className="carrer-card-project">{data.companyProject}</p>
          {data?.startYear && (
            <Styled.Date>
              근무기간: {data.startYear}.{data.startDate?.slice(0, 2)}.
              {data.startDate?.slice(2)} ~
              {data?.endYear
                ? `${data.endYear}.${data.endDate?.slice(
                    0,
                    2
                  )}.${data.endDate?.slice(2)}`
                : "재직 중"}
            </Styled.Date>
          )}
        </>
      )}
      <p>
        {careerEdit &&
          (editMode ? (
            <>
              <button onClick={handleClickSaveButton}>저장</button>
              <button onClick={handleClickCancelButton}>취소</button>
            </>
          ) : (
            <button onClick={handleClickEditButton}>수정</button>
          ))}
        {careerDelete && (
          <button onClick={handleClickDeleteButton}>삭제</button>
        )}
      </p>
    </Styled.Card>
  );
}

export default CareerCard;
