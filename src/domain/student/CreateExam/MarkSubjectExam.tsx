import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
// import * as AddExamMutationGql from './AddExamMutation.graphql';
import * as LibraryAddMutation from './LibraryAddMutation.graphql';
import { LoadExamSubjQueryCacheForAdmin,AddExamMutation, LibraryAddMutationType } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import "react-datepicker/dist/react-datepicker.css";


const w180 = {
  width: '180px'
};

interface type {
  checked: boolean;
}

type LibraryRootProps = RouteComponentProps<{
  academicYearId: string;
  collegeId: string;
}> & {
  data: QueryProps & LoadExamSubjQueryCacheForAdmin;
};

type LibraryPageProps = LibraryRootProps & {
  addLibraryMutation: MutationFunc<LibraryAddMutationType>;
  // mutate: MutationFunc<AddExamMutation>;
};

type LibraryState = {
  libraryData: any,
  branches: any,
  academicYears: any,
  departments: any,
  batches: any,
  subjects: any,
  submitted: any,
  add: any,
  update: any
};

class SaData {
  bookTitle: any;
  author: any;
  noOfCopies: any;
  bookNo: any;
  additionalInfo: any;
  uniqueNo: any;
  academicyearId: any;
  subjectId: any;
  departmentId: any;
  batchId: any;
  branchId: any;
  constructor(bookTitle: any, author: any, noOfCopies: any, bookNo: any, additionalInfo: any, uniqueNo: any,  academicyearId: any, subjectId: any, departmentId: any, batchId: any,  branchId: any) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.noOfCopies = noOfCopies
    this.bookNo = bookNo;
    this.additionalInfo = additionalInfo;
    this.uniqueNo = uniqueNo;
    this.academicyearId = academicyearId;
    this.subjectId = subjectId;;
    this.departmentId = departmentId;
    this.batchId = batchId;
    this.branchId = branchId;
   
  }
}

