import { Outlet } from "react-router-dom";

import Logo from "../../assets/Logo.svg";
import Backgound from "../../assets/Background.png";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 max-w-[920px] m-0 mx-auto">
      <div>
        <div className={"py-10 px-10"}>
          <img className={"max-h-[50px]"} src={Logo as string} />
        </div>
        <div className="my-10">
          <img src={Backgound as string} />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
