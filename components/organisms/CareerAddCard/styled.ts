import styled from "styled-components";

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 4px;
    padding: 20px 10px;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    position: fixed;
    left: 50%;
    z-index: 999;
    width: 300px;
    margin-left: -150px;
    padding: 40px 0;
    > p {
        margin: 5px 0;
        > button {
            margin: 0 5px;
        }
    }
`;

export const AddButton = styled.button`
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #ededed;
    color: #000;
`;