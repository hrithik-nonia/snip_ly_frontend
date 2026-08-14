// built in impoets

// custom imports
import CreateAccountForm from "../components/CreateAccountForm";
import { NavLogo } from "../components/CommonComponents";

function RegisterPage() {
  return (
    <>
      <section className="min-h-screen bg-slate-50">
        <div className="pt-5 pl-10">
          <NavLogo />
        </div>

        <div className="flex justify-center items-center">
          <CreateAccountForm />
        </div>
      </section>
    </>
  );
}
export default RegisterPage;
