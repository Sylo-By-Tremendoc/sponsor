export type BeneficiariesParams = {
  id: string;
  name: string;
  avatarUrl?: string;
  relationship: string;
  dateAdded: string;
  packageName: string;
  packageDuration: string;
  status: "Active" | "Inactive";
};
