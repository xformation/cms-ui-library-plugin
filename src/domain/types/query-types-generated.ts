/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type AddInstituteInput = {
  name?: string | null;
  code?: string | null;
  year?: any | null;
};

export type UpdateInstituteInput = {
  instituteId: number;
  name?: string | null;
  code?: string | null;
  year?: any | null;
};

export type AddInstituteMutationVariables = {
  input: AddInstituteInput;
};

export type AddInstituteMutation = {
  addInstitute: {
    institute: {
      id: number;
      name: string;
      code: string;
      year: any;
    };
  };
};

export type InstituteListQuery = {
  // Return all known Pet Institutes
  institutes: Array<{
    id: number;
    name: string;
    code: string;
    year: any;
  }>;
};

export type InstituteQueryVariables = {
  instituteId: number;
};

export type InstituteQuery = {
  institute: {
    id: number;
    name: string;
    code: string;
    year: any;
  };
};

export type UpdateInstituteMutationVariables = {
  input: UpdateInstituteInput;
};

export type UpdateInstituteMutation = {
  updateInstitute: {
    institute: {
      id: number;
      name: string;
      code: string;
      year: any;
    };
  };
};

export type InstituteFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type InstituteDetailsFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type InstituteSummaryFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type FacultyListQuery = {
  // Return all known Pet Institutes
  faculties: Array<{
    id: number;
    name: string;
    lastName: string;
    address: string;
    mail: string;
    designation: string;
    mobile: any;
    status: string;
  }>;
};

export type FacultyQueryVariables = {
  facultyId: number;
};

export type FacultyQuery = {
  faculty: {
    id: number;
    name: string;
    lastName: string;
    address: string;
    mail: string;
    designation: string;
    mobile: any;
    status: string;
  };
};

export type FacultyFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type FacultyDetailsFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type FacultySummaryFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type AddFacultyInput = {
  name?: string | null;
  lastName?: string | null;
  address?: string | null;
  mail?: string | null;
  designation?: string | null;
  mobile?: any | null;
  status?: string | null;
};

export type UpdateFacultyInput = {
  facultyId: number;
  name?: string | null;
  lastName?: string | null;
  address?: string | null;
  mail?: string | null;
  designation?: string | null;
  mobile?: any | null;
  status?: string | null;
};

export type AddFacultyMutationVariables = {
  input: AddFacultyInput;
};

export type AddFacultyMutation = {
  addFaculty: {
    faculty: {
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    };
  };
};
export type AddStudentInput = {
  id?: number | null;
  studentName?: string | null;
  fatherName?: string | null;
  fatherMiddleName?: string | null;
  fatherLastName?: string | null;
  motherName?: string | null;
  motherMiddleName?: string | null;
  motherLastName?: string | null;
  aadharNo?: number | null;
  dateOfBirth?: number | null;
  placeOfBirth?: string | null;
  religion?: string | null;
  caste?: string | null;
  subCaste?: string | null;
  age?: number | null;
  sex?: string | null;
  bloodGroup?: string | null;
  addressLineOne?: string | null;
  addressLineTwo?: string | null;
  addressLineThree?: string | null;
  town?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: number | null;
  studentContactNumber?: number | null;
  alternateContactNumber?: number | null;
  studentEmailAddress?: string | null;
  alternateEmailAddress?: string | null;
  relationWithStudent?: string | null;
  name?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  contactNo?: number | null;
  emailAddress?: string | null;
  uploadPhoto?: string | null;
  admissionNo?: number | null;
  rollNo?: number | null;
  studentType?: string | null;
  batch: {
    batch?: any | null;
  };
  section: {
    section?: any | null;
  };
  branch: {
    branchName?: any | null;
  };
  department: {
    name?: any | null;
  };
};

export type AddStudentMutationVariables = {
  input: AddStudentInput;
};

