export type BeneficiariesParams = {
  id: string;
  first_name: string;
  last_name: string;
  avatarUrl: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  profile_picture: {
    id: string;
    url: string;
  };
  relationship: string;
  address: string;
  created_at: string;
  updated_at?: string | null;
  isSelected: boolean;
};

export type SingleBeneficiaryDetailsParams = {
  address: string;
  created_at: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  phone: string;
  relationship: string;
  updated_at: string;
};
