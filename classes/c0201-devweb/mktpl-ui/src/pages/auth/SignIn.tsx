import MailIcon from "../../assets/icons/mail.svg";
import AccessIcon from "../../assets/icons/access.svg";
import ViewIcon from "../../assets/icons/view.svg";
import ArrowRightIcon from "../../assets/icons/arrowRight.svg";
import ArrowRightOrangeIcon from "../../assets/icons/arrowRightOrange.svg";

export function SignIn() {
  return (
    <div className="flex flex-col justify-between bg-white m-6 rounded-[32px] px-[3rem] py-[2.5rem]">
      <div>
        <div>
          <h1 className="x-title-md">Acesse sua conta</h1>
          <p className="x-body-sm text-gray-300 my-2">
            Informe seu e-mail e senha para entrar
          </p>
        </div>
        <form className="py-[16px] flex flex-col gap-[20px]">
          <div>
            <label className="x-label-md text-gray-300 block" htmlFor="email">
              E-MAIL
            </label>
            <div className="flex flex-row border-b gap-2 items-center">
              <img
                className="w-[21.5px] h-[18.5px]"
                src={MailIcon as string}
                alt=""
              />
              <input
                className="placeholder:text-gray-200 placeholder:text-sm py-3.5 flex-1"
                name="email"
                type="email"
                placeholder="Seu e-mail cadastrado"
              />
            </div>
          </div>
          <div>
            <label
              className="x-label-md text-gray-300 block"
              htmlFor="password"
            >
              SENHA
            </label>
            <div className="flex flex-row gap-2 items-center border-b">
              <img
                className="w-[21.5px] h-[18.5px]"
                src={AccessIcon as string}
              />
              <input
                className="placeholder:text-gray-200 placeholder:text-sm py-3.5 flex-1"
                type="password"
                name="password"
                placeholder="Sua senha de acesso"
              />
              <img className="w-[21.5px] h-[18.5px]" src={ViewIcon as string} />
            </div>
          </div>
          <button
            type="submit"
            className="mt-[12px] text-white flex items-center justify-between bg-orange-base py-[10px] px-[15px] rounded-[10px]"
          >
            <span className="block">Acessar</span>
            <img
              className="w-[24px] h-[24px]"
              src={ArrowRightIcon as string}
              alt=""
            />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-[8rem]">
        <p className="x-body-md text-gray-300">Ainda não tem uma conta?</p>
        <button
          type="submit"
          className="text-orange-base flex items-center justify-between bg-transparent py-[10px] px-[15px] rounded-[10px] border border-orange-base"
        >
          <span className="block">Cadastrar</span>
          <img
            className="w-[24px] h-[24px]"
            src={ArrowRightOrangeIcon as string}
          />
        </button>
      </div>
    </div>
  );
}
