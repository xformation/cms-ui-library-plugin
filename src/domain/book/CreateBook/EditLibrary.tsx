import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../css/custom.css";
import '../../../css/college-settings.css';
import '../../../css/tabs.css'; 
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { ADD_LIBRARY,CREATE_LIBRARY_FILTER_DATA_CACHE } from '../_queries';
import * as moment from 'moment';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';


export interface LibProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any; 
    lbList?:any;
    libData?:any;
    departmentes?:any;
    lbobj?:any;
    libObj?:any;
    user?:any;
    createLibraryFilterDataCache?: any;
}
const ERROR_MESSAGE_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_ERROR = "Due to some error in library service, library could not be saved. Please check library service logs";
const SUCCESS_MESSAGE_Library_ADDED = "New library saved successfully";
const SUCCESS_MESSAGE_Library_UPDATED = "library updated successfully";
const ERROR_MESSAGE_DATES_OVERLAP = "Due Date cannot be prior or same as Issue date";


class Library<T = {[data: string]: any}> extends React.Component<LibProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {     
            lblist: this.props.llblist,
            createLibraryFilterDataCache: this.props.createLibraryFilterDataCache,
            // isModalOpen: false,
            user: this.props.user,
            lbobj:this.props.user,
            libObj:this.props.user,
            departments:this.props.departments,
            errorMessage: '',
            successMessage: '',
            activeTab: 0,
            lbObj:{
              clNo:"",
              bookTitle:"",
              bookNo:"",
              author:"",
              noOfCopies:"",
              uniqueNo:"",
              departmentId:""
            },
            libData:{
             department:{
               id:"",
             },  
         },
             department:""
        };  
        this.createDepartment = this.createDepartment.bind(this); 
        this.getAddLibraryInput = this.getAddLibraryInput.bind(this);
        this.addLibrary = this.addLibrary.bind(this);
        this.EditDetails = this.EditDetails.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.doSave = this.doSave.bind(this);
        this.getcreateLibraryFilterDataCache = this.getcreateLibraryFilterDataCache.bind(this);
        }
    
  async componentDidMount(){
    this.setState({
      libObj: this.props.data,
    });
    await this.registerSocket();
    // console.log('check batches:', this.props.batches);
    console.log('1.test libObj data:', this.state.libObj);
    console.log('30. test lbobj data state:', this.state.lbobj);
    console.log('40. test lbobj data props:', this.props.lbobj);
    this.EditDetails();
  }
    async registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();
    }

    componentWillReceiveProps() {
      this.setState({
        libObj: this.props.data,
      });
    //   console.log('check batches:', this.props.batches);
      console.log('2. test libObj data:', this.state.libObj);
      console.log('30. test lbobj data state:', this.state.lbobj);
      console.log('40. test lbobj data props:', this.props.lbobj);
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
      async getcreateLibraryFilterDataCache() {
          const {data} = await this.props.client.query({
            query: CREATE_LIBRARY_FILTER_DATA_CACHE,
            variables: {
            },
      
            fetchPolicy: 'no-cache',
          });
          this.setState({
            createLibraryFilterDataCache: data,
          });
        }

        EditDetails() {
        // e && e.preventDefault();
        const { lbObj,libData } = this.state;
        lbObj.id = lbObj.id;
        lbObj.clNo = lbObj.clNo;
        lbObj.bookTitle = lbObj.bookTitle;
        lbObj.bookNo = lbObj.bookNo;
        lbObj.author = lbObj.author;
        lbObj.noOfCopies = lbObj.noOfCopies;
        lbObj.uniqueNo = lbObj.uniqueNo;
        lbObj.departmentId = libData.department.id;
        this.setState(() => ({
            // isModalOpen: bShow,
            lbObj: lbObj,
            // modelHeader: modelHeader,
            // errorMessage: "",
            // successMessage: "",
        }));
    }

      
    // EditDetails(lbObj: any) {
    //     const { libData } = this.state;
    //     let lbObj: any;
    //     let id:any,
    //     // lbObj = this.props.lbObj;
    //     // console.log('100. test lbObj data:', lbObj);
    //     this.setState({
    //     lbObj: {
    //     ...lbObj,
    //     id: id,
    //     clNo: lbObj.clNo,
    //     bookTitle: lbObj.bookTitle,
    //     bookNo: lbObj.bookNo,
    //     author: lbObj.author,
    //     noOfCopies: lbObj.noOfCopies,
    //     uniqueNo: lbObj.uniqueNo,
    //     departmentId: libData.department.id,
    //  },
    // });
    // return;
    // }
    onChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        const { lbObj,libData } = this.state  
        if (name === 'department') {
          this.setState({
            libData: {
              ...libData,
              department: {
                id: value,
              },
            },
          });
        } else {
          this.setState({
            lbObj: {
              ...lbObj,
              [name]: value,
            },
            libData: {
              ...libData,
              [name]: value,
            },
            errorMessage: '',
            successMessage: '',
          });
        }
        commonFunctions.restoreTextBoxBorderToNormal(name);
    }
    validateField(lbObj: any, libData: any){
      let isValid = true;
      let errorMessage = ""
      if(lbObj.clNo === undefined || lbObj.clNo === null || lbObj.clNo === ""){
       commonFunctions.changeTextBoxBorderToError((lbObj.clNo === undefined || lbObj.clNo === null) ? "" : lbObj.clNo, "clNo");
       errorMessage = ERROR_MESSAGE_FIELD_MISSING;
        isValid = false;
    }
    if(lbObj.bookTitle === undefined || lbObj.bookTitle === null || lbObj.bookTitle === ""){
      commonFunctions.changeTextBoxBorderToError((lbObj.bookTitle === undefined || lbObj.bookTitle === null) ? "" : lbObj.bookTitle , "bookTitle");
      errorMessage = ERROR_MESSAGE_FIELD_MISSING;
       isValid = false;
    }
   if(lbObj.noOfCopies === undefined || lbObj.noOfCopies === null || lbObj.noOfCopies === ""){
    commonFunctions.changeTextBoxBorderToError((lbObj.noOfCopies === undefined || lbObj.noOfCopies === null) ? "" : lbObj.noOfCopies, "noOfCopies");
    errorMessage = ERROR_MESSAGE_FIELD_MISSING;
     isValid = false;
  }
 if(libData.department.id === undefined || libData.department.id === null || libData.department.id === ""){
   commonFunctions.changeTextBoxBorderToError((libData.department.id === undefined || libData.department.id === null) ? "" : libData.department.id, "department");
   errorMessage = ERROR_MESSAGE_FIELD_MISSING;
   isValid = false;
}
     this.setState({
          errorMessage: errorMessage
      });
      return isValid; 
  } 
  getAddLibraryInput(lbObj: any){
      const{libData} = this.state;
      let id = null;
        let lbInput = {
            id: id,
            clNo: lbObj.clNo,
            bookTitle: lbObj.bookTitle,
            bookNo: lbObj.bookNo,
            author: lbObj.author,
            noOfCopies: lbObj.noOfCopies,
            uniqueNo: lbObj.uniqueNo,
            departmentId:libData.department.id,   
        };
        return lbInput;
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
            console.log("Success in addLibrary Mutation. Exit code : "
            ,resp.data.addLibrary.cmsLibraryVo.exitCode
            );
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
            successMessage = SUCCESS_MESSAGE_Library_ADDED;
            if(lbInput.id !== null){
                successMessage = SUCCESS_MESSAGE_Library_UPDATED;
            }
        }else {
            errorMessage = ERROR_MESSAGE_SERVER_ERROR;
        }
        this.setState({
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    }

    addLibrary = (e: any) => {
      const { id } = e.nativeEvent.target;
      const {lbObj,libData} = this.state;
      let isValid = this.validateField(lbObj,libData);
      if(isValid === false){
          return;
      }
      const lbInput = this.getAddLibraryInput(lbObj);
      this.doSave(lbInput, id);
  }
render() {
const {isModalOpen, bList, activeTab,libData, lbObj,createLibraryFilterDataCache, errorMessage, successMessage,departmentId} = this.state;
return (
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
          <div className="m-1 fwidth">Edit Book Data</div>
          <div id="saveLibraryCatDiv" className="fee-flex">
            <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.addLibrary} style={{ width: '140px' }}>Add Book</button>
            {/* <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.addLibrary} style={{ width: '170px' }}>Update Book</button> */}
          </div>
        </div>
        <div id="feeCategoryDiv" className="b-1">
         <div className="b1 row m-1 j-between">
           <div>
            <label className="gf-form-label b-0 bg-transparent">Row Name <span style={{ color: 'red' }}> * </span></label>
            <input type="text" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.clNo} placeholder="clNo" name="clNo" id="clNo"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">Book Title<span style={{ color: 'red' }}> * </span></label>
             <input type="text" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.bookTitle} placeholder="bookTitle" name="bookTitle" id="bookTitle"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">Book No</label>
             <input type="text"  className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.bookNo} placeholder="bookNo" name="bookNo" id="bookNo"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">Author</label>
             <input type="text"  className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.author} placeholder="author" name="author" id="author"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">No Of Copies<span style={{ color: 'red' }}> * </span></label>
             <input type="text" required className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.noOfCopies} placeholder="noOfCopies" name="noOfCopies" id="noOfCopies"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">Unique No</label>
             <input type="text"  className="fwidth" style={{ width: '250px' }} onChange={this.onChange}  value={lbObj.uniqueNo} placeholder="uniqueNo" name="uniqueNo" id="uniqueNo"/>
           </div>
           <div>
             <label className="gf-form-label b-0 bg-transparent">Department<span style={{ color: 'red' }}> * </span></label>
              <select name="department" id="department" onChange={this.onChange}  value={libData.department.id} className="fwidth" style={{ width: '250px' }}>
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
          </div>
        </div>
      </section>
  );
}
}
export default withApollo(Library);