export type AddStudentMutation = {
  addStudent: {
    student: {
      id: number;
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
  };
};

export type UpdateFacultyMutationVariables = {
  input: UpdateFacultyInput;
};

export type UpdateFacultyMutation = {
  updateFaculty: {
    faculty: {
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    };
  };
};

export type RemoveFacultyInput = {
  facultyId: number;
};

export type RemoveFacultyMutationVariables = {
  input: RemoveFacultyInput;
};

export type RemoveFacultyMutation = {
  removeFaculty: {
    faculties: Array<{
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    }>;
  };
};

/* Location */

export type locationListQuery = {
  locations: Array<{
    id: string;
    name: string;
    address: string;
    appliesTo: string;
  }>;
};

export type locationQueryVariables = {
  locationId: any;
};

export type locationQuery = {
  location: {
    id: any;
    name: string;
    address: string;
    appliesTo: string;
  };
};

export type locationDetailsFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

export type locationSummaryFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

/* Student */

export type StudentListQuery = {
  // Return all known Pet Institutes
  students: Array<{
    id: number;
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
  }>;
};

export type StudentQueryVariables = {
  studentId: number;
};

export type StudentQuery = {
  student: {
    id: number;
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
      branchName: string;
    };
    department: {
      name: string;
    };
  };
};

