import IconTagMoney from "../../../assets/icons/iconTagMoneyBlue.svg";

export function ProductsSoldChartWidget() {
  return (
    <div
      className={
        "flex flex-row bg-white py-[12px] px-[12px] rounded-xl gap-[.5rem]"
      }
    >
      <div className="bg-blue-light w-[65px] h-[65px] p-4 flex justify-center items-center rounded-md">
        <img src={IconTagMoney as string} alt="" />
      </div>
      <div className={"flex flex-col gap-[10px]"}>
        <span className="text-xl font-bold">24</span>
        <span className="x-body-md">
          Produtos
          <br /> Vendidos
        </span>
      </div>
    </div>
  );
}
