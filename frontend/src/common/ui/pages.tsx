import React from "react";
import styled from "styled-components";

type PageProps = {
    children: React.ReactNode;
};

export const Page = styled.div`
    display: flex;
    font-size: 1.3rem;
    text-align: left;
    padding: 2rem;
    flex-direction: column;
    height: 100%;
`;

export const PageHeader = styled.h1``;
