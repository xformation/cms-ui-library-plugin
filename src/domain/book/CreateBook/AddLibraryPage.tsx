import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../css/custom.css";
import '../../../css/college-settings.css';
import '../../../css/tabs.css'; 
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import * as moment from 'moment';
import { ADD_LIBRARY } from "./../_queries";
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';


export interface LibraryProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any;
    lbList?: any;
    createLibraryFilterDataCache: null,
    department: any;
}

const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in library service, library could not be saved. Please check vehicle service logs";
const SUCCESS_MESSAGE_LIBRARY_ADDED = "New library saved successfully";
const SUCCESS_MESSAGE_LIBRARY_UPDATED = "library  updated successfully";

class LibraryGrid<T = {[data: string]: any}> extends React.Component<LibraryProps, any> {
    constructor(props: LibraryProps) {
         super(props);
        this.state = {
            lbList: this.props.lbList,
            createLibraryFilterDataCache: this.props.createLibraryFilterDataCache,
            isModalOpen: false,
            lbObj: {
              rowName:"",
              bookTitle:"",
              bookNo:"",
              author:"",
              noOfCopies:"",
              uniqueNo:"",
              departmentId:""
            },
            errorMessage: "",
            successMessage: "",
            modelHeader: "",
            department: "",
        };
        this.createDepartment = this.createDepartment.bind(this);   
    }
    
    async registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();
    
        socket.onmessage = (response: any) => {
          let message = JSON.parse(response.data);
          console.log('Library index. message received from server ::: ', message);
          this.setState({
            branchId: message.selectedBranchId,
            academicYearId: message.selectedAcademicYearId,
            departmentId: message.selectedDepartmentId,
          });
          console.log('Library index. branchId: ', this.state.branchId);
          console.log('Library index. departmentId: ', this.state.departmentId);
          console.log('Library index. ayId: ', this.state.academicYearId);
        };
    
