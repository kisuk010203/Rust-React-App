import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

type HeaderNavButtonProps = {
    navigate: string;
    children: React.ReactNode;
};

const BasicButton = styled(Button)`
    height: 65px;
`;

export const HeaderNavButton: React.FC<HeaderNavButtonProps> = ({
    navigate,
    children,
}) => {
    return (
        <Link to={navigate}>
            <BasicButton>{children}</BasicButton>
        </Link>
    );
};

export const OutlinedHeaderNavButton: React.FC<HeaderNavButtonProps> = ({
    navigate,
    children,
}) => {
    return (
        <Link to={navigate}>
            <BasicButton variant="outlined">{children}</BasicButton>
        </Link>
    );
}
