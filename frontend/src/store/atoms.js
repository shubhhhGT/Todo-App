import { atom } from "recoil";

export const tokenAtom = atom({
  key: "tokenAtom",
  default: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
});

export const compltedTodosAtom = atom({
  key: "compltedTodosAtom",
  default: [],
});
