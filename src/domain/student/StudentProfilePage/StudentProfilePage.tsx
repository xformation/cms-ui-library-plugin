import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import { StudentListQuery, StudentSummaryFragment } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const StudentRow = ({ student }: { student: StudentSummaryFragment }) => (
  <tr key={student.id}>
    <td>{student.studentName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherMiddleName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherLastName}</td>
  </tr>
);

const StudentsTable = ({ students }: { students: StudentSummaryFragment[] }) => (
  <table className="striped-table">
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Attendance</th>
        <th>Attendance</th>
        <th>Attendance</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => <StudentRow key={student.id} student={student} />)}
    </tbody>
  </table>
);

type StudentListPageOwnProps = RouteComponentProps<{}>;
type StudentListPageProps = {
  data: QueryProps & StudentListQuery;
};

const StudentProfilePage = ({ data: { students } }: StudentListPageProps) => (
  // <section className="customCss">
  //   <h2 className="heading">
  //     {students.length}
  //     Students found
  //   </h2>
  //   <StudentsTable students={students} />
  //   <Link to={`/plugins/xformation-fee-panel/page/addstudent`} className="btn customButton">
  //     Add Student
  //     </Link>
  // </section>
  <section className="plugin-bg-white p-1">
    <h3 className="bg-heading p-1">
      <i className="fa fa-university stroke-transparent" aria-hidden="true" /> Admin
      - Fee Management
    </h3>
    <div className="bg-heading px-1 dfinline">
      <h5 className="mtf-8 dark-gray">Fee Management</h5>
      <a href="" className="btn btn-primary">Save</a>
    </div>
    <div>
      <a href="" className="btn btn-primary f-12 m-1"><i className="fa fa-plus"></i>Add Fee Category</a>
      <div className="b-1 feeCategory">
        <h5 className="h5-fee-bg p-1 white">Create Fee Category</h5>
        <form action="">
          <div>
            <label htmlFor="">Category Name</label>
            <input type="text" className="fwidth" />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input type="text" className="fwidth" />
          </div>
        </form>
        <a href="" className="btn btn-primary f-20 m-1"><i className="fa fa-plus"></i>Add Particulars to this Category</a>
       <div className="feeDetails">
        <div className="b-1 feeCategory">
          <h5 className="h5-fee-bg p-1 white">Create Fee Category</h5>
          <form action="">
            <div>
              <label htmlFor="">Fee particulars Name</label>
              <input type="text" className="fwidth" />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <input type="text" className="fwidth" />
            </div>
            <div className="feeAppHead">
                <h5>Applicable To</h5>
                </div>
            <div className="feeSelect">
              <div>
                <label htmlFor="">Batch</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Department</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Year</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Student type</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Gender</label>
                <select name="" id="">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Amount</label>
                <input type="number" name="" id="" />
              </div>
              <div className="mt-20">
                <a href="" className="btn btn-primary m
                r-1">Apply</a>
                <a href="" className="btn btn-primary f-25"><i className="fa fa-trash"></i></a>
              </div>
            <hr/>
            </div>
            </form>
            <a href="" className="btn btn-primary f-12"> <i className="fa fa-plus"></i>Applicable to</a>
        </div>
      </div>
    </div>
    </div>
  </section>
);
export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentProfilePage));
