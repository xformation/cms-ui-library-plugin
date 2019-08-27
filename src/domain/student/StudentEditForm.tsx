import * as React from 'react';

import {MutationFunc} from 'react-apollo';
import EditForm from '../../components/form/EditForm';
import {InputFactory} from '../../components/form/FormElements';
import {NotEmpty} from '../../components/form/Constraints';
import {StudentData} from '../types';

const copyStudent = (student: StudentData): StudentData => ({
  // id: student.id,
  studentName: student.studentName,
  fatherName: student.fatherName,
  fatherMiddleName: student.fatherMiddleName,
  fatherLastName: student.fatherLastName,
  motherName: student.motherName,
  motherMiddleName: student.motherMiddleName,
  motherLastName: student.motherLastName,
  aadharNo: student.aadharNo,
  dateOfBirth: student.dateOfBirth,
  placeOfBirth: student.placeOfBirth,
  religion: student.religion,
  caste: student.caste,
  subCaste: student.subCaste,
  age: student.age,
  sex: student.sex,
  bloodGroup: student.bloodGroup,
  addressLineOne: student.addressLineOne,
  addressLineTwo: student.addressLineTwo,
  addressLineThree: student.addressLineThree,
  town: student.town,
  state: student.state,
  country: student.country,
  pincode: student.pincode,
  studentContactNumber: student.studentContactNumber,
  alternateContactNumber: student.alternateContactNumber,
  studentEmailAddress: student.studentEmailAddress,
  alternateEmailAddress: student.alternateEmailAddress,
  relationWithStudent: student.relationWithStudent,
  name: student.name,
  middleName: student.middleName,
  lastName: student.lastName,
  contactNo: student.contactNo,
  emailAddress: student.emailAddress,
  uploadPhoto: student.uploadPhoto,
  admissionNo: student.admissionNo,
  rollNo: student.rollNo,
  studentType: student.studentType,
  batch: student.batch.batch,
  section: student.section.section,
  branch: student.branch.branchName,
  department: student.department.name,
});

const studentFormElements = [
  {
    elementComponentFactory: InputFactory,
    name: 'studentName',
    label: 'Student Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'fatherName',
    label: 'Father Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'fatherMiddleName',
    label: 'Father Middle Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'father Last Name',
    label: 'fatherLastName',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherName',
    label: 'Mother Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherMiddleName',
    label: 'Mother Middle Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherLastName',
    label: 'mother Last Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'aadharNo',
    label: 'Adhar No',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'dateOfBirth',
    label: 'Date Of Birth',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'placeOfBirth',
    label: 'Place Of Birth',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'religion',
    label: 'Religion',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'caste',
    label: 'Caste',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'subCaste',
    label: 'Sub Caste',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'age',
    label: 'Age',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'bloodGroup',
    label: 'Blood Group',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineOne',
    label: 'address One',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineTwo',
    label: 'address Two',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineThree',
    label: 'address Three',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'town',
    label: 'Town',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'state',
    label: 'State',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'country',
    label: 'Country',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'pincode',
    label: 'Pincode',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentContactNumber',
    label: 'student Contact Number',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'alternateContactNumber',
    label: 'alternateContactNumber',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentEmailAddress',
    label: 'student email',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'alternateEmailAddress',
    label: 'alternate email',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'relationWithStudent',
    label: 'relation student',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'name',
    label: 'Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'middleName',
    label: 'Middle Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'lastName',
    label: 'Last Name',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'contactNo',
    label: 'Contact',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'emailAddress',
    label: 'Email Id',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'uploadPhoto',
    label: 'Upload Photo',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'admissionNo',
    label: 'Admission No',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'rollNo',
    label: 'Roll No',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentType',
    label: 'Student Type',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'batch',
    label: 'Batch',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'section',
    label: 'Section',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'branch',
    label: 'Branch',
    constraint: NotEmpty,
    className: 'testing',
  },
  {
    elementComponentFactory: InputFactory,
    name: 'department',
    label: 'Department',
    constraint: NotEmpty,
    className: 'testing',
  },
];

type StudentEditFormProps = {
  initialStudent: StudentData;
  formTitle: string;
  onFormSubmit: (student: StudentData) => void | Promise<string | void>;
};

const StudentEditForm = <M, MI>({
  formTitle,
  initialStudent,
  onFormSubmit,
}: StudentEditFormProps) => {
  return (
    <EditForm
      formTitle={formTitle}
      copyModel={copyStudent}
      formElements={studentFormElements}
      initialModel={initialStudent}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default StudentEditForm;
