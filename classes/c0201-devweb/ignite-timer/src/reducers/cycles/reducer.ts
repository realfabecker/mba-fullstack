import { ActionTypes } from "./actions.ts";
import { produce } from "immer";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
  activeCycleId: string | null;
}

export function cyclesReducer(
  prevState: CyclesState,
  action: any,
): CyclesState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce<CyclesState, CyclesState>(prevState, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycle = action.payload.newCycle;
        draft.activeCycleId = action.payload.newCycle.id;
      });
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = prevState.cycles.findIndex((cycle) => {
        return cycle.id === prevState.activeCycleId;
      });
      if (currentCycleIndex < 0) {
        return prevState;
      }
      return produce<CyclesState, CyclesState>(prevState, (draft) => {
        draft.activeCycleId = null;
        draft.activeCycle = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = prevState.cycles.findIndex((cycle) => {
        return cycle.id === prevState.activeCycleId;
      });
      if (currentCycleIndex < 0) {
        return prevState;
      }
      return produce<CyclesState, CyclesState>(prevState, (draft) => {
        draft.activeCycleId = null;
        draft.activeCycle = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return prevState;
  }
}
