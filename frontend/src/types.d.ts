type InsuranceTypes = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

type PolicyStatus = 'ACTIVE' | 'PENDING' | 'DROPPED_OUT' | 'CANCELLED';

// =================== component props interfaces
export interface CardItemProp {
  policy: PolicySummary;
}

export interface HeaderProps {
  handleAPICall: (query: queryInterface) => void;
  loading: boolean;
}

export interface TableProps {
  policies: Policy[];
  loading: boolean;
}

export interface PaginationProps {
  policiesLength: number;
  handleAPICall: (query: queryInterface) => void;
}

// =================== core interfaces
export interface queryInterface {
  [key: string]: string | number
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface Family {
  name: string;
}

export interface Policy {
  id: string;
  customer: Customer;
  insuranceType: InsuranceTypes;
  provider: string;
  status: PolicyStatus;
  createdAt?: string;
  startDate: string;
  endDate: null | string;
  familyMembers: Family[]
}

export interface PolicySummary {
  id: number;
  type: InsuranceTypes;
  name: string;
  description: string;
}
