import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import styled from "styled-components";
import { Link } from "react-router-dom";

type HeaderNavButtonProps = {
    navigate: string;
    children: React.ReactNode;
};
type DisabledButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

export const BasicButton = styled(Button)`
    height: 50px;
`;
export const ShortButton = styled(Button)`
    height: 30px;
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
};

export const DeleteButton: React.FC<{ onClick: () => void }> = ({
    onClick,
}) => {
    return (
        <>
            <ShortButton
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={onClick}
            >
                Delete
            </ShortButton>
            &nbsp;&nbsp;
        </>
    );
};

export const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <>
            <ShortButton
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={onClick}
            >
                Edit
            </ShortButton>
            &nbsp;&nbsp;
        </>
    );
};

export const SaveButton: React.FC<{onClick: () => void}> = ({onClick})  => {
    return (
        <>
            <ShortButton
                variant="outlined"
                color="primary"
                startIcon={<SaveAltIcon />}
                onClick={onClick}
            >Save</ShortButton>
            &nbsp;&nbsp;
        </>
    )
}

export const CancelButton: React.FC<{onClick: () => void}> = ({onClick}) => {   
    return (
        <>
            <ShortButton
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={onClick}
            >Cancel</ShortButton>
            &nbsp;&nbsp;
        </>
    )
}

export const DisabledButton: React.FC<DisabledButtonProps> = ({
    onClick,
    disabled,
    children,
}) => {
    return (
        <ShortButton
            variant="outlined"
            color="primary"
            disabled={disabled ?? false}
            onClick={onClick}
        >
            {children}
        </ShortButton>
    );
};

export const LeftButton: React.FC<DisabledButtonProps> = ({
    onClick,
    disabled,
}) => {
    return (
        <DisabledButton onClick={onClick} disabled={disabled}>
            {"<<"}
        </DisabledButton>
    );
};

export const RightButton: React.FC<DisabledButtonProps> = ({
    onClick,
    disabled,
}) => {
    return (
        <DisabledButton onClick={onClick} disabled={disabled}>
            {">>"}
        </DisabledButton>
    );
};
