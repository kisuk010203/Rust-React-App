import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

type HeaderNavButtonProps = {
    navigate: string;
    children: React.ReactNode;
};

const StyledButton = styled(Button)`
    height: 65px;
`;

export const HeaderNavButton: React.FC<HeaderNavButtonProps> = ({
    navigate,
    children,
}) => {
    return (
        <Link to={navigate}>
            <StyledButton>{children}</StyledButton>
        </Link>
    );
};
