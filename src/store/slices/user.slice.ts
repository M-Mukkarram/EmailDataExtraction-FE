// import { IUserData } from '@/types';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: any | null;
  updateUser?: (updatedObj: Partial<any>) => void;
  setUser: (user: any) => void;
}
export const userSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  updateUser: (updatedObj: Partial<any>) => {
    set((state) => {
      if (state.user !== null && typeof state.user === 'object') {
        return {
          user: { ...state.user, ...updatedObj },
        };
      } else {
        return state;
      }
    });
  },
  setUser: (user) => set({ user }),
});
