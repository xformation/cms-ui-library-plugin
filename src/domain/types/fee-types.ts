// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------
export type InstituteData = {
  name: string;
  code: string;
  year: any;
};

export type FacultyData = {
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type location = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

export type StudentData = {
  // id: string;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  name: string;
  middleName: string;
  lastName: string;
  contactNo: number;
  emailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: any;
  };
  department: {
    name: any;
  };
};
