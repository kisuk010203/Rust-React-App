import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Page, PageHeader } from "../common/ui/pages";
import { Button, TextField } from "@material-ui/core";
import { ShortButton } from "../common/ui/buttons";

export const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

    const login = async () => {
        setProcessing(true);
        await auth.login(email, password);
        setProcessing(false);
    };

    if (auth.isAuthenticated) {
        navigate("/");
        return (
            <div>Already logged in. Redirecting you to the home page...</div>
        );
    }

    return (
        <Page>
            <PageHeader>Login</PageHeader>
            <br />
            <div>
                <TextField
                    id="login_email"
                    label="Email"
                    variant="filled"
                    value={email}
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    id="login_password"
                    label="Password"
                    variant="filled"
                    value={password}
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={processing}
                    onClick={login}
                >
                    Login
                </Button>
            </div>
            <a
                style={{ marginTop: "30px" }}
                href="#"
                onClick={() => navigate("/register")}
            >
                Don't have an account? Click here to register.
            </a>
            <a
                style={{ marginTop: "30px" }}
                href="#"
                onClick={() => navigate("/recovery")}
            >
                Forgot your password? Click here to recover your account.
            </a>
        </Page>
    );
};
