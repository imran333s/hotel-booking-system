import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getGreeting } from "../../utils/getGreeting";

const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        {getGreeting()}, {user.name} ({user.role})
      </h1>
      <p>This is your employee dashboard.</p>
    </div>
  );
};

export default EmployeeDashboard;
