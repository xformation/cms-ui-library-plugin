import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as LibraryAddMutation from './LibraryAddMutation.graphql';
import * as LibraryUpdateMutation from './LibraryUpdateMutation.graphql';
import * as BookAddMutation from './BookAddMutation.graphql';
import * as BookUpdateMutation from './BookUpdateMutation.graphql';
import { LoadLibraryQueryCacheForAdmin, LibraryAddMutationType, LibraryUpdateMutationType, BookAddMutationType, LibraryListQuery, BookListQuery, BookUpdateMutationType } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import "react-datepicker/dist/react-datepicker.css";
import * as LibraryListQueryGql from './LibraryListQuery.graphql';
import * as BookListQueryGql from './BookListQuery.graphql';
import DatePicker from 'react-datepicker';
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
  addBookMutation: MutationFunc<BookAddMutationType>;
  mutate: MutationFunc<LibraryListQuery>;
  mutatebook: MutationFunc<BookListQuery>;
  updateBookMutation: MutationFunc<BookUpdateMutationType>;

};

type LibraryState = {
  libraryData: any,
  branches: any,
  academicYears: any,
  departments: any,
  batches: any,
  subjects: any,
  sections: any
  students: any,
  books: any;
  submitted: any,
  add: any,
  toggle: any,
  update: any,
  countParticularDiv: any,
  count: any,
  search: any,
  dueDate: any,
  receivedDate: any,
  issueDate: any,
  studentId  : any,
  status: any,
  num: any,
  noOfCopiesAvailable: number,
};

class SaData {

