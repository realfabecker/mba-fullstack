import {hoursLoad} from "../form/hours-load.js";
import {scheduleFetchByDate} from "../../services/schedule-fetch-by-date";
import {schedulesShow} from "./show";

const selectedDate = document.getElementById("date")

export async function schedulesDay() {

    const date = selectedDate.value;

    const dailySchedules = await scheduleFetchByDate({date})
    
    schedulesShow({dailySchedules})

    hoursLoad({date, dailySchedules})
}