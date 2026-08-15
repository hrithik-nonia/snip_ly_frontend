// built in imports
import { useLocation } from "react-router-dom";

// custom imports
import CommonPage from "../components/CommonPage";
function NotFoundPage() {
  const location = useLocation();
  return (
    <>
      <CommonPage pathname={location.pathname} />
    </>
  );
}
export default NotFoundPage;
