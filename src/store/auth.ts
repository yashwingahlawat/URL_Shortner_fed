import { create } from "zustand";

interface AuthState {
  id: number | null;
  token: string | null;
  email: string | null;
  name: string | null;

  setAuth: (data: { id: number; token: string; email: string; name: string }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  id: null,
  token: localStorage.getItem("token"),
  email: null,
  name: null,

  setAuth: ({ id, token, email, name }) => {
    // persist JWT only (not sensitive info)
    localStorage.setItem("token", token);

    set({ id, token, email, name });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ id: null, token: null, email: null, name: null });
  }
}));
