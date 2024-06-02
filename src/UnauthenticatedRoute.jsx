import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";

const UnauthenticatedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default UnauthenticatedRoute;

UnauthenticatedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
