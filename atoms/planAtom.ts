import { atom } from "recoil";

export const planState = atom({
  key: "planState",
  default: "Basic",
});

export const isPlanState = atom({
  key: "isPlanState",
  default: false,
});
