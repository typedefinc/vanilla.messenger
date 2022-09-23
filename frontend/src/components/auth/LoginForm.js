import InputDefault from '@components/ui/input/InputDefault';
import ButtonDefault from "@components/ui/button/ButtonDefault";
import { Link } from "react-router-dom";

const LoginForm = () =>
  <div className="flex flex-col items-start justify-center space-y-5">
    <h1 className="text-white text-[32px] font-bold">
      Log in!
    </h1>
    <InputDefault type="text" placeholder="Login" />
    <InputDefault type="password" placeholder="Password" />
    <ButtonDefault text="Log in" />
    <Link to="/signin" className="w-full">
      <ButtonDefault text="Sign in" />
    </Link>
  </div>

export default LoginForm;