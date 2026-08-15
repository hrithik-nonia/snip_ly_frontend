// built in imports

// custom imports
import { NavLogo } from "./CommonComponents";
import CreateAccountForm from "./CreateAccountForm";
import ErrorPage from "./ErrorPage";
function CommonPage({ pathname }) {
  const renderContent = () => {
    switch (pathname) {
      case "/registerPage":
        return <CreateAccountForm />;
      case "/linkExpiry410Page":
        return <ErrorPage pathname={pathname} />;
      case "/loginPage":
        return <CreateAccountForm pathname={pathname} />;
      case "/notFoundPage":
        return <ErrorPage />;
      default:
        return null;
    }
  };
  return (
    <>
      <section className="min-h-screen bg-slate-50">
        <div className="pt-5 pl-10">
          <NavLogo />
        </div>

        <div className="flex justify-center items-center">
          {renderContent()}
        </div>
      </section>
    </>
  );
}
export default CommonPage;