  // issueDate: any;
  //   dueDate: any;
  receivedDate: any;
  noOfCopiesAvailable: any;
  status: any;
  studentId: any;
  libraryId: any;
  constructor(receivedDate: any, noOfCopiesAvailable: any, status: any, studentId: any, libraryId: any) {
    // issueDate: any, dueDate: any,receivedDate: any,
    // this.issueDate = issueDate;
    // this.dueDate = dueDate;
    this.receivedDate = receivedDate
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
      noOfCopiesAvailable: 0,
      num: 0,
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
        books: {
          id: ""
        },
        academicYear: {
          id: 1701
          //1701 1051
        },

        department: {
          id: ""
        },
        batch: {
          id: ""
        },

        subject: {
          id: ""
        },
        student: {
          id: ""
        },
        section: {
          id: ""
        },
        librarysaveData: [],
        bookissuedate: {},
        rDate: {},
        isDate: {},
        dDate: {},
        payLoad: [],
        mutateResult: [],
        search: "",
        selectedIds: "",
        textValueMap: {}
      },
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      subjects: [],
      sections: [],
      students: [],
      books: [],
      countParticularDiv: 0,
      count: [],
      submitted: false,
      add: false,
      update: false,
      toggle: [],
      dueDate: "",
      receivedDate: "",
      issueDate: "",
      studentId: "",
      status: "",
      search: ''


    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.savelibrary = this.savelibrary.bind(this);
    this.savebook = this.savebook.bind(this);
    // this.updateBook = this.updateBook.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createStudents = this.createStudents.bind(this);
    // this.isDatesOverlap = this.isDatesOverlap.bind(this);
    this.createLibraryRows = this.createLibraryRows.bind(this)
    this.createLibraryUpdateRow = this.createLibraryUpdateRow.bind(this);
    // this.createBookUpdateRow = this.createBookUpdateRow.bind(this);
    this.editLibrary = this.editLibrary.bind(this);
    this.reset = this.reset.bind(this);
    this.updateLibrary = this.updateLibrary.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.back = this.back.bind(this);
    this.create = this.create.bind(this);
    // this.onSubChange = this.onSubChange.bind(this);
    // this.createParticularDiv = this.createParticularDiv.bind(this);
    // this.handlereceivedDateTimeChange =this.handlereceivedDateTimeChange.bind(this);
    // this.handleduedateTimeChange = this.handleduedateTimeChange.bind(this);
    // this.handleissuedateTimeChange = this.handleissuedateTimeChange.bind(this);
    this.assigntobutton = this.assigntobutton.bind(this);
    this.changeDueDate = this.changeDueDate.bind(this);
    this.changeIssueDate = this.changeIssueDate.bind(this);
    this.changereceivedDate = this.changereceivedDate.bind(this);
    // this.createBookRows = this.createBookRows.bind(this);
    this.createBookAddRow = this.createBookAddRow.bind(this);
    this.updateSubBook = this.updateSubBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.etBook = this.etBook.bind(this);
    this.handleChangenum = this.handleChangenum.bind(this);
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


  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = "" + sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }

  createStudents(students: any, selectedBatchId: any, selectedDepartmentId: any, selectedSectionId: any) {
    let studentsOptions = [<option key={0} value="">Select Student</option>];
    for (let i = 0; i < students.length; i++) {
      let id = students[i].id;
      let sbId = "" + students[i].batch.id;
      if (students[i].department.id == selectedDepartmentId && students[i].batch.id == selectedBatchId && students[i].section.id == selectedSectionId) {
        studentsOptions.push(
          <option key={id} value={id}>{students[i].id +"--"+ students[i].studentName}</option>
        );
      }

    }
    return studentsOptions;
  }


  handleChangenum = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { libraryData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();

    libraryData.textValueMap[id] = libraryData.num;

    this.setState({ libraryData: libraryData })

  }



  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { libraryData } = this.state;
    e.preventDefault();


    if (libraryData.student.id) {
      e.target.querySelector("#feeCatDetailDiv").removeAttribute("class");
      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
    }
  }

  onBookSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { libraryData } = this.state;
    e.preventDefault();

    // if (this.state.noOfCopiesAvailable === 0) {
    //   alert("Please select no of exams");
    //   return;
    // }

    if (libraryData.noOfCopiesAvailable) {
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

  onSubChange = (e: any) => {
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
          section: {
            id: ""
          },
          student: {
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
          section: {
            id: ""
          },
          student: {
            id: ""
          }

        }
      });
    } else if (name === "section") {
      this.setState({
        libraryData: {
          ...libraryData,
          section: {
            id: value
          },
          student: {
            id: ""
          }
        }
      });
    } else if (name === "student") {
      this.setState({
        libraryData: {
          ...libraryData,
          student: {
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
    // let chkNoCopies: any = document.querySelector("#noOfCopies");
    // if (chkNoCopies.value.trim() === "") {
    //   alert("Please provide some value in No Of Copies");
    //   return;
    // }


    let addLibraryInput = {
      bookTitle: libraryData.bookTitle,
      author: libraryData.author,
      noOfCopies: 1,
      bookNo: libraryData.bookNo,
      additionalInfo: libraryData.additionalInfo,
      uniqueNo: 11,
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

      let txtCn: any = document.querySelector("#batch");
      let txtDs: any = document.querySelector("#subject");
      let chkSts: any = document.querySelector("#bookTitle");
      let dtPkSt: any = document.querySelector("#author");
      let bkNo: any = document.querySelector("#bookNo");
      // let bkNc: any = document.querySelector("#noOfCopies");
      let adinf: any = document.querySelector("#additionalInfo");

      txtCn.value = "";
      txtDs.value = "";
      chkSts.value = "";
      dtPkSt.value = "";
      bkNo.value = "";
      // bkNc.value = "";
      adinf.value = "";

    libraryData.bookTitle = "";
    libraryData.bookNo = "";
    libraryData.author = "";
    libraryData.noOfCopies = "";
    libraryData.uniqueNo = "";
    libraryData.additionalInfo = "";
    libraryData.batch.id = "";
    libraryData.subject.id = "";

      this.setState({
        libraryData: libraryData
      });
      this.setState({
        add: true,
        update: false
      });

    }).catch((error: any) => {
      alert("Due to some error Library could not be added");
      console.log('there was an error sending the add Library mutation result', error);
      return Promise.reject(`Could not retrieve add Library data: ${error}`);
    });

  }


  savebook = (e: any) => {

    const { id, value } = e.nativeEvent.target;
    const { addBookMutation } = this.props;
    const { libraryData } = this.state;
    e.preventDefault();



    let newDate = new Date();
    // let date = newDate.getDate();

    for (let i = 1; i <= this.state.noOfCopiesAvailable; i++) {
      let sd = new SaData(

        newDate,
        0,
        "AVAILABLE",
        2051,
        libraryData.libraries.id,

      );
      libraryData.payLoad.push(sd);
    }

    this.setState({ libraryData: libraryData })

    console.log('total IDS : ', libraryData.selectedIds);
    // let btn : any = document.querySelector("#btnSave");
    // btn.setAttribute("disabled", true);
    return addBookMutation({
      variables: { input: libraryData.payLoad },
    }).then(data => {
      // btn.removeAttribute("disabled");
      console.log('Saved Result: ', data.data.addBook);
      alert("Added Succesfully");
    }).catch((error: any) => {
      // btn.removeAttribute("disabled");
      console.log('there is some error ', error);
      return Promise.reject(`there is some error while updating : ${error}`);
    });
  }




  editLibrary(obj: any) {
    const { libraryData } = this.state;

    let crdiv: any = document.querySelector("#t-main");
    crdiv.setAttribute("class", "m-1");

    let moddv: any = document.querySelector("#modifyDiv");
    moddv.setAttribute("class", "b-1 m-1");

    let upFeeCatDiv: any = document.querySelector("#upFeeCatDiv");
    upFeeCatDiv.setAttribute("class", "");

    let crCatDiv: any = document.querySelector("#crmainDiv");
    crCatDiv.setAttribute("class", "hide");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "hide");

    let txtCn: any = document.querySelector("#batch");
    let txtDs: any = document.querySelector("#subject");
    let chkSts: any = document.querySelector("#bookTitle");
    let dtPkSt: any = document.querySelector("#author");
    let bkNo: any = document.querySelector("#bookNo");
    // let bkNc: any = document.querySelector("#noOfCopies");
    let adinf: any = document.querySelector("#additionalInfo");
    // let unNo: any = document.querySelector('#uniqueNo');
    txtCn.value = obj.batch.id;
    txtDs.value = obj.subject.id;
    chkSts.value = obj.bookTitle;
    dtPkSt.value = obj.author;
    bkNo.value = obj.bookNo;
    // bkNc.value = obj.noOfCopies;
    adinf.value = obj.additionalInfo;

    // unNo.value = obj.uniqueNo;


    libraryData.libraries.id = obj.id;
    libraryData.bookTitle = obj.bookTitle;
    libraryData.author = obj.author;
    libraryData.bookNo = obj.bookNo;
    // libraryData.noOfCopies = obj.noOfCopies;
    libraryData.additionalInfo = obj.additionalInfo;
    // libraryData.uniqueNo = obj.uniqueNo;
    
    libraryData.batch.id = obj.batch.id;
    libraryData.subject.id = obj.subject.id;

    

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
    // let bkNc: any = document.querySelector("#noOfCopies");
    let adinf: any = document.querySelector("#additionalInfo");
    // let unNo: any = document.querySelector('#uniqueNo');
    txtCn.value = "";
    txtDs.value = "";
    chkSts.value = "";
    dtPkSt.value = "";
    bkNo.value = "";
    // bkNc.value = "";
    adinf.value = "";
    // unNo.value = "";
    libraryData.bookTitle = "";
    libraryData.bookNo = "";
    libraryData.author = "";
    // libraryData.noOfCopies = "";
    libraryData.uniqueNo = "";
    libraryData.additionalInfo = "";
    libraryData.libraries.id = "";

    this.setState({
      libraryData: libraryData
    });
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
    // let chkNoCopies: any = document.querySelector("#noOfCopies");
    // if (chkNoCopies.value.trim() === "") {
    //   alert("Please provide some value in No Of Copies");
    //   return;
    // }

    // let uniqueNo: any = document.querySelector("#uniqueNo");
    // if (uniqueNo.value.trim() === "") {
    //   alert("Please provide some value in uniqueNo");
    //   return;
    // }
    if (libraryData.libraries.id === "") {
      alert("This record has no id. It can be added as a new record.");
      return;
    }
    let updateLibraryInput = {
      id: libraryData.libraries.id,
      batchId: libraryData.batch.id,
      subjectId: libraryData.subject.id,
      bookTitle: libraryData.bookTitle,
      author: libraryData.author,
      bookNo: libraryData.bookNo,
      noOfCopies: 1,
      additionalInfo: libraryData.additionalInfo,
      uniqueNo: 2,

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

      let txtCn: any = document.querySelector("#batch");
      let txtDs: any = document.querySelector("#subject");
      let chkSts: any = document.querySelector("#bookTitle");
      let dtPkSt: any = document.querySelector("#author");
      let bkNo: any = document.querySelector("#bookNo");
      // let bkNc: any = document.querySelector("#noOfCopies");
      let adinf: any = document.querySelector("#additionalInfo");

      txtCn.value = "";
      txtDs.value = "";
      chkSts.value = "";
      dtPkSt.value = "";
      bkNo.value = "";
      // bkNc.value = "";
      adinf.value = "";

    libraryData.bookTitle = "";
    libraryData.bookNo = "";
    libraryData.author = "";
    // libraryData.noOfCopies = "";
    libraryData.uniqueNo = "";
    libraryData.additionalInfo = "";
    libraryData.batch.id = "";
    libraryData.subject.id = "";
    
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
          {/* <td>{k.uniqueNo}</td> */}
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

    let fCatDtDiv: any = document.querySelector("#crmainDiv");
    fCatDtDiv.setAttribute("class", "hide");

    let fCatDiv: any = document.querySelector("#t-main");
    fCatDiv.setAttribute("class", "hide");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "hide");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "");
    //lll
    let sDiv: any = document.querySelector("#searchbutton");
    sDiv.setAttribute("class", "hide");

    let crdiv: any = document.querySelector("#t-main");
    crdiv.setAttribute("class", "hide");

    let stDiv: any = document.querySelector("#detailbox");
    stDiv.setAttribute("class", "b-1 m-1 p-1");

    let btsbDiv: any = document.querySelector("#btsbsearch");
    btsbDiv.setAttribute("class", "hide");

    let sboxDiv: any = document.querySelector("#searchbox");
    sboxDiv.setAttribute("class", "hide");

    let ddv: any = document.querySelector("#datediv");
    ddv.setAttribute("class", "hide");

    let moddv: any = document.querySelector("#modifyDiv");
    moddv.setAttribute("class", "b-1 m-1");

    let stb: any = document.querySelector("#studentsbutton");
    stb.setAttribute("class", "hide");

    let dt: any = document.querySelector("#smdt");
    dt.setAttribute("class", "lflex");

    let cpDiv: any = document.querySelector("#bookcopiesdiv");
    cpDiv.setAttribute("class", "m-1");

    let bl: any = document.querySelector("#booklist");
    bl.setAttribute("class", "");

    // let dt: any = document.querySelector("#bookTitle");
    // dt.setAttribute("disabled", true);

    // let dd: any = document.querySelector("#bookNo");
    // dd.setAttribute("disabled", true);

    // let si: any = document.querySelector("#noOfCopies");
    // si.setAttribute("disabled", true);

    // let sn: any = document.querySelector("#additionalInfo");
    // sn.setAttribute("disabled", true);

    // let rd: any = document.querySelector("#subject");
    // rd.setAttribute("disabled", true);

    // let ssn: any = document.querySelector("#batch");
    // ssn.setAttribute("disabled", true);

    // let rad: any = document.querySelector("#department");
    // rad.setAttribute("disabled", true);

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
      dvPrt[i].setAttribute("class", "feeDetails");
    }

    let crdiv: any = document.querySelector("#t-main");
    crdiv.setAttribute("class", "hide");

    let updiv: any = document.querySelector("#upFeeCatDiv");
    updiv.setAttribute("class", "hide");

    // for(let i = 0; i < this.state.countParticularDiv; i++){
    //   let dvPrt : any = document.querySelector("#feeParticularDiv"+i);
    //   dvPrt.setAttribute("class", "feeDetails");
    // }

  }
  create() {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });

    let fCatGrid: any = document.querySelector("#saveFeeCatDiv");
    fCatGrid.setAttribute("class", "");

    let upFeeCatDiv: any = document.querySelector("#upFeeCatDiv");
    upFeeCatDiv.setAttribute("class", "hide");

    let crdiv: any = document.querySelector("#t-main");
    crdiv.setAttribute("class", "m-1");

    let cpDiv: any = document.querySelector("#bookcopiesdiv");
    cpDiv.setAttribute("class", "hide");

    let bl: any = document.querySelector("#booklist");
    bl.setAttribute("class", "hide");

    let crCatDiv: any = document.querySelector("#crmainDiv");
    crCatDiv.setAttribute("class", "hide");
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
    fCatGrid.setAttribute("class", "m-1");

    let sboxDiv: any = document.querySelector("#searchbox");
    sboxDiv.setAttribute("class", "b-1 m-1 p-1");

    let fCatDtDiv: any = document.querySelector("#crmainDiv");
    fCatDtDiv.setAttribute("class", "");

    let moddv: any = document.querySelector("#modifyDiv");
    moddv.setAttribute("class", "hide");

    // let fCatDtDiv: any = document.querySelector("#feeCatDetailDiv");
    // fCatDtDiv.setAttribute("class", "hide");

    let fCatDiv: any = document.querySelector("#t-main");
    fCatDiv.setAttribute("class", "hide");

    let stDtDiv: any = document.querySelector("#studentsbutton");
    stDtDiv.setAttribute("class", "hide");

    let ddv: any = document.querySelector("#datediv");
    ddv.setAttribute("class", "hide");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "hide");

    let upFeeCatDiv: any = document.querySelector("#upFeeCatDiv");
    upFeeCatDiv.setAttribute("class", "hide");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "hide");

    let sDiv: any = document.querySelector("#detailbox");
    sDiv.setAttribute("class", "hide");
    // <div id="detailbox" className="b-1">

    let stDiv: any = document.querySelector("#detailbox");
    stDiv.setAttribute("class", "hide");

    let btsbDiv: any = document.querySelector("#btsbsearch");
    btsbDiv.setAttribute("class", "dflex");

    let btbDiv: any = document.querySelector("#searchbutton");
    btbDiv.setAttribute("class", "");

    let cpDiv: any = document.querySelector("#bookcopiesdiv");
    cpDiv.setAttribute("class", "hide");

    let bl: any = document.querySelector("#booklist");
    bl.setAttribute("class", "hide");

  }

  assigntobutton(e: any, obj: any) {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });


    let btsbDiv: any = document.querySelector("#studentsbutton");
    btsbDiv.setAttribute("class", "");

    let ddv: any = document.querySelector("#datediv");
    ddv.setAttribute("class", "");

    this.showParticularDiv(e);

  }





  // showParticularDiv = (e: any) => {
  //   let { count } = this.state;
  //   count[this.state.countParticularDiv] = 0;
  //   this.setState({
  //     countParticularDiv: this.state.countParticularDiv + 1,
  //     count
  //   });
  //   let dvPrt: any = document.querySelectorAll("#feeParticularDiv");
  //   for (let i = 0; i < dvPrt.length; i++) {
  //     dvPrt[i].setAttribute("class", "feeDetails");
  //   }

  //   // for(let i = 0; i < this.state.countParticularDiv; i++){
  //   //   let dvPrt : any = document.querySelector("#feeParticularDiv"+i);
  //   //   dvPrt.setAttribute("class", "feeDetails");
  //   // }

  // }


  //imp........................................

  etBook(obj: any) {
    const { libraryData } = this.state;

    // let bl: any = document.querySelector("#rec");
    // bl.setAttribute("class", "hide");

    let dtPkSt: any = document.querySelector("#dtPickeris");
    let chkSts: any = document.querySelector("#status");
    let dtPkNd: any = document.querySelector("#dtPickerdd");
    let dtPkRc: any = document.querySelector("#dtPickerrc");

    let stpk: any = document.querySelector("#student");

    let stDiv: any = document.querySelector("#studentsbutton");
    stDiv.setAttribute("class", "hide");


    let dtSt: any = document.querySelector("#due");
    dtSt.setAttribute("class", "hide");
    let dtNd: any = document.querySelector("#iss");
    dtNd.setAttribute("class", "hide");
    let reNd: any = document.querySelector("#rec");
    reNd.setAttribute("class", "m-r-1");

    let ubdiv: any = document.querySelector("#updatebookdiv");
    ubdiv.setAttribute("class", "");


    if (obj.status === "RESERVED") {
      chkSts.checked = true;
    } else {
      chkSts.checked = false;
    }
    let stDate = "";
    if (obj.strIssueDate !== null && obj.strIssueDate !== "") {
      stDate = moment(obj.strIssueDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
   
    let ndDate = "";
    if (obj.strDueDate !== null && obj.strDueDate !== "") {
      ndDate = moment(obj.strDueDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    let rcDate = "";
    if (obj.strRecDate !== null && obj.strRecDate !== "") {
      rcDate = moment(obj.strRecDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }

    var curDate = moment(new Date()).format("DD/MM/YYYY");
    let date = new Date();
    dtPkSt.value = stDate;
    dtPkNd.value = ndDate;
    dtPkRc.value = rcDate;
    libraryData.books.id = obj.id;
    libraryData.student.id = obj.student.id;
    libraryData.noOfCopiesAvailable = 0;
    let nStDt: any;
    let nEnDt: any;
    let nRcDt: any;
    if (stDate !== "") {
      nStDt = moment(stDate, "DD/MM/YYYY");
    }
    if (ndDate !== "") {
      nEnDt = moment(ndDate, "DD/MM/YYYY");
    }
    if (rcDate !== "") {
      nRcDt = moment(rcDate, "DD/MM/YYYY");
    }
    console.log('check recive date:', nRcDt);
    this.setState({
      issueDate: nStDt,
      dueDate: nEnDt,
      receivedDate: nRcDt,
      status: status,
      // receivedDate: "1111-11-01T18:00:00.000Z",
      libraryData: libraryData
    });

    let ddv: any = document.querySelector("#datediv");
    ddv.setAttribute("class", "");



  }
  editBook(obj: any) {
    const { libraryData } = this.state;

    // let bl: any = document.querySelector("#rec");
    // bl.setAttribute("class", "hide");
    let chkSts: any = document.querySelector("#status");
    let dtPkSt: any = document.querySelector("#dtPickeris");
    let dtPkNd: any = document.querySelector("#dtPickerdd");
    let dtPkRc: any = document.querySelector("#rec");
    dtPkRc.setAttribute("class", "hide");



    let dtSt: any = document.querySelector("#due");
    dtSt.setAttribute("class", "m-r-1");
    let dtNd: any = document.querySelector("#iss");
    dtNd.setAttribute("class", "m-r-1");

    let ubdiv: any = document.querySelector("#updatebookdiv");
    ubdiv.setAttribute("class", "");

    if (obj.status === "RESERVED") {
      chkSts.checked = true;
    } else {
      chkSts.checked = false;
    }
    let ndDate = "";
    if (obj.strDueDate !== null && obj.strDueDate !== "") {
      ndDate = moment(obj.strDueDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    let stDate = "";
    if (obj.strIssueDate !== null && obj.strIssueDate !== "") {
      stDate = moment(obj.strIssueDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    let rcDate = "";
    if (obj.strRecDate !== null && obj.strRecDate !== "") {
      rcDate = moment(obj.strRecDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    // dtPkSt.value = stDate;
    // dtPkNd.value = ndDate;
    // dtPkRc.value = rcDate;
    libraryData.books.id = obj.id;
    // libraryData.student.id = obj.student.id;
    libraryData.noOfCopiesAvailable = 0;
    let nStDt: any;
    let nEnDt: any;
    let nRcDt: any;
    if (stDate !== "") {
      nStDt = moment(stDate, "DD/MM/YYYY");
    }
    if (ndDate !== "") {
      nEnDt = moment(ndDate, "DD/MM/YYYY");
    }
    if (rcDate !== "") {
      nRcDt = moment(rcDate, "DD/MM/YYYY");
    }
    let date = new Date();
    this.setState({
      // issueDate: nStDt,
      // dueDate: nEnDt,
      // receivedDate: nRcDt,
      status: status,
      // receivedDate: "2019-11-11T18:00:00.000Z",
      // receivedDate: date,
      libraryData: libraryData
    });
    console.log('checkt the date:', this.state.receivedDate);
    let btsbDiv: any = document.querySelector("#studentsbutton");
    btsbDiv.setAttribute("class", "");

    let ddv: any = document.querySelector("#datediv");
    ddv.setAttribute("class", "");

    // let dt: any = document.querySelector("#bookTitle");
    // dt.setAttribute("disabled", true);

  }

  changeDueDate = (e: any) => {
    const varDt = e;
    console.log("due date...", varDt);
    this.setState({
      dueDate: varDt
    })

  }

  changeIssueDate = (e: any) => {
    const varDt = e;
    console.log("start date...", varDt);
    this.setState({
      issueDate: varDt
    });
  }


  changereceivedDate = (e: any) => {
    const varDt = e;
    console.log("Rec date...", varDt);
    this.setState({
      receivedDate: varDt
    })

  }

  resetSubBook(){

    const { libraryData } = this.state;
    let dtPkSt: any = document.querySelector("#dtPickeris");
    let dtPkNd: any = document.querySelector("#dtPickerdd");
    dtPkSt.value = "";
    dtPkNd.value = "";

    this.setState({
      issueDate: "",
      dueDate: ""

      // feeSetupData : feeSetupData
    });
    this.setState({
      libraryData: libraryData
    });


  }

  updateSubBook(obj: any) {
    const { updateBookMutation } = this.props;
    const { libraryData } = this.state;


    let chkStatus: any = document.querySelector("#status");
    let status = "AVAILABLE";
    if (chkStatus.checked) {
      status = "RESERVED";
    }
    let stDate = null;
    if(this.state.issueDate === undefined || this.state.issueDate === null || this.state.issueDate === "" ){
      alert("Please provide issue date");
      return;
    }
    if (this.state.issueDate !== undefined || this.state.issueDate !== null || this.state.issueDate !== "") {     
      stDate = moment(this.state.issueDate, "YYYY-MM-DD");
    }

    let enDate = null;
    if (this.state.dueDate === undefined || this.state.dueDate === null || this.state.dueDate === "") {
      alert("Please provide due date"); 
    return;
    }

    if (this.state.dueDate !== undefined || this.state.dueDate !== null || this.state.dueDate !== "") {
      enDate = moment(this.state.dueDate, "YYYY-MM-DD");
    }
    let rcDate = null;
    if (this.state.receivedDate !== undefined || this.state.receivedDate !== null || this.state.receivedDate !== "") {
      rcDate = moment(this.state.receivedDate, "YYYY-MM-DD");
    }

    if (libraryData.books.id === "") {
      alert("This record has no id. It can be added as a new record.");
      return;
    }


    // let dtPkStu: any = document.querySelector("#student");
    // if (dtPkStu.value.trim() === "") {
    //   alert("Please select Student");
    //   return;
    // }
   
    let updateBookInput = {
      id: libraryData.books.id,
      noOfCopiesAvailable: 0,
      status: status,
      issueDate: stDate, 
      dueDate: enDate,
      receivedDate: rcDate,
      studentId: libraryData.student.id,
      libraryId: libraryData.libraries.id,

    };
    console.log("form data : ", libraryData);
    return updateBookMutation({
      variables: { input: updateBookInput }
     
    }).then(data => {
      console.log('Update Book ::::: ', data);
      alert("Book assigned successfully!");
      const sdt = data;
      libraryData.librarysaveData = [];
      libraryData.librarysaveData.push(sdt);
      let dtPkSt: any = document.querySelector("#dtPickeris"); 
      let dtPkNd: any = document.querySelector("#dtPickerdd");
      // let dtPkRc: any = document.querySelector("#dtPickerrc");
      let dtPkStu: any = document.querySelector("#student");

      
      
      dtPkSt.value = "";
      dtPkNd.value = "";
      // dtPkRc.value = "";
      dtPkStu.value = "";
    libraryData.student.id = "";
    libraryData.department.id = "";
    libraryData.batch.id = "";
    libraryData.section.id = "";

      this.setState({
        issueDate: "",
        dueDate: "",
        // receivedDate : "",
        studentId : ""
      });


      this.setState({
        libraryData: libraryData
      });
      this.setState({
        add: false,
        update: true
      });
    }).catch((error: any) => {
      alert("due to some erroe book not assigned.");
      console.log('there was an error sending the update Book mutation result', error);
      return Promise.reject(`Could not retrieve Book data: ${error}`);
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
        let a = library.bookTitle.toUpperCase();
        let b = library.author.toUpperCase();
        
        if (search) {
          if (a.indexOf(search.toUpperCase()) !== -1) {
            retVal.push(
              <tr key={library.id}>
                <td>{library.bookTitle}</td>
                <td>{library.author}</td>
                {/* <td>{library.noOfCopies}</td> */}
                <td>{library.bookNo}</td>

                {/* <td>{library.uniqueNo}</td> */}
                <td>{library.batch.batch}</td>
                <td>{library.subject.subjectDesc}</td>
                <td>{library.additionalInfo}</td>
                <td>
                  <button className="btn btn-primary" onClick={e => this.editLibrary(library)}>Modify</button>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={e => this.showDetail(e, library)}>Details</button>
                </td>
              </tr>
            );
          }
          else if (b.indexOf(search.toUpperCase()) !== -1) {
            retVal.push(
              <tr key={library.id}>
                <td>{library.bookTitle}</td>
                <td>{library.author}</td>
                {/* <td>{library.noOfCopies}</td> */}
                <td>{library.bookNo}</td>

                {/* <td>{library.uniqueNo}</td> */}
                <td>{library.additionalInfo}</td>
                <td>{library.batch.batch}</td>
                <td>{library.subject.subjectDesc}</td>
                <td>
                  <button className="btn btn-primary" onClick={e => this.editLibrary(library)}>Modify</button>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={e => this.showDetail(e, library)}>Details</button>
                </td>
              </tr>
            );
          }
        } else {
          retVal.push(
            <tr key={library.id}>
              <td>{library.bookTitle}</td>
              <td>{library.author}</td>
              {/* <td>{library.noOfCopies}</td> */}
              {/* <td>{library.uniqueNo}</td> */}
              <td>{library.bookNo}</td>
              {/* <td>{this.state.libraryData.textValueMap["num" + i]}</td> */}
              {/* imp    <td>{libraryData.num}</td>  */}
              <td>{library.additionalInfo}</td>
              <td>{library.batch.batch}</td>
              <td>{library.subject.subjectDesc}</td>
              <td>
                <button className="btn btn-primary" onClick={e => this.editLibrary(library)}>Modify</button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={e => this.showDetail(e, library)}>Details</button>
              </td>
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
      console.log('Library filter mutation result ::::: ', libraryData.mutateResult);
    }).catch((error: any) => {
      console.log('there was an error sending the query result', error);
      return Promise.reject(`Could not retrieve Library data: ${error}`);
    });

  }


  // onClickbook = (e: any) => {
  //   const { name, value } = e.nativeEvent.target;
  //   const { mutatebook } = this.props;
  //   const { libraryData } = this.state;
  //   e.preventDefault();

  //   let libraryFilterInputObject = {

  //     batchId: libraryData.batch.id,

  //     subjectId: libraryData.subject.id
  //   };


  //   return mutatebook({
  //     variables: { filter: libraryFilterInputObject },
  //   }).then(data => {
  //     const sdt = data;
  //     libraryData.mutateResult = [];
  //     libraryData.mutateResult.push(sdt);
  //     this.setState({
  //       libraryData: libraryData
  //     });
  //     console.log('Student filter mutation result ::::: ', libraryData.mutateResult);
  //   }).catch((error: any) => {
  //     console.log('there was an error sending the query result', error);
  //     return Promise.reject(`Could not retrieve student data: ${error}`);
  //   });

  // }

  increaseExamValue() {
    let n = 1000;
    if (this.state.noOfCopiesAvailable < n) {
      this.setState({ noOfCopiesAvailable: this.state.noOfCopiesAvailable + 1 })
    }
  }

  decreaseExamValue() {
    if (this.state.noOfCopiesAvailable !== 0) {
      this.setState({ noOfCopiesAvailable: this.state.noOfCopiesAvailable - 1 })
    }
  }

  createBookAddRow(obj: any) {
    const { libraryData } = this.state;
    const retVal = [];
    console.log("data:", obj);
    let c = 0;
    for (let x = 0; x < obj.length; x++) {
      let k = obj[x];


      if (this.state.libraryData.libraries.id == k.library.id) {
        if (k.status == "AVAILABLE") {
          c += 1;
        }
        retVal.push(
          <tr key={k.id}>
            <td>{k.id}</td>
            {/* <td>{k.library.id}</td> */}
            <td>{k.status === "RESERVED" ? k.strDueDate : k.strDueDate == ""}</td>
            <td>{k.status === "RESERVED" ? k.strIssueDate : k.strIssueDate == ""}</td>
            <td>{k.status === "RESERVED" ? k.student.id : k.student.id == ""}</td>
            {/* <td>{k.strRecDate}</td> */}
            {/* <td>{k.status}</td> */}

            <td>{
              k.status === "AVAILABLE" &&
              <button className="btn bs" onClick={e => this.editBook(k)}>ASSIGN</button>

            }{
                k.status === "RESERVED" &&
                <button className="btn bs color-lb" onClick={e => this.etBook(k)}>RECEIVE</button>
              }
            </td>


          </tr>
        );
      }

    }
    libraryData.num = c;
    console.log("s", libraryData.num);
    libraryData.num;
    return retVal;
  }

  createBookRowFromCache(obj: any) {
    // const len = obj.length;
    const retVal = [];
    // for (let p = 0; p < len; p++) {
    //   let v = obj[p];
    for (let x = 0; x < obj.length; x++) {
      let k = obj[x];
      if (this.state.libraryData.libraries.id == k.library.id) {
        retVal.push(
          <tr>
            <td>{k.id}</td>
            {/* <td>{k.library.id}</td> */}
            <td>{k.status === "RESERVED" ? k.strDueDate : k.strDueDate == ""}</td>
            <td>{k.status === "RESERVED" ? k.strIssueDate : k.strIssueDate == ""}</td>
            <td>{k.status === "RESERVED" ? k.student.id : k.student.id == ""}</td>
            {/* <td>{k.strRecDate}</td> */}
            {/* <td>{k.status}</td> */}
            <td>{
              k.status === "AVAILABLE" &&
              <button className="btn bs" onClick={e => this.editBook(k)}>ASSIGN</button>

            }{
                k.status === "RESERVED" &&
                <button className="btn btn-primary" onClick={e => this.etBook(k)}>Receive</button>
              }
            </td>
            {/* <td>

          <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={e => this.assigntobutton(e, k)} style={{ width: '140px' }}>Assign To</button>
          </td> */}

          </tr>
        );
      }
    }
    return retVal;
  }

  // createBookUpdateRow(obj: any) {
  //   const { libraryData } = this.state;
  //   const len = obj.length;
  //   const retVal = [];
  //   let aryLength = 0;
  //   let v = obj[0];
  //   if (v.data.updateBook === undefined || v.data.updateBook === null) {
  //     return;
  //   }
  //   for (let x = 0; x < obj.length; x++) {
  //     let k = obj[x];
  //     // if (libraryData.libraries.id == k.library.id) {
  //       retVal.push(
  //         <tr >
  //           <td>{k.id}</td>
  //           {/* <td>{k.library.id}</td> */}
  //           <td>{k.status === "RESERVED" ? k.strDueDate : k.strDueDate == ""}</td>
  //           <td>{k.status === "RESERVED" ? k.strIssueDate : k.strIssueDate == ""}</td>
  //           <td>{k.status === "RESERVED" ? k.student.id : k.student.id == ""}</td>
  //           {/* <td>{k.strRecDate}</td> */}
  //           {/* <td>{k.status}</td> */}
  //           <td>{
  //             k.status === "AVAILABLE" &&
  //             <button className="btn bs" onClick={e => this.editBook(k)}>ASSIGN</button>
  //           }{
  //               k.status === "RESERVED" &&
  //               <button className="btn btn-primary" onClick={e => this.etBook(k)}>Receive</button>
  //             }
  //           </td>
  //         </tr>
  //       );
  //     }
  //   // }

  //   return retVal;
  // }



  render() {
    const { data: { createLibraryFilterDataCache, refetch }, mutate, mutatebook, addBookMutation, addLibraryMutation, updateLibraryMutation, updateBookMutation } = this.props;
    const { libraryData, departments, batches, subjects, students, sections, submitted } = this.state;

    return (
      <section className="plugin-bg-white">

        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Library Management
          </h3>
        <div id="headerRowDiv" className="bg-heading p-1 m-1 j-between">
          <div className="m-1">Create Books</div>

          <div id="saveFeeCatDiv" className="hide">



            <button className="btn btn-primary mr-1" id="btnSaveBook" name="btnSaveBook" onClick={this.savelibrary} style={{ width: '100px' }}>Save</button>

            <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>

          </div>
          <div id="upFeeCatDiv" className="hide">

            <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.updateLibrary} style={{ width: '100px' }}>Save</button>

            <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>

          </div>

          <div id="backDiv" className="hide">



            <button className="btn btn-primary mr-1" id="btnBack" name="btnBack" onClick={this.back} style={{ width: "100px" }}>Back</button>




          </div>

          <div id="crmainDiv" className="">

            <button className="btn btn-primary mr-1" id="btncr" name="btnBack" onClick={this.create} >Create New Book</button>

          </div>
        </div>

        <div id="t-main" className="hide">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-mai" className="fwidth">
              <thead>
                <tr>
                  {/* <th>Department</th> */}
                  <th>Year</th>
                  <th>Subject</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Book No</th>
                  {/* <th>No Of Copies</th> */}
                  {/* <th>Unique No</th> */}
                  <th>Additional Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td>
                  <select required name="department" id="department" onChange={this.onChange}  className="gf-form-input max-width-8">
                    {this.createDepartments(this.props.data.createLibraryFilterDataCache.departments,libraryData.branch.id)}
                  </select>
                  </td> */}
                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={libraryData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createLibraryFilterDataCache.batches, 1901)}
                    </select>
                  </td>
                  <td>
                  
                    <select required name={"subject"} id="subject" onChange={this.onChange} value={libraryData.subject.id} className="gf-form-input max-width-22">
                      {this.createSubjects(this.props.data.createLibraryFilterDataCache.subjects, 1901, libraryData.batch.id)}
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

                  {/* <td>
                    <input type="number" id={"noOfCopies"} name={"noOfCopies"} onChange={this.onChange} className="fwidth" value={libraryData.noOfCopies} />
                  </td> */}

                  {/* <td>
                    <input type="number" id={"uniqueNo"} name={"uniqueNo"} onChange={this.onChange} className="fwidth" value={libraryData.uniqueNo} />
                  </td> */}

                  <td>
                    <input type="text" id={"additionalInfo"} name={"additionalInfo"} onChange={this.onChange} className="fwidth" value={libraryData.additionalInfo} />
                  </td>

                </tr>
              </tbody>
            </table>
          </form>
        </div>


        <div id="searchbox" className="b-1 m-1 p-1">
          <div id="btsbsearch" className="dflex ">
            {/* <label>Year</label>    */}
            <select required name="batch" id="batch" onChange={this.onChange} value={libraryData.batch.id} className="gf-form-input">
              {this.createBatches(this.props.data.createLibraryFilterDataCache.batches, 1901)}
            </select>
            {/* <label>Subject</label> */}
            <select required name={"subject"} id="subject" onChange={this.onChange} value={libraryData.subject.id} className="gf-form-input ">                {this.createSubjects(this.props.data.createLibraryFilterDataCache.subjects, 1901, libraryData.batch.id)}
            </select>
            <div className="max-width-25">
              <input type="text" name="search" placeholder="Title/Aauthor" value={libraryData.search} onChange={this.onChange} />
            </div>
            <div id="searchbutton" className="bg-heading-bg studentSearch">
              <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind" onClick={this.onClick} style={w180}>Search Book</button>
            </div>
          </div>

          {/* <div id = "searchbutton" className="m-b-1 bg-heading-bg studentSearch">
              <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind" onClick={this.onClickbook} style={w180}>Search Bookkk</button>
        </div> */}
        </div>


        <div id="listGrid" className="m-1">
          <table className="fwidth" id="feetable">
            <thead >
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                {/* <th>No Of Copies</th> */}
                <th>Book No</th>
                {/* <th>Unique No</th> */}
                <th>Additional Info</th>
                <th>Year</th>
                <th>Subject</th>
                <th>Modify</th>
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
        <div id="detailbox" className="">
          <div id="smdt" className="hide">
            <div className="m-1 width-14">
              <span className="profile-label">
                Book Name:
                  </span>
              <span>{libraryData.bookTitle}</span>
            </div>
            <div className="m-1 width-14">
              <span className="profile-label">
                Book No:
                    </span>
              <span>{libraryData.bookNo}</span>
            </div>
            <div className="m-1 width-14">
              <span className="profile-label">
                Author Name:
                  </span>
              <span>{libraryData.author}</span>
              <span>{libraryData.libraries.id}</span>
            </div>
            <div className="m-1 width-14">
              <span className="profile-label">
                Library Id:
                  </span>
              <span>{libraryData.libraries.id}</span>
            </div>
          </div>
        </div>
        <div id="bookcopiesdiv" className="hide">
          <div id="bookcdiv" className="b-1">
            <form className="gf-form-group m-1"  >
              Add No Of Copies:&nbsp;&nbsp;
                  <a onClick={this.decreaseExamValue.bind(this)} className="btn btn-primary mr-1 btn-small m-l-1"><i className="fa fa-minus" /></a>
              &nbsp;{this.state.noOfCopiesAvailable}&nbsp;
                    <a onClick={this.increaseExamValue.bind(this)} className="btn btn-primary mr-1 btn-small m-l-1"><i className="fa fa-plus" /></a>

              {this.state.noOfCopiesAvailable >= 1 &&

                <button className="btn btn-primary mr-1 m-l-1" id="btnSaveBook" name="btnSaveBook" onClick={this.savebook} style={{ width: '140px' }}>Save Books</button>
              }
            </form>
          </div>
        </div>


        <div id="modifyDiv" className="hide">
          <div id="datediv" className="hide">
            <div className="b1 row m-1 j-between m-b-2">
              <div className="lflex">
                <div id="iss" className="">
                  <label htmlFor="">Issue Date</label>
                  <DatePicker selected={this.state.issueDate} value={this.state.issueDate} onChange={this.changeIssueDate} id="dtPickeris" name="dtPickeris" className="width-18" />
                </div>
                <div id="due" className="">
                  <label htmlFor="">Due Date </label>
                  <DatePicker selected={this.state.dueDate} value={this.state.dueDate} onChange={this.changeDueDate}  id="dtPickerdd" name="dtPickerdd" className="width-18" />
                </div>
                <div id="rec" className="">
                  <label htmlFor="">Rec Date</label>
                  <DatePicker selected={this.state.receivedDate} value={this.state.receivedDate} onChange={this.changereceivedDate} id="dtPickerrc" name="dtPickerrc" className="width-18" />
                  {/* <input type= "date" id="dtPickerrc" value={libraryData.receivedDate} name="dtPickerrc" onChange={this.changereceivedDate}  ></input> */}
                </div>
                <div id="sts" className="">
                  <label htmlFor="">Status</label>
                  <label className="switch">
                    {' '}
                    <input type="checkbox" id="status" name="status"  /> <span className="slider" />{' '}
                  </label>
                </div>
              </div>
              <div id="updatebookdiv" className="">
                <button className="btn btn-primary mr-1" id="btnSaveBook" name="btnSaveBook" onClick={this.updateSubBook} style={{ width: '140px' }}>Save</button>
              </div>


            </div>
          </div>
          <div id="studentsbutton" className="hide">
            <div className="m-1 lflex m-b-2">
              <div className="m-r-1">
                <label htmlFor="">Department</label>
                <select required name="department" id="department" onChange={this.onSubChange} className="gf-form-input width-18">
                  {this.createDepartments(this.props.data.createLibraryFilterDataCache.departments, libraryData.branch.id)}
                </select>
              </div>

              <div className="m-r-1">
                <label htmlFor="">Select Year</label>
                <select required name="batch" id="batch" onChange={this.onSubChange} value={libraryData.batch.id} className="gf-form-input width-18">
                  {this.createBatches(this.props.data.createLibraryFilterDataCache.batches, libraryData.department.id)}
                </select>
              </div>

              <div className="m-r-1">
                <label htmlFor="">Section</label>
                <select required name="section" id="section" onChange={this.onSubChange} value={libraryData.section.id} className="gf-form-input width-18">
                  {this.createSections(this.props.data.createLibraryFilterDataCache.sections, libraryData.batch.id)}
                </select>
              </div>
              <div className="m-r-1">
                <label htmlFor="">Student</label>
                <select required name="student" id="student" onChange={this.onSubChange} value={libraryData.student.id} className="gf-form-input width-18">
                  {this.createStudents(this.props.data.createLibraryFilterDataCache.students, libraryData.batch.id, libraryData.department.id, libraryData.section.id)}
                </select>
              </div>
            </div>

          </div>




          <div id="booklist" className="hide">
            <h6 className="m-1">Books Details</h6>
            <div id="bookGrid" className="b-1">
              <table className="fwidth" id="booktable">
                <thead >
                  <tr id="bookstable">
                    <th>Book Id</th>
                    <th>Isue Date</th>
                    <th>Due Date</th>
                    <th>Student Id</th>
                    {/* <th>Received Date</th> */}
                    {/* <th>Status</th> */}
                    <th>Assign/Receive</th>
                    {/* <th>Assign</th> */}
                    {/* <th>Details</th>  */}
                  </tr>
                </thead>
                <tbody>
                  {

                    this.createBookAddRow(this.props.data.createLibraryFilterDataCache.books)


                  }
                  {/* {
                    libraryData.librarysaveData.length > 0 && this.state.add === false && this.state.update === true && (
                      this.createBookUpdateRow(libraryData.librarysaveData)
                    )
                  } */}
                </tbody>
              </table>
            </div>
          </div>
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
    }),
    graphql<BookAddMutationType, LibraryRootProps>(BookAddMutation, {
      name: "addBookMutation",
    }),
    graphql<BookUpdateMutationType, LibraryRootProps>(BookUpdateMutation, {
      name: "updateBookMutation"
    }),
    graphql<LibraryListQuery, LibraryRootProps>(LibraryListQueryGql, {
      name: "mutate"
    }),
    graphql<BookListQuery, LibraryRootProps>(BookListQueryGql, {
      name: "mutatebook"
    })
  )
    (AddBook) as any
);