import * as Styled from "./styled";

interface ICareerCardProps {
  data: CarrerType;
}

function CareerCard({ data }: ICareerCardProps) {
  return (
    <Styled.Card>
      <p>{data.companyName}</p>
      <p>{data.companyProject}</p>
    </Styled.Card>
  );
}

export default CareerCard;