export type StudentFragment = {
  id: number;
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
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentDetailsFragment = {
  id: number;
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
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentSummaryFragment = {
  id: number;
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
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type UpdateStudentInput = {
  studentId: number;
  studentName?: string | null;
  fatherName?: string | null;
  fatherMiddleName?: string | null;
  fatherLastName?: string | null;
  motherName?: string | null;
  motherMiddleName?: string | null;
  motherLastName?: string | null;
  aadharNo?: number | null;
  dateOfBirth?: number | null;
  placeOfBirth?: string | null;
  religion?: string | null;
  caste?: string | null;
  subCaste?: string | null;
  age?: number | null;
  sex?: string | null;
  bloodGroup?: string | null;
  addressLineOne?: string | null;
  addressLineTwo?: string | null;
  addressLineThree?: string | null;
  town?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: number | null;
  studentContactNumber?: number | null;
  alternateContactNumber?: number | null;
  studentEmailAddress?: string | null;
  alternateEmailAddress?: string | null;
  relationWithStudent?: string | null;
  name?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  contactNo?: number | null;
  emailAddress?: string | null;
  uploadPhoto?: string | null;
  admissionNo?: number | null;
  rollNo?: number | null;
  studentType?: string | null;
  batch: {
    batch?: any | null;
  };
  section: {
    section?: any | null;
  };
  branch: {
    branchName?: any | null;
  };
  department: {
    name?: any | null;
  };
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput;
};

export type UpdateStudentMutation = {
  updateStudent: {
    student: {
      id: number;
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
        branchName: string;
      };
      department: {
        name: string;
      };
    };
  };
};
export type LibraryListQuery = {
  libraries: Array<{
    id: number;
    bookTitle: string;
    author: string;
    bookNo: number;
    noOfCopies: number;
    additionalInfo: string;
    uniqueNo: number;
    batch: number;
    subject: number;
  }>;
};

export type LibraryQueryVariables = {
  libraryId: number;
};

export type LibraryQuery = {
  library: {
    id: number;
    bookTitle: string;
    author: string;
    bookNo: number;
    noOfCopies: number;
    additionalInfo: string;
    uniqueNo: number;
    batch: {
      id: number;
    };
    subject: {
      id: number;
    };
  };
};

export type FeeFragment = {
  id: number;
  feeParticularsName: string;
  feeParticularDesc: string;
  studentType: string;
  gender: string;
  amount: number;
  feeCategory: {
    categoryName: number;
  };
  batch: {
    batch: any;
  };
  facility: {
    facility: string;
  };
  transportRoute: {
    transportRoute: string;
  };
  college: {
    college: string;
  };
  department: {
    department: string;
  };
  branch: {
    branch: string;
  };
  academicYear: {
    academicYear: number;
  };
};

export type LibraryDetailsFragment = {
  id: number;
  bookTitle: string;
  author: string;
  bookNo: number;
  noOfCopies: number;
  additionalInfo: string;
  uniqueNo: number;

  batch: {
    id: number;
  };
  subject: {
    id: number;
  };
};

export type FeeSummaryFragment = {
  id: number;
  feeParticularsName: number;
  feeParticularDesc: number;
  studentType: number;
  gender: number;
  amount: number;
  feeCategory: number;
  batch: number;
  facility: number;
  transportRoute: number;
  college: number;
  department: number;
  branch: number;
  academicYear: number;
};

export type UpdateLibraryInput = {
  id?: number | null;
  bookTitle?: number | null;
  author?: number | null;
  bookNo?: number | null;
  noOfCopies?: number | null;
  additionalInfo?: number | null;
  uniqueNo?: number | null;
  batch?: number | null;
  subject?: number | null;
};

export type UpdateLibraryMutationVariables = {
  input: UpdateLibraryInput;
};

export type LibraryUpdateMutation = {
  updateLibrary: {
    library: {
      id: number;
      bookTitle: number;
      author: number;
      bookNo: number;
      noOfCopies: number;
      additionalInfo: number;
      uniqueNo: number;
      batch: number;
      subject: number;
    };
  };
};

/* tslint:enable */

// InvoiceCount
export type getInvoiceDataQuery = {
  getinvoicedata: {
    totalInvoice: any;
    totalPaidInvoice: any;
    totalUnPaidInvoice: any;
    totalCanceledInvoice: any;
  };
};

export type getInvoiceDataSummaryFragment = {
  totalInvoice: any;
  totalPaidInvoice: any;
  totalUnPaidInvoice: any;
  totalCanceledInvoice: any;
};

export type getInvoiceDataDetailsFragment = {
  totalInvoice: any;
  totalPaidInvoice: any;
  totalUnPaidInvoice: any;
  totalCanceledInvoice: any;
};
export type getInvoiceDataFragment = {
  totalInvoice: any;
  totalPaidInvoice: any;
  totalUnPaidInvoice: any;
  totalCanceledInvoice: any;
};

export type InvoiceCountQueryType = {
  getInvoiceData: {
    totalInvoice: number;
    totalPaidInvoice: number;
    totalUnPaidInvoice: number;
    totalCanceledInvoice: number;
  };
};

// Invoice Count

// Search Invoice

// export type SearchInvoiceListQuery = {
//   searchInvoice: Array<{
//     studentName: string;
//     studentContactNumber: string;
//     categoryName: string;
//     amountPaid: number;
//     paymentDate: any;
//   }>;
// };

// export type SearchInvoiceListQueryOne = {
//   searchInvoice: Array<{
//     students: Array<{
//       studentName: string;
//       studentContactNumber: string;
//     }>;
//     feeCategory: Array<{
//       categoryName: string;
//     }>;
//     amountPaid: number;
//     paymentDate: any;
//   }>;
// }

export type SearchInvoiceListType = {
  searchInvoice: {
    invoiceNumber: string;
    id: number;
    amountPaid: number;
    strPaymentDate: string;
    feeCategory: {
      categoryName: string;
    };
    student: {
      id: number;
      studentName: string;
      studentContactNumber: string;
    };
    paymentStatus: any;
  };
};

export type SearchInvoiceOnTypeListType = {
  searchInvoiceOnType: {
    invoiceNumber: string;
    id: number;
    amountPaid: number;
    strPaymentDate: string;
    feeCategory: {
      categoryName: string;
    };
    student: {
      id: number;
      studentName: string;
      studentContactNumber: string;
    };
    paymentStatus: any;
  };
};

// Search Invoice
export type GetInvoiceData = {
  totalInvoice: any;
  totalPaidInvoice: any;
  totalUnPaidInvoice: any;
  totalCanceledInvoice: any;
};

export type SearchInvoiceData = {
  // id: number;
  invoiceNumber: any;
  amountPaid: number;
  paymentDate: number;
  nextPaymentDate: number;
  outStandingAmount: number;
  modeOfPayment: string;
  chequeNumber: number;
  demandDraftNumber: number;
  onlineTxnRefNumber: number;
  paymentStatus: string;
  comments: string;
  updatedBy: string;
  feeCategory: {
    feeCategory: any;
  };
  feeDetails: {
    feeDetails: any;
  };

  dueDate: {
    dueDate: any;
  };
  paymentRemainder: {
    paymentRemainder: any;
  };

  college: {
    college: any;
  };
  branch: {
    branch: any;
  };
  student: {
    studentName: any;
  };
  academicYear: {
    academicYear: any;
  };
};

export type LoadBranchQueryType = {
  createFeeDataCache: {
    colleges: Array<{
      id: number;
      shortName: string;
    }>;
    branches: Array<{
      id: number;
      branchName: string;
      college: {
        id: number;
      };
    }>;
  };
};

export type DueDateAddMutationType = {
  addDueDate: {
    dueDate: {
      id: number;
      paymentMethod: string;
    };
  };
};

export type DueDateUpdateMutationType = {
  updateDueDate: {
    dueDate: {
      id: number;
      paymentMethod: string;
    };
  };
};

export type PaymentRemainderAddMutationType = {
  addPaymentRemainder: {
    paymentRemainder: {
      id: number;
    };
  };
};

export type PaymentRemainderUpdateMutationType = {
  updatePaymentRemainder: {
    paymentRemainder: {
      id: number;
    };
  };
};

export type LateFeeAddMutationType = {
  addLateFee: {
    lateFee: {
      id: number;
    };
  };
};

export type LateFeeUpdateMutationType = {
  updateLateFee: {
    lateFee: {
      id: number;
    };
  };
};

export type SaveAllMutationType = {
  saveDueDatePaymentRemLateFee: {
    // QueryResult: {
    statusDesc: string;
    // };
  };
};

export type FeeSettingsType = {
  getFeeSettingData: {
    lateFeeId: number;
    isAutoLateFee: string;
    lateFeeDays: number;
    chargeType: string;
    fixedCharges: number;
    percentCharges: string;
    lateFeeFrequency: string;
    lateFeeRepeatDays: number;

    prId: number;
    isAutoRemainder: string;
    isFirstPaymentRemainder: string;
    firstPaymentRemainderDays: number;
    isSecondPaymentRemainder: string;
    secondPaymentRemainderDays: number;
    isOverDuePaymentRemainder: string;
    overDuePaymentRemainderAfterDueDateOrUntilPaid: string;
    overDuePaymentRemainderDays: number;
    isRemainderRecipients: string;
    remainderRecipients: string;
  };
};

export type FindDueDateDataType = {
  getFeeSettingDueDateData: {
    dueDateId: number;
    paymentMethod: string;
    installments: number;
    paymentDay: number;
    frequency: any;
  };
};

export type FeeCategoryAddMutationType = {
  addFeeCategory: Array<{
    id: number;
    categoryName: string;
    description: string;
    status: any;
    createdBy: string;
    createdOn: any;
    updatedBy: string;
    updatedOn: any;
    startDate: any;
    endDate: any;
    branch: {
      id: number;
      branchName: string;
    };
    strCreatedOn: string;
    strUpdatedOn: string;
    strStartDate: string;
    strEndDate: string;
  }>;
};

export type LoadFeeSetupCacheType = {
  createFeeSetupDataCache: {
    departments: Array<{
      id: number;
      name: string;
      branch: {
        id: number;
      };
      academicyear: {
        id: number;
      };
    }>;
    batches: Array<{
      id: number;
      batch: string;
      department: {
        id: number;
      };
    }>;
    studentTypes: Array<{
      id: number;
      description: string;
    }>;
    genders: Array<{
      id: number;
      description: string;
    }>;
    feeDetails: Array<{
      id: number;
      feeParticularsName: string;
    }>;
    feeCategory: Array<{
      id: number;
      categoryName: string;
      description: string;
      status: any;
      createdBy: string;
      createdOn: any;
      updatedBy: string;
      updatedOn: any;
      startDate: any;
      endDate: any;
      branch: {
        id: number;
        branchName: string;
      };
      strCreatedOn: string;
      strUpdatedOn: string;
      strStartDate: string;
      strEndDate: string;
    }>;
    facility: Array<{
      id: number;
      name: string;
    }>;
    transportRoute: Array<{
      id: number;
      routeName: string;
      routeDetails: string;
      routeMapUrl: string;
    }>;
  };
};

export type LibraryUpdateMutationType = {
  updateLibrary: Array<{
    id: number;
    bookTitle: string;
    author: string;
    bookNo: any;
    noOfCopies: any;
    additionalInfo: any;
    uniqueNo: any;
    batch: {
      id: number;
      batch: string;
    };
    subject: {
      id: number;
      subjectDesc: string;
    };
  }>;
};

export type FeeDetailsAddMutationType = {
  addFeeDetails: {
    id: number;
    feeParticularsName: string;
    feeParticularDesc: string;
    studentType: any;
    gender: any;
    amount: number;
    status: any;
    createdBy: string;
    updatedBy: string;
    feeCategory: {
      id: number;
    };
    batch: {
      id: number;
      batch: string;
    };
    facility: {
      id: number;
      name: string;
    };
    transportRoute: {
      id: number;
      routeName: string;
      routeDetails: string;
      routeMapUrl: string;
    };
    department: {
      id: number;
      name: string;
    };
    strCreatedOn: string;
    strUpdatedOn: string;
    strStartDate: string;
    strEndDate: string;
  };
};

/* tslint:enable */
export type LoadLibraryQueryCacheForAdmin = {
  createLibraryFilterDataCache: {
    branches: Array<{
      id: number;
      branchName: string;
    }>;
    departments: Array<{
      id: number;
      name: string;
      branch: {
        id: number;
      };
      academicyear: {
        id: number;
      };
    }>;
    batches: Array<{
      id: number;
      batch: string;
      department: {
        id: number;
      };
    }>;
    academicExamSettings: Array<{
      id: number;
      examName: string;
      total: number;
      batch: {
        id: number;
      };
    }>;
    sections: Array<{
      id: number;
      section: string;
      batch: {
        id: number;
      };
    }>;
    subjects: Array<{
      id: number;
      subjectCode: string;
      batch: {
        id: number;
      };
    }>;
    semesters: Array<{
      id: number;
      description: string;
    }>;
    libraries: Array<{
      id: number;
      bookTitle: string;
      author: string;
      bookNo: number;
      noOfCopies: number;
      additionalInfo: string;
      uniqueNo: number;
      batch: {
        id: number;
      };
      subject: {
        id: number;
      };
      batches: {
        id: number;
      };
    }>;
  };
};

export type AddExamMutation = {
  addAcademicExamSetting: Array<{
    examName: String;
    actions: String;
    total: number;
    passing: number;
    subject: {
      id: number;
      subjectDesc: string;
    };
    startTime: String;
    endTime: String;
    examDate: Date;
    semester: String;
    gradeType: String;
    batch: {
      id: number;
      branchName: string;
    };
    section: {
      id: number;
    };
    branch: {
      id: number;
      branchName: string;
    };
    department: {
      id: number;
      name: string;
    };
    academicyear: {
      id: number;
      year: string;
    };
  }>;
};

export type LibraryAddMutationType = {
  addLibrary: Array<{
    id: number;
    bookTitle: string;
    author: string;
    bookNo: number;
    noOfCopies: number;
    additionalInfo: string;
    uniqueNo: number;

    batch: {
      id: number;
    };
    subject: {
      id: number;
    };
  }>;
};
export type BookAddMutationType = {
  addBook: Array<{
    id: number;
    issueDate: Date;
    dueDate: Date;
    receivedDate: Date;
    noOfCopiesAvailable: any;
    status: any;
    student: {
      id: number;
    };
    library: {
      id: number;
    };
  }>;
};
export type AddBookInput = {
  issueDate?: any | null;
  dueDate?: any | null;
  receivedDate?: any | null;
  noOfCopiesAvailable?: number | null;
  status?: string | null;
  student: {
    student?: any | null;
  };
  library: {
    library?: any | null;
  };
};
