import * as React from 'react';
import * as _ from 'lodash';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';

import * as LibraryListQueryGql from './LibraryListQuery.graphql';
import { LoadLibraryQueryCacheForAdmin, LibraryListQuery, StudentFragment } from '../../types';
import '../../../css/dark.css';
import withStudentFilterDataCacheLoader from "./withStudentFilterDataCacheLoader";
// import { Pagination } from '../../../components/pagination/pagination';


const w180 = {
  width: '180px'
};

type LibraryRootProps = RouteComponentProps<{
  collegeId: string;
  academicYearId: string;
}> & {
    data: QueryProps & LoadLibraryQueryCacheForAdmin;
  }
type LibraryPageProps = LibraryRootProps & {
  mutate: MutationFunc<LibraryListQuery>;
};

type LibraryTableStates = {
  librays: any,
  libraryData: any,
  branches: any,
  departments: any,
  batches: any,
  sections: any,
  subjects: any,
  genders: any,
  pageSize: any,
  search: any
};

class Librarytable extends React.Component<LibraryPageProps, LibraryTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      librays: {},
      libraryData: {
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
        mutateResult: [],
        search: ""
      },
      branches: [],
      departments: [],
      batches: [],
      sections: [],
      subjects: [],
      genders: [],
      pageSize: 5,
      search: ''

    };
    this.createBranches = this.createBranches.bind(this);
    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    // this.createSections = this.createSections.bind(this);
    // this.createStudentTypes = this.createStudentTypes.bind(this);
    // this.createGenders = this.createGenders.bind(this);

    // this.checkAllStudents = this.checkAllStudents.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    // this.createStudentRows = this.createStudentRows.bind(this);
    // this.createNoRecordMessage = this.createNoRecordMessage.bind(this);
    // this.exportStudents = this.exportStudents.bind(this);
    // this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
    // this.download = this.download.bind(this);
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

  createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id && selectedAcademicYearId == departments[i].academicyear.id) {
        departmentsOptions.push(
          <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
        );
      }
    }
    return departmentsOptions;
  }
  

  createBatches(batches: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
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

  
  
  // checkAllStudents(e: any) {
  //   const { studentData } = this.state;
  //   const mutateResLength = studentData.mutateResult.length;
  //   let chkAll = e.nativeEvent.target.checked;
  //   let els = document.querySelectorAll("input[type=checkbox]");

  //   var empty = [].filter.call(els, function (el: any) {
  //     if (chkAll) {
  //       el.checked = true;
  //     } else {
  //       el.checked = false;
  //     }
  //   });
  // }

  onClickCheckbox(index: any, e: any) {
    // const { target } = e;
    const { id } = e.nativeEvent.target;
    let chkBox: any = document.querySelector("#" + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }
  // createNoRecordMessage(objAry: any) {
  //   const mutateResLength = objAry.length;
  //   const retVal = [];
  //   for (let x = 0; x < mutateResLength; x++) {
  //     const tempObj = objAry[x];
  //     const students = tempObj.data.getStudentList;
  //     const length = students.length;
  //     if (length === 0) {
  //       retVal.push(
  //         <h4 className="ptl-06">No Record Found</h4>
  //       );
  //     }
  //   }
  //   return retVal;
  // }

  // searchHandlers(e: any) {
  //   this.setState({ search: e.nativeEvent.target.value })
  // }

  // searchBar(objAry: any) {
  //   const { search } = this.state;
  //   const mutateResLength = objAry.length;
  //   const retVal = [];
  //   for (let x = 0; x < mutateResLength; x++) {
  //     const tempObj = objAry[x];
  //     const students = tempObj.data.getStudentList;
  //     const length = students.length;
  //     // for (let i = 0; i < length; i++) {
  //     //   const student = students[i];
  //     if (search !== "" && students.studentName.toLowerCase.indexOf(search.toLowerCase()) === -1) {
  //       return null
  //     }
  //     // }
  //   }
  // }

  createLibraryRows(objAry: any) {
    let { search } = this.state.libraryData;
    search = search.trim();
    const mutateResLength = objAry.length;
    const retVal = [];
    for (let x = 0; x < mutateResLength; x++) {
      const tempObj = objAry[x];
      const libraries = tempObj.data.getBookList;
      const length = libraries.length;
      for (let i = 0; i < length; i++) {
        const library = libraries[i];
        if(search){
          if(library.bookTitle.indexOf(search) !== -1 ){
            retVal.push(
              <tr key={library.id}>                
                <td>{library.bookTitle}</td>
                <td>{library.author}</td>
                <td>{library.noOfCopies}</td>
                <td>{library.bookNo}</td>
                <td>{library.additionalInfo}</td>
                <td>{library.uniqueNo}</td>
                <td>{library.batch.batch}</td>
                <td>{library.subject.subjectDesc}</td>
              </tr>
            );
          }
        else if(library.author.indexOf(search) !== -1 ){
          retVal.push(
            <tr key={library.id}>                
              <td>{library.bookTitle}</td>
              <td>{library.author}</td>
              <td>{library.noOfCopies}</td>
              <td>{library.bookNo}</td>
              <td>{library.additionalInfo}</td>
              <td>{library.uniqueNo}</td>
              <td>{library.batch.batch}</td>
              <td>{library.subject.subjectDesc}</td>
            </tr>
          );
        }} else{
          retVal.push(
            <tr key={library.id}>             
                <td>{library.bookTitle}</td>
                <td>{library.author}</td>
                <td>{library.noOfCopies}</td>
                <td>{library.bookNo}</td>
                <td>{library.additionalInfo}</td>
                <td>{library.uniqueNo}</td>
                <td>{library.batch.batch}</td>
                <td>{library.subject.subjectDesc}</td>
            </tr>
          );
        }
      }
    }

    return retVal;
  }

  // exportStudents(objAry: any) {
  //   const studentsToExport = [];
  //   const mutateResLength = objAry.length;
  //   let fileType: any = document.querySelector("#fileType");
  //   if (fileType.value == "") {
  //     alert("Please select a file type to export");
  //     return;
  //   }
  //   for (let x = 0; x < mutateResLength; x++) {
  //     const tempObj = objAry[x];
  //     const students = tempObj.data.getStudentList;
  //     const length = students.length;
  //     for (let i = 0; i < length; i++) {
  //       const student = students[i];
  //       let chkBox: any = document.querySelector("#chk" + student.id);
  //       if (chkBox.checked) {
  //         studentsToExport.push(student);
  //       }
  //     }
  //   }
  //   if (studentsToExport.length > 0) {
  //     var csvContent = this.convertArrayOfObjectsToCSV(studentsToExport);
  //     this.download(csvContent, "studentlist.csv", "text/csv;encoding:utf-8");
  //   } else {
  //     alert("Please select records to export");
  //   }
  // }

  // convertArrayOfObjectsToCSV(data: any) {
  //   var result: any, ctr: any, keys: any, columnDelimiter: any, lineDelimiter: any;

  //   data = data || null;
  //   if (data == null || !data.length) {
  //     return null;
  //   }

  //   columnDelimiter = ',';
  //   lineDelimiter = '\n';

  //   keys = Object.keys(data[0]);

  //   result = '';
  //   result += keys.join(columnDelimiter);
  //   result += lineDelimiter;

  //   data.forEach(function (item: any) {
  //     ctr = 0;
  //     keys.forEach(function (key: any) {
  //       if (ctr > 0) result += columnDelimiter;

  //       result += item[key];
  //       ctr++;
  //     });
  //     result += lineDelimiter;
  //   });

  //   return result;
  // }

  // download(content: any, fileName: any, mimeType: any) {
  //   var a = document.createElement('a');
  //   mimeType = mimeType || 'application/octet-stream';

  //   if (navigator.msSaveBlob) { // IE10
  //     navigator.msSaveBlob(new Blob([content], {
  //       type: mimeType
  //     }), fileName);
  //   } else if (URL && 'download' in a) { //html5 A[download]
  //     a.href = URL.createObjectURL(new Blob([content], {
  //       type: mimeType
  //     }));
  //     a.setAttribute('download', fileName);
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } else {
  //     location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  //   }
  // }


  onChange = (e: any) => {
    const { search } = e.nativeEvent.target;
    const { name, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
     if (name === "batch") {
      this.setState({
        libraryData: {
          ...libraryData,
          batch: {
            id: value
          },
          
          subejct: {
            id: ""
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
  // updateSearch = (e:any) => {
  //   this.setState({search: event.target.value.substr()});
  // }

  onClick = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { mutate } = this.props;
    const { libraryData } = this.state;
    e.preventDefault();

    let libraryFilterInputObject = {
      
      batchId: libraryData.batch.id,
      
      subjectId: libraryData.subject.id
    };


    return mutate({
      variables: { filter: libraryFilterInputObject },
    }).then(data => {
      const sdt = data;
      libraryData.mutateResult = [];
      libraryData.mutateResult.push(sdt);
      this.setState({
        libraryData: libraryData
      });
      console.log('Student filter mutation result ::::: ', libraryData.mutateResult);
    }).catch((error: any) => {
      console.log('there was an error sending the query result', error);
      return Promise.reject(`Could not retrieve student data: ${error}`);
    });

  }

  render() {
    const { data: { createLibraryFilterDataCache, refetch }, mutate } = this.props;
    const { libraryData } = this.state;
    // { studentData.filter((this.state.search)).map() }
    return (
      <section className="customCss">
        <h3 className="bg-heading-bgStudent p-1 mb-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Library Management
        </h3>
        <div className="container-fluid p-1 ">
          <div className="m-b-1 bg-heading-bgStudent studentListFlex">
            <div className="">
              <h4 className="ptl-06">Book Details</h4>
            </div>
            
          </div>

          <div>
            <div className="student-flex">
              
                <td>
                  <select required name="batch" id="batch" onChange={this.onChange} value={libraryData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createLibraryFilterDataCache.batches)}
                    </select>
                  </td>
                  <td>
                    <select required name={"subject"} id="subject" onChange={this.onChange} value={libraryData.subject.id} className="gf-form-input max-width-22">    {this.createSubjects(this.props.data.createLibraryFilterDataCache.subjects, libraryData.batch.id)}
                    </select>
                  </td>            
             
             
              <div className="margin-bott max-width-22">
                <label htmlFor="">Search</label>
                <input type="text" name="search" value={libraryData.search} onChange={this.onChange} />
              </div>
            </div>
            <div className="m-b-1 bg-heading-bg studentSearch">
              <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind" onClick={this.onClick} style={w180}>Search Book</button>
            </div>

            <table id="studentlistpage" className="striped-table fwidth bg-white">
              <thead>
                <tr>                  
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>No Of Copies</th>
                  <th>Book No</th>
                  <th>Additional Info</th>
                  <th>Unique No</th>
                  <th>Batch</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.createLibraryRows(this.state.libraryData.mutateResult)
                }
              </tbody>
            </table>
            {/* <Pagination /> */}
            {/* {
              this.createNoRecordMessage(this.state.libraryData.mutateResult)
            } */}
          </div>
        </div>
      </section>

    );
  }
}
export default withStudentFilterDataCacheLoader(

  compose(
    graphql<LibraryListQuery, LibraryRootProps>(LibraryListQueryGql, {
      name: "mutate"
    })

  )
    (Librarytable) as any
);