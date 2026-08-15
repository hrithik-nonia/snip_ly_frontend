// built in imports
import { useLocation } from "react-router-dom";

// custom imports
import CommonPage from "../components/CommonPage";

function LinkExpiry410Page() {
  const location = useLocation();
  return (
    <>
      <CommonPage pathname={location.pathname} />
    </>
  );
}
export default LinkExpiry410Page;
