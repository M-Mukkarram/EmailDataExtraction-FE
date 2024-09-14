import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import localforage from 'localforage';
import { UserSlice, userSlice } from './slices/user.slice';

interface Store extends UserSlice {}

export const useBoundStore = create<Store>()(
  persist(
    (...a) => ({
      ...userSlice(...a),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => localforage),
      partialize: (state: Store) => ({ user: state.user }),
    }
  )
);
