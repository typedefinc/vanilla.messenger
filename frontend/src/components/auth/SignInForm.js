import InputDefault from '@components/ui/input/InputDefault';
import ButtonDefault from "@components/ui/button/ButtonDefault";
import { Link } from "react-router-dom";

const SignInForm = () =>
  <div className="flex flex-col items-start justify-center space-y-5">
    <h1 className="text-white text-[32px] font-bold">
      Sign in!
    </h1>
    <InputDefault type="text" placeholder="Login" />
    <InputDefault type="email" placeholder="Email" />
    <InputDefault type="password" placeholder="Password" />
    <ButtonDefault text="Sign in" />
    <Link to="/login" className="w-full">
      <ButtonDefault text="Log in" />
    </Link>
  </div>

export default SignInForm;