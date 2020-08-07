import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../css/custom.css";
import '../../../css/college-settings.css';
import '../../../css/tabs.css'; 
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { ADD_BOOK } from '../_queries';
import moment = require('moment');
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';


export interface BookProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any; 
    bList?:any;
    batch?:any;
    bookData?:any;
    department?:any;
    library?:any;
    student?:any;
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
            errorMessage: "",
            successMessage: "",
            bObj:{
            issueDate:"",
            dueDate:"",
            noOfCopiesAvailable:"",
            bookStatus:"",
            // receivedDate:"",
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
             department:"",
            modelHeader: ""
        };  
        this.createDepartment = this.createDepartment.bind(this); 
        this.createBatch = this.createBatch.bind(this); 
        this.createStudent = this.createStudent.bind(this); 
        this.createLibrary = this.createLibrary.bind(this); 
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

    createDepartment(departments: any) {
        let departmentsOptions = [
          <option key={0} value="">
            Select department
          </option>,
        ];
        for (let i = 0; i < departments.length; i++) {
            departmentsOptions.push(
            <option key={departments[i].id} value={departments[i].id}>
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
            librariesOptions.push(
            <option key={libraries[i].id} value={libraries[i].id}>
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
            studentsOptions.push(
            <option key={students[i].id} value={students[i].id}>
              {students[i].rollNo}
            </option>
          );
        }
        return studentsOptions;
      }
    // showDetails(e: any, bShow: boolean, editObj: any, modelHeader: any) {
    //     e && e.preventDefault();
    //     const { bObj } = this.state;
    //     bObj.id = editObj.id;
    //     bObj.batchId =editObj.batchId;
    //     bObj.departmentId =editObj.departmentId;
    //     bObj.libraryId =editObj.libraryId;
    //     bObj.studentId =editObj.studentId;
    //     bObj.bookStatus = editObj.bookStatus;
    //     bObj.noOfCopiesAvailable = editObj.noOfCopiesAvailable;
    //     bObj.issueDate = moment(editObj.strIssueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
    //     bObj.dueDate =moment(editObj.strDueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
    //     // bObj.receivedDate = moment(editObj.strReceivedDate,"DD-MM-YYYY").format("YYYY-MM-DD");
    //     this.setState(() => ({
    //         isModalOpen: bShow,
    //         bObj: bObj,
    //         modelHeader: modelHeader,
    //         errorMessage: "",
    //         successMessage: "",
    //     }));
    // }
    // createRow(objAry: any) {
    //     const { source } = this.state;
    //     console.log("createRow() - book list on book page:  ", objAry);
    //     if(objAry === undefined || objAry === null) {
    //         return;
    //     }
    //     const aryLength = objAry.length;
    //     const retVal = [];
    //     for (let i = 0; i < aryLength; i++) {
    //         const obj = objAry[i];
    //         retVal.push(
    //           <tr >
    //             <td>{obj.id}</td>
    //             <td>{obj.strIssueDate}</td>
    //             <td>{obj.strDueDate}</td>
    //             <td>{obj.noOfCopiesAvailable}</td>
    //             <td>{obj.bookStatus}</td>
    //             {/* <td>{obj.strIssueDate}</td> */}
    //             {/* <td>{obj.strDueDate}</td> */}
    //             {/* <td>{obj.strReceivedDate}</td> */}
    //             {/* <td>{obj.vehicle.vehicleNumber}</td> */}
    //             <td>
    //                 {
    //                     <button className="btn btn-primary" onClick={e => this.showDetails(e, true, obj, "Edit Book")}>Edit</button>
    //                 }
    //             </td>
    //           </tr>
    //         );
    //     }
    //     return retVal;
    // }

    // showModals(e: any, bShow: boolean, headerLabel: any) {
    //     e && e.preventDefault();
    //     this.setState(() => ({
    //         isModalOpen: bShow,
    //         bObj: {},
    //         modelHeader: headerLabel,
    //         errorMessage: "",
    //         successMessage: "",
    //     }));
    // }

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

    // isMandatoryField(objValue: any, obj: any){
    //     let errorMessage = "";
    //     if(objValue === undefined || objValue === null || objValue.trim() === ""){
    //       let tempVal = "";
    //       commonFunctions.changeTextBoxBorderToError(tempVal, obj);
    //       errorMessage = ERROR_MESSAGE_FIELD_MISSING;
    //     }
    //     return errorMessage;
    //   }

    // validateFields(){
    //     let errorMessage=''
    //     const{bookData,bObj} = this.state;
    //     errorMessage = this.isMandatoryField(bObj.issueDate, "issueDate");
    //     errorMessage = this.isMandatoryField(bObj.dueDate, "dueDate");
    //     errorMessage = this.isMandatoryField(bObj.noOfCopiesAvailable, "noOfCopiesAvailable");
    //     errorMessage = this.isMandatoryField(bObj.bookStatus, "bookStatus");
    //     errorMessage = this.isMandatoryField(bookData.department.id, "department");
    //     errorMessage = this.isMandatoryField(bookData.student.id, "student");
    //     errorMessage = this.isMandatoryField(bookData.library.id, "library");
    //     errorMessage = this.isMandatoryField(bookData.batch.id, "batch");
    //     this.setState({
    //         errorMessage: errorMessage,
    //       });
      
    //       if (errorMessage !== '') {
    //         return false;
    //       }
    //    if(errorMessage !==  ''){
    //     //    errorMessage = this.validateDates(bObj.issueDate, bObj.dueDate);
    //     //     if(errorMessage === false){
    //             errorMessage = ERROR_MESSAGE_DATES_OVERLAP;
    //         // }
    //      }
    // }
    validateDates(issueDate: any, dueDate: any){
        let id = moment(issueDate, "YYYY-MM-DD");
        let dd = moment(dueDate, "YYYY-MM-DD");
        if (dd.isSameOrBefore(id) || id.isSameOrAfter(dd)) {
            return false;
        }
        return true;
    }
    
    getAddBookInput(bObj: any){
        const{bookData}=this.state;
        let id = null;
        let bInput = {
            id:id,
            batchId:bookData.batch.id,
            departmentId:bookData.department.id,
            libraryId:bookData.library.id,
            studentId:bookData.student.id,
            noOfCopiesAvailable: bObj.noOfCopiesAvailable,
            bookStatus: bObj.bookStatus,
            strIssueDate: moment(bObj.issueDate).format("DD-MM-YYYY"),
            strDueDate: moment(bObj.dueDate).format("DD-MM-YYYY"),            
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
            console.log("Success in addBook Mutation. Exit code : ",resp.data.addBook.cmsBookVo.exitCode);
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
    render() {
        const {bList, isModalOpen,bObj,createLibraryFilterDataCache, bookData, errorMessage, successMessage} = this.state;
        return (
//             <main>
//                 <Modal isOpen={isModalOpen} className="react-strap-modal-container" style={{height:"600px", overflow:"auto"}}>
//                     <ModalHeader>{modelHeader}</ModalHeader>
//                     <ModalBody className="modal-content">
                        

//                         <form className="gf-form-group section m-0 dflex">
//                             <div className="modal-fwidth">
//                             {
//                                 errorMessage !== ""  ? 
//                                     <MessageBox id="mbox" message={errorMessage} activeTab={2}/>        
//                                     : null
//                             }
//                             {
//                                 successMessage !== ""  ? 
//                                     <MessageBox id="mbox" message={successMessage} activeTab={1}/>        
//                                     : null
//                             }
//                             <div className="mdflex modal-fwidth">
//                               <div className="fwidth-modal-text m-r-1">
//                                 <label htmlFor="">Student<span style={{ color: 'red' }}> * </span></label>
//                                  <select required name="studentId" id="studentId" onChange={this.onChange}  value={bObj.studentId} className="gf-form-label b-0 bg-transparent">
//                                    {this.createStudent(createLibraryFilterDataCache.students)}
//                                 </select>
//                               </div>
//                               <div className="fwidth-modal-text m-r-1">
//                                 <label htmlFor="">Book<span style={{ color: 'red' }}> * </span></label>
//                                  <select required name="libraryId" id="libraryId" onChange={this.onChange}  value={bObj.libraryId} className="gf-form-label b-0 bg-transparent">
//                                     {this.createLibrary(createLibraryFilterDataCache.libraries)}
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="mdflex modal-fwidth">
//                               <div className="fwidth-modal-text m-r-1">
//                                 <label htmlFor="">Department<span style={{ color: 'red' }}> * </span></label>
//                                  <select required name="departmentId" id="departmentId" onChange={this.onChange}  value={bObj.departmentId} className="gf-form-label b-0 bg-transparent">
//                                    {this.createDepartment(createLibraryFilterDataCache.departments)}
//                                  </select>
//                               </div>
//                               <div className="fwidth-modal-text m-r-1">
//                                 <label htmlFor="">Year<span style={{ color: 'red' }}> * </span></label>
//                                  <select required name="batchId" id="batchId" onChange={this.onChange}  value={bObj.batchId} className="gf-form-label b-0 bg-transparent">
//                                     {this.createBatch(createLibraryFilterDataCache.batches)}
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="fwidth-modal-text m-r-1">
//                               <label className="gf-form-label b-0 bg-transparent">issueDate <span style={{ color: 'red' }}> * </span></label>
//                               <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={bObj.issueDate} placeholder="issueDate" name="issueDate" id="issueDate" maxLength={255} />
//                             </div>
//                             <div className="fwidth-modal-text m-r-1">
//                               <label className="gf-form-label b-0 bg-transparent">dueDate <span style={{ color: 'red' }}> * </span></label>
//                               <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={bObj.dueDate} placeholder="dueDate" name="dueDate" id="dueDate" maxLength={255} />
//                             </div>
//                             <div className="fwidth-modal-text m-r-1 ">
//                                <label className="gf-form-label b-0 bg-transparent">noOfCopiesAvailable</label>
//                                <input type="text"  className="gf-form-input" onChange={this.onChange}  value={bObj.noOfCopiesAvailable} placeholder="noOfCopiesAvailable" name="noOfCopiesAvailable" id="noOfCopiesAvailable" maxLength={255}/>
//                              </div> 
//                              <div className="fwidth-modal-text">
//                                <label  className="gf-form-label b-0 bg-transparent">bookStatus<span style={{ color: 'red' }}> * </span></label>
//                                 <select required name="bookStatus" id="bookStatus" onChange={this.onChange} value={bObj.bookStatus} className="gf-form-input">
//                                     <option key={""} value={""}>Select bookStatus</option>
//                                     <option key={"RECEIVED"} value={"RECEIVED"}>RECEIVED</option>
//                                     <option key={"NOTRECEIVED"} value={"NOTRECEIVED"}>NOTRECEIVED</option>
//                                 </select>
//                             </div>
//                             <div className="m-t-1 text-center">
//                                     {
//                                         modelHeader === "Add Book" ?
//                                         <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.addBook} >Save</button>
//                                         :
//                                         <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.addBook}>Save</button>
//                                     }
//                                     &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModals(e, false, modelHeader)}>Cancel</button>
                           
//                                 </div>
//                             </div>
//                         </form>  
//                     </ModalBody>
//                 </Modal>              
//                 <button className="btn btn-primary" style={{width:'200px'}} onClick={e => this.showModals(e, true, "Add New Book")}>
//                 <i className="fa fa-plus-circle"></i> Add New Book
//                 </button>
//                 {
//               bList !== null && bList !== undefined && bList.length > 0 ?
//               <div style={{width:'100%', height:'250px', overflow:'auto'}}>
//               <table id="bTable" className="striped-table fwidth bg-white p-2 m-t-1">
//             <thead>
//                 <tr>
//                 <th>id</th>
//                 <th>issueDate</th>
//                 <th>dueDate</th>
//                 <th>noOfCopiesAvailable</th>
//                 <th>bookStatus</th>
//                 <th>Edit</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 { this.createRow(bList) }
//             </tbody>
//         </table>
//     </div>
//     : null
//     }  
//   </main>
<section className="plugin-bg-white p-1">
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
   <div className="m-1 fwidth">Add Issue Book Data</div>
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
       {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.departments !== null &&
                  createLibraryFilterDataCache.departments !== undefined
                    ? this.createDepartment(
                        createLibraryFilterDataCache.departments
                      )
                    : null}
     </select>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">Year<span style={{ color: 'red' }}> * </span></label>
     <select required name="batch" id="batch" onChange={this.onChange}  value={bookData.batch.id} className="fwidth" style={{ width: '250px' }}>
        {/* {this.createBatch(createLibraryFilterDataCache.batches)}       */}
        {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.batches !== null &&
                  createLibraryFilterDataCache.batches !== undefined
                    ? this.createBatch(
                        createLibraryFilterDataCache.batches
                      )
                    : null}
     </select>
    </div>
    <div>
    <label className="gf-form-label b-0 bg-transparent">Student<span style={{ color: 'red' }}> * </span></label>
    <select required name="student" id="student" onChange={this.onChange}  value={bookData.student.id} className="fwidth" style={{ width: '250px' }}>
      {/* {this.createStudent(createLibraryFilterDataCache.students)} */}
      {createLibraryFilterDataCache !== null &&
                  createLibraryFilterDataCache !== undefined &&
                  createLibraryFilterDataCache.students !== null &&
                  createLibraryFilterDataCache.students !== undefined
                    ? this.createStudent(
                        createLibraryFilterDataCache.students
                      )
                    : null}
    </select>
    </div>
    <div>
     <label className="gf-form-label b-0 bg-transparent">Book<span style={{ color: 'red' }}> * </span></label>
     <select required name="library" id="library" onChange={this.onChange}  value={bookData.library.id} className="fwidth" style={{ width: '250px' }}>
        {/* {this.createLibrary(createLibraryFilterDataCache.libraries)} */}
        {createLibraryFilterDataCache !== null &&
         createLibraryFilterDataCache !== undefined &&
         createLibraryFilterDataCache.libraries !== null &&
         createLibraryFilterDataCache.libraries !== undefined
            ? this.createLibrary(
             createLibraryFilterDataCache.libraries
         )
        : null}
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
       <th>clNo</th>
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