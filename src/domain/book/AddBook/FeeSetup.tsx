import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import * as React from 'react';
import { graphql, MutationFunc, QueryProps, compose } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
// import * as AddFeeMutationGql from './FeeSetupMutation.graphql';
import * as FeeCategoryAddMutation from './FeeCategoryAddMutation.graphql';
import * as FeeCategoryUpdateMutation from './FeeCategoryUpdateMutation.graphql';
import * as FeeDetailsAddMutation from './FeeDetailsAddMutation.graphql';
import withFeeSetupCacheDataLoader from './withFeeSetupCacheDataLoader';
import {
  LoadFeeSetupCacheType,
  FeeCategoryAddMutationType,
  FeeCategoryUpdateMutationType,
  FeeDetailsAddMutationType

} from '../../types';

import "react-datepicker/dist/react-datepicker.css";

// type FeeSetupRootProps ={}//= RouteComponentProps<{
// // }> & {}
type FeeSetupRootProps = RouteComponentProps<{
  branchId: string;
  academicYearId: string;
}> & {
  data: QueryProps & LoadFeeSetupCacheType;
};

type FeeSetupPageProps = FeeSetupRootProps & {
  addFeeCategoryMutation: MutationFunc<FeeCategoryAddMutationType>;
  updateFeeCategoryMutation: MutationFunc<FeeCategoryUpdateMutationType>;
  addFeeDetailsMutation: MutationFunc<FeeDetailsAddMutationType>;
};

type FeeSetupState = {
  feeSetupData: any,
  count: any,
  toggle: any,
  countParticularDiv: any,
  startDate: any,
  endDate: any,
  add: any,
  update: any
  // branches: any
}

class FeeSetup extends React.Component<FeeSetupPageProps, FeeSetupState>{
  constructor(props: any) {
    super(props);
    this.state = {
      feeSetupData: {
        categoryName: "",
        description: "",
        branch: {
          id: 1851
        },
        feeCategory: {
          id: ""
        },
        department: {
          id: ""
        },
        batch: {
          id: ""
        },
        studentType: {
          id: ""
        },
        gender: {
          id: ""
        },
        facility: {
          id: ""
        },
        transportRoute: {
          id: ""
        },
        feeCategoryData: [],
        particularsName: "",
        particularsDesc: "",
        amount: {}

      },
      count: [],
      toggle: [],
      countParticularDiv: 0,
      startDate: "",
      endDate: "",
      add: false,
      update: false
    }
    this.createApplicableTo = this.createApplicableTo.bind(this);
    this.createParticularDiv = this.createParticularDiv.bind(this);
    this.saveFeeCategory = this.saveFeeCategory.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.createFeeCategoryAddRow = this.createFeeCategoryAddRow.bind(this);
    this.createFeeCategoryUpdateRow = this.createFeeCategoryUpdateRow.bind(this);
    this.reset = this.reset.bind(this);
    this.editFeeCategory = this.editFeeCategory.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.back = this.back.bind(this);
    this.createFeeCategoryRowFromCache = this.createFeeCategoryRowFromCache.bind(this);
    this.updateFeeCategory = this.updateFeeCategory.bind(this);
    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createStudentTypes = this.createStudentTypes.bind(this);
    this.createGenders = this.createGenders.bind(this);
    this.createFacility = this.createFacility.bind(this);
    this.createTransportRoute = this.createTransportRoute.bind(this);
    this.handleTxtChange = this.handleTxtChange.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.isDatesOverlap = this.isDatesOverlap.bind(this);
  }

