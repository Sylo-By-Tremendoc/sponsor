import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";
import type { CurrencyDropdownParams } from "@/components/navbar/components/CurrencyDropdown";

export type CurrencyState = {
  search: string;
  currency: CurrencyDropdownParams;
};

export type CurrencyStore = CurrencyState & {
  setSearch: (search: string) => void;
  changeCurrency: (currency: CurrencyDropdownParams) => void;
};

export const defaultInitState: CurrencyState = {
  search: "",
  currency: {
    id: "CAD",
    label: "Canadian Dollar",
    symbol: "C$",
    flag: "https://flagcdn.com/w160/ca.png",
  },
};

export const createCurrencyStore = (
  initState: CurrencyState = defaultInitState
) => {
  return createStore<CurrencyStore>()(
    persist(
      (set) => ({
        ...initState,
        setSearch: (search) => set((state) => ({ ...state, search })),
        changeCurrency: (currency) => set((state) => ({ ...state, currency })),
      }),
      {
        name: "currency-store",
        version: 1,
        partialize: (state) => ({ currency: state.currency }),
        migrate: (_, version) => {
          if (version !== 1) {
            return {
              currency: {
                id: "CAD",
                label: "Canadian Dollar",
                symbol: "C$",
                flag: "https://flagcdn.com/w160/ca.png",
              },
            };
          }
        },
      }
    )
  );
};

export const CurrencyStore = createCurrencyStore();

export const useCurrencyStore = <T>(selector: (state: CurrencyStore) => T): T =>
  useStore(CurrencyStore, selector);
