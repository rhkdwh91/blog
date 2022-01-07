import { useCareersQuery } from "hooks/useCareersQuery";
import CareerCard from "components/organisms/CareerCard";
import * as Styled from "components/style/styled";

function Careers() {
  const { careersData, careersLoading } = useCareersQuery();
  return (
    <div>
      <Styled.CardList>
        {!careersLoading &&
          careersData?.careers?.map((data) => (
            <CareerCard key={data.uid} data={data} />
          ))}
      </Styled.CardList>
    </div>
  );
}

export default Careers;
