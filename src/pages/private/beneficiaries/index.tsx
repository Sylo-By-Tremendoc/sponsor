import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import {
  BeneficialCard,
  BeneficialCardLoader,
} from "./components/BeneficialCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import DeleteBeneficiaryModal from "./components/DeleteBeneficiaryModal";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import Container from "@/components/common/Container";
import NetworkError from "@/pages/error/NetworkError";
import useGetAllBeneficiariesInfinity from "./hooks/use-get-all-beneficiaries-infinity";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import EmptyState from "@/components/common/EmptyState";
import type { BeneficiariesParams } from "@/types/beneficiary";
import UpdateBeneficiaryModal from "./components/UpdateBeneficiaryModal";

const Beneficiaries = () => {
  const navigate = useNavigate();

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

  const beneficiaries = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() || [];
  }, [data?.pages]);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiariesParams | null>(null);

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [openUpdateBeneficiaryModal, setOpenUpdateBeneficiaryModal] =
    useState(false);
  const [openDeleteBeneficiaryModal, setOpenDeleteBeneficiaryModal] =
    useState(false);

  const handleAction = (action: string, item: any) => {
    setSelectedBeneficiary(item);

    switch (action) {
      case "view":
        navigate(`/beneficiaries/${item?.id}`);
        break;

      case "edit":
        setOpenUpdateBeneficiaryModal(true);
        break;

      case "delete":
        setOpenDeleteBeneficiaryModal(true);
        break;

      default:
        break;
    }
  };

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

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container ref={scrollRef} className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="largeTextBold">Beneficiaries</Typography>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Add New Beneficiary
        </Button>
      </div>

      {(isLoading || isFetching) && !isFetchingNextPage ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 items-center gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <BeneficialCardLoader key={index} />
          ))}
        </div>
      ) : beneficiaries?.length ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 items-center gap-5">
          {beneficiaries?.map((item, index) => (
            <BeneficialCard
              key={index}
              beneficiary={item}
              handleAction={(action) => handleAction(action, item)}
              onClick={() => navigate(`/beneficiaries/${item?.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Beneficiaries Added Yet"
          description="Add your first beneficiary to easily manage ownership, permissions, and access settings."
          iconName="user-group"
          buttonText="Add Beneficiary"
          onButtonClick={() => setShowGetStartedModal(true)}
        />
      )}

      {isFetchingNextPage && (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 items-center gap-5">
          {Array.from({ length: 8 }).map((_, idx) => (
            <BeneficialCardLoader key={idx} />
          ))}
        </div>
      )}

      <div ref={markerRef} className="h-8 w-full" />

      {selectedBeneficiary && (
        <UpdateBeneficiaryModal
          beneficiary={selectedBeneficiary}
          openUpdateBeneficiaryModal={openUpdateBeneficiaryModal}
          setOpenUpdateBeneficiaryModal={setOpenUpdateBeneficiaryModal}
          onSuccess={() => {
            refetch();
            setSelectedBeneficiary(null);
            setOpenUpdateBeneficiaryModal(false);
          }}
        />
      )}

      {selectedBeneficiary && (
        <DeleteBeneficiaryModal
          beneficiary={selectedBeneficiary}
          openDeleteBeneficiaryModal={openDeleteBeneficiaryModal}
          setOpenDeleteBeneficiaryModal={setOpenDeleteBeneficiaryModal}
          handleDelete={() => {
            refetch();
            setSelectedBeneficiary(null);
            setOpenDeleteBeneficiaryModal(false);
          }}
        />
      )}

      <GetStartedModal
        showGetStartedModal={showGetStartedModal}
        setShowGetStartedModal={setShowGetStartedModal}
        handleContinue={() => navigate("/package-plans/plans")}
      />
    </Container>
  );
};

export default Beneficiaries;
