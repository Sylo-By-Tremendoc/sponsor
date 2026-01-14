import type { BeneficiariesParams } from "./beneficiary";

export type PlansParam = {
  id: string;
  name: string;
  description: string;
  price: string; // backend returns string
  price_hmo: string;
  price_sylo_usd: string;
  price_sylo_gbp: string;
  price_sylo_cad: string;
  billing_interval: string;
  age_range_min: number;
  age_range_max: number;
  subscriber_count: number;
  terms_and_conditions: string;
  services: Service[];
  benefits: PlanBenefit[];
  created_at: string;
  updated_at: string;
};

export type SubscriptionPlan = {
  id: string;
  status: string;
  billing_interval: string;
  price: string;
  currency: string;
  starts_at: string;
  ends_at: string;
  cancels_at: string | null;
  plan: PlansParam;
  beneficiary: BeneficiariesParams;
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

export type SinglePlanDetailsParams = {
  plan: PlansParam;
  subscriber_count: number;
  benefits_by_category: BenefitsByCategory;
};

export type BenefitsByCategory = {
  [categoryName: string]: HealthcareProviderBenefit[];
};

export interface HealthcareProviderBenefit {
  id: string;
  healthcare_provider_id: string;
  uploaded_by: string;
  benefit_category_id: string;
  healthcare_service_id: string;
  benefit_name: string;
  coverage_amount: string | null;
  coverage_type: string;
  country_code: string;
  description: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  pivot: PlanBenefitPivot;
  benefit_category: BenefitCategory;
  healthcare_service: HealthcareService;
}

export interface PlanBenefitPivot {
  plan_id: string;
  healthcare_provider_benefit_id: string;
}

export interface HealthcareService {
  id: string;
  name: string;
  description: string;
  country_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BenefitCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type PlanBenefit = {
  id: string;
  healthcare_provider_id: string;
  benefit_name: string;
  coverage_amount: string; 
  coverage_type: string;
  country_code: string;
  description: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};