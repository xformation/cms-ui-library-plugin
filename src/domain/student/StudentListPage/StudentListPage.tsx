import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import { StudentListQuery, StudentSummaryFragment } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

const StudentRow = ({ student }: { student: StudentSummaryFragment }) => (
  <tr key={student.id}>
    <td>
      <input type="checkbox" name="" id="" />
    </td>
    <td>
      <Link
        className="table-link"
        to={`/plugins/xformation-petclinic-panel/page/student?id=${student.id}`}
      >
        {student.studentName}
      </Link>
    </td>
    <td>{student.rollNo}</td>
    <td>{student.id}</td>
    <td>{student.department.name}</td>
    <td>{student.batch.batch}</td>
    <td>{student.section.section}</td>
    <td>{student.sex}</td>
    <td>{student.studentType}</td>
    <td>{student.contactNo}</td>
  </tr>
);

const StudentsTable = ({ students }: { students: StudentSummaryFragment[] }) => (
  <div>
    <div className="student-flex">
      <div>
        <label htmlFor="">Department</label>
        <select>
          <option value="">Computer Science</option>
          <option value="">Electric Engineering</option>
          <option value="">Petroleum Engineering</option>
          <option value="">Electronic Engineering</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Year</label>
        <select>
          <option value="">First Year</option>
          <option value="">Second Year</option>
          <option value="">Third Year</option>
          <option value="">Fourth Year</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Section</label>
        <select>
          <option value="">A</option>
          <option value="">B</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Branch</label>
        <select>
          <option value="">Hyderabad</option>
          <option value="">Secunderabad</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Gender</label>
        <select>
          <option value="">Male</option>
          <option value="">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Student Type</label>
        <select>
          <option value="">Scholarship</option>
          <option value="">Management</option>
        </select>
      </div>
      <div className="margin-bott">
        <label htmlFor="">Search</label>
        <input type="search" name="" id="" />
      </div>
    </div>

    <table id="studentlistpage" className="striped-table fwidth bg-white">
      <thead>
        <tr>
          <th>
            <input type="checkbox" name="" id="" />
          </th>
          <th>Student Name</th>
          <th>Roll No</th>
          <th>Student Id</th>
          <th>Department</th>
          <th>Year</th>
          <th>Section</th>
          <th>Gender</th>
          <th>Type</th>
          <th>Primary Contact</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => <StudentRow key={student.id} student={student} />)}
      </tbody>
    </table>
  </div>
);

type StudentListPageOwnProps = RouteComponentProps<{}>;
type StudentListPageProps = {
  data: QueryProps & StudentListQuery;
};

const StudentListPage = ({ data: { students } }: StudentListPageProps) => (
  <section className="feeInvoice">
    <h1 className="bg-heading p-1">Admin-Fee Management</h1>
    <h2 className="bg-heading p-1">Invoices</h2>
    <div className="b-1 p-2">
      <div className="inDashboard p-1">
        <div className="invoiceDashboard">
          <div className="invoiceHeader">
            <h6>Invoice Count</h6>
            <a href=""><span className="ti-close m-r-1"></span></a>
            <a href=""><span className="ti-download"></span></a>
          </div>
          <h2 className="fee-blue"><strong>200</strong></h2>
        </div>
        <div className="invoiceDashboard">
          <div className="invoiceHeader">
            <h6>Paid Invoice</h6>
            <a href=""><span className="ti-close m-r-1"></span></a>
            <a href=""><span className="ti-download"></span></a>
          </div><h2 className="fee-green"> <strong>75</strong></h2></div>
        <div className="invoiceDashboard"><div className="invoiceHeader">
          <h6>Unpaid Invoice</h6>
          <a href=""><span className="ti-close m-r-1 "></span></a>
          <a href=""><span className="ti-download"></span></a>
        </div>
          <h2 className="fee-orange"><strong>20</strong></h2>
          <h6 className="center btn btn-primary w50 p05 remainder">Send Remainder</h6>
        </div>
        <div className="invoiceDashboard">
          <div className="invoiceHeader">
            <h6>Cancelled Invoice</h6>
            <a href=""><span className="ti-close m-r-1"></span></a>
            <a href=""><span className="ti-download"></span></a>
          </div>
          <h2 className="fee-red"><strong>5</strong></h2>
          <h6 className="btn btn-primary w50 p05 remainder">Send Remainder</h6>
        </div>
      </div>
      <hr className="hr-top" />
      <div className="b-1">
        <h5 className="h5-fee-bg p-1">Search Invoice</h5>
        <div className="belowDashboard m-1">
          <div className="searchInvoice ">
            <input type="text" placeholder="Invoice Number" />
            <input type="text" placeholder="Student Id" />
            <select name="" id="">
              <option value="Common">Common</option>
            </select>
          </div>
          <div className="searchInvoiceButton">
            <a href="" className="btn btn-primary m-r-1">Search</a>
            <a href="" className="btn btn-primary m-r-1">Export</a>
            <a href="" className="btn btn-primary m-r-1">Print</a>
          </div>
        </div>
        <div>
          <h2 className="p-2">Invoice Details</h2>
          <div className="invoiceDetails b-1 p-2">
            <div>
              <label htmlFor="">Student Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="">Recipient</label>
              <input type="text" placeholder="Anne Hathway" />
            </div>
            <div>
              <label htmlFor="">Fee Category</label>
              <input type="text" placeholder="Exam Fees" />
            </div>
            <div>
              <label htmlFor="">Amount</label>
              <input type="text" placeholder="16.500" />
            </div>
            <div>
              <label htmlFor="">Date</label>
              <input type="date" value="14 Feb 2019" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