  createDepartments(departments: any) {
    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for (let i = 0; i < departments.length; i++) {
      departmentsOptions.push(
        <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
      );
    }
    return departmentsOptions;
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = "" + batches[i].department.id;
      // if (dptId == selectedDepartmentId) {
      batchesOptions.push(
        <option key={id} value={id}>{batches[i].batch}</option>
      );
      // }
    }
    return batchesOptions;
  }

  createStudentTypes(studentTypes: any) {
    let studentTypesOptions = [<option key={0} value="">Select Student Type</option>];
    for (let i = 0; i < studentTypes.length; i++) {
      let id = studentTypes[i].id;
      studentTypesOptions.push(
        <option key={id} value={studentTypes[i].description}>{studentTypes[i].description}</option>
      );
    }
    return studentTypesOptions;
  }

  createGenders(genders: any) {
    let gendersOptions = [<option key={0} value="">Select Gender</option>];
    for (let i = 0; i < genders.length; i++) {
      let id = genders[i].id;
      gendersOptions.push(
        <option key={id} value={genders[i].description}>{genders[i].description}</option>
      );
    }
    return gendersOptions;
  }
  createFacility(facility: any) {
    let facilityOptions = [<option key={0} value="">Select Facility</option>];
    for (let i = 0; i < facility.length; i++) {
      let id = facility[i].id;
      facilityOptions.push(
        <option key={id} value={id}>{facility[i].name}</option>
      );
    }
    return facilityOptions;
  }

  createTransportRoute(transportRoute: any) {
    let transportRouteOptions = [<option key={0} value="">Select TransportRoute</option>];
    for (let i = 0; i < transportRoute.length; i++) {
      let id = transportRoute[i].id;
      transportRouteOptions.push(
        <option key={id} value={id}>{transportRoute[i].name}</option>
      );
    }
    return transportRouteOptions;
  }

  showFeeCategory = (e: any) => {
    e.preventDefault();

    let dvCat: any = document.querySelector("#feeCategoryDiv");
    let dvHeadRow: any = document.querySelector("#headerRowDiv");
    dvCat.setAttribute("class", "b-1");
    dvHeadRow.setAttribute("class", "b-1 h5-fee-bg");

  }

  reset() {
    const { feeSetupData } = this.state;
    let txtCn: any = document.querySelector("#categoryName");
    let txtDs: any = document.querySelector("#description")
    let dtPkSt: any = document.querySelector("#dtPickerSt");
    let dtPkNd: any = document.querySelector("#dtPickerNd");
    dtPkSt.value = "";
    dtPkNd.value = "";
    txtCn.value = "";
    txtDs.value = "";
    feeSetupData.categoryName = "";
    feeSetupData.description = "";
    feeSetupData.feeCategory.id = "";
    feeSetupData.operationType = "";
    this.setState({
      endDate: "",
      startDate: ""

      // feeSetupData : feeSetupData
    });
    this.setState({
      feeSetupData: feeSetupData
    });
  }
  // showFeeParticulars= (e: any) => {
  //   e.preventDefault();
  //   let dvCat : any = document.querySelector("#feeParticularDiv");
  //   dvCat.setAttribute("class", "feeDetails");
  // }



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

  createParticularDiv(cnt: any) {
    const retVal = [];
    const { feeSetupData } = this.state;
    for (let i = 0; i < cnt; i++) {
      retVal.push(
        <div id={`feeParticularDiv-${i}`} key={`feeParticularDiv-${i}`}>
          <div className="m-1 b-1 feeCategory">
            <div className="m-1 row">
              <div className="col-md-5">
                <div>
                  <label htmlFor="">Fee particulars Name</label>
                  <input type="text" id={"particularsName"} name={"particularsName"} onChange={this.onChange} value={feeSetupData.particularsName} className="fwidth" />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="">Description</label>
                  <input type="text" id={"particularsDesc"} name={"particularsDesc"} onChange={this.onChange} value={feeSetupData.particularsDesc} className="fwidth" />
                </div>
              </div>
              <div className="col-md-1"><button onClick={(e: any) => this.toggleApplicableTo(i, e)} id="btnToggle" className={`fa btn-primary mlb f-12 ${this.state.toggle[i] ? "fa-plus" : "fa-minus"}`} style={{ border: 'none', paddingRight: '17px' }} ></button></div>
            </div>
            {
              this.createApplicableTo(this.state.count[i], i)
            }
            <div id={`divShowBtnApplicableTo-${i}`} className="m-1">
              <button id={"" + i} name={"" + i} className="btn btn-primary f-12 mlb" onClick={(e: any) => this.showApplicableTo(i, e)}> <i className="fa fa-plus"></i>Applicable to</button>
            </div>
          </div>
        </div>
      );
    }
    return retVal;
  }

  showApplicableTo = (index: any, e: any) => {
    let { count } = this.state;
    count[index] = count[index] + 1;
    this.setState({
      count
    });
  }

  createApplicableTo(cnt: any, index: any, ) {
    const { feeSetupData } = this.state;
    const retVal = [];
    let isHidden = this.state.toggle[index];
    for (let i = 0; i < cnt; i++) {
      retVal.push(
        <div id={`feeApplicableToDiv-${index}-${i}`} key={`feeApplicableToDiv-${index}-${i}`} className={isHidden ? "hide" : ""}>
          <div className="m-1 col-md-5 feeAppHead">
            <h5>Applicable To</h5>
          </div>
          <div className="m-1 col-md-5 feeSelect">
            <div>
              <label htmlFor="">Department</label>
              <select required name={`department-${index}-${i}`} id={`department-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createDepartments(this.props.data.createFeeSetupDataCache.departments)}
              </select>
            </div>
            <div>
              <label htmlFor="">Year</label>
              <select required name={`batch-${index}-${i}`} id={`batch-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createBatches(this.props.data.createFeeSetupDataCache.batches, feeSetupData.department.id)}
              </select>
            </div>
            <div>
              <label htmlFor="">Student type</label>
              <select required name={`studentType-${index}-${i}`} id={`studentType-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createStudentTypes(this.props.data.createFeeSetupDataCache.studentTypes)}
              </select>
            </div>
            <div>
              <label htmlFor="">Gender</label>
              <select required name={`gender-${index}-${i}`} id={`gender-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createGenders(this.props.data.createFeeSetupDataCache.genders)}
              </select>
            </div>
            {/* <div>
              <label htmlFor="">Facility</label>
              <select required name={`facility-${index}-${i}`} id={`facility-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createFacility(this.props.data.createFeeSetupDataCache.facility)}
              </select>
            </div>
            <div>
              <label htmlFor="">Transport Route</label>
              <select required name={`transportRoute-${index}-${i}`} id={`transportRoute-${index}-${i}`} className="gf-form-input max-width-8">
                {this.createTransportRoute(this.props.data.createFeeSetupDataCache.transportRoute)}
              </select>
            </div> */}
            <div>
              <label htmlFor="">Amount</label>
              <input type="number" name={`amount-${index}-${i}`} id={`amount-${index}-${i}`} onChange={this.handleTxtChange} style={{ width: '100px' }} value={feeSetupData.amount[`amount-${index}-${i}`]}/>
            </div>
            <div className="mt-20">
              <button className="btn btn-primary m-r-1" onClick={e => this.applyChange(e, index, i)} name={`btnApply-${index}-${i}`} id={`btnApply-${index}-${i}`}>Apply</button>
            </div>
            <div className="mt-20">
              <button className="btn btn-primary f-12"><i className="fa fa-trash"></i></button>
            </div>

          </div>
          <hr className="m-l-2 m-r-2" />
        </div>
      );
    }
    return retVal;
  }

  onChange(e: any) {
    const { name, value } = e.nativeEvent.target;
    const { feeSetupData } = this.state;
    // if (name === `department-${index}-${i}`) {
    //   this.setState({
    //     feeSetupData: {
    //       ...feeSetupData,
    //       department: {
    //         id: value
    //       },
    //       batch: {
    //         id: ""
    //       }
    //     }
    //   });
    // } else if (name === `batch-${index}-${i}`) {
    //   this.setState({
    //     feeSetupData: {
    //       ...feeSetupData,
    //       batch: {
    //         id: value
    //       },
    //       studentType: {
    //         id: ""
    //       }
    //     }
    //   });
    // }else if (name === `studentType-${index}-${i}`) {
    //   this.setState({
    //     feeSetupData: {
    //       ...feeSetupData,
    //       studentType: {
    //         id: value
    //       },
    //       gender: {
    //         id: ""
    //       }
    //     }
    //   });
    // }else if (name === `gender-${index}-${i}`) {
    //   this.setState({
    //     feeSetupData: {
    //       ...feeSetupData,
    //       gender: {
    //         id: value
    //       },
    //       facility: {
    //         id: ""
    //       }
    //     }
    //   });
    // }else if (name === `transportRoute-${index}-${i}`) {
    //   this.setState({
    //     feeSetupData: {
    //       ...feeSetupData,
    //       transportRoute: {
    //         id: value
    //       }
    //     }
    //   });
    // }
    // else{
    this.setState({
      feeSetupData: {
        ...feeSetupData,
        [name]: value
      }
    });
    // }


  }

  handleTxtChange(e: any) {
    const { id, value } = e.nativeEvent.target;
    const { feeSetupData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();

    feeSetupData.amount[key] = val;
    this.setState({
      feeSetupData: feeSetupData
    });
  }

  isDatesOverlap(startDate: any, endDate: any){
    if (endDate.isBefore(startDate)) {
      alert("End date should not be prior to start date.");
      return true;
    }
    return false;
  }
  saveFeeCategory(e: any) {
    const { id, value } = e.nativeEvent.target;
    const { addFeeCategoryMutation } = this.props;
    const { feeSetupData } = this.state;
    e.preventDefault();


    let txtFcNm: any = document.querySelector("#categoryName");
    if (txtFcNm.value.trim() === "") {
      alert("Please provide some value in category name");
      return;
    }
    let txtFcDs: any = document.querySelector("#description");
    if (txtFcDs.value.trim() === "") {
      alert("Please provide some value in category description");
      return;
    }
    let chkStatus: any = document.querySelector("#status");
    let status = "DEACTIVE";
    if (chkStatus.checked) {
      status = "ACTIVE";
    }
    if (this.state.startDate === undefined || this.state.startDate === null || this.state.startDate === "") {
      alert("Please provide start date");
      return;
    }

    let stDate = null;
    if (this.state.startDate !== undefined || this.state.startDate !== null || this.state.startDate !== "") {
      stDate = moment(this.state.startDate, "YYYY-MM-DD");
    }
    let enDate = null;
    if (this.state.endDate !== undefined || this.state.endDate !== null || this.state.endDate !== "") {
      enDate = moment(this.state.endDate, "YYYY-MM-DD");
    }
    if(stDate !== null && enDate !== null){
      if(this.isDatesOverlap(stDate, enDate)){
        return;
      }
    }

    let addFeeCategoryInput = {
      categoryName: feeSetupData.categoryName,
      description: feeSetupData.description,
      status: status,
      startDate: stDate,
      endDate: enDate,
      branchId: feeSetupData.branch.id,
      createdBy: "Application"
    };
    console.log("form data : ", feeSetupData);
    return addFeeCategoryMutation({
      variables: { input: addFeeCategoryInput }
    }).then(data => {
      console.log('Add fee category ::::: ', data);
      alert("Fee category added successfully!");
      const sdt = data;
      feeSetupData.feeCategoryData = [];
      feeSetupData.feeCategoryData.push(sdt);
      // = data.data.addFeeCategory;
      this.setState({
        feeSetupData: feeSetupData
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

  updateFeeCategory(obj: any) {
    // const { id, value } = e.nativeEvent.target;
    const { updateFeeCategoryMutation } = this.props;
    const { feeSetupData } = this.state;

    let txtFcNm: any = document.querySelector("#categoryName");
    if (txtFcNm.value.trim() === "") {
      alert("Please provide some value in category name");
      return;
    }
    let txtFcDs: any = document.querySelector("#description");
    if (txtFcDs.value.trim() === "") {
      alert("Please provide some value in category description");
      return;
    }
    let chkStatus: any = document.querySelector("#status");
    let status = "DEACTIVE";
    if (chkStatus.checked) {
      status = "ACTIVE";
    }
    let stDate = null;
    if (this.state.startDate !== undefined || this.state.startDate !== null || this.state.startDate !== "") {
      stDate = moment(this.state.startDate, "YYYY-MM-DD");
    }
    let enDate = null;
    if (this.state.endDate !== undefined || this.state.endDate !== null || this.state.endDate !== "") {
      enDate = moment(this.state.endDate, "YYYY-MM-DD");
    }
    if (feeSetupData.feeCategory.id === "") {
      alert("This record has no id. It can be added as a new record.");
      return;
    }
    let updateFeeCategoryInput = {
      id: feeSetupData.feeCategory.id,
      categoryName: feeSetupData.categoryName,
      description: feeSetupData.description,
      status: status,
      startDate: stDate,
      endDate: enDate,
      branchId: feeSetupData.branch.id,
      updatedBy: "Application"
    };
    console.log("form data : ", feeSetupData);
    return updateFeeCategoryMutation({
      variables: { input: updateFeeCategoryInput }
    }).then(data => {
      console.log('Update fee category ::::: ', data);
      alert("Fee category updated successfully!");
      const sdt = data;
      feeSetupData.feeCategoryData = [];
      feeSetupData.feeCategoryData.push(sdt);
      // = data.data.addFeeCategory;
      this.setState({
        feeSetupData: feeSetupData
      });
      this.setState({
        add: false,
        update: true
      });
    }).catch((error: any) => {
      alert("Due to some error fee category could not be updated");
      console.log('there was an error sending the update fee category mutation result', error);
      return Promise.reject(`Could not retrieve update fee category data: ${error}`);
    });
  }

  applyChange = (e: any, index: any, i: any) => {
      const { id, value } = e.nativeEvent.target;
      const { addFeeDetailsMutation } = this.props;
      const { feeSetupData } = this.state;
      var txtName = feeSetupData.particularsName;
      var txtDesc = feeSetupData.particularsDesc;
      var amt = feeSetupData.amount["amount-"+index+"-"+i];
      if(txtName === undefined || txtName.trim() === ""){
        alert("Please provide some value in fee perticulars name");
        return;
      }
      if(txtDesc === undefined || txtDesc.trim() === ""){
        alert("Please provide some value in fee perticulars description");
        return;
      }
      if(amt === undefined || amt.trim() === ""){
        alert("Please provide some value in amount");
        return;
      }
      let optDpt : any = document.querySelector("#department-"+index+"-"+i);
      let optBth : any = document.querySelector("#batch-"+index+"-"+i);
      let optStp : any = document.querySelector("#studentType-"+index+"-"+i);
      let optGdr : any = document.querySelector("#gender-"+index+"-"+i);
      let optFct : any = document.querySelector("#facility-"+index+"-"+i);
      let optTrp : any = document.querySelector("#transportRoute-"+index+"-"+i);
      // optBth.options[optBth.options.selectedIndex].value
      let dptVal = null;
      let bthVal = null;
      let stpVal = null;
      let gndVal = null;
      // let fclVal = null;
      // let trtVal = null;
      if(optDpt.options[optDpt.options.selectedIndex].value !== ""){
        dptVal = optDpt.options[optDpt.options.selectedIndex].value;
      }
      if(optBth.options[optBth.options.selectedIndex].value !== ""){
        bthVal = optBth.options[optBth.options.selectedIndex].value;
      }
      if(optStp.options[optStp.options.selectedIndex].value !== ""){
        stpVal = optStp.options[optStp.options.selectedIndex].value;
      }
      if(optGdr.options[optGdr.options.selectedIndex].value !== ""){
        gndVal = optGdr.options[optGdr.options.selectedIndex].value;
      }
      // if(optFct.options[optFct.options.selectedIndex].value !== ""){
      //   fclVal = optFct.options[optFct.options.selectedIndex].value;
      // }
      // if(optTrp.options[optTrp.options.selectedIndex].value !== ""){
      //   trtVal = optTrp.options[optTrp.options.selectedIndex].value;
      // }
      let addFeeDetailsInput = {
        feeParticularsName: txtName,
        feeParticularDesc: txtDesc,
        departmentId: dptVal,
        batchId: bthVal,
        studentType: stpVal,
        gender: gndVal,
        amount: amt,
        status: "ACTIVE",
        // branchId: feeSetupData.branch.id,
        createdBy: "Application",
        // facilityId: fclVal,
        // transportRouteId: trtVal,
        feeCategoryId: feeSetupData.feeCategory.id
      };

      return addFeeDetailsMutation({
        variables: { input: addFeeDetailsInput }
      }).then(data => {
        console.log('Add fee details ::::: ', data);
        alert("Fee detail applied successfully!");
      }).catch((error: any) => {
        alert("Due to some error fee detail could not be applied");
        console.log('there was an error sending the add fee detail mutation result', error);
        return Promise.reject(`Could not retrieve add fee detail data: ${error}`);
      });
  }

  changeStartDate = (e: any) => {
    const varDt = e;
    console.log("start date...", varDt);
    this.setState({
      startDate: varDt
    });
  }

  changeEndDate = (e: any) => {
    const varDt = e;
    console.log("end date...", varDt);
    this.setState({
      endDate: varDt
    });
  }

  createFeeCategoryRowFromCache(obj: any) {
    // const len = obj.length;
    const retVal = [];
    // for (let p = 0; p < len; p++) {
    //   let v = obj[p];
    for (let x = 0; x < obj.length; x++) {
      let k = obj[x];
      retVal.push(
        <tr>
          <td>{k.id}</td>
          <td>{k.categoryName}</td>
          <td>{k.description}</td>
          <td>{k.status}</td>
          <td>{k.strStartDate}</td>
          <td>{k.strEndDate}</td>
          <td>
            <button className="btn btn-primary" onClick={e => this.editFeeCategory(k)}>Edit</button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={e => this.showDetail(e, k)}>Details</button>
          </td>
        </tr>
      );
    }
    // }
    return retVal;
  }

  createFeeCategoryAddRow(obj: any) {
    const { feeSetupData } = this.state;
    const len = obj.length;
    const retVal = [];
    // let aryLength = 0;
    // for (let p = 0; p < len; p++) {
    let v = obj[0];
    if (v.data.addFeeCategory === undefined || v.data.addFeeCategory === null) {
      return;
    }
    for (let x = 0; x < v.data.addFeeCategory.length; x++) {
      let k = v.data.addFeeCategory[x];
      retVal.push(
        <tr>
          <td>{k.id}</td>
          <td>{k.categoryName}</td>
          <td>{k.description}</td>
          <td>{k.status}</td>
          <td>{k.strStartDate}</td>
          <td>{k.strEndDate}</td>
          <td>
            <button className="btn btn-primary" onClick={e => this.editFeeCategory(k)}>Edit</button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={e => this.showDetail(e, k)}>Details</button>
          </td>
        </tr>
      );
    }
    // }
    return retVal;
  }

  createFeeCategoryUpdateRow(obj: any) {
    const { feeSetupData } = this.state;
    const len = obj.length;
    const retVal = [];
    let aryLength = 0;
    // for (let p = 0; p < len; p++) {
    let v = obj[0];
    if (v.data.updateFeeCategory === undefined || v.data.updateFeeCategory === null) {
      return;
    }
    for (let x = 0; x < v.data.updateFeeCategory.length; x++) {
      let k = v.data.updateFeeCategory[x];
      retVal.push(
        <tr>
          <td>{k.id}</td>
          <td>{k.categoryName}</td>
          <td>{k.description}</td>
          <td>{k.status}</td>
          <td>{k.strStartDate}</td>
          <td>{k.strEndDate}</td>
          <td>
            <button className="btn btn-primary" onClick={e => this.editFeeCategory(k)}>Edit</button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={e => this.showDetail(e, k)}>Details</button>
          </td>
        </tr>
      );
    }
    // }


    return retVal;
  }

  editFeeCategory(obj: any) {
    const { feeSetupData } = this.state;
    let txtCn: any = document.querySelector("#categoryName");
    let txtDs: any = document.querySelector("#description");
    let chkSts: any = document.querySelector("#status");
    let dtPkSt: any = document.querySelector("#dtPickerSt");
    let dtPkNd: any = document.querySelector("#dtPickerNd");
    txtCn.value = obj.categoryName;
    txtDs.value = obj.description;
    if (obj.status === "ACTIVE") {
      chkSts.checked = true;
    } else {
      chkSts.checked = false;
    }
    let stDate = "";
    if(obj.strStartDate !== null && obj.strStartDate !== "") {
      stDate = moment(obj.strStartDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    let ndDate = "";
    if(obj.strEndDate !== null && obj.strEndDate !== "") {
      ndDate = moment(obj.strEndDate, "DD-MM-YYYY").format("DD/MM/YYYY");
    }
    dtPkSt.value = stDate;
    dtPkNd.value = ndDate;
    feeSetupData.feeCategory.id = obj.id;
    feeSetupData.categoryName = obj.categoryName;
    feeSetupData.description = obj.description;
    let nStDt: any;
    let nEnDt: any;
    if(stDate !== ""){
      nStDt = moment(stDate, "DD/MM/YYYY");
    }
    if(ndDate !== ""){
      nEnDt = moment(ndDate, "DD/MM/YYYY");
    }
    this.setState({
      startDate: nStDt,
      endDate: nEnDt,
      feeSetupData: feeSetupData
    });

  }

  showDetail(e: any, obj: any) {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });
    let fCatGrid: any = document.querySelector("#feeCatagoryGrid");
    fCatGrid.setAttribute("class", "hide");

    let fCatDtDiv: any = document.querySelector("#feeCatDetailDiv");
    fCatDtDiv.setAttribute("class", "b-1");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "hide");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "");
    this.editFeeCategory(obj);
    this.showParticularDiv(e);

  }
  back() {
    let { count, countParticularDiv } = this.state;
    countParticularDiv = 0;
    count = [];
    this.setState({
      countParticularDiv,
      count
    });
    let fCatGrid: any = document.querySelector("#feeCatagoryGrid");
    fCatGrid.setAttribute("class", "b-1");

    let fCatDtDiv: any = document.querySelector("#feeCatDetailDiv");
    fCatDtDiv.setAttribute("class", "hide");

    let svFCatDiv: any = document.querySelector("#saveFeeCatDiv");
    svFCatDiv.setAttribute("class", "fee-flex");

    let bDiv: any = document.querySelector("#backDiv");
    bDiv.setAttribute("class", "hide");
  }
  render() {
    const { data: { createFeeSetupDataCache, refetch }, addFeeCategoryMutation, updateFeeCategoryMutation } = this.props;
    const { feeSetupData } = this.state;
    return (

      <section className="plugin-bg-white p-1">
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent" aria-hidden="true" /> Admin - Fee Management
          </h3>

        <div className="bg-heading px-1 dfinline">
          <h5 className="mtf-8 dark-gray">Fee Management</h5>
          {/* <a href="" className="btn btn-primary">Save</a> */}
        </div>

        {/* <div className="stroke-transparent mr-1">&nbsp;</div> */}
        {/* <button className="btn btn-primary" style={{ width: '155px' }} onClick={this.showFeeCategory}><i className="fa fa-plus"></i> Add Fee Category</button> */}
        <div className="stroke-transparent mr-1">&nbsp;</div>
        <div id="headerRowDiv" className="b-1 h5-fee-bg j-between">
          <div className="m-1 fwidth">Create Fee Category</div>

          <div id="saveFeeCatDiv" className="fee-flex">
            <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.saveFeeCategory} style={{ width: '140px' }}>Add Fee Category</button>
            <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.updateFeeCategory} style={{ width: '170px' }}>Update Fee Category</button>
            <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>
          </div>
          <div id="backDiv" className="hide">
            <button className="btn btn-primary mr-1" id="btnBack" name="btnBack" onClick={this.back} style={{ padding: "13px" }}>Back</button>
          </div>



        </div>
        <div id="feeCategoryDiv" className="b-1">
          <div className="b1 row m-1 j-between">
            <div >
              <label htmlFor="">Category Name</label>
              <input type="text" style={{ width: '300px' }} id="categoryName" name="categoryName" onChange={this.onChange} value={feeSetupData.categoryName} />
            </div>

            <div>
              <label htmlFor="">Description</label>
              <input type="text" className="fwidth" style={{ width: '450px' }} id="description" name="description" onChange={this.onChange} value={feeSetupData.description} />
            </div>

            <div>
              <label htmlFor="">Start Date</label>
              <DatePicker selected={this.state.startDate} value={this.state.startDate} onChange={this.changeStartDate} id="dtPickerSt" name="dtPickerSt" />
            </div>

            <div>
              <label htmlFor="">End Date</label>
              <DatePicker selected={this.state.endDate} value={this.state.endDate} onChange={this.changeEndDate} id="dtPickerNd" name="dtPickerNd" />
            </div>

            <div>
              <label htmlFor="">Status</label>
              <label className="switch">
                {' '}
                <input type="checkbox" id="status" name="status" defaultChecked /> <span className="slider" />{' '}
              </label>
            </div>

          </div>

          <div className="b1 row m-1">

            {/* <div className="d-flex fwidth justify-content-between pt-2">
              <p></p>
              <div id="saveFeeCatDiv">
                <button className="btn btn-primary mr-1" id="btnSaveFeeCategory" name="btnSaveFeeCategory" onClick={this.saveFeeCategory} style={{ width: '140px' }}>Add Fee Category</button>
                <button className="btn btn-primary mr-1" id="btnUpdateFeeCategory" name="btnUpdateFeeCategory" onClick={this.updateFeeCategory} style={{ width: '170px' }}>Update Fee Category</button>
                <button className="btn btn-primary mr-1" id="btnReset" name="btnReset" onClick={this.reset} >Reset</button>
              </div>
              <div id="backDiv" className="hide">
                <button className="btn btn-primary mr-1" id="btnBack" name="btnBack" onClick={this.back} style={{ width: '140px' }}>Back</button>
              </div>

            </div> */}
          </div>

        </div>
        <p></p>
        <div id="feeCatagoryGrid" className="b-1">
          <table className="fwidth" id="feetable">
            <thead >
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {
                feeSetupData.feeCategoryData.length > 0 && this.state.add === true && this.state.update === false && (
                  this.createFeeCategoryAddRow(feeSetupData.feeCategoryData)
                )
              }
              {
                feeSetupData.feeCategoryData.length > 0 && this.state.add === false && this.state.update === true && (
                  this.createFeeCategoryUpdateRow(feeSetupData.feeCategoryData)
                )
              }
              {
                feeSetupData.feeCategoryData.length === 0 && this.state.add === false && this.state.update === false && (
                  this.createFeeCategoryRowFromCache(this.props.data.createFeeSetupDataCache.feeCategory)
                )
              }
            </tbody>
          </table>
        </div>
        <div id="feeCatDetailDiv" className="hide">
          {
            this.createParticularDiv(this.state.countParticularDiv)
          }
        </div>
      </section>
    );
  }
}

// export default FeeSetup;

export default withFeeSetupCacheDataLoader(

  compose(

    graphql<FeeCategoryAddMutationType, FeeSetupRootProps>(FeeCategoryAddMutation, {
      name: "addFeeCategoryMutation"
    }),
    graphql<FeeCategoryUpdateMutationType, FeeSetupRootProps>(FeeCategoryUpdateMutation, {
      name: "updateFeeCategoryMutation"
    }),
    graphql<FeeDetailsAddMutationType, FeeSetupRootProps>(FeeDetailsAddMutation, {
      name: "addFeeDetailsMutation"
    })

  )

    (FeeSetup) as any
);
