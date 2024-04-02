import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./containers/home-page";
import { Todos } from "./containers/todos/todo-page";
import { GraphQLPage } from "./containers/graphql-page";
import { AccountPage } from "./containers/account-page";
import { ActivationPage } from "./containers/activation-page";
import { LoginPage } from "./containers/login-page";
import { RecoveryPage } from "./containers/recovery-page";
import { RegistrationPage } from "./containers/registration-page";
import { ResetPage } from "./containers/reset-page";
import { CalendarPage } from "./containers/calendar-page";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/gql" element={<GraphQLPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/activate" element={<ActivationPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
    );
};
