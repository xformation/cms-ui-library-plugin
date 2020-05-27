import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../css/custom.css";
import '../../../css/college-settings.css';
import '../../../css/tabs.css'; 
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { ADD_BOOK,CREATE_LIBRARY_FILTER_DATA_CACHE } from '../_queries';
import * as moment from 'moment';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';


export interface BookProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any; 
    bList?:any;
    batches?:any;
    departmentes?:any;
    libraries?:any;
    students?:any;
    bobj?:any;
    bkObj?:any;
    user?:any;
    createLibraryFilterDataCache?: any;
}
const ERROR_MESSAGE_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_ERROR = "Due to some error in book service, book could not be saved. Please check book service logs";
const SUCCESS_MESSAGE_BOOK_ADDED = "New book saved successfully";
const SUCCESS_MESSAGE_BOOK_UPDATED = "book updated successfully";
const ERROR_MESSAGE_DATES_OVERLAP = "Due Date cannot be prior or same as Issue date";


class Book<T = {[data: string]: any}> extends React.Component<BookProps, any> {
    constructor(props: BookProps) {
        super(props);
        this.state = {     
            blist: this.props.blist,
            createLibraryFilterDataCache: this.props.createLibraryFilterDataCache,
            isModalOpen: false,
            user: this.props.user,
            bobj:this.props.user,
            bkObj:this.props.user,
            departments:this.props.departments,
            batches:this.props.batches,
            students:this.props.students,
            libraries:this.props.libraries,
            errorMessage: '',
            successMessage: '',
            activeTab: 0,
            bObj:{
            issueDate:"",
            dueDate:"",
            noOfCopiesAvailable:"",
            bookStatus:"",
            receivedDate:"",
            batchId:"",
            departmentId:"",
            libraryId:"",
            studentId:""
         },
         bookData:{
             batch:{
                 id:"",
             },
             department:{
               id:"",
             },
             student:{
               id:"",
             },
             library:{
               id:"",
             }
         },
             student:"",
             library:"",
             batch:"",
             department:""
        };  
        this.createDepartment = this.createDepartment.bind(this); 
        this.createBatch = this.createBatch.bind(this); 
        this.createStudent = this.createStudent.bind(this); 
        this.createLibrary = this.createLibrary.bind(this); 
        this.getAddBookInput = this.getAddBookInput.bind(this);
        this.EditDetails = this.EditDetails.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getcreateLibraryFilterDataCache = this.getcreateLibraryFilterDataCache.bind(this);
        }
    
  async componentDidMount(){
    this.setState({
      bkObj: this.props.data,
    });
    await this.registerSocket();
    console.log('1.test bkObj data:', this.state.bkObj);
    console.log('30. test bobj data state:', this.state.bobj);
    console.log('40. test bobj data props:', this.props.bobj);
    this.EditDetails();
  }
    async registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();
        // socket.onmessage = (response: any) => {
        //   let message = JSON.parse(response.data);
        //   console.log('Book index. message received from server ::: ', message);
        //   this.setState({
        //     branchId: message.selectedBranchId,
        //     academicYearId: message.selectedAcademicYearId,
        //     departmentId: message.selectedDepartmentId,
        //   });
        //   console.log('Book index. branchId: ', this.state.branchId);
        //   console.log('Book index. departmentId: ', this.state.departmentId);
        //   console.log('Book index. ayId: ', this.state.academicYearId);
        // };
    
