import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist({
  key: "page-title",
  storage: localStorage,
});

export default atom<string>({
  key: "page-title",
  default: "",
  effects_UNSTABLE: [persistAtom],
});