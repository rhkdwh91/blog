import styled from "styled-components";

export const ImageCard = styled.div`
    width: 40%;  
    ${({ theme })=> theme.defaultCard}
`;

export const ContentCard = styled.div`
    width: 60%;
    ${({ theme })=> theme.defaultCard}
`;

export const ContentText = styled.div`
    display:inline-block;
    width: 100%;
    text-align:center;
`;

export const CardWrap = styled.div`
    display:flex;
    ${({ theme }) => theme.flexCardWrap}
`;