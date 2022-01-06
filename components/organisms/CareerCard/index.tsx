import * as Styled from "./styled";

interface ICareerCardProps {
  data: CareerQueryType;
  clickHandleEdit?: (payload: CareerUidType) => Promise<void>;
  clickHandleDelete?: (uid: number) => Promise<void>;
}

function CareerCard({ data, clickHandleDelete }: ICareerCardProps) {
  const handleClickDeleteButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (clickHandleDelete) clickHandleDelete(data.uid);
  };

  return (
    <Styled.Card>
      <p>{data.companyName}</p>
      <p>{data.companyProject}</p>
      <p>
        {clickHandleDelete && (
          <button onClick={handleClickDeleteButton}>삭제</button>
        )}
      </p>
    </Styled.Card>
  );
}

export default CareerCard;
