// import { create } from "zustand";
// import { CreateUser, UserState } from "./user";
// import { devtools, persist, createJSONStorage } from "zustand/middleware";

// export const useStore = create<UserState>()(
//   devtools(
//     persist(
//       (...a) => ({
//         ...CreateUser(...a),
//       }),
//       {
//         name: "store-storage",
//         storage: createJSONStorage(() => localStorage),
//         skipHydration: false,
//       },
//     ),
//   ),
// );
