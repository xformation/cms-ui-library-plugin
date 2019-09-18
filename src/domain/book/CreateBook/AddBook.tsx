import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as LibraryAddMutation from './LibraryAddMutation.graphql';
import * as LibraryUpdateMutation from './LibraryUpdateMutation.graphql'
import { LoadLibraryQueryCacheForAdmin, LibraryAddMutationType, LibraryUpdateMutationType } from '../../types';
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
  data: QueryProps & LoadLibraryQueryCacheForAdmin;
};

type LibraryPageProps = LibraryRootProps & {
  addLibraryMutation: MutationFunc<LibraryAddMutationType>;
  updateLibraryMutation: MutationFunc<LibraryUpdateMutationType>;

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
        libraries: {
          id: ""
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
        librarysaveData: [],
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
    this.savelibrary = this.savelibrary.bind(this);
    this.createLibraryAddRow = this.createLibraryAddRow.bind(this);
    this.createLibraryUpdateRow = this.createLibraryUpdateRow.bind(this);
    this.editLibrary = this.editLibrary.bind(this);
    this.reset = this.reset.bind(this);
    this.updateLibrary = this.updateLibrary.bind(this);

  }

  createDepartments(departments: any) {
    let departmentsOptions = [<option key={0} value="">Select Department</option>];
    for (let i = 0; i < departments.length; i++) {
      departmentsOptions.push(
        <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
      );

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

  createBatches(batches: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = "" + batches[i].department.id;
      batchesOptions.push(
        <option key={id} value={id}>{batches[i].batch}</option>
      );
    }
    return batchesOptions;
  }

  createSubjects(subjects: any, selectedBatchId: any) {
    let subjectsOptions = [<option key={0} value="">Select Subject</option>];
    for (let i = 0; i < subjects.length; i++) {
      let id = subjects[i].id;
      let sbId = "" + subjects[i].batch.id;
      if (sbId == selectedBatchId) {
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
    } else if (name === "subject") {
      this.setState({
        libraryData: {
          ...libraryData,
          subject: {
            id: value
          }
        }
      });
    } else {
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


    let addLibraryInput = {
      bookTitle: libraryData.bookTitle,
      author: libraryData.author,
      noOfCopies: libraryData.noOfCopies,
      bookNo: libraryData.bookNo,
      additionalInfo: libraryData.additionalInfo,
      uniqueNo: libraryData.uniqueNo,
      subjectId: libraryData.subject.id,
      batchId: libraryData.batch.id
    };
    console.log("form data : ", libraryData);
    return addLibraryMutation({
      variables: { input: addLibraryInput }
    }).then(data => {
      console.log('Add library ::::: ', data);
      alert("Library added successfully!");
      const sdt = data;
      libraryData.librarysaveData = [];
      libraryData.librarysaveData.push(sdt);
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


  editLibrary(obj: any) {
    const { libraryData } = this.state;
    let txtCn: any = document.querySelector("#batch");
    let txtDs: any = document.querySelector("#subject");
    let chkSts: any = document.querySelector("#bookTitle");
    let dtPkSt: any = document.querySelector("#author");
    let bkNo: any = document.querySelector("#bookNo");
    let bkNc: any = document.querySelector("#noOfCopies");
    let adinf: any = document.querySelector("#additionalInfo");
    let unNo: any = document.querySelector('#uniqueNo');
    txtCn.value = obj.batch;
    txtDs.value = obj.subject;
    chkSts.value = obj.bookTitle;
    dtPkSt.value = obj.author;
    bkNo.value = obj.bookNo;
    bkNc.value = obj.noOfCopies;
    adinf.value = obj.additionalInfo;   
    unNo.value = obj.uniqueNo;
   
   
    libraryData.libraries.id = obj.id;
    libraryData.bookTitle = obj.bookTitle;
    libraryData.author = obj.author;
    libraryData.bookNo = obj.bookNo;
    libraryData.noOfCopies = obj.noOfCopies;
    libraryData.additionalInfo = obj.additionalInfo;
    libraryData.uniqueNo = obj.uniqueNo;
        
    this.setState({
     
      libraryData: libraryData
    });

  }

  reset() {
    const { libraryData } = this.state;
    let txtCn: any = document.querySelector("#batch");
    let txtDs: any = document.querySelector("#subject");
    let chkSts: any = document.querySelector("#bookTitle");
    let dtPkSt: any = document.querySelector("#author");
    let bkNo: any = document.querySelector("#bookNo");
    let bkNc: any = document.querySelector("#noOfCopies");
    let adinf: any = document.querySelector("#additionalInfo");
    let unNo: any = document.querySelector('#uniqueNo');
    txtCn.value = "";
    txtDs.value = "";
    chkSts.value = "";
    dtPkSt.value = "";
    bkNo.value = "";
    bkNc.value = "";
    adinf.value = "";
    unNo.value = "";
    libraryData.bookTitle = "";
    libraryData.bookNo = "";
    libraryData.author.id = "";
    libraryData.noOfCopies = "";
    libraryData.uniqueNo = "";
    libraryData.additionalInfo = "";
    libraryData.libraries.id = "";

    this.setState({
      libraryData: libraryData
    });
  }

  createLibraryAddRow(obj: any) {
    const retVal = [];   
    for (let x = 0; x < obj.length; x++) {
      let k = obj[x];
      retVal.push(
        <tr>
          <td>{k.batch.batch}</td>
          <td>{k.subject.subjectDesc}</td>
          <td>{k.bookTitle}</td>
          <td>{k.author}</td>
          <td>{k.bookNo}</td>
          <td>{k.noOfCopies}</td>
          <td>{k.uniqueNo}</td>
          <td>{k.additionalInfo}</td>
         <td>
            <button className="btn btn-primary" onClick={e => this.editLibrary(k)}>Edit</button>
          </td> 
        </tr>
      );
    }
    // }
    return retVal;
  }

 updateLibrary(obj: any) {
    const { updateLibraryMutation } = this.props;
    const { libraryData } = this.state;

    
    let txtFcNm: any = document.querySelector("#batch");
    if (txtFcNm.value.trim() === "") {
      alert("Please select Year");
      return;
    }
    let txtSb: any = document.querySelector("#subject");
    if (txtSb.value.trim() === "") {
      alert("Please select Subject");
      return;
    }
    let txtbcNm: any = document.querySelector("#bookTitle");
    if (txtbcNm.value.trim() === "") {
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

    let uniqueNo: any = document.querySelector("#uniqueNo");
    if (uniqueNo.value.trim() === "") {
      alert("Please provide some value in uniqueNo");
      return;
    }
    if (libraryData.libraries.id === "") {
      alert("This record has no id. It can be added as a new record.");
      return;
    }
    let updateLibraryInput = {
      id: libraryData.libraries.id,
      subjectId: libraryData.subject.id,
      batchId: libraryData.batch.id,
      bookTitle: libraryData.bookTitle,
      author: libraryData.author,
      bookNo: libraryData.bookNo,
      noOfCopies: libraryData.noOfCopies,
      additionalInfo: libraryData.additionalInfo,
      uniqueNo: libraryData.uniqueNo,

    };
    console.log("form data : ", libraryData);
    return updateLibraryMutation({
      variables: { input: updateLibraryInput }
    }).then(data => {
      console.log('update Library ::::: ', data);
      alert("Library updated successfully!");
      const sdt = data;
      libraryData.librarysaveData = [];
      libraryData.librarysaveData.push(sdt);
      this.setState({
        libraryData: libraryData
      });
      this.setState({
        add: false,
        update: true
      });
    }).catch((error: any) => {
      alert("Due to some error Library could not be updated");
      console.log('there was an error sending the update Library mutation result', error);
      return Promise.reject(`Could not retrieve update Library data: ${error}`);
    });
  }

  createLibraryUpdateRow(obj: any) {
    const { libraryData } = this.state;
    const len = obj.length;
    const retVal = [];
    let aryLength = 0;
    let v = obj[0];
    if (v.data.updateLibrary === undefined || v.data.updateLibrary === null) {
      return;
    }
    for (let x = 0; x < v.data.updateLibrary.length; x++) {
      let k = v.data.updateLibrary[x];
      retVal.push(
        <tr>
          <td>{k.id}</td>
          <td>{k.bookTitle}</td>
          <td>{k.author}</td>
          <td>{k.bookNo}</td>
          <td>{k.noOfCopies}</td>
          <td>{k.additionalInfo}</td>
          <td>{k.uniqueNo}</td>
        </tr>
      );
    }


    return retVal;
  }

  render() {
    const { data: { createLibraryFilterDataCache, refetch }, addLibraryMutation, updateLibraryMutation } = this.props;
    const { libraryData, departments, batches, subjects, submitted } = this.state;

    return (
      <section className="plugin-bg-white">

        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent" aria-hidden="true" />{' '}
          Admin - Library Management
          </h3>

        <div id="saveFeeCatDiv" className="fee-flex">
          <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.savelibrary} style={{ width: '140px' }}>Add Book</button>
          <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>
          <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.updateLibrary} style={{ width: '170px' }}>Update Book</button>
        </div>

        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>
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
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={libraryData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createLibraryFilterDataCache.batches)}
                    </select>
                  </td>
                  <td>
                    <select required name={"subject"} id="subject" onChange={this.onChange} value={libraryData.subject.id} className="gf-form-input max-width-22">    {this.createSubjects(this.props.data.createLibraryFilterDataCache.subjects, libraryData.batch.id)}
                    </select>
                  </td>

                  <td>
                    <input type="text" id={"bookTitle"} name={"bookTitle"} onChange={this.onChange} className="fwidth" value={libraryData.bookTitle} />
                  </td>

                  <td>
                    <input type="text" id={"author"} name={"author"} onChange={this.onChange} className="fwidth" value={libraryData.author} />
                  </td>

                  <td>
                    <input type="number" id={"bookNo"} name={"bookNo"} onChange={this.onChange} className="fwidth" value={libraryData.bookNo} />
                  </td>

                  <td>
                    <input type="number" id={"noOfCopies"} name={"noOfCopies"} onChange={this.onChange} className="fwidth" value={libraryData.noOfCopies} />
                  </td>

                  <td>
                    <input type="number" id={"uniqueNo"} name={"uniqueNo"} onChange={this.onChange} className="fwidth" value={libraryData.uniqueNo} />
                  </td>

                  <td>
                    <input type="text" id={"additionalInfo"} name={"additionalInfo"} onChange={this.onChange} className="fwidth" value={libraryData.additionalInfo} />
                  </td>

                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div id="feeCatagoryGrid" className="b-1">
          <table className="fwidth" id="feetable">
            <thead >
              <tr>
                  <th>Year</th>
                  <th>Subject</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Book No</th>
                  <th>No Of Copies</th>
                  <th>Unique No</th>
                  <th>Additional Info</th>
                  <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                // libraryData.librarysaveData.length > 0 && this.state.add === true && this.state.update === false && (
                  this.createLibraryAddRow(this.props.data.createLibraryFilterDataCache.libraries)
               // )
              }
              {
                libraryData.librarysaveData.length > 0 && this.state.add === false && this.state.update === true && (
                  this.createLibraryUpdateRow(libraryData.librarysaveData)
                )
              }
              {/* {
                feeSetupData.librarysaveData.length === 0 && this.state.add === false && this.state.update === false && (
                  this.createFeeCategoryRowFromCache(this.props.data.createFeeSetupDataCache.feeCategory)
                )
              } */}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

}
export default withExamSubjDataLoader(
  compose(

    graphql<LibraryAddMutationType, LibraryRootProps>(LibraryAddMutation, {
      name: "addLibraryMutation",
    }),
    graphql<LibraryUpdateMutationType, LibraryRootProps>(LibraryUpdateMutation, {
      name: "updateLibraryMutation"
    })
  )
    (MarkExam) as any
);