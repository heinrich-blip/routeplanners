import { create } from 'zustand';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  mapCenter: [number, number];
  mapZoom: number;

  toggleDarkMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  sidebarOpen: true,
  mapCenter: [-17.9318, 25.8298], // Vic-Falls default
  mapZoom: 8,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setMapCenter: (mapCenter) => set({ mapCenter }),
  setMapZoom: (mapZoom) => set({ mapZoom }),
}));
