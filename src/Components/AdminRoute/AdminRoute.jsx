import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
 // Check Amdin or not
export const AdminRouteLink = ({ children }) => {
  const { userEmail } = useSelector((state) => state.auth);
 
  if (userEmail ===process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  } else {
    return <AdminRouteLinkAcess />;
  }
};
function AdminRoute({ children }) {
  const { userEmail } = useSelector((state) => state.auth);
  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  } else {
    return null;
  }
}

const AdminRouteLinkAcess = () => {
  return (
    <div className="adminRouteLink">
      <div>
        <h1>Permission Denied</h1>
        <p>This Page can be only be view by an admin user</p>
        <Link to="/">
          <Button variant="contained">
            <BsArrowBarLeft /> Back To Home{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminRoute;
