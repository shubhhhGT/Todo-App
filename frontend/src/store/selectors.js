// import { selector } from "recoil";
// import { apiConnector } from "../services/apiConnector";
// import { signupAtom } from "./atoms";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const signupAtomSelector = selector({
//   key: "signupAtomSelector",
//   get: async ({ get }) => {
//     const formData = get(signupAtom);
//     try {
//       const res = await apiConnector(POST, `${BASE_URL}/signup`, formData);

//       if (res.status) {
//         return res.data;
//       } else {
//         throw new Error("Signup failed");
//       }
//     } catch (error) {
//       return error.message;
//     }
//   },
// });
