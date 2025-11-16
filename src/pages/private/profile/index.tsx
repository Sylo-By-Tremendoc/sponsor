import { Button } from "@/components/common/Button";
import { FieldLabelText } from "@/components/common/FormHelper";
import LineThrough from "@/components/common/LineThrough";
import Typography from "@/components/common/Typography";
import { FaCheckCircle } from "react-icons/fa";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";

const Profile = () => {
  const user = {
    name: "Peter Omiwole",
    email: "peter.omiwole@gmail.com",
    location: "London, United Kingdom",
    verified: true,
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    personalInfo: [
      {
        label: "First Name",
        value: "Charles",
      },
      {
        label: "Last Name",
        value: "Omiwole",
      },
      {
        label: "Email",
        value: "peter.omiwole@gmail.com",
      },
      {
        label: "Phone Number",
        value: "+234 (0)7067 4213 32",
      },
      {
        label: "Date of Birth",
        value: "04 - 10 - 1990",
      },
      {
        label: "Gender",
        value: "Male",
      },
      {
        label: "Country",
        value: "Nigeria",
      },
      {
        label: "State",
        value: "Lagos",
      },
    ],
  };

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const handleUpdateProfile = () => {};

  return (
    <div className="space-y-5">
      <Typography variant="largeTextBold">Profile</Typography>

      <div className="bg-white rounded-2xl p-6 flex items-center gap-5 border border-mid-grey">
        <img
          src={user.photo}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover"
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
              <Typography variant={"smallText"} className="font-medium">
                {item?.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <UpdateProfileModal
        showUpdateProfileModal={showUpdateProfileModal}
        setShowUpdateProfileModal={setShowUpdateProfileModal}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