        socket.onopen = () => {
          console.log("Library index. Opening websocekt connection on index.tsx. User : ",this.state.user.login);
            // this.state.user
            socket.send(this.state.user.login);
        }
        window.onbeforeunload = () => {
          console.log('Library index. Closing websocekt connection on index.tsx');
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
    showDetail(e: any, bShow: boolean,editObj: any, modelHeader: any) {
        e && e.preventDefault();
        const { lbObj } = this.state;
        lbObj.id = editObj.id;
        lbObj.rowName = editObj.rowName;
        lbObj.bookTitle = editObj.bookTitle;
        lbObj.bookNo = editObj.bookNo;
        lbObj.author = editObj.author;
        lbObj.noOfCopies = editObj.noOfCopies;
        lbObj.uniqueNo = editObj.uniqueNo;
        lbObj.departmentId = editObj.departmentId;
        this.setState(() => ({
            isModalOpen: bShow,
            lbObj: lbObj,
            modelHeader: modelHeader,
            errorMessage: "",
            successMessage: "",
        }));
    }

    createRows(objAry: any) {
        const { source } = this.state;
        console.log("createRows() - Library  list on Library  page:  ", objAry);
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
                <td>{obj.rowName}</td>
                <td>{obj.bookTitle}</td>
                <td>{obj.bookNo}</td>
                <td>{obj.author}</td>
                <td>{obj.noOfCopies}</td>
                {/* <td>{obj.departmentId}</td> */}
                <td>
                    {
                        <button className="btn btn-primary" onClick={e => this.showDetail(e, true, obj, "Edit Library")}>Edit</button>
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
            lbObj: {},
            modelHeader: headerLabel,
            errorMessage: "",
            successMessage: "",
        }));
    }

    onChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        const { lbObj } = this.state;
        
        this.setState({
            lbObj: {
                ...lbObj,
                [name]: value
            },
            errorMessage: "",
            successMessage: "",
        });
        
        commonFunctions.restoreTextBoxBorderToNormal(name);
    }

    getAddLibraryInput(lbObj: any, modelHeader: any){
        let id = null;
        if(modelHeader === "Edit Library"){
            id = lbObj.id;
        }
        let lbInput = {
            id: id,
            rowName: lbObj.rowName,
            bookTitle: lbObj.bookTitle,
            bookNo: lbObj.bookNo,
            author: lbObj.author,
            noOfCopies: lbObj.noOfCopies,
            uniqueNo: lbObj.uniqueNo,
            departmentId: lbObj.departmentId,
        };
        return lbInput;
    }

    validateFields(obj: any){
        let isValid = true;
        let errorMessage = ""
        if(obj.rowName === undefined || obj.rowName === null || obj.rowName === ""){
            commonFunctions.changeTextBoxBorderToError((obj.rowName === undefined || obj.rowName === null) ? "" : obj.rowName, "rowName");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.bookTitle === undefined || obj.bookTitle === null || obj.bookTitle === ""){
            commonFunctions.changeTextBoxBorderToError((obj.bookTitle === undefined || obj.bookTitle === null) ? "" : obj.bookTitle , "bookTitle");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.noOfCopies === undefined || obj.noOfCopies === null || obj.noOfCopies === ""){
            commonFunctions.changeTextBoxBorderToError((obj.noOfCopies === undefined || obj.noOfCopies === null) ? "" : obj.noOfCopies, "noOfCopies");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.departmentId === undefined || obj.departmentId === null || obj.departmentId === ""){
            commonFunctions.changeTextBoxBorderToError((obj.departmentId === undefined || obj.departmentId === null) ? "" : obj.departmentId, "departmentId");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        this.setState({
            errorMessage: errorMessage
        });
        return isValid; 

    }

    async doSave(lbInput: any, id: any){
      let btn = document.querySelector("#"+id);
      btn && btn.setAttribute("disabled", "true");
      let exitCode = 0;

      await this.props.client.mutate({
          mutation: ADD_LIBRARY,
          variables: { 
              input: lbInput
          },
      }).then((resp: any) => {
          console.log("Success in addLibrary Mutation. Exit code : ",resp.data.addLibrary.cmsLibraryVo.exitCode);
          exitCode = resp.data.addLibrary.cmsLibraryVo.exitCode;
          let temp = resp.data.addLibrary.cmsLibraryVo.dataList; 
          console.log("New Library list : ", temp);
          this.setState({
              lbList: temp
          });
      }).catch((error: any) => {
          exitCode = 1;
          console.log('Error in addLibrary : ', error);
      });
      btn && btn.removeAttribute("disabled"); 
      let errorMessage = "";
      let successMessage = "";
      if(exitCode === 0 ){
          successMessage = SUCCESS_MESSAGE_LIBRARY_ADDED;
          if(lbInput.id !==null){
              successMessage = SUCCESS_MESSAGE_LIBRARY_UPDATED;
          }
      }else {
          errorMessage = ERROR_MESSAGE_SERVER_SIDE_ERROR;
      }
      this.setState({
          successMessage: successMessage,
          errorMessage: errorMessage
      });
  }
  addLibrary = (e: any) => {
        const { id } = e.nativeEvent.target;
        const {lbObj, modelHeader} = this.state;
        let isValid = this.validateFields(lbObj);
        if(isValid === false){
            return;
        }
        const lbInput = this.getAddLibraryInput(lbObj, modelHeader);
        this.doSave(lbInput, id);
}
render(){
const {lbList, isModalOpen,createLibraryFilterDataCache, lbObj, modelHeader, errorMessage, successMessage} = this.state;
        return (
            <main>
                <Modal isOpen={isModalOpen} className="react-strap-modal-container" style={{height:"500px", overflow:"auto"}}>
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
                                <div className="fwidth-modal-text modal-fwidth">
                                    <label className="gf-form-label b-0 bg-transparent">Row Name <span style={{ color: 'red' }}> * </span></label>
                                    <input type="text" required className="gf-form-input " onChange={this.onChange}  value={lbObj.rowName} placeholder="rowName" name="rowName" id="rowName" maxLength={150} />
                                </div>
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Book Title<span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" required className="gf-form-input" onChange={this.onChange}  value={lbObj.bookTitle} placeholder="bookTitle" name="bookTitle" id="bookTitle" maxLength={150}/>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Book No</label>
                                        <input type="text"  className="gf-form-input" onChange={this.onChange}  value={lbObj.bookNo} placeholder="bookNo" name="bookNo" id="bookNo" maxLength={150}/>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Author</label>
                                        <input type="text"  className="gf-form-input" onChange={this.onChange}  value={lbObj.author} placeholder="author" name="author" id="author" maxLength={150}/>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">No Of Copies<span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" required className="gf-form-input" onChange={this.onChange}  value={lbObj.noOfCopies} placeholder="noOfCopies" name="noOfCopies" id="noOfCopies" maxLength={150}/>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Unique No</label>
                                        <input type="text"  className="gf-form-input" onChange={this.onChange}  value={lbObj.uniqueNo} placeholder="uniqueNo" name="uniqueNo" id="uniqueNo" maxLength={150}/>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1">
                                      <label htmlFor="">Department<span style={{ color: 'red' }}> * </span></label>
                                           <select required name="departmentId" id="departmentId" onChange={this.onChange}  value={lbObj.departmentId} className="gf-form-label b-0 bg-transparent">
                                            {this.createDepartment(createLibraryFilterDataCache.departments)}
                                           </select>
                                    </div>
                                <div className="m-t-1 text-center">
                                    {
                                        modelHeader === "Add Book" ?
                                        <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.addLibrary} >Save</button>
                                        :
                                        <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.addLibrary}>Save</button>
                                    }
                                    &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false, modelHeader)}>Cancel</button>
                           
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <button className="btn btn-primary" style={{width:'200px'}} onClick={e => this.showModal(e, true, "Add New Book")}>
                    <i className="fa fa-plus-circle"></i> Add Books
                </button>
                {
                    lbList !== null && lbList !== undefined && lbList.length > 0 ?
                        <div style={{width:'100%', height:'250px', overflow:'auto'}}>
                            <table id="lbTable" className="striped-table fwidth bg-white p-2 m-t-1">
                                <thead>
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
                        </div>
                    : null
                }
                
            </main>
        );
    }
}

export default withApollo(LibraryGrid);
