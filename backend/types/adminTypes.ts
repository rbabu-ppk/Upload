export type Employees = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  siteId: string;
  departmentId: string;
};

export type Jobs = {
  email: string;
  status: string;
};

export type Departments = {
  departmentId: string;
  departmentName: string;
};

export type Sites = {
  siteId: string;
  siteName: string;
};
