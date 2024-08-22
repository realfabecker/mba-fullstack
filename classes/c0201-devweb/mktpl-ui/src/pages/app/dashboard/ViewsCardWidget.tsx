import IconPeopleGray from "../../../assets/icons/iconPeopleGray.svg";

export function ViewsCardWidget() {
  return (
    <div
      className={
        "flex flex-row bg-white py-[12px] px-[12px] rounded-2xl gap-[1rem]"
      }
    >
      <div className="bg-blue-light w-[65px] h-[65px] p-4 flex justify-center items-center rounded-md">
        <img src={IconPeopleGray as string} alt="" />
      </div>
      <div className={"flex flex-col gap-[10px]"}>
        <span className="text-xl font-bold">1238</span>
        <span className="x-body-md">
          Pessoas
          <br /> Visitantes
        </span>
      </div>
    </div>
  );
}
