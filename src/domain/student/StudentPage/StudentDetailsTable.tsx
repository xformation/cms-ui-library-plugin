import * as React from 'react';
import {StudentFragment} from '../../types';

import {Link} from 'react-router-dom';

export default ({student}: {student: StudentFragment}) => (
  <section>
    <h2 className="heading">Student Information</h2>
    <section className="plugin-bg-white p-1">
      <h3 className="bg-heading p-1">
        <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
        Admin - Student Overview
      </h3>
      <div className="b-1 m-1">
        <div className="main-grid p-2">
          <div className="left-grid">
            <img src="/public/img/cubes.png" alt="" />
          </div>
          <div className="righ-grid">
            <div className="heading-flex">
              <h3>{student.studentName}</h3>
              <h5 className="hflex-h5">
                Contact No: <span>{student.contactNo}</span>
              </h5>
              <h5>
                Primary Contact No: <span>{student.studentContactNumber}</span>
              </h5>
            </div>
            <div className="next-div">
              <span>
                Admission No: <span>{student.admissionNo}</span>
              </span>
              <span>
                Roll No: <span>{student.rollNo}</span>
              </span>
              <span>
                Class: <span>{student.batch.batch}</span>
              </span>
              <span>
                Student Id: <span>{student.id}</span>
              </span>
              <span>
                Department: <span>{student.department.name}</span>
              </span>
              <span>
                Section: <span>{student.section.section}</span>
              </span>
            </div>
            <div className="buttons">
              <button className="btn btn-primary">Profile</button>
              <button disabled className="btn btn-disable">
                Details
              </button>
              <button disabled className="btn btn-disable">
                Academic
              </button>
              <button disabled className="btn btn-disable">
                Fee
              </button>
              <button disabled className="btn btn-disable">
                Reports
              </button>
              <button disabled className="btn btn-disable">
                ID Card
              </button>
              <button disabled className="btn btn-disable">
                Documents
              </button>
              <button disabled className="btn btn-disable">
                Transport
              </button>
            </div>
          </div>
        </div>
        <div className="main-details m-1 p-2 b-1">
          <div className="family-details">
            <h5>
              Fathers Name: <span>{student.fatherName}</span>
            </h5>
            <h5>
              Fathers Contact:<span>{student.contactNo}</span>
            </h5>
            <h5>
              Email Address:<span>{student.alternateEmailAddress}</span>
            </h5>
            <h5>
              Mothers Name: <span>{student.motherName}</span>
            </h5>
            <h5>
              Mothers Contact: <span>{student.alternateContactNumber}</span>
            </h5>
            <h5>
              Email Address: <span>{student.alternateEmailAddress}</span>
            </h5>
          </div>
          <div className="contact-details">
            <h5>
              Address Line 1: <span>{student.addressLineOne}</span>
            </h5>
            <h5>
              Address Line 2: <span>{student.addressLineTwo}</span>
            </h5>
            <h5>
              Town:<span>{student.town}</span>
            </h5>
            <h5>
              State: <span>{student.state}</span>
            </h5>
            <h5>
              Country: <span>{student.country}</span>
            </h5>
            <h5>
              Pin Code:<span>{student.pincode}</span>
            </h5>
          </div>
          <div className="id-details">
            <h5>
              Adhar No: <span>{student.aadharNo}</span>
            </h5>
            <h5>
              Date Of Birth: <span>{student.dateOfBirth}</span>
            </h5>
            <h5>
              Place Of Birth:<span>{student.placeOfBirth}</span>
            </h5>
            <h5>
              Religion: <span>{student.religion}</span>
            </h5>
            <h5>
              Cast: <span>{student.caste}</span>
            </h5>
            <h5>
              Sub Cast: <span>{student.subCaste}</span>
            </h5>
            <h5>
              Blood Group: <span>{student.bloodGroup}</span>
            </h5>
            <h5>
              Sex: <span>{student.sex}</span>
            </h5>
            <h5>
              Student Type: <span>{student.studentType}</span>
            </h5>
          </div>
        </div>
      </div>
    </section>
    <Link
      to={`/plugins/xformation-fee-panel/page/editstudent?id=${student.id}`}
      className="btn customButton"
    >
      <span />
      Edit Student
    </Link>
  </section>
);
