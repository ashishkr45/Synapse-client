import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {
	const token = localStorage.getItem('app_token');
	return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRouter;