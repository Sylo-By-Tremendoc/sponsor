export type PlansParam = {
  id: string;
  name: string;
  description: string;
  price: string;
  billing_interval: string;
  services: Service[];
  created_at: string;
  updated_at: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  billing_interval: string;
  services: Service[];
  created_at: string;
  updated_at: string;
};

export type PackagePlan = {
  id: string;
  name: string;
  price: number;
  ageRange: string;
  paymentPlan: string;
  features: string[];
};

export interface Service {
  id: string;
  name: string;
  description: string;
  country_code: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
