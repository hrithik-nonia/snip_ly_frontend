// built in impoets
import { useLocation } from "react-router-dom";

// custom imports
import CommonPage from "../components/CommonPage";
function RegisterPage() {
  const location = useLocation();
  return (
    <>
      <CommonPage pathname={location.pathname} />
    </>
  );
}
export default RegisterPage;