        // socket.onopen = () => {
        //   console.log("Book index. Opening websocekt connection on index.tsx. User : ",this.state.user.login);
        //     // this.state.user
        //     socket.send(this.state.user.login);
        // }
        // window.onbeforeunload = () => {
        //   console.log('Book index. Closing websocekt connection on index.tsx');
        // };
    }

    componentWillReceiveProps() {
      this.setState({
        bkObj: this.props.data,
      });
      console.log('check batches:', this.props.batches);
      console.log('2. test bkObj data:', this.state.bkObj);
      console.log('30. test bobj data state:', this.state.bobj);
      console.log('40. test bobj data props:', this.props.bobj);
      this.EditDetails();
    }
    createDepartment(departments: any) {
        let departmentsOptions = [
          <option key={0} value="">
            Select department
          </option>,
        ];
        for (let i = 0; i < departments.length; i++) {
          let id = departments[i].id;
            departmentsOptions.push(
            <option key={id} value={id}>
              {departments[i].name}
            </option>
          );
        }
        return departmentsOptions;
      }
      createBatch(batches: any) {
        let batchesOptions = [
          <option key={0} value="">
            Select Year
          </option>,
        ];
        for (let i = 0; i < batches.length; i++) {
            batchesOptions.push(
            <option key={batches[i].id} value={batches[i].id}>
              {batches[i].batch}
            </option>
          );
        }
        return batchesOptions;
      }
      createLibrary(libraries: any) {
        let librariesOptions = [
          <option key={0} value="">
            Select Library
          </option>,
        ];
        for (let i = 0; i < libraries.length; i++) {
          let id = libraries[i].id;
            librariesOptions.push(
            <option key={id} value={id}>
              {libraries[i].bookTitle}
            </option>
          );
        }
        return librariesOptions;
      }
      createStudent(students: any) {
        let studentsOptions = [
          <option key={0} value="">
            Select Student
          </option>,
        ];
        for (let i = 0; i < students.length; i++) {
          let id = students[i].id;
            studentsOptions.push(
            <option key={id} value={id}>
              {students[i].rollNo}
            </option>
          );
        }
        return studentsOptions;
      }
      async getcreateLibraryFilterDataCache() {
        // const {} = this.state;
          // console.log('Library branch Id:', branchId);
          const {data} = await this.props.client.query({
            query: CREATE_LIBRARY_FILTER_DATA_CACHE,
            variables: {
              // collegeId: '' + branchId,
              // departmentId: departmentId,
              // academicYearId: '' + academicYearId,
              // collegeId: collegeId,
            },
      
            fetchPolicy: 'no-cache',
          });
          this.setState({
            createLibraryFilterDataCache: data,
          });
        }

      toggleTab(tabNo: any) {
        this.setState({
          activeTab: tabNo,
        });
      }
    
      showModal(e: any, bShow: boolean) {
        e && e.preventDefault();
        this.setState(() => ({
          isModalOpen: bShow,
        }));
      }
      
    EditDetails() {
        // e && e.preventDefault();
        const { bObj,bookData } = this.state;
        let bValue: any = '';
        bValue = this.props.bObj;
        console.log('100. test bObj data:', bValue);
        this.setState({
        bObj: {
        ...bObj,
        id : bValue.id,
        batchId : bookData.batch.id,
        departmentId : bookData.department.id,
        libraryId : bookData.library.id,
        studentId : bookData.student.id,
        bookStatus : bValue.bookStatus,
        noOfCopiesAvailable : bValue.noOfCopiesAvailable,
        issueDate : moment(bValue.strIssueDate,"DD-MM-YYYY").format("YYYY-MM-DD"),
        dueDate : moment(bValue.strDueDate,"DD-MM-YYYY").format("YYYY-MM-DD"),
        receivedDate : moment(bValue.strReceivedDate,"DD-MM-YYYY").format("YYYY-MM-DD"),
        },
    });
        return;
    }
  
    showModals(e: any, bShow: boolean, headerLabel: any) {
        e && e.preventDefault();
        this.setState(() => ({
            isModalOpen: bShow,
            bObj: {},
            modelHeader: headerLabel,
            errorMessage: "",
            successMessage: "",
        }));
    }

    onChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        const { bObj,bookData } = this.state  
        if (name === 'department') {
          this.setState({
            bookData: {
              ...bookData,
              department: {
                id: value,
              },
              batch: {
                id: '',
              },
              student: {
                id: '',
              },
              library: {
                id: '',
              },
            },
          });
        } else if (name === 'batch') {
          this.setState({
            bookData: {
              ...bookData,
              batch: {
                id: value,
              },
              student:{
                id:'',
              },
              library:{
                id:'',
              },
            },
          });
        }
        else if (name === 'student') {
          this.setState({
            bookData: {
              ...bookData,
              student: {
                id: value,
              },
              library:{
                id: '',
              }
            },
          });
        }
        else if (name === 'library') {
          this.setState({
            bookData: {
              ...bookData,
              library: {
                id: value,
              },
            },
          });
        } else {
          this.setState({
            bObj: {
              ...bObj,
              [name]: value,
            },
            bookData: {
              ...bookData,
              [name]: value,
            },
            errorMessage: '',
            successMessage: '',
          });
        }
        commonFunctions.restoreTextBoxBorderToNormal(name);
    }
    validateField(bObj: any, bookData: any){
      let isValid = true;
      let errorMessage = ""
      if(bObj.issueDate === undefined || bObj.issueDate === null || bObj.issueDate === "")
      {
          commonFunctions.changeTextBoxBorderToError((bObj.issueDate === undefined || bObj.issueDate === null) ? "" : bObj.issueDate, "issueDate");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bObj.dueDate === undefined || bObj.dueDate === null || bObj.dueDate === "")
      {
          commonFunctions.changeTextBoxBorderToError((bObj.dueDate === undefined || bObj.dueDate === null) ? "" : bObj.dueDate, "dueDate");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bObj.bookStatus === undefined || bObj.bookStatus === null || bObj.bookStatus === "")
      {
          commonFunctions.changeTextBoxBorderToError((bObj.bookStatus === undefined || bObj.bookStatus === null) ? "" : bObj.bookStatus, "bookStatus");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bookData.batch.id === undefined || bookData.batch.id === null || bookData.batch.id === "")
      {
          commonFunctions.changeTextBoxBorderToError((bookData.batch.id === undefined || bookData.batch.id === null) ? "" : bookData.batch.id, "batch");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bookData.department.id === undefined || bookData.department.id === null || bookData.department.id === "")
      {
          commonFunctions.changeTextBoxBorderToError((bookData.department.id === undefined || bookData.department.id === null) ? "" : bookData.department.id, "department");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bookData.library.id === undefined || bookData.library.id === null || bookData.library.id === "")
      {
          commonFunctions.changeTextBoxBorderToError((bookData.library.id === undefined || bookData.library.id === null) ? "" : bookData.library.id, "library");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(bookData.student.id === undefined || bookData.student.id === null || bookData.student.id === "")
      {
          commonFunctions.changeTextBoxBorderToError((bookData.student.id === undefined || bookData.student.id === null) ? "" : bookData.student.id, "student");
          errorMessage = ERROR_MESSAGE_FIELD_MISSING;
          isValid = false;
      }
      if(isValid){
          isValid = this.validateDates(bObj.issueDate, bObj.dueDate);
          if(isValid === false){
              errorMessage = ERROR_MESSAGE_DATES_OVERLAP;
          }
       }
     this.setState({
          errorMessage: errorMessage
      });
      return isValid; 
  } 
    validateDates(issueDate: any, dueDate: any){
        let id = moment(issueDate, "YYYY-MM-DD");
        let dd = moment(dueDate, "YYYY-MM-DD");
        if (dd.isSameOrBefore(id) || id.isSameOrAfter(dd)) {
            return false;
        }
        return true;
    }
    // create() {
    //   let {count, countParticularDiv } = this.state;
    //   // console.log("Create method: branchId: "+branchId+", ayId: "+academicYearId+", deptId: "+departmentId);
    //   countParticularDiv = 0;
    //   count = [];
    //   this.setState({
    //     countParticularDiv,
    //     count,
    //   });
  
    //   let fCatGrid: any = document.querySelector('#crdiv');
    //   fCatGrid.setAttribute('class', 'grid');
    //   let fCatGrida: any = document.querySelector('#lidiv');
    //   fCatGrida.setAttribute('class', 'hide');
    //   let createbtns: any = document.querySelector('#createbtn');
    //   createbtns.setAttribute('class', 'hide');
    //   let backbtn: any = document.querySelector('#backbtn');
    //   backbtn.setAttribute('class', 'btn btn-primary m-r-1');
    // }
    // back() {
    //   let {count, countParticularDiv} = this.state;
    //   countParticularDiv = 0;
    //   count = [];
    //   this.setState({
    //     countParticularDiv,
    //     count,
    //   });
    //   let fCatGrid: any = document.querySelector('#crdiv');
    //   fCatGrid.setAttribute('class', 'hide');
    //   let fCatGrida: any = document.querySelector('#lidiv');
    //   fCatGrida.setAttribute('class', 'p-1 page-body legal-entities-main-container');
    //   let createbtns: any = document.querySelector('#createbtn');
    //   createbtns.setAttribute('class', 'btn btn-primary m-r-1');
    //   let backbtn: any = document.querySelector('#backbtn');
    //   backbtn.setAttribute('class', 'hide');
    // }
    // handleStateChange(e: any) {
    //   const {name, value} = e.target;
    //   this.setState({
    //     [name]: value,
    //   });
    // }
    getAddBookInput(bObj: any){
      const{bookData} = this.state;
        let bInput = {
            id:    bObj.id !== null || bObj.id !== undefined || bObj.id !== ''
            ? bObj.id
            : null,
            batchId:bookData.batch.id,
            departmentId:bookData.department.id,
            libraryId:bookData.library.id,
            studentId:bookData.student.id,
            noOfCopiesAvailable: bObj.noOfCopiesAvailable,
            bookStatus: bObj.bookStatus,
            strIssueDate: moment(bObj.issueDate).format("DD-MM-YYYY"),
            strDueDate: moment(bObj.dueDate).format("DD-MM-YYYY"), 
            strReceivedDate: moment(bObj.receivedDate).format("DD-MM-YYYY")           
        };
        return bInput;
    }
    
    async doSave(bInput: any, id: any){
        let btn = document.querySelector("#"+id);
        btn && btn.setAttribute("disabled", "true");
        let exitCode = 0;
        
        await this.props.client.mutate({
            mutation: ADD_BOOK,
            variables: { 
                input: bInput
            },
        }).then((resp: any) => {
            console.log("Success in addBook Mutation. Exit code : "
            ,resp.data.addBook.cmsBookVo.exitCode
            );
            exitCode = resp.data.addBook.cmsBookVo.exitCode;
            let temp = resp.data.addBook.cmsBookVo.dataList; 
            console.log("New Book list : ", temp);
            this.setState({
                bList: temp
            });
        }).catch((error: any) => {
            exitCode = 1;
            console.log('Error in addBook : ', error);
        });
        btn && btn.removeAttribute("disabled");
        let errorMessage = "";
        let successMessage = "";
        if(exitCode === 0 ){
            successMessage = SUCCESS_MESSAGE_BOOK_ADDED;
            if(bInput.id !== null){
                successMessage = SUCCESS_MESSAGE_BOOK_UPDATED;
            }
        }else {
            errorMessage = ERROR_MESSAGE_SERVER_ERROR;
        }
        this.setState({
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    }

    addBook = (e: any) => {
      const { id } = e.nativeEvent.target;
      const {bObj,bookData} = this.state;
      let isValid = this.validateField(bObj,bookData);
      if(isValid === false){
          return;
      }
      const bInput = this.getAddBookInput(bObj);
      this.doSave(bInput, id);
  }
    
  checkAll(e: any) {
    const {BookList} = this.state;
    let chkAll = e.nativeEvent.target.checked;
    let els = document.querySelectorAll('input[type=checkbox]');

    var empty = [].filter.call(els, function(el: any) {
      if (chkAll) {
        el.checked = true;
      } else {
        el.checked = false;
      }
    });
  }

  onClickCheckbox(index: any, e: any) {
    const {id} = e.nativeEvent.target;
    let chkBox: any = document.querySelector('#' + id);
    chkBox.checked = e.nativeEvent.target.checked;
  }
render() {
const {isModalOpen, bList, activeTab,bookData, bObj,createLibraryFilterDataCache, errorMessage, successMessage,departmentId} = this.state;
return (
  <section className="tab-container">
      {
          errorMessage !== ""  ? 
              <MessageBox id="mbox" message={errorMessage} activeTab={2}/>        
              : null
      }
      {
          successMessage !== ""  ? 
              <MessageBox id="mbox" message={successMessage} activeTab={1}/>        
              : null
      }
 <div className="bg-heading px-1 dfinline m-b-1">
   <h5 className="mtf-8 dark-gray">Library Managementt</h5>
 </div>
 <div id="headerRowDiv" className="b-1 h5-fee-bg j-between">
   <div className="m-1 fwidth">Edit Issue Book Data</div>
   <div id="saveLibraryCatDiv" className="fee-flex">
     <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.addBook} style={{ width: '140px' }}>Add Book</button>
     {/* <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.addLibrary} style={{ width: '170px' }}>Update Book</button> */}
   </div>
 </div>
 <div id="feeCategoryDiv" className="b-1">
  <div className="b1 row m-1 j-between">
  <div>
     <label className="gf-form-label b-0 bg-transparent">Department<span style={{ color: 'red' }}> * </span></label>
     <select required name="department" id="department" onChange={this.onChange}  value={bookData.department.id} className="fwidth" style={{ width: '250px' }}>
       {/* {this.createDepartment(createLibraryFilterDataCache.departments)} */}
       {/* {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.departments !== null &&
                  createLibraryFilterDataCache.departments !== undefined
                    ? this.createDepartment(
                        createLibraryFilterDataCache.departments
                      )
                    : null} */}
       {this.createDepartment(this.state.departments)}
     </select>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">Year<span style={{ color: 'red' }}> * </span></label>
     <select required name="batch" id="batch" onChange={this.onChange}  value={bookData.batch.id} className="fwidth" style={{ width: '250px' }}>
        {/* {this.createBatch(createLibraryFilterDataCache.batches)}       */}
        {/* {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.batches !== null &&
                  createLibraryFilterDataCache.batches !== undefined
                    ? this.createBatch(
                        createLibraryFilterDataCache.batches
                      )
                    : null} */}
       {this.createBatch(this.state.batches)}

     </select>
    </div>
    <div>
    <label className="gf-form-label b-0 bg-transparent">Student<span style={{ color: 'red' }}> * </span></label>
    <select required name="student" id="student" onChange={this.onChange}  value={bookData.student.id} className="fwidth" style={{ width: '250px' }}>
      {/* {this.createStudent(createLibraryFilterDataCache.students)} */}
      {/* {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.students !== null &&
                  createLibraryFilterDataCache.students !== undefined
                    ? this.createStudent(
                        createLibraryFilterDataCache.students
                      )
                    : null} */}
        {this.createStudent(this.state.students)}

    </select>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">Book<span style={{ color: 'red' }}> * </span></label>
     <select required name="library" id="library" onChange={this.onChange}  value={bookData.library.id} className="fwidth" style={{ width: '250px' }}>
        {/* {this.createLibrary(createLibraryFilterDataCache.libraries)} */}
        {/* {createLibraryFilterDataCache !== null &&
         createLibraryFilterDataCache !== undefined &&
         createLibraryFilterDataCache.libraries !== null &&
         createLibraryFilterDataCache.libraries !== undefined
            ? this.createLibrary(
             createLibraryFilterDataCache.libraries
         )
        : null} */}
      {this.createLibrary(this.state.libraries)}
     </select>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">issueDate <span style={{ color: 'red' }}> * </span></label>
     <input type="Date" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={bObj.issueDate} placeholder="issueDate" name="issueDate" id="issueDate"/>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">dueDate <span style={{ color: 'red' }}> * </span></label>
     <input type="Date" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={bObj.dueDate} placeholder="dueDate" name="dueDate" id="dueDate"/>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">receivedDate <span style={{ color: 'red' }}> * </span></label>
     <input type="Date" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={bObj.receivedDate} placeholder="receivedDate" name="receivedDate" id="receivedDate"/>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">noOfCopiesAvailable</label>
     <input type="text"  className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={bObj.noOfCopiesAvailable} placeholder="noOfCopiesAvailable" name="noOfCopiesAvailable" id="noOfCopiesAvailable"/>
    </div>
    <div>
     <label  className="gf-form-label b-0 bg-transparent">bookStatus<span style={{ color: 'red' }}> * </span></label>
     <select  name="bookStatus" id="bookStatus" onChange={this.onChange} value={bObj.bookStatus} className="fwidth" style={{ width: '250px' }}>
      <option key={""} value={""}>Select bookStatus</option>
      <option key={"ISSUED"} value={"ISSUED"}>ISSUED</option>
      <option key={"RETURNED"} value={"RETURNED"}>RETURNED</option>
     </select>
    </div>
   </div>
 </div>
 {/* <div id="LibraryGrid" className="b-1">
   <table className="fwidth" id="Librarytable">
     <thead >
      <tr>
       <th>Id</th>
       <th>rowName</th>
       <th>bookTitle</th>
       <th>bookNo</th>
       <th>author</th>
       <th>noOfCopies</th>
       <th>Edit</th>
      </tr>
     </thead>
     <tbody>
        { this.createRows(lbList) }
     </tbody>
   </table>
 </div> */}
</section>
  );
}
}


export default withApollo(Book);