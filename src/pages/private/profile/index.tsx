import { Button } from "@/components/common/Button";
import { FieldLabelText } from "@/components/common/FormHelper";
import LineThrough from "@/components/common/LineThrough";
import Typography from "@/components/common/Typography";
import { FaCheckCircle } from "react-icons/fa";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import { defaultImages, formatDate, getSponsorCountry } from "@/utils/constant";
import Container from "@/components/common/Container";

const Profile = () => {
  const { authUser } = useAuth();

  const location = getSponsorCountry(authUser?.user?.country!);

  const user = {
    name: `${authUser?.user?.first_name} ${authUser?.user?.last_name}`,
    email: authUser?.user?.email,
    location: location?.label ?? "",
    verified: true,
    photo: "",
    personalInfo: [
      {
        label: "First Name",
        value: authUser?.user?.first_name,
      },
      {
        label: "Last Name",
        value: authUser?.user?.last_name,
      },
      {
        label: "Email",
        value: authUser?.user?.email,
      },
      {
        label: "Phone Number",
        value: `${authUser?.user?.country_code} ${authUser?.user?.phone}`,
      },
      {
        label: "Date of Birth",
        value: formatDate(authUser?.user?.dateOfBirth!) || "--",
      },
      {
        label: "Gender",
        value: authUser?.user?.gender || "--",
      },
      {
        label: "Country",
        value: location?.label || "--",
      },
      {
        label: "State",
        value: authUser?.user?.state || "--",
      },
    ],
  };

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const handleUpdateProfile = () => {};

  return (
    <Container className="space-y-5">
      <Typography variant="largeTextBold">Profile</Typography>

      <div className="bg-white rounded-2xl p-6 flex items-center gap-5 border border-mid-grey">
        <img
          src={user.photo || defaultImages?.avatar}
          alt={user.name}
          className="w-20 h-20 border rounded-full object-cover"
        />

        <div className="flex flex-col grow">
          <h2 className="font-semibold text-lg text-gray-800">{user.name}</h2>
          <p className="text-primary text-xs mb-3 underline cursor-pointer">
            {user.email}
          </p>
          <p className="text-gray-400 text-sm">{user.location}</p>
        </div>

        {user.verified && <FaCheckCircle className="text-green-500 w-6 h-6" />}
      </div>

      <div className="bg-white rounded-2xl border border-mid-grey p-5 space-y-3">
        <div className="flex justify-between items-center gap-5">
          <Typography variant={"mediumTextSemibold"}>
            Personal Information
          </Typography>

          <Button onClick={() => setShowUpdateProfileModal(true)}>Edit</Button>
        </div>

        <LineThrough />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 items-center py-5">
          {user?.personalInfo?.map((item, index) => (
            <div key={index} className="space-y-1">
              <FieldLabelText view label={item?.label} />

              {item?.label === "Email" ? (
                <Typography
                  as="a"
                  variant="smallText"
                  href={`mailto:${item?.value}`}
                  className="text-primary font-medium underline"
                >
                  {item?.value}
                </Typography>
              ) : (
                <Typography variant="smallText" className="font-medium">
                  {item?.value}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>

      <UpdateProfileModal
        showUpdateProfileModal={showUpdateProfileModal}
        setShowUpdateProfileModal={setShowUpdateProfileModal}
        handleUpdateProfile={handleUpdateProfile}
      />
    </Container>
  );
};

export default Profile;
