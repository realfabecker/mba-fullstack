import {apiConfig} from './api-config';
import dayjs from "dayjs";

export async function scheduleFetchByDate({date}) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules`)
        
        return (await response.json()).filter((schedule) => {
            return dayjs(date).isSame(schedule.when, 'day')
        })
    } catch (e) {
        console.log(e)
        alert("Não foi possível buscar os agendamentos do dia selecionado");
    }
}