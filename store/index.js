import create from "zustand";

const useStore = create((set) => ({
	colors: [],
	setColors: (colorsFromApi) => set(() => ({ colors: colorsFromApi })),
}));

export default useStore;
