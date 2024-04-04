import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/authentications/authSlice";


export default function PrivateRoute ({children, ...rest}) {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return isAuthenticated ? children : <Navigate to='/login'/>;
}