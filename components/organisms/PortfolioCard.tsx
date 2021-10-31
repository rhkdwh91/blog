import React from "react";
import styled from "styled-components";

interface IPortfolioCardProps {
  data: any;
}

const PortfolioCard: React.FC<IPortfolioCardProps> = ({ data }) => {
  return (
    <Card key={data.uid}>
      <ImageBox>
        <img src={data.image} />
      </ImageBox>
      <div>
        <p>{data.content}</p>
        <span>{data.createdAt}</span>
        <span>{data.updatedAt}</span>
      </div>
    </Card>
  );
};

const Card = styled.li`
  width: 300px;
  height: 340px;
  border: solid 1px #000;
  border-radius: 4px;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-bottom: solid 1px #000;
  & img {
    width: 100%;
  }
`;

export default PortfolioCard;