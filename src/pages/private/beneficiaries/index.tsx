import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import BeneficialCard from "./components/BeneficialCard";
import { useNavigate } from "react-router-dom";

const Beneficiaries = () => {
  const navigate = useNavigate();
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="largeTextBold">Beneficiaries</Typography>
        <Button>Add New Beneficiary</Button>
      </div>

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-3 items-center">
        {beneficiaries?.map((item, index) => (
          <BeneficialCard
            key={index}
            email={item?.email}
            firstName={item?.firstName}
            relationship={item?.relationship}
            profilePicture={item?.profilePicture}
            name={`${item?.firstName} ${item?.lastName}`}
            onClick={() => navigate(`/beneficiaries/${item?.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Beneficiaries;
