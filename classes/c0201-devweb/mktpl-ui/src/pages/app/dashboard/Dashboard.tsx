import IconTagMoney from "../../../assets/icons/iconTagMoneyBlue.svg";
import IconStoreBlue from "../../../assets/icons/iconStoreBlue.svg";
import IconPeopleGray from "../../../assets/icons/iconPeopleGray.svg";
import { ViewsCardWidget } from "./ViewsCardWidget.tsx";
import { ProductsCatalogCardWidget } from "./ProductsCatalogCardWidget.tsx";
import { ProductsSoldChartWidget } from "./ProductsSoldChartWidget.tsx";
import { ViewsChartWidget } from "./ViewsChartWidget.tsx";

export function Dashboard() {
  return (
    <div>
      <div>
        <h1 className="x-title-md antialiased">Últimos 30 dias</h1>
        <p className="x-body-md my-1">
          Confira a estatísticas da usa loja no ultimo mês
        </p>
      </div>

      <div className="grid grid-cols-12 mt-5 gap-[1rem]">
        <div className="col-span-3 flex flex-col gap-3">
          <ProductsSoldChartWidget />
          <ProductsCatalogCardWidget />
          <ViewsCardWidget />
        </div>
        <div className="col-span-9 bg-white p-[1rem] rounded-2xl relative">
          <div
            className={"flex flex-col"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 16,
            }}
          >
            <div className="p-[1rem] x-title-sm py-[2rem]">
              <h2>Visitantes</h2>
            </div>
            <ViewsChartWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
