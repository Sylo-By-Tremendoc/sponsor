import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import {
  BeneficialCard,
  BeneficialCardLoader,
} from "./components/BeneficialCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteBeneficiaryModal from "./components/DeleteBeneficiaryModal";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import Container from "@/components/common/Container";
import { useSetPagination } from "@/hooks/use-set-pagination";
import useGetAllBeneficiaries from "./hooks/use-get-all-beneficiaries";
import NetworkError from "@/pages/error/NetworkError";
import EmptyBeneficiaries from "./components/EmptyBeneficiaries";

const Beneficiaries = () => {
  const navigate = useNavigate();

  const pagination = useSetPagination();
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, refetch, error } =
    useGetAllBeneficiaries({
      enabled: true,
      pageNumber: pagination?.pageNumber,
      pageSize: pagination?.pageSize,
      search,
    });

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any | null>(
    null
  );

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [openDeleteBeneficiaryModal, setOpenDeleteBeneficiaryModal] =
    useState(false);

  const beneficiaries = [
    {
      id: "1",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      firstName: "Charles",
      lastName: "Omiwole",
      relationship: "Brother",
      email: "charles.omiwole@gmail.com",
    },
    {
      id: "2",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      firstName: "Mary",
      lastName: "Johnson",
      relationship: "Sister",
      email: "mary.johnson@gmail.com",
    },
    {
      id: "3",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      firstName: "John",
      lastName: "Adewale",
      relationship: "Father",
      email: "john.adewale@gmail.com",
    },
    {
      id: "4",
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
      firstName: "Grace",
      lastName: "Adewale",
      relationship: "Mother",
      email: "grace.adewale@gmail.com",
    },
    {
      id: "5",
      profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
      firstName: "Emmanuel",
      lastName: "Bello",
      relationship: "Cousin",
      email: "emmanuel.bello@gmail.com",
    },
    {
      id: "6",
      profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
      firstName: "Sarah",
      lastName: "Benson",
      relationship: "Aunt",
      email: "sarah.benson@gmail.com",
    },
    {
      id: "7",
      profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
      firstName: "Tunde",
      lastName: "Afolabi",
      relationship: "Uncle",
      email: "tunde.afolabi@gmail.com",
    },
    {
      id: "8",
      profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
      firstName: "Esther",
      lastName: "Ogundipe",
      relationship: "Sister",
      email: "esther.ogundipe@gmail.com",
    },
  ];

  const handleAction = (action: string, item: any) => {
    setSelectedBeneficiary(item);

    switch (action) {
      case "view":
        navigate(`/beneficiaries/${item?.id}`);
        break;

      case "edit":
        navigate(`/beneficiaries/${name}/edit`);
        break;

      case "delete":
        setOpenDeleteBeneficiaryModal(true);
        break;

      default:
        break;
    }
  };

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="largeTextBold">Beneficiaries</Typography>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Add New Beneficiary
        </Button>
      </div>

      {isLoading || isFetching ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-3 items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <BeneficialCardLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-3 items-center">
          {data?.length === 0 ? (
            <div className="col-span-full">
              <EmptyBeneficiaries
                onAdd={() => setShowGetStartedModal(true)}
              />
            </div>
          ) : (
            data?.map((item, index) => (
              <BeneficialCard
                key={index}
                email={item?.email}
                firstName={item?.firstName}
                relationship={item?.relationship}
                profilePicture={item?.profilePicture}
                name={`${item?.firstName} ${item?.lastName}`}
                handleAction={(action) => handleAction(action, item)}
                onClick={() => navigate(`/beneficiaries/${item?.id}`)}
              />
            ))
          )}
        </div>
      )}

      <DeleteBeneficiaryModal
        beneficiary={selectedBeneficiary}
        openDeleteBeneficiaryModal={openDeleteBeneficiaryModal}
        setOpenDeleteBeneficiaryModal={setOpenDeleteBeneficiaryModal}
        handleDelete={() => {
          setOpenDeleteBeneficiaryModal(false);
        }}
      />

      <GetStartedModal
        showGetStartedModal={showGetStartedModal}
        setShowGetStartedModal={setShowGetStartedModal}
        handleContinue={() => navigate("/package-plans/plans")}
      />
    </Container>
  );
};

export default Beneficiaries;
