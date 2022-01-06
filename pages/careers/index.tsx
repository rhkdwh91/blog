import { useCareersQuery } from "hooks/useCareersQuery";
import CareerCard from "components/organisms/CareerCard";
import * as Styled from "./styled";

function Careers() {
  const { careersData, careersLoading } = useCareersQuery();
  return (
    <div>
      <Styled.CareersList>
        {!careersLoading &&
          careersData?.careers?.map((data) => (
            <CareerCard key={data.uid} data={data} />
          ))}
      </Styled.CareersList>
    </div>
  );
}

export default Careers;
