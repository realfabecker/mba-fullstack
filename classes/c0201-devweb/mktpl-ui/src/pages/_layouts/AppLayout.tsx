import Logo2 from "../../assets/Logo2.svg";
import IconPlusWhite from "../../assets/icons/IconPlusWhite.svg";
import IconChartOrange from "../../assets/icons/iconChartOrange.svg";
import IconBox from "../../assets/icons/iconBox.svg";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <header className="flex justify-between px-[2rem] py-[1.5rem] items-center text-sm border-b">
        <img className="max-h-[50px]" src={Logo2 as string} alt="" />

        <nav>
          <ul className="flex list-none gap-3">
            <li className="flex gap-2 items-center bg-orange-shape p-3 rounded-2xl text-orange-base">
              <img src={IconChartOrange as string} alt="" />
              <span>Dashboard</span>
            </li>
            <li className={"flex gap-2 items-center"}>
              <img src={IconBox as string} alt="" />
              <span>Produtos</span>
            </li>
          </ul>
        </nav>

        <button
          type="submit"
          className="text-white flex items-center justify-between bg-orange-base py-[10px] px-[15px] rounded-[10px]"
        >
          <img
            className="w-[18px] h-[18px]"
            src={IconPlusWhite as string}
            alt=""
          />
          <span className="block">Novo produto</span>
        </button>
      </header>
      <main className="max-w-[920px] m-0 mx-auto py-[4rem]">
        <Outlet />
      </main>
    </>
  );
}
