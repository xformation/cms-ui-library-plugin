import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../css/custom.css";
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { ADD_ISSUE_BOOK } from '../_queries';
import * as moment from 'moment';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

export interface IssueBookProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any;
    issueBookList?: any;  
    bookList?: any;
    batch?:any;
    student?:any;
    branchId: any;
    departmentId: any;
    createLibraryDataCache?: any;
}

const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in library service, issuebook could not be saved. Please check library service logs";
const SUCCESS_MESSAGE_ISSUEBOOK_ADDED = "New issuebook saved successfully";
const SUCCESS_MESSAGE_ISSUEBOOK_UPDATED = "IssueBook updated successfully";
const ERROR_MESSAGE_DATES_OVERLAP = "Due Date cannot be prior or same as Issue date";
const ERROR_MESSAGE_DATE_OVERLAP = "Received Date cannot be prior to Issue date";


class IssueBook<T = {[data: string]: any}> extends React.Component<IssueBookProps, any> {
    constructor(props: IssueBookProps) {
        super(props);
        this.state = {
          issueBookList: this.props.issueBookList,
          createLibraryDataCache: this.props.createLibraryDataCache,
          bookList: this.props.bookList,
          branchId: null,
          departmentId: null,
            isModalOpen: false,
            issueBookObj: {
              issueDate:"",
              dueDate:"",
              receivedDate: "",
              bookStatus:"",
              bookId:"",
              batchId:"",
              studentId:"",
              batch:{
                id:"",
               },
               student:{
                id:"",
              },
            },
            errorMessage: "",
            successMessage: "",
            modelHeader: ""
        };
        this.createBatch = this.createBatch.bind(this); 
        this.createStudent = this.createStudent.bind(this); 
        this.registerSocket = this.registerSocket.bind(this);
            this.isDatesOverlap = this.isDatesOverlap.bind(this);

    }

    async componentDidMount(){
        await this.registerSocket();
    }

    registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();
    
        socket.onmessage = (response: any) => {
            let message = JSON.parse(response.data);
            console.log("IssueBook page. message received from server ::: ", message);
            this.setState({
                branchId: message.selectedBranchId,
                academicYearId: message.selectedAcademicYearId,
                departmentId: message.selectedDepartmentId,
            });
            console.log("IssueBook page. branchId: ",this.state.branchId);
            console.log("IssueBook page. ayId: ",this.state.academicYearId);  
            console.log("IssueBook page. departmentId: ",this.state.departmentId);  
        }
    
        socket.onopen = () => {
            console.log("IssueBook page. Opening websocekt connection to cmsbackend. User : ",new URLSearchParams(location.search).get("signedInUser"));
            socket.send(new URLSearchParams(location.search).get("signedInUser"));
        }
    
        window.onbeforeunload = () => {
            console.log("IssueBook page. Closing websocket connection with cms backend service");
        }
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
    
    showDetail(e: any, bShow: boolean, editObj: any, modelHeader: any) {
        e && e.preventDefault();
        const { issueBookObj } = this.state;
        issueBookObj.id = editObj.id;
        // issueBookObj.noOfCopies = editObj.noOfCopies;
        issueBookObj.bookStatus = editObj.bookStatus;
        issueBookObj.bookId = editObj.bookId;
        issueBookObj.studentId = editObj.studentId;
        issueBookObj.batchId = editObj.batchId;
        issueBookObj.issueDate = moment(editObj.strIssueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        issueBookObj.dueDate =moment(editObj.strDueDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        if(editObj.strReceivedDate !== null && editObj.strReceivedDate !== undefined){
            issueBookObj.receivedDate =moment(editObj.strReceivedDate,"DD-MM-YYYY").format("YYYY-MM-DD");
        }
    
        this.setState(() => ({
            isModalOpen: bShow,
            issueBookObj: issueBookObj,
            modelHeader: modelHeader,
            errorMessage: "",
            successMessage: "",
        }));
    }
    isDatesOverlap(dueDate: any, receivedDate: any) {
      if (receivedDate.isBefore(dueDate)) {
        alert('ReceivedDate should not be prior to DueDate.');
        return true;
      }
      return false;
    }
    createRows(objAry: any) {
        const { source } = this.state;
        console.log("createRows() - issuebook list on issuebook page:  ", objAry);
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
                <td>{obj.book.noOfCopies}</td>
                <td>{obj.book.noOfCopiesAvailable}</td>
                <td>{obj.bookStatus}</td>
                <td>{obj.book.bookTitle}</td>
                <td>{(obj.strReceivedDate !== null && obj.strReceivedDate !== undefined) ? obj.strReceivedDate : ""}</td>
                <td>{obj.student.rollNo}</td>
                <td>{obj.student.studentName}</td>
                <td>
                    {
                        <button className="btn btn-primary" onClick={e => this.showDetail(e, true, obj, "Edit IssueBook")}>Edit</button>
                    }
                </td>
              </tr>
            );
        }
        return retVal;
    }

