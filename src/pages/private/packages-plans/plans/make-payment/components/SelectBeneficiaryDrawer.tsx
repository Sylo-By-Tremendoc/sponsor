import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/common/modals/Drawer";
import TextInput from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { DialogFooter } from "@/components/common/modals/Dialog";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { BeneficiaryCard, BeneficiaryCardLoader } from "./BeneficiaryCard";
import EmptyState from "@/components/common/EmptyState";
import useGetAllBeneficiariesInfinity from "@/pages/private/beneficiaries/hooks/use-get-all-beneficiaries-infinity";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import NetworkError from "@/pages/error/NetworkError";
import AddBeneficiaryModal from "./AddBeneficiaryModal";

const SelectBeneficiaryDrawer = ({
  beneficiaries,
  setBeneficiaries,
  showSelectBeneficiaryDrawer,
  setShowSelectBeneficiaryDrawer,
  onSelect,
}: {
  beneficiaries: BeneficiariesParams[];
  showSelectBeneficiaryDrawer: boolean;
  setBeneficiaries: (val: any) => void;
  setShowSelectBeneficiaryDrawer: (val: boolean) => void;
  onSelect: (id: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [openAddBeneficiaryModal, setOpenAddBeneficiaryModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, ref: markerRef } = useIntersectionObserver({
    threshold: 0.5,
  });

  const {
    data,
    error,
    refetch,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllBeneficiariesInfinity({
    enabled: true,
    per_page: 8,
  });

  const beneficiaryData = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() || [];
  }, [data?.pages]);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  ]);

  useEffect(() => {
    if (!beneficiaryData) return;

    setBeneficiaries(() => {
      return beneficiaryData.map((hmoBenefit) => {
        const alreadySelected = beneficiaries?.some(
          (b) => b.id === hmoBenefit.id && b.isSelected
        );

        return {
          ...hmoBenefit,
          isSelected: alreadySelected,
        };
      });
    });
  }, [beneficiaryData]);

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <>
      <Drawer
        open={showSelectBeneficiaryDrawer}
        onOpenChange={setShowSelectBeneficiaryDrawer}
      >
        <DrawerContent
          side="bottom"
          className="flex flex-col rounded-t-2xl w-screen"
          onCloseAutoFocus={(e) => e.preventDefault()}
          ref={scrollRef}
        >
          <DrawerTitle className="text-center px-5 pt-5 pb-4 border-b">
            View Added beneficiary
          </DrawerTitle>

          <div className="flex-1 flex flex-col overflow-auto">
            <div className="flex items-center justify-between gap-5 p-5">
              <TextInput
                type="search"
                placeholder="Search beneficiary..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button onClick={() => setOpenAddBeneficiaryModal(true)}>
                Add Beneficiary
              </Button>
            </div>

            <div className="flex-1 px-5 pb-6 space-y-3 overflow-y-auto">
              {(isLoading || isFetching) && !isFetchingNextPage ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <BeneficiaryCardLoader key={index} />
                  ))}
                </div>
              ) : beneficiaries?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {beneficiaries?.map((benefit) => (
                    <BeneficiaryCard
                      key={benefit.id}
                      beneficiary={benefit}
                      isSelected={benefit?.isSelected}
                      onSelect={onSelect}
                      showCheckBox
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No beneficiary Added Yet"
                  description="Add your first Benefit to easily manage and view."
                  iconName="user-group"
                  buttonText="Add Benefit"
                  onButtonClick={() => setOpenAddBeneficiaryModal(true)}
                />
              )}
            </div>
          </div>

          {isFetchingNextPage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <BeneficiaryCardLoader key={idx} />
              ))}
            </div>
          )}

          <div ref={markerRef} className="h-8 w-full" />

          <DialogFooter className="m-4">
            <Button
              variant="outline"
              className="w-full md:w-60"
              onClick={() => setShowSelectBeneficiaryDrawer(false)}
            >
              Cancel
            </Button>

            <Button
              className="w-full md:w-60 text-white"
              onClick={() => setShowSelectBeneficiaryDrawer(false)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DrawerContent>
      </Drawer>

      <AddBeneficiaryModal
        openAddBeneficiaryModal={openAddBeneficiaryModal}
        setOpenAddBeneficiaryModal={setOpenAddBeneficiaryModal}
        onSuccess={() => {
          refetch();
          setOpenAddBeneficiaryModal(false);
        }}
      />
    </>
  );
};

export default SelectBeneficiaryDrawer;
