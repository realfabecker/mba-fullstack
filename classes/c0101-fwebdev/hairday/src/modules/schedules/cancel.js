import {scheduleCancel} from "../../services/schedule-cancel";
import {schedulesDay} from "./load";

const periods = document.querySelectorAll('.period')


periods.forEach((period) => {
    period.addEventListener('click',async function (event) {
        if(!event.target.classList.contains("cancel-icon")) return

        const item = event.target.closest("li");
        if (!item.dataset.id) return;

        const isConfirm = confirm("Tem certeza que deseja cancelar esse agendamento?")
        if (!isConfirm) return;

        await scheduleCancel({id: item.dataset.id})
        await schedulesDay()
    })
})