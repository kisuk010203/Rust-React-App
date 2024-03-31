import { useApolloClient } from "@apollo/client";
import { useAuth, useAuthCheck } from "../../hooks/useAuth";
import React from "react";
import "../../App.css";
import { HeaderNavButton } from "../../common/buttons/buttons";

export const AppNavHeader = () => {
    useAuthCheck();
    const auth = useAuth();
    const apollo = useApolloClient();

    return (
        <div className="App-nav-header">
            <div style={{ display: "flex", flex: 1 }}>
                <HeaderNavButton navigate="/">Home</HeaderNavButton>
                <HeaderNavButton navigate="todos">Todos</HeaderNavButton>
                <HeaderNavButton navigate="gql">GraphQL</HeaderNavButton>
                <HeaderNavButton navigate="account">Account</HeaderNavButton>
            </div>
            {auth.isAuthenticated ? (
                // <HeaderNavButton
                //     onClick={() => {
                //         auth.logout();
                //         apollo.resetStore();
                //     }}
                // >
                //     Logout
                // </HeaderNavButton>
                <div></div>
            ) : (
                <HeaderNavButton navigate="/login">Login</HeaderNavButton>
            )}
        </div>
    );
};
