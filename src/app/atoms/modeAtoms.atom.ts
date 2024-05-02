import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type themeMode = {
  mode: string;
};

export type ModeStateType = themeMode;

const { persistAtom } = recoilPersist({
  key: "mode",
  storage: localStorage,
});

export default atom<ModeStateType>({
  key: "mode",
  default: {
    mode: "light",
  },
  effects_UNSTABLE: [persistAtom],
});