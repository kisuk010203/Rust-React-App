import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Page, PageHeader } from "../common/ui/pages";
import { Button, TextField } from "@material-ui/core";
import { ShortButton } from "../common/ui/buttons";

export const RecoveryPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

    const recover = async () => {
        setProcessing(true);
        const response = await (
            await fetch("/api/auth/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
        ).json();
        console.log(response);
        setProcessing(false);
        setEmail("");
    };

    if (auth.isAuthenticated) {
        navigate("/");
        return (
            <div>Already logged in. Redirecting you to the home page...</div>
        );
    }

    return (
        <Page>
            <PageHeader>Account Recovery</PageHeader>
            <br />
            <div>
                <TextField
                    id="recovery_email"
                    label="Email"
                    variant="filled"
                    value={email}
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                ></TextField>
            </div>
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={processing}
                    onClick={recover}
                >
                    Recover
                </Button>
            </div>
        </Page>
    );
};