class MarkExam extends React.Component<LibraryPageProps, LibraryState>{
  constructor(props: any) {
    super(props);
    this.state = {
      libraryData: {
        bookTitle: "",
        author: "",
        branch: {
          id: 1851   
          //1851 1001
        },
        academicYear: {
          id: 1701           
          //1701 1051
        },
        department: {
          id: 1901
        },
        batch: {
          id: ""
        },
       
        subject: {
          id: ""
        },
       
        mutateResult: [],
        filtered: [],
        selectedIds: "",
        payLoad: [],
        textValueMap: {},
        exmcountvalues: {},
      },
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      subjects: [],
      submitted: false,
      add: false,
      update: false
    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    // this.createGrid = this.createGrid.bind(this);
    this.savelibrary = this.savelibrary.bind(this); 
  }

  

  createDepartments(departments: any, selectedBranchId: any) {
    let departmentsOptions = [<option key={0} value="">Select Department</option>];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id) {
        departmentsOptions.push(
          <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
        );
      }
    }
    return departmentsOptions;
  }

  createBranches(branches: any) {
    let branchesOptions = [<option key={0} value="">Select Branch</option>];
    for (let i = 0; i < branches.length; i++) {
      branchesOptions.push(
        <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
      );
    }
    return branchesOptions;
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = "" + batches[i].department.id;
      if (dptId == selectedDepartmentId) {
        batchesOptions.push(
          <option key={id} value={id}>{batches[i].batch}</option>
        );
      }
    }
    return batchesOptions;
  }

  createSubjects(subjects: any, selectedDepartmentId: any, selectedBatchId: any) {
    let subjectsOptions = [<option key={0} value="">Select Subject</option>];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      if (subjects[i].department.id == selectedDepartmentId && subjects[i].batch.id == selectedBatchId) {
        subjectsOptions.push(
          <option key={id} value={id}>{subjects[i].subjectDesc}</option>
        );
      }
    }
    return subjectsOptions;
  }

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { libraryData } = this.state;
    e.preventDefault();
    
   

    if (libraryData.department.id && libraryData.batch.id) {
      e.target.querySelector("#detailGridTable").removeAttribute("class");
      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
    }
  }

  onChange = (e: any) => {
    const { id, name, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
    if (name === "department") {
      this.setState({
        libraryData: {
          ...libraryData,
          department: {
            id: value
          },
          batch: {
            id: ""
          },
          subject: {
            id: ""
          }          
        }
      });
    } else if (name === "batch") {
      this.setState({
        libraryData: {
          ...libraryData,
          batch: {
            id: value
          },
          subject: {
            id: ""
          },
         
        }
      });
    }else if (name === "subject") {
        this.setState({
          libraryData: {
            ...libraryData,
            subject: {
              ...this.createSubjects,
            }
          }
        });        
    }else {
      this.setState({
        libraryData: {
          ...libraryData,
          [name]: value
        }
      });
    }

  }

  

  

  
  savelibrary(e: any) {
    const { id, value } = e.nativeEvent.target;
    const { addLibraryMutation } = this.props;
    const { libraryData } = this.state;
    e.preventDefault();

//"subject"batch
    
    let txtBt: any = document.querySelector("#batch");
    if (txtBt.value.trim() === "") {
      alert("Please select Year");
      return;
    }
    let txtSb: any = document.querySelector("#subject");
    if (txtSb.value.trim() === "") {
      alert("Please select Subject");
      return;
    }
    let txtFcNm: any = document.querySelector("#bookTitle");
    if (txtFcNm.value.trim() === "") {
      alert("Please provide some value in Book Title");
      return;
    }
    let txtFcDs: any = document.querySelector("#author");
    if (txtFcDs.value.trim() === "") {
      alert("Please provide some value in Author");
      return;
    }
    let chkStatus: any = document.querySelector("#bookNo");
    if (chkStatus.value.trim() === "") {
      alert("Please provide some value in Book No");
      return;
    }
    let chkNoCopies: any = document.querySelector("#noOfCopies");
    if (chkNoCopies.value.trim() === "") {
      alert("Please provide some value in No Of Copies");
      return;
    }
    // let chkUnique: any = document.querySelector("#uniqueNo");
    // if (chkUnique.value.trim() === "") {
    //   alert("Please provide some value in ");
    //   return;
    // }   
    
    // bookTitle: any;
    // author: any;
    // noOfCopies: any;
    // bookNo: any;
    // additionalInfo: any;
    // uniqueNo: any;
    // academicyearId: any;
    // subjectId: any;
    // departmentId: any;
    // batchId: any;
    // branchId: any;
    let addLibraryInput = {
      bookTitle: libraryData.bookTitle,
      author: libraryData.author,
      noOfCopies: libraryData.noOfCopies,
      bookNo: libraryData.bookNo,
      additionalInfo: libraryData.additionalInfo,
      uniqueNo: libraryData.uniqueNo,
      subjectId: libraryData.subjectId,
      batchId:libraryData.batchId,
      // branchId: libraryData.branch.id,
    };
    console.log("form data : ", libraryData);
    return addLibraryMutation({
      variables: { input: addLibraryInput }
    }).then(data => {
      console.log('Add library ::::: ', data);
      alert("Library added successfully!");
      const sdt = data;
      libraryData.feeCategoryData = [];
      libraryData.feeCategoryData.push(sdt);
      // = data.data.addFeeCategory;
      this.setState({
        libraryData: libraryData
      });
      this.setState({
        add: true,
        update: false
      });

    }).catch((error: any) => {
      alert("Due to some error fee category could not be added");
      console.log('there was an error sending the add fee category mutation result', error);
      return Promise.reject(`Could not retrieve add fee category data: ${error}`);
    });
  
  }






  
  render() {
    const { data: { createExamFilterDataCache, refetch }, addLibraryMutation } = this.props;
    const { libraryData, departments, batches,subjects,  submitted } = this.state;

    return (
      <section className="plugin-bg-white">
      
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent" aria-hidden="true" />{' '}
          Admin - Library Management 
        </h3>
        
        <div id="saveFeeCatDiv" className="fee-flex">
            <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.savelibrary} style={{ width: '140px' }}>Add Library</button>
            </div>

        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>

                  {/* <th>Department</th> */}
                  <th>Year</th>
                  <th>Subject</th>
                   <th>Book Title</th>
                   <th>Author</th>
                  <th>Book No</th>
                  <th>No Of Copies</th>
                  <th>Unique No</th>
                  <th>Additional Info</th>                  
                </tr>
              </thead>
              <tbody>
                <tr>

                  {/* <td>
                    <select required name="department" id="department" onChange={this.onChange} value={libraryData.department.id} className="gf-form-input max-width-22">
                      {this.createDepartments(this.props.data.createExamFilterDataCache.departments, libraryData.branch.id)}
                    </select>
                  </td> */}

                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={libraryData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createExamFilterDataCache.batches, libraryData.department.id)}
                    </select>
                  </td>
               <td>
                <select required name={"subject"} id="subject"  onChange={this.onChange} value={libraryData.subject.id} className="gf-form-input max-width-22">
                  {this.createSubjects(this.props.data.createExamFilterDataCache.subjects, libraryData.department.id, libraryData.batch.id)}
                </select>
              </td>
              <td>
                  <input type="text" id={"bookTitle"} name={"bookTitle"} onChange={this.onChange}  className="fwidth" value={libraryData.bookTitle} />
              </td>
              <td>
                  <input type="text" id={"author"} name={"author"} onChange={this.onChange}  className="fwidth" value={libraryData.author} />
              </td>
              <td>
                  <input type="number" id={"bookNo"} name={"bookNo"} onChange={this.onChange}  className="fwidth" value={libraryData.bookNo}  />
              </td>
              <td>
                  <input type="number" id={"noOfCopies"} name={"noOfCopies"} onChange={this.onChange}  className="fwidth" value={libraryData.noOfCopies}  />
              </td>
              <td>
                  <input type="number" id={"uniqueNo"} name={"uniqueNo"} onChange={this.onChange}  className="fwidth" value={libraryData.uniqueNo}  />
              </td> 
              <td>
                  <input type="text" id={"additionalInfo"} name={"additionalInfo"} onChange={this.onChange}  className="fwidth" value={libraryData.additionalInfo}  />
              </td>     
              
                </tr>
              </tbody>
            </table>
 

            
          </form>
        </div>
      </section>
    );
  }

}
export default withExamSubjDataLoader(
  compose(   
   
    graphql<LibraryAddMutationType, LibraryRootProps>(LibraryAddMutation, {
      name: "addLibraryMutation",
    })
  )
    (MarkExam) as any
);