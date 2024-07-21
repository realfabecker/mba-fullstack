import { createContext, useEffect, useReducer, useState } from "react";
import {
  Cycle,
  cyclesReducer,
  CyclesState,
} from "../reducers/cycles/reducer.ts";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions.ts";
import { differenceInSeconds } from "date-fns";

export interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

export interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number | undefined;
  setSecondsPassed: (second: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType,
);

export function CyclesContextProvider({ children }) {
  const [cyclesState, dispatch] = useReducer<CyclesState>(
    cyclesReducer,
    {
      cycles: [],
      acitveCycle: null,
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0",
      );
      if (!storedStateAsJson) {
        return initialState;
      }
      const cyclesState = JSON.parse(storedStateAsJson) as any;
      return cyclesState.cycles ? cyclesState : initialState;
    },
  );

  const { cycles, activeCycleId, activeCycle } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate);
    }
    return 0;
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJson);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
