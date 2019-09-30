import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as LibraryAddMutation from './LibraryAddMutation.graphql';
import * as LibraryUpdateMutation from './LibraryUpdateMutation.graphql'
import * as BookAddMutation from './BookAddMutation.graphql'
import { LoadLibraryQueryCacheForAdmin, LibraryAddMutationType, LibraryUpdateMutationType, BookAddMutationType, LibraryListQuery } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import "react-datepicker/dist/react-datepicker.css";
import * as LibraryListQueryGql from './LibraryListQuery.graphql';



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
  addBook: MutationFunc<BookAddMutationType>;
  mutate: MutationFunc<LibraryListQuery>;

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
  toggle: any,
  update: any,
  countParticularDiv: any,
  count: any,
  search: any
};

class SaData {

  issueDate: any;
  dueDate: any;
  receivedDate: any;
  noOfCopiesAvailable: any;
  status: any;
  studentId: any;
  libraryId: any;
  constructor(issueDate: any, dueDate: any, receivedDate: any, noOfCopiesAvailable: any, status: any, studentId: any, libraryId: any) {
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.receivedDate = receivedDate;
    this.noOfCopiesAvailable = noOfCopiesAvailable;
    this.status = status;
    this.studentId = studentId;
    this.libraryId = libraryId;
      
  }
}

