import * as React from 'react';
import {graphql, MutationFunc} from 'react-apollo';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import * as AddStudentMutationGql from './AddStudentMutation.graphql';
import {
  AddStudentMutation,
  AddStudentInput,
  AddStudentMutationVariables,
  StudentData,
} from '../../types';

import StudentEditForm from '../StudentEditForm';
import withLoadingHandler from '../../../components/withLoadingHandler';

// import 'bootstrap/dist/css/bootstrap.min.css';
import {number} from 'prop-types';

const emptyStudent = (): StudentData => ({
  // id: '',
  studentName: '',
  fatherName: '',
  fatherMiddleName: '',
  fatherLastName: '',
  motherName: '',
  motherMiddleName: '',
  motherLastName: '',
  aadharNo: 1,
  dateOfBirth: 1,
  placeOfBirth: '',
  religion: '',
  caste: '',
  subCaste: '',
  age: 1,
  sex: '',
  bloodGroup: '',
  addressLineOne: '',
  addressLineTwo: '',
  addressLineThree: '',
  town: '',
  state: '',
  country: '',
  pincode: 0,
  studentContactNumber: 0,
  alternateContactNumber: 0,
  studentEmailAddress: '',
  alternateEmailAddress: '',
  relationWithStudent: '',
  name: '',
  middleName: '',
  lastName: '',
  contactNo: 0,
  emailAddress: '',
  uploadPhoto: '',
  admissionNo: 0,
  rollNo: 0,
  studentType: '',
  batch: {batch: ''},
  section: {section: ''},
  branch: {branchName: ''},
  department: {name: ''},
});

type AddStudentPageOwnProps = RouteComponentProps<{}>;
type AddStudentPageProps = AddStudentPageOwnProps & {
  mutate: MutationFunc<AddStudentMutation>;
};

const AddStudentPage: any = ({mutate, history}: AddStudentPageProps) => (
  <section className="student-grid">
    <StudentEditForm
      initialStudent={emptyStudent()}
      formTitle="Add Students"
      onFormSubmit={(student: StudentData) => {
        return mutate({
          variables: {input: student},
        })
          .then(({data}) => {
            history.push(`/students/${data.addStudent.student.id}`);
            location.href = `${
              location.origin
            }/plugins/xformation-fee-panel/page/students`;
          })
          .catch(error => {
            console.log('there was an error sending the query', error);
            return Promise.reject(`Could not save student: ${error}`);
          });
      }}
    />
  </section>

  // <section className="plugin-bg-white">
  //   <h3 className="bg-heading p-1">
  //     <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" /> Admin
  //     - Student Management
  //   </h3>
  //   <div className="hflex bg-heading mt-3 mr-18 ml-18">
  //     <h4>Student Profile</h4>
  //     <div className="hhflex">
  //       {/* <Link to={`/plugins/xformation-fee-panel/page/students`}>Save </Link> */}
  //     </div>
  //   </div>
  //   <div className="grid">
  //     <div className="leftbar">
  //       <img src="/public/img/cubes.png" alt="" />
  //       <div className="form-justify">
  //         <label htmlFor="">*Admission No:</label>
  //         <input className="border-plugin input-width" type="text" />
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">*Student Id:</label>
  //         <input className="border-plugin input-width" type="text" />
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">*Department:</label>
  //         <select name="" id="" className="input-width">
  //           <option value="">ECE</option>
  //           <option value="">EEE</option>
  //           <option value="">CSE</option>
  //         </select>
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">*Year:</label>
  //         <select name="" id="" className="input-width">
  //           <option value="">Year 1</option>
  //           <option value="">Year 2</option>
  //           <option value="">Year 3</option>
  //           <option value="">Year 4</option>
  //         </select>
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">*Semester:</label>
  //         <select name="" id="" className="input-width">
  //           <option value="">Sem 1</option>
  //           <option value="">Sem 2</option>
  //           <option value="">Sem 3</option>
  //           <option value="">Sem 4</option>
  //         </select>
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">*Section:</label>
  //         <select name="" id="" className="input-width">
  //           <option value="">Sec 1</option>
  //           <option value="">Sec 2</option>
  //           <option value="">Sec 3</option>
  //           <option value="">Sec 4</option>
  //         </select>
  //       </div>
  //       <div className="form-justify">
  //         <label htmlFor="">Student Type:</label>
  //         <select name="" id="" className="input-width">
  //           <option value="">cse</option>
  //           <option value="">Civil engineers</option>
  //           <option value="">petro engineers</option>
  //         </select>
  //       </div>
  //     </div>
  //     <div className="rightbar">
  //       <h3 className="bg-heading p-1 b-1">Personal Details</h3>
  //       <form action="" className="form-grid">
  //         <div>
  //           <label htmlFor="">Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Middle Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Last Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Father Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Father Middle Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Father Last Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Mother Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Mother Middle Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Mother Last Name*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>

  //         <div>
  //           <label htmlFor="">Adhar No*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Date Of Birth*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Place Of Birth*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Religion*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Cast*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Subcasat*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Age*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Sex*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Blood Group*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //       </form>

  //       <h3 className="bg-heading p-1 b-1">Contact Details</h3>
  //       <form action="" className="form-grid">
  //         <div>
  //           <label htmlFor="">Address Line 1*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Address Line 2</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Town*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">State*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Country*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Pin Code*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Contact Number*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <div>
  //           <label htmlFor="">Alternate Contact Number 1</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //         <br />
  //         <div>
  //           <label htmlFor="">Email Address*</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>

  //         <div>
  //           <label htmlFor="">Alternate Email Address</label>
  //           <input className="border-plugin fwidth" type="text" />
  //         </div>
  //       </form>

  //       <h3 className="bg-heading p-1 b-1">Primary And Emergency Contact Details</h3>
  //       <form action="">
  //         <div className="reln">
  //           <label htmlFor="">Relation with Student*</label>
  //           <select name="" id="">
  //             <option value="">Father</option>
  //             <option value="">Mother</option>
  //           </select>
  //         </div>
  //         <div className="form-grid">
  //           <div>
  //             <label htmlFor="">Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Middle Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Last Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Contact Number*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Email Address*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Make this Primary</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //         </div>
  //       </form>
  //       <hr />
  //       <form action="">
  //         <div className="reln">
  //           <label htmlFor="">Relation with Student*</label>
  //           <select name="" id="">
  //             <option value="">Father</option>
  //             <option value="">Mother</option>
  //           </select>
  //         </div>
  //         <div className="form-grid">
  //           <div>
  //             <label htmlFor="">Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Middle Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Last Name*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Contact Number*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div>
  //             <label htmlFor="">Email Address*</label>
  //             <input className="border-plugin fwidth" type="text" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Make this Primary Contact</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //         </div>
  //       </form>
  //       <h3 className="bg-heading p-1 b-1">Facilities</h3>
  //       <form action="">
  //         <div className="form-grid">
  //           <div className="rel-radio">
  //             <label htmlFor="">Transport</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Mess</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Gym</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Cultural Class</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Library</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Sports</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Swimming</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Extra Class</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Handicrafts</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Add</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Add</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //           <div className="rel-radio">
  //             <label htmlFor="">Add</label>
  //             <input className="border-plugin fwidth" type="radio" />
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // </section>
);

export default withRouter(
  graphql<AddStudentMutation, AddStudentPageOwnProps>(AddStudentMutationGql)(
    AddStudentPage
  )
);
