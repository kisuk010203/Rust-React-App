import { useApolloClient } from "@apollo/client";
import { useAuth, useAuthCheck } from "./hooks/useAuth";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppNavHeader } from "./containers/common/app-nav-header";

const App = () => {
    return (
            <div className="App">
                <AppNavHeader/>
                <AppRoutes/>
            </div>
    );
};

export default App;
