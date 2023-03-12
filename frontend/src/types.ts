import React from 'react';

export type InsuranceTypes = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

export type PolicyStatus = 'ACTIVE' | 'PENDING' | 'DROPPED_OUT' | 'CANCELLED';

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
  selected: { value: string; label: string };
  options: { value: string; label: string }[];
  handleChange: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  id?: string;
  disabled?: boolean;
}

export interface InputProps {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  data_testid?: string;
  id?: string;
  px?: number;
  py?: number;
  error?: boolean;
  errorMessage?: string;
}

export interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'full' | 'contain';
  type: 'button' | 'submit';
  children: React.ReactNode;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
  px?: number;
  py?: number;
}

export interface TextProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  children: React.ReactNode;
  weight?: 'thin' | 'medium' | 'bold';
  color?: `${string}-${number}`;
  data_testid?: string;
  align?: 'center' | 'left' | 'right';
}

export interface LabelProps extends TextProps {
  htmlFor: string;
  children: React.ReactNode;
}

export interface LoaderProps {
  width: 'lg' | 'md' | 'sm';
  px?: number;
  py?: number;
}

export interface DivProps {
  position?: 'fixed' | 'static' | 'absolute' | 'relative';
  display?: 'grid' | 'flex' | 'inline' | 'block' | 'inline-block';
  top?: number | 'auto' | 'full' | 'px' | `${number}/${number}`;
  left?: number | 'auto' | 'full' | 'px' | `${number}/${number}`;
  right?: number | 'auto' | 'full' | 'px' | `${number}/${number}`;
  bottom?: number | 'auto' | 'full' | 'px' | `${number}/${number}`;
  px?: number;
  py?: number;
  mx?: number | 'auto';
  my?: number | 'auto';
  bg?: `${string}-${number}` | 'transparent';
  border?: number | `${string}-${number}`;
  borderColor?: string | `${string}-${number}`;
  borderRadius?: string | `${string}-${string}`;
  md?: 'full' | `${number}/${number}`;
  lg?: 'full' | `${number}/${number}`;
  width?: 'full' | `${number}/${number}`;
  height?: 'screen' | `${number}/${number}`;
  data_testid?: string;
  gap?: number;
  cols?: number | 'none';
  rows?: number | 'none';
  flexDir?: 'row' | 'col';
  justifyContent?:
    | 'justify-between'
    | 'justify-start'
    | 'justify-end'
    | 'justify-center'
    | 'justify-around'
    | 'justify-evenly';
  alignItems?:
    | 'items-start'
    | 'items-end'
    | 'items-center'
    | 'items-baseline'
    | 'items-stretch';
  placeContent?:
    | 'place-content-between'
    | 'place-content-start'
    | 'place-content-end'
    | 'place-content-center'
    | 'place-content-around'
    | 'place-content-evenly'
    | 'place-content-baseline'
    | 'place-content-stretch';
  children: React.ReactNode
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
  id: string;
  name: string;
}

export interface Policy {
  id: string;
  customer: Customer;
  insuranceType: InsuranceTypes;
  provider: string;
  status: PolicyStatus;
  createdAt?: Date;
  startDate: Date;
  endDate: null | Date;
}

export interface PolicySummary {
  id: number;
  type: InsuranceTypes;
  name: string;
  description: string;
  icon: React.ReactNode;
}
