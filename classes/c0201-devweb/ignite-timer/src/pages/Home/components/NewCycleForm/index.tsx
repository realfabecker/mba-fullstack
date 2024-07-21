import React, { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles.ts";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext.tsx";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <label htmlFor="minutesAmount">Durante</label>
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
      </datalist>

      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormContainer>
  );
}
