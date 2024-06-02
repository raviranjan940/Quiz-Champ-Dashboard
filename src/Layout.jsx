import ProtectedRoute from "./ProtectedRoute";
import Header from "./pages/Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <ProtectedRoute>
            <Header />
            <Outlet />
        </ProtectedRoute>
    );
}

export default Layout;