class AddBook extends React.Component<LibraryPageProps, LibraryState>{
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
        bookissuedate: {},
        rDate:{},
        isDate: {},
        dDate: {},
        payLoad: [],
        mutateResult: [],
        search: ""
      },
        branches: [],
        academicYears: [],
        departments: [],
        batches: [],
        subjects: [],
        countParticularDiv: 0,
        count: [],
        submitted: false,
        add: false,
        update: false,
        toggle: [],
        search: ''
      
    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.savelibrary = this.savelibrary.bind(this);
    // this.createLibraryAddRow = this.createLibraryAddRow.bind(this);
    this.createLibraryRows = this.createLibraryRows.bind(this)
    this.createLibraryUpdateRow = this.createLibraryUpdateRow.bind(this);
    this.editLibrary = this.editLibrary.bind(this);
    this.reset = this.reset.bind(this);
    this.updateLibrary = this.updateLibrary.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.back = this.back.bind(this);
    this.createParticularDiv = this.createParticularDiv.bind(this);
    this.handleRecDateTimeChange =this.handleRecDateTimeChange.bind(this);
    this.handleduedateTimeChange = this.handleduedateTimeChange.bind(this);
    this.handleissuedateTimeChange = this.handleissuedateTimeChange.bind(this);
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


    if (libraryData.student.id) {
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

  // createLibraryAddRow(obj: any) {
  //   const retVal = [];   
  //   for (let x = 0; x < obj.length; x++) {
  //     let k = obj[x];
  //     retVal.push(
  //       <tr>
  //         <td>{k.batch.batch}</td>
  //         <td>{k.subject.subjectDesc}</td>
  //         <td>{k.bookTitle}</td>
  //         <td>{k.author}</td>
  //         <td>{k.bookNo}</td>
  //         <td>{k.noOfCopies}</td>
  //         <td>{k.uniqueNo}</td>
  //         <td>{k.additionalInfo}</td>
  //        <td>
  //           <button className="btn btn-primary" onClick={e => this.editLibrary(k)}>Edit</button>
  //         </td> 
  //         <td>
  //           <button className="btn btn-primary" onClick={e => this.showDetail(e, k)}>Details</button>
  //         </td>
  //       </tr>
  //     );
  //   }
  //   // }
  //   return retVal;
  // }

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

  showDetail(e: any, obj: any) {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });
    let fCatGrid: any = document.querySelector("#listGrid");
    fCatGrid.setAttribute("class", "hide");

    let fCatDtDiv: any = document.querySelector("#feeCatDetailDiv");
    fCatDtDiv.setAttribute("class", "b-1");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "hide");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "");
    this.editLibrary(obj);
    this.showParticularDiv(e);

  }
  toggleApplicableTo = (i: any, e: any) => {
    let { toggle } = this.state;
    toggle[i] = !toggle[i];
    this.setState({
      toggle
    });
  }

  showParticularDiv = (e: any) => {
    let { count } = this.state;
    count[this.state.countParticularDiv] = 0;
    this.setState({
      countParticularDiv: this.state.countParticularDiv + 1,
      count
    });
    let dvPrt: any = document.querySelectorAll("#feeParticularDiv");
    for (let i = 0; i < dvPrt.length; i++) {
      // let dvPrt : any = document.querySelector("#feeParticularDiv"+i);
      dvPrt[i].setAttribute("class", "feeDetails");
    }
    // for(let i = 0; i < this.state.countParticularDiv; i++){
    //   let dvPrt : any = document.querySelector("#feeParticularDiv"+i);
    //   dvPrt.setAttribute("class", "feeDetails");
    // }

  }

  back() {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });
    let fCatGrid: any = document.querySelector("#listGrid");
    fCatGrid.setAttribute("class", "b-1");

    let fCatDtDiv: any = document.querySelector("#feeCatDetailDiv");
    fCatDtDiv.setAttribute("class", "hide");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "fee-flex");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "hide");
  }

  createParticularDiv() {
    const { libraryData } = this.state;
    const retVal = [];

    for (let i = 1; i < libraryData.noOfCopies; i++) {
      retVal.push(
        <tbody>
          <tr>
          <td>
              <input type="number" id={"author" + i} name="id" value={i} className="w-100"  onChange={this.onChange} ></input>
            </td>
            {/* <td>
              <input type="text" id={"author" + i} name="author" value={libraryData.author} onChange={this.onChange} ></input>
            </td> */}
            <td>
              <input type="date" className="gf-form-input w-135" id={"issueDate" + i} name="issueDate" value={libraryData.issueDate} onChange={this.handleissuedateTimeChange} ></input>
            </td>
            <td>
              <input type="date" className="gf-form-input w-135" id={"dueDate" + i} name="dueDate" value={libraryData.dueDate}  onChange={this.handleduedateTimeChange} ></input>
            </td>
            <td>
              <input type="number" className="gf-form-input w-100" id={"sid" + i} name="sid"  onChange={this.onChange} ></input>
            </td>
            <td>
              <input type="text" id={"sname" + i} name="sname"  onChange={this.onChange} ></input>
            </td>             
            <td>
              <input type="date" className="gf-form-input w-135" id={"recDate" + i} name="recDate" value={libraryData.receivedDate} onChange={this.handleRecDateTimeChange} ></input>
            </td>
            <td>
              <input type="text" id={"status" + i} name="status" value={libraryData.status} onChange={this.onChange} ></input>
            </td>
            <td>
              <button>Assign to</button>
            </td>
          </tr>
        </tbody>
      );
    }
    return retVal;
  }

  handleissuedateTimeChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
    libraryData.isDate[id] = value;
    this.setState({ libraryData: libraryData })
  }

  handleduedateTimeChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
    libraryData.dDate[id] = value;
    this.setState({ libraryData: libraryData })
  }

  handleRecDateTimeChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
    libraryData.rDate[id] = value;
    this.setState({ libraryData: libraryData })
  }


  
  applyChange = (e: any) => {
   
    const { addBook } = this.props;
    const { libraryData } = this.state;
    e.preventDefault();
    
    for (let i = 0; i < libraryData.noOfCopies; i++) {
      let exdt: any = document.querySelector("#issueDate" + i);
      if (libraryData.isDate[exdt.id] === undefined || libraryData.isDate[exdt.id] === null || libraryData.isDate[exdt.id] === "") {
        alert("Please select an issue date");

        return;
      }
    }
    for (let i = 0; i < libraryData.noOfCopies; i++) {
      let exdt: any = document.querySelector("#dueDate" + i);
      if (libraryData.dDate[exdt.id] === undefined || libraryData.dDate[exdt.id] === null || libraryData.dDate[exdt.id] === "") {
        alert("Please select an due date");

        return;
      }
    }
    for (let i = 0; i < libraryData.noOfCopies; i++) {
      let exdt: any = document.querySelector("#recDate" + i);
      if (libraryData.rDate[exdt.id] === undefined || libraryData.rDate[exdt.id] === null || libraryData.rDate[exdt.id] === "") {
        alert("Please select an recieve date");

        return;
      }
    }
   this.setState({ libraryData: libraryData })
   for (let i = 0; i < libraryData.noOfCopies; i++) {
     let sd = new SaData(libraryData.isDate["issueDate" + i], libraryData.dDate["dueDate"+ i],libraryData.rDate["recDate"+ i],3,"AVAILABLE","2398","1622");
   
    libraryData.payLoad.push(sd);
  }
 
  console.log('total IDS : ', libraryData.selectedIds);
  let btn : any = document.querySelector("#btnSave");
  btn.setAttribute("disabled", true);
  return addBook({
    variables: { input: libraryData.payLoad },
  }).then(data => {
    btn.removeAttribute("disabled");
    console.log('Saved Result: ', data.data.addBook);
    alert("Added Succesfully");
  }).catch((error: any) => {
    btn.removeAttribute("disabled");
    console.log('there is some error ', error);
    return Promise.reject(`there is some error while updating : ${error}`);
  });
  } 


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
                {/* <td>{library.batch.batch}</td>
                <td>{library.subject.subjectDesc}</td> */}
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
    const { data: { createLibraryFilterDataCache, refetch }, mutate, addBook, addLibraryMutation, updateLibraryMutation } = this.props;
    const { libraryData, departments, batches, subjects, submitted } = this.state;

    return (
      <section className="plugin-bg-white">

        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent" aria-hidden="true" />{' '}
          Admin - Library Management
          </h3>
        <div className="stroke-transparent mr-1">&nbsp;</div>
        <div id="headerRowDiv" className="b-1 h5-fee-bg j-between">
        <div className="m-1">Create Books</div>
          <div id="saveFeeCatDiv" className="fee-flex">
            <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.savelibrary} style={{ width: '140px' }}>Add Book</button>
            <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>
            <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.updateLibrary} style={{ width: '170px' }}>Update Book</button>
          </div>
          <div id="backDiv" className="hide">
              <button className="btn btn-primary mr-1" id="btnBack" name="btnBack" onClick={this.back} style={{ padding: "13px" }}>Back</button>
             <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.applyChange}>Save</button>
          </div>
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
        <div className="student-flex">          
               
            <select required name="batch" id="batch" onChange={this.onChange} value=  {libraryData.batch.id} className="gf-form-input max-width-22">
                        {this.createBatches(this.props.data.createLibraryFilterDataCache.batches)}
            </select>
            <select required name={"subject"} id="subject" onChange={this.onChange} value=    {libraryData.subject.id} className="gf-form-input max-width-22">                {this.createSubjects(this.props.data.createLibraryFilterDataCache.subjects, libraryData.batch.id)}
            </select>    
            <div className="margin-bott max-width-22">
                  <label htmlFor="">Search</label>
                  <input type="text" name="search" value={libraryData.search} onChange={this.onChange} />
          </div>
      </div>
        <div className="m-b-1 bg-heading-bg studentSearch">
              <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind" onClick={this.onClick} style={w180}>Search Book</button>
        </div>
        <div id="listGrid" className="b-1">
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
                  <th>Details</th>
              </tr>
            </thead>
            <tbody>           
                {
                  this.createLibraryRows(this.state.libraryData.mutateResult)
                }             
              {/* {
               
                  this.createLibraryAddRow(this.props.data.createLibraryFilterDataCache.libraries)
              
              } */}
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
        <div id="feeCatDetailDiv" className="hide">
            <table className="fwidth">
              <thead >
                <tr>
                  <th>Book No</th>
                  <th>Isue Date</th>
                  <th>Due Date</th>
                  <th>Student Id</th>
                  <th>Student Name</th>
                  <th>Recieved Date</th>
                  <th>Status</th>
                  <th>Assigned to</th>
                </tr>
              </thead>
              {this.createParticularDiv()}
            </table>
          </div>
        {/* <div id="feeCatDetailDiv" className="hide">
          {
            this.createParticularDiv()
          }
        </div> */}
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
    }),
    graphql<BookAddMutationType, LibraryRootProps>(BookAddMutation, {
      name: "addBook",
    }),
    graphql<LibraryListQuery, LibraryRootProps>(LibraryListQueryGql, {
      name: "mutate"
    })
  )
    (AddBook) as any
);