    showModal(e: any, bShow: boolean, headerLabel: any) {
        e && e.preventDefault();
        this.setState(() => ({
            isModalOpen: bShow,
            issueBookObj: {},
            modelHeader: headerLabel,
            errorMessage: "",
            successMessage: "",
        }));
    }

    onChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        const { issueBookObj } = this.state  
        if (name === 'batch') {
          this.setState({
            issueBookObj: {
              ...issueBookObj,
              batch: {
                id: value,
              },
              student:{
                id:'',
              },
            },
          });
        }
        else if (name === 'student') {
          this.setState({
            issueBookObj: {
              ...issueBookObj,
              student: {
                id: value,
              },
            },
          });
        } else {
          this.setState({
            issueBookObj: {
              ...issueBookObj,
              [name]: value,
            },
            errorMessage: '',
            successMessage: '',
          });
        }
        commonFunctions.restoreTextBoxBorderToNormal(name);
    }
  

    
    validateFields(issueBookObj: any){
        const {branchId, departmentId} = this.state;
        let isValid = true;
        let errorMessage = ""
        if(branchId === undefined || branchId === null || branchId === ""){
            errorMessage = "Please select branch from user preferences";
            isValid = false;
            this.setState({
                errorMessage: errorMessage
            });
            return isValid;
        }
        if(departmentId === undefined || departmentId === null || departmentId === ""){
            errorMessage = "Please select department from user preferences";
            isValid = false;
            this.setState({
                errorMessage: errorMessage
            });
            return isValid;
        }
        if(issueBookObj.issueDate === undefined || issueBookObj.issueDate === null || issueBookObj.issueDate === "")
        {
            commonFunctions.changeTextBoxBorderToError((issueBookObj.issueDate === undefined || issueBookObj.issueDate === null) ? "" : issueBookObj.issueDate, "issueDate");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(issueBookObj.dueDate === undefined || issueBookObj.dueDate === null || issueBookObj.dueDate === "")
        {
            commonFunctions.changeTextBoxBorderToError((issueBookObj.dueDate === undefined || issueBookObj.dueDate === null) ? "" : issueBookObj.dueDate, "dueDate");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(issueBookObj.bookStatus === undefined || issueBookObj.bookStatus === null || issueBookObj.bookStatus === "")
        {
            commonFunctions.changeTextBoxBorderToError((issueBookObj.bookStatus === undefined || issueBookObj.bookStatus === null) ? "" : issueBookObj.bookStatus, "bookStatus");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
         }
        if(issueBookObj.bookId === undefined || issueBookObj.bookId === null || issueBookObj.bookId === "")
        {
            commonFunctions.changeTextBoxBorderToError((issueBookObj.bookId === undefined || issueBookObj.bookId === null) ? "" : issueBookObj.bookId, "book");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(issueBookObj.batchId === undefined || issueBookObj.batchId === null || issueBookObj.batchId === ""){
            commonFunctions.changeTextBoxBorderToError((issueBookObj.batchId === undefined || issueBookObj.batchId === null) ? "" : issueBookObj.batchId, "batchId");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
          }
          if(issueBookObj.studentId === undefined || issueBookObj.studentId === null || issueBookObj.studentId === "")
          {
              commonFunctions.changeTextBoxBorderToError((issueBookObj.studentId === undefined || issueBookObj.studentId === null) ? "" : issueBookObj.studentId, "student");
              errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
              isValid = false;
          }
       
          if(isValid){
            isValid = this.validateDates(issueBookObj.issueDate, issueBookObj.dueDate, issueBookObj.receivedDate);
            if(isValid === false){
                errorMessage = ERROR_MESSAGE_DATES_OVERLAP;
                errorMessage = ERROR_MESSAGE_DATE_OVERLAP;
            }
         }
          
  
          this.setState({
              errorMessage: errorMessage
          });
          return isValid; 
  
      }
  
      validateDates(issueDate: any, dueDate: any, receivedDate:any){
        let id = moment(issueDate, "YYYY-MM-DD");
        let dd = moment(dueDate, "YYYY-MM-DD");
        let rd = moment(receivedDate, "YYYY-MM-DD");
        if (dd.isSameOrBefore(id) || id.isSameOrAfter(dd) || rd.isBefore(id)) {
          return false;
        }
         return true;
        }

    getInput(issueBookObj: any, modelHeader: any){
        const {branchId, departmentId} = this.state;
        let id = null;
        let noOfCopiesAvailable = null;
        let strReceivedDate = null;
        if(modelHeader === "Edit IssueBook"){
            id = issueBookObj.id;
            strReceivedDate = moment(issueBookObj.receivedDate).format("DD-MM-YYYY")
        }
        let ayInput = {
            id: id,
            batchId:issueBookObj.batchId,
            studentId:issueBookObj.studentId,
            bookId:issueBookObj.bookId,
            departmentId: departmentId,
            branchId: branchId,
            bookStatus: issueBookObj.bookStatus,
            strIssueDate: moment(issueBookObj.issueDate).format("DD-MM-YYYY"),
            strDueDate: moment(issueBookObj.dueDate).format("DD-MM-YYYY"), 
            strReceivedDate: moment(issueBookObj.receivedDate).format("DD-MM-YYYY"),           
        };
        return ayInput;
    }
    
    async doSave(issueBookInput: any, id: any){
        let btn = document.querySelector("#"+id);
        btn && btn.setAttribute("disabled", "true");
        let exitCode = 0;
        
        await this.props.client.mutate({
            mutation: ADD_ISSUE_BOOK,
            variables: { 
                input: issueBookInput
            },
        }).then((resp: any) => {
            console.log("Success in saveIssueBook Mutation. Exit code : ",resp.data.addIssueBook.cmsIssueBookVo.exitCode);
            exitCode = resp.data.addIssueBook.cmsIssueBookVo.exitCode;
            let temp = resp.data.addIssueBook.cmsIssueBookVo.dataList; 
            console.log("New IssueBookList list : ", temp);
            this.setState({
                issueBookList: temp
            });
        }).catch((error: any) => {
            exitCode = 1;
            console.log('Error in saveIssueBook : ', error);
        });
        btn && btn.removeAttribute("disabled");
        
        let errorMessage = "";
        let successMessage = "";
        if(exitCode === 0 ){
            successMessage = SUCCESS_MESSAGE_ISSUEBOOK_ADDED;
            if(issueBookInput.id !== null){
                successMessage = SUCCESS_MESSAGE_ISSUEBOOK_UPDATED;
            }
        }else {
            errorMessage = ERROR_MESSAGE_SERVER_SIDE_ERROR;
        }
        this.setState({
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    }

    saveIssueBook = (e: any) => {
        const { id } = e.nativeEvent.target;
        const {issueBookObj, modelHeader} = this.state;
        e.preventDefault();
        issueBookObj.errorMessage = "";

        let isValid = this.validateFields(issueBookObj);
        if(isValid === false){
            return;
        }
        const issueBookInput = this.getInput(issueBookObj, modelHeader);
        this.doSave(issueBookInput, id);
    }

    render() {
        const {issueBookList, isModalOpen,issueBookObj,bookList,createLibraryDataCache, modelHeader, errorMessage, successMessage} = this.state;
          return (
              <main>
                  <Modal isOpen={isModalOpen} className="react-strap-modal-container">
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
                               <select required name="studentId" id="studentId" onChange={this.onChange}  value={issueBookObj.studentId} className="gf-form-label b-0 bg-transparent">
                                   {this.createStudent(createLibraryDataCache.students)}
                                 </select>
                               </div>
                               <div className="fwidth-modal-text m-r-1">
                                 <label htmlFor="">Year<span style={{ color: 'red' }}> * </span></label>
                                  <select required name="batchId" id="batchId" onChange={this.onChange}  value={issueBookObj.batchId} className="gf-form-label b-0 bg-transparent">
                                     {this.createBatch(createLibraryDataCache.batches)}
                                </select>
                               </div>
                             </div>
                             <div className="mdflex modal-fwidth">
                               <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Book<span style={{ color: 'red' }}> * </span></label>
                                        <select name="bookId" id="bookId" onChange={this.onChange} value={issueBookObj.bookId} className="gf-form-label b-0 bg-transparent">
                                        <option value="">Select Book</option>
                                        {
                                            commonFunctions.createSelectbox(bookList, "id", "id", "bookTitle")
                                        }
                                        </select>
                                 </div> 
                                 {/* <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">No Of Copies<span style={{ color: 'red' }}> * </span></label>
                                        <select name="bookId" id="bookId" onChange={this.onChange} value={issueBookObj.bookId} className="gf-form-label b-0 bg-transparent">
                                        <option value="">Select No Of Copies</option>
                                        {
                                            commonFunctions.createSelectbox(bookList, "id", "id", "noOfCopies")
                                        }
                                        </select>
                                 </div> */}
                               </div>
                               <div className="mdflex modal-fwidth">
                               <div className="fwidth-modal-text m-r-1">
                                 <label className="gf-form-label b-0 bg-transparent">IssueDate <span style={{ color: 'red' }}> * </span></label>
                              <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={issueBookObj.issueDate} placeholder="issueDate" name="issueDate" id="issueDate" maxLength={255} />
                               </div>
                              <div className="fwidth-modal-text m-r-1">
                                <label className="gf-form-label b-0 bg-transparent">DueDate <span style={{ color: 'red' }}> * </span></label>
                                 <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={issueBookObj.dueDate} placeholder="dueDate" name="dueDate" id="dueDate" maxLength={255} />
                               </div>
                               </div>
                               {/* <div className="fwidth-modal-text m-r-1 ">
                                  <label className="gf-form-label b-0 bg-transparent">No Of Copies<span style={{ color: 'red' }}> * </span></label>
                                  <input type="text"  className="gf-form-input" onChange={this.onChange}  value={issueBookObj.noOfCopies} placeholder="noOfCopies" name="noOfCopies" id="noOfCopies" maxLength={250}/>
                                </div>  */}
                              
                               {
                                        modelHeader === "Edit IssueBook" ? 
                              <div className="fwidth-modal-text">
                                <label className="gf-form-label b-0 bg-transparent">Received Date <span style={{ color: 'red' }}> * </span></label>
                                   <input type="Date" required className="gf-form-input" onChange={this.onChange}  value={issueBookObj.receivedDate} placeholder="receivedDate" name="receivedDate" id="receivedDate" maxLength={255} />
                                        </div>
                                        : <div className="fwidth-modal-text">&nbsp;</div>
                                    } 
                               
                                <div className="fwidth-modal-text">
                                  <label  className="gf-form-label b-0 bg-transparent">bookStatus<span style={{ color: 'red' }}> * </span></label>
                                   <select required name="bookStatus" id="bookStatus" onChange={this.onChange} value={issueBookObj.bookStatus} className="gf-form-input">
                                       <option key={""} value={""}>Select bookStatus</option>
                                       <option key={"ISSUED"} value={"ISSUED"}>ISSUED</option>
                                       <option key={"RECEIVED"} value={"RECEIVED"}>RECEIVED</option>
                                       <option key={"NOTRECEIVED"} value={"NOTRECEIVED"}>NOTRECEIVED</option>
                                   </select>
                              </div>
                            
                               <div className="m-t-1 text-center">
                                       {
                                          modelHeader === "Add IssueBook" ?
                                          <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.saveIssueBook} >Save</button>
                                          :
                                          <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.saveIssueBook}>Save</button>
                                      }
                                      &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false, modelHeader)}>Cancel</button>
                             
                                  </div>
                              </div>
                          </form>  
                      </ModalBody>
                  </Modal>              
                  <button className="btn btn-primary" style={{width:'150px'}} onClick={e => this.showModal(e, true, "Add New Book")}>
                  <i className="fa fa-plus-circle"></i> Issue Book
                  </button>
                  {
                issueBookList !== null && issueBookList !== undefined && issueBookList.length > 0 ?
                <div style={{width:'100%', height:'250px', overflow:'auto'}}>
                <table id="bTable" className="striped-table fwidth bg-white p-2 m-t-1">
              <thead>
                  <tr>
                  <th>id</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>NoOfCopies</th>
                  <th>NoOfCopiesAvailable</th>
                  <th>Book Status</th>
                  <th>Book Title</th>
                  <th>Received Date</th>
                  <th>Student RollNo</th>
                  <th>Student Name</th>
                  <th>Edit</th>
                  </tr>
              </thead>
              <tbody>
                  { this.createRows(issueBookList) }
              </tbody>
          </table>
      </div>
      : null
      }  
    </main>
          );
      }
  }
  
  export default withApollo(IssueBook);