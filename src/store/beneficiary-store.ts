import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";

export type BeneficiaryState = {
  location: string;
  ageRange: string;
};

export type BeneficiaryActions = {
  setLocation: (location: string) => void;
  setAgeRange: (ageRange: string) => void;
  reset: () => void;
};

export type BeneficiaryStore = BeneficiaryState & BeneficiaryActions;

export const initialState: BeneficiaryState = {
  location: "",
  ageRange: "",
};

export const createBeneficiaryStore = (
  initState: BeneficiaryState = initialState
) => {
  return createStore<BeneficiaryStore>()(
    persist(
      (set) => ({
        ...initState,
        setLocation: (location) =>
          set(() => ({
            location,
          })),

        setAgeRange: (ageRange) =>
          set(() => ({
            ageRange,
          })),

        reset: () =>
          set(() => ({
            ...initialState,
          })),
      }),
      {
        name: "beneficiary-store",
        version: 1,
        partialize: (state) => ({
          location: state.location,
          ageRange: state.ageRange,
        }),
      }
    )
  );
};

export const beneficiaryStore = createBeneficiaryStore();

export const useBeneficiaryStore = <T>(
  selector: (state: BeneficiaryStore) => T
): T => useStore(beneficiaryStore, selector);
