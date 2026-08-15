// built in imports
import { useLocation } from "react-router-dom";

// custom imports
import CommonPage from "../components/CommonPage";
function LoginPage() {
  const location = useLocation();
  return (
    <>
      <CommonPage pathname={location.pathname} />
    </>
  );
}
export default LoginPage;
