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
             student:"",
             library:"",
             batch:"",
             department:"",
            errorMessage: "",
            successMessage: "",
            modelHeader: ""
        };  
        this.createDepartment = this.createDepartment.bind(this); 
        this.createBatch = this.createBatch.bind(this); 
        this.createStudent = this.createStudent.bind(this); 
        this.createLibrary = this.createLibrary.bind(this); 
    }
    async registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();
    
        socket.onmessage = (response: any) => {
          let message = JSON.parse(response.data);
          console.log('Book index. message received from server ::: ', message);
          this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
          });
          console.log('Book index. branchId: ', this.state.branchId);
          console.log('Book index. departmentId: ', this.state.departmentId);
          console.log('Book index. ayId: ', this.state.academicYearId);
        };
    
        socket.onopen = () => {
          console.log("Book index. Opening websocekt connection on index.tsx. User : ",this.state.user.login);
            // this.state.user
            socket.send(this.state.user.login);
        }
        window.onbeforeunload = () => {
          console.log('Book index. Closing websocekt connection on index.tsx');
        };
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
    showDetails(e: any, bShow: boolean, editObj: any, modelHeader: any) {
        e && e.preventDefault();
        const { bObj } = this.state;
        bObj.id = editObj.id;
        bObj.batchId =editObj.batchId;
        bObj.departmentId =editObj.departmentId;
        bObj.libraryId =editObj.libraryId;
        bObj.studentId =editObj.studentId;
        bObj.bookStatus = editObj.bookStatus;
        bObj.noOfCopiesAvailable = editObj.noOfCopiesAvailable;
        bObj.issueDate = moment(editObj.strIssueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        bObj.dueDate =moment(editObj.strDueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        // bObj.receivedDate = moment(editObj.strReceivedDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        this.setState(() => ({
            isModalOpen: bShow,
            bObj: bObj,
            modelHeader: modelHeader,
            errorMessage: "",
            successMessage: "",
        }));
    }
    createRow(objAry: any) {
        const { source } = this.state;
        console.log("createRow() - book list on book page:  ", objAry);
        if(objAry === undefined || objAry === null) {
            return;
        }
        const aryLength = objAry.length;
        const retVal = [];
        for (let i = 0; i < aryLength; i++) {
            const obj = objAry[i];
            retVal.push(
              <tr >
                <td>{obj.id}</td>
                <td>{obj.strIssueDate}</td>
                <td>{obj.strDueDate}</td>
                <td>{obj.noOfCopiesAvailable}</td>
                <td>{obj.bookStatus}</td>
                {/* <td>{obj.strIssueDate}</td> */}
                {/* <td>{obj.strDueDate}</td> */}
                {/* <td>{obj.strReceivedDate}</td> */}
                {/* <td>{obj.vehicle.vehicleNumber}</td> */}
                <td>
                    {
                        <button className="btn btn-primary" onClick={e => this.showDetails(e, true, obj, "Edit Book")}>Edit</button>
                    }
                </td>
              </tr>
            );
        }
        return retVal;
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
        const { bObj } = this.state  
        this.setState({
            bObj: {
                ...bObj,
                [name]: value
            },
            errorMessage: "",
            successMessage: "",
        }); 
        commonFunctions.restoreTextBoxBorderToNormal(name);
    }
    validateField(obj: any){
        let isValid = true;
        let errorMessage = ""
        if(obj.issueDate === undefined || obj.issueDate === null || obj.issueDate === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.issueDate === undefined || obj.issueDate === null) ? "" : obj.issueDate, "issueDate");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.dueDate === undefined || obj.dueDate === null || obj.dueDate === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.dueDate === undefined || obj.dueDate === null) ? "" : obj.dueDate, "dueDate");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.bookStatus === undefined || obj.bookStatus === null || obj.bookStatus === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.bookStatus === undefined || obj.bookStatus === null) ? "" : obj.bookStatus, "bookStatus");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.batchId === undefined || obj.batchId === null || obj.batchId === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.batchId === undefined || obj.batchId === null) ? "" : obj.batchId, "batchId");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.departmentId === undefined || obj.departmentId === null || obj.departmentId === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.departmentId === undefined || obj.departmentId === null) ? "" : obj.departmentId, "departmentId");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.libraryId === undefined || obj.libraryId === null || obj.libraryId === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.libraryId === undefined || obj.libraryId === null) ? "" : obj.libraryId, "libraryId");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(obj.studentId === undefined || obj.studentId === null || obj.studentId === "")
        {
            commonFunctions.changeTextBoxBorderToError((obj.studentId === undefined || obj.studentId === null) ? "" : obj.studentId, "studentId");
            errorMessage = ERROR_MESSAGE_FIELD_MISSING;
            isValid = false;
        }
        if(isValid){
            isValid = this.validateDates(obj.issueDate, obj.dueDate);
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
    
    getAddBookInput(bObj: any, modelHeader: any){
        let id = null;
        if(modelHeader === "Edit Book"){
            id = bObj.id;
        }
        let bInput = {
            id:id,
            batchId:bObj.batchId,
            departmentId:bObj.departmentId,
            libraryId:bObj.libraryId,
            studentId:bObj.studentId,
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
        const {bObj, modelHeader} = this.state;
        let isValid = this.validateField(bObj);
        if(isValid === false){
            return;
        }
        const bInput = this.getAddBookInput(bObj, modelHeader);
        this.doSave(bInput, id);
    }
    render() {
        const {bList, isModalOpen,bObj,createLibraryFilterDataCache, modelHeader, errorMessage, successMessage} = this.state;
        return (
            <main>
                <Modal isOpen={isModalOpen} className="react-strap-modal-container" style={{height:"600px", overflow:"auto"}}>
                    <ModalHeader>{modelHeader}</ModalHeader>
                    <ModalBody className="modal-content">
                        

                        <form className="gf-form-group section m-0 dflex">
                            <div className="modal-fwidth">
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
                            <div className="mdflex modal-fwidth">
                              <div className="fwidth-modal-text m-r-1">
                                <label htmlFor="">Student<span style={{ color: 'red' }}> * </span></label>
                                 <select required name="studentId" id="studentId" onChange={this.onChange}  value={bObj.studentId} className="gf-form-label b-0 bg-transparent">
                                   {this.createStudent(createLibraryFilterDataCache.students)}
                                </select>
                              </div>
                              <div className="fwidth-modal-text m-r-1">
                                <label htmlFor="">Book<span style={{ color: 'red' }}> * </span></label>
                                 <select required name="libraryId" id="libraryId" onChange={this.onChange}  value={bObj.libraryId} className="gf-form-label b-0 bg-transparent">
                                    {this.createLibrary(createLibraryFilterDataCache.libraries)}
                                </select>
                              </div>
                            </div>
                            <div className="mdflex modal-fwidth">
                              <div className="fwidth-modal-text m-r-1">
                                <label htmlFor="">Department<span style={{ color: 'red' }}> * </span></label>
                                 <select required name="departmentId" id="departmentId" onChange={this.onChange}  value={bObj.departmentId} className="gf-form-label b-0 bg-transparent">
                                   {this.createDepartment(createLibraryFilterDataCache.departments)}
                                 </select>
                              </div>
                              <div className="fwidth-modal-text m-r-1">
                                <label htmlFor="">Year<span style={{ color: 'red' }}> * </span></label>
                                 <select required name="batchId" id="batchId" onChange={this.onChange}  value={bObj.batchId} className="gf-form-label b-0 bg-transparent">
                                    {this.createBatch(createLibraryFilterDataCache.batches)}
                                </select>
                              </div>
                            </div>
                            <div className="fwidth-modal-text m-r-1">
                              <label className="gf-form-label b-0 bg-transparent">issueDate <span style={{ color: 'red' }}> * </span></label>
                              <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={bObj.issueDate} placeholder="issueDate" name="issueDate" id="issueDate" maxLength={255} />
                            </div>
                            <div className="fwidth-modal-text m-r-1">
                              <label className="gf-form-label b-0 bg-transparent">dueDate <span style={{ color: 'red' }}> * </span></label>
                              <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={bObj.dueDate} placeholder="dueDate" name="dueDate" id="dueDate" maxLength={255} />
                            </div>
                            <div className="fwidth-modal-text m-r-1 ">
                               <label className="gf-form-label b-0 bg-transparent">noOfCopiesAvailable</label>
                               <input type="text"  className="gf-form-input" onChange={this.onChange}  value={bObj.noOfCopiesAvailable} placeholder="noOfCopiesAvailable" name="noOfCopiesAvailable" id="noOfCopiesAvailable" maxLength={255}/>
                             </div> 
                             <div className="fwidth-modal-text">
                               <label  className="gf-form-label b-0 bg-transparent">bookStatus<span style={{ color: 'red' }}> * </span></label>
                                <select required name="bookStatus" id="bookStatus" onChange={this.onChange} value={bObj.bookStatus} className="gf-form-input">
                                    <option key={""} value={""}>Select bookStatus</option>
                                    <option key={"RECEIVED"} value={"RECEIVED"}>RECEIVED</option>
                                    <option key={"NOTRECEIVED"} value={"NOTRECEIVED"}>NOTRECEIVED</option>
                                </select>
                            </div>
                            <div className="m-t-1 text-center">
                                    {
                                        modelHeader === "Add Book" ?
                                        <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.addBook} >Save</button>
                                        :
                                        <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.addBook}>Save</button>
                                    }
                                    &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModals(e, false, modelHeader)}>Cancel</button>
                           
                                </div>
                            </div>
                        </form>  
                    </ModalBody>
                </Modal>              
                <button className="btn btn-primary" style={{width:'200px'}} onClick={e => this.showModals(e, true, "Add New Book")}>
                <i className="fa fa-plus-circle"></i> Add New Book
                </button>
                {
              bList !== null && bList !== undefined && bList.length > 0 ?
              <div style={{width:'100%', height:'250px', overflow:'auto'}}>
              <table id="bTable" className="striped-table fwidth bg-white p-2 m-t-1">
            <thead>
                <tr>
                <th>id</th>
                <th>issueDate</th>
                <th>dueDate</th>
                <th>noOfCopiesAvailable</th>
                <th>bookStatus</th>
                <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                { this.createRow(bList) }
            </tbody>
        </table>
    </div>
    : null
    }  
  </main>
        );
    }
}

export default withApollo(Book);