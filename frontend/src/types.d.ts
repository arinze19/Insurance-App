import React from "react";

type InsuranceTypes = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

type PolicyStatus = 'ACTIVE' | 'PENDING' | 'DROPPED_OUT' | 'CANCELLED';

// =================== component props interfaces
export interface CardItemProp {
  policy: PolicySummary;
}

export interface HeaderProps {
  filter: {
    query: string;
    dropdown: { value: string; label: string };
  };
  setFilter: (props: {
    query: string;
    dropdown: { value: string; label: string };
  }) => void;
}

export interface TableProps {
  policies: Policy[];
  loading: boolean;
  page: Omit<PaginationProps, 'handlePaginate'>;
  setPage: (page: PageData) => void;
}

export interface PaginationProps extends PageData {
  handlePaginate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  handleChange: (e: MouseEventHandler<HTMLLIElement>) => void;
}

// =================== core interfaces
export interface PageData {
  max: number;
  current: number;
  from: number;
  to: number;
  count: number;
  offset: number;
}

export interface queryInterface {
  [key: string]: string | number;
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
  familyMembers: Family[];
}

export interface PolicySummary {
  id: number;
  type: InsuranceTypes;
  name: string;
  description: string;
  icon: React.ReactNode
}
