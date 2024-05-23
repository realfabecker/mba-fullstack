import dayjs from "dayjs";
import {scheduleNew} from "../../services/schedule-new.js";
import {schedulesDay} from "../schedules/load";

const form = document.querySelector('form')

const clientName = document.getElementById('client')
const selectedDate = document.getElementById('date')


const inputDate = dayjs(new Date()).format('YYYY-MM-DD')
selectedDate.value = inputDate
selectedDate.min = inputDate

form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        const name = clientName.value.trim()
        if (!name) return alert("informe o nome do cliente");
        
        const hourSelected = document.querySelector(".hour-selected")
        if(!hourSelected) return alert("selecione a hora");
        
        const [hour] = hourSelected.textContent.split(":")
        const when = dayjs(selectedDate.value).add(hour, "hour")


        await scheduleNew({
            id: new Date().getTime(),
            name,
            when
        })
        
        await schedulesDay()
        clientName.value = ""
    } catch (e) {
        alert("Não foi possível realizar o agendamento")
        console.log(e)
    }
}