import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";
import type { SponsorLocationDropdownParams } from "@/components/navbar/components/SponsorLocationDropdown";

export type SponsorState = {
  search: string;
  sponsor: SponsorLocationDropdownParams;
};

export type SponsorStore = SponsorState & {
  setSearch: (search: string) => void;
  changeSponsor: (sponsor: SponsorLocationDropdownParams) => void;
};

export const defaultInitState: SponsorState = {
  search: "",
  sponsor: {
    id: "CAD",
    label: "Canada",
    symbol: "C$",
    flag: "https://flagcdn.com/w160/ca.png",
  },
};

export const createSponsorStore = (
  initState: SponsorState = defaultInitState
) => {
  return createStore<SponsorStore>()(
    persist(
      (set) => ({
        ...initState,
        setSearch: (search) => set((state) => ({ ...state, search })),
        changeSponsor: (sponsor) => set((state) => ({ ...state, sponsor })),
      }),
      {
        name: "Sponsor-store", // localStorage key
        version: 1,
        partialize: (state) => ({ sponsor: state.sponsor }),
        migrate: (_, version) => {
          if (version !== 1) {
            return {
              sponsor: {
                id: "CAD",
                label: "Canada",
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

// --- Instantiate Singleton Store --------------------------------

export const sponsorStore = createSponsorStore();

// --- React Hook Wrapper -----------------------------------------

/**
 * useSponsorLocationStore - React-friendly hook version of the vanilla store
 *
 * Example usage:
 * const { Sponsor, changeSponsor } = useSponsorLocationStore();
 */
export const useSponsorLocationStore = <T>(
  selector: (state: SponsorStore) => T
): T => useStore(sponsorStore, selector);
