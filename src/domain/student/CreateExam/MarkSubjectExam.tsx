import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps, MutationFunc, compose } from "react-apollo";
import * as AddExamMutationGql from './AddExamMutation.graphql';
import { LoadExamSubjQueryCacheForAdmin,AddExamMutation } from '../../types';
import withExamSubjDataLoader from './withExamSubjDataLoader';
import "react-datepicker/dist/react-datepicker.css";


const w180 = {
  width: '180px'
};

interface type {
  checked: boolean;
}

type ExamRootProps = RouteComponentProps<{
  academicYearId: string;
  collegeId: string;
}> & {
  data: QueryProps & LoadExamSubjQueryCacheForAdmin;
};

type ExamPageProps = ExamRootProps & {
 
  mutate: MutationFunc<AddExamMutation>;
};

type ExamState = {
  examData: any,
  branches: any,
  academicYears: any,
  departments: any,
  batches: any,
  subjects: any,
  semesters: any,
  sections: any,
  submitted: any,
  noOfExams: number,
  dateofExam: any,
  dayValue: any,
  isSubjectSame: any,
  startDate: any,
  gradeType: any,
  selectedGrade: any,
  groupValue: any,
  gradingId: any


};

class SaData {
  examName: any;
  examDate: any;
  startTime: any;
  endTime: any;
  gradeType: any;
  total: any;
  passing: any;
  actions: any;
  academicyearId: any;
  subjectId: any;
  departmentId: any;
  batchId: any;
  semester: any;
  sectionId: any;
  branchId: any;
  typeOfGradingId:any;
  countvalue:any;
  groupvalue:any;
  constructor(examName: any, examDate: any, startTime: any, endTime: any, gradeType: any, total: any, passing: any, actions: any, academicyearId: any, subjectId: any, departmentId: any, batchId: any, semester: any, sectionId: any, branchId: any, typeOfGradingId:any, countvalue:any, groupvalue:any) {
    this.examName = examName;
    this.semester = semester;
    this.examDate = examDate
    this.startTime = startTime;
    this.endTime = endTime;
    this.gradeType = gradeType;
    this.total = total;
    this.passing = passing;;
    this.actions = actions;
    this.departmentId = departmentId;
    this.academicyearId = academicyearId;
    this.subjectId = subjectId;
    this.sectionId = sectionId;
    this.batchId = batchId;
    this.branchId = branchId;
    this.typeOfGradingId = typeOfGradingId;
    this.countvalue = countvalue;
    this.groupvalue = groupvalue;
  }
}

class MarkExam extends React.Component<ExamPageProps, ExamState>{
  constructor(props: any) {
    super(props);
    this.state = {
      gradeType: '',
      noOfExams: 0,
      selectedGrade:'',
      groupValue: '',
      gradingId: '',
      dayValue: [],
      dateofExam: "",
      isSubjectSame: false,
      examData: {
        branch: {
          id: 1851   
          //1851 1001
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
        semester: {
          id: ""
        },
        subject: {
          id: ""
        },
        section: {
          id: ""
        },
        mutateResult: [],
        filtered: [],
        selectedIds: "",
        payLoad: [],
        textValueMap: {},
        exmDate: {},
        exmDay: {},
        exmStTime: {},
        exmNdTime: {},
        exmPassMarks: {},
        exmTotalMarks: {},
        txtCmtVal: {},
        exmcountvalues: {},
      },
      branches: [],
      academicYears: [],
      departments: [],
      batches: [],
      semesters: [],
      sections: [],
      subjects: [],
      submitted: false,
      startDate: "",


    };

    this.createDepartments = this.createDepartments.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSubjects = this.createSubjects.bind(this);
    this.createGrid = this.createGrid.bind(this);
 
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

  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });

    const { examData } = this.state;
    e.preventDefault();
    
   

    if (examData.department.id && examData.batch.id) {
      e.target.querySelector("#detailGridTable").removeAttribute("class");
      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
    }
  }

  onChange = (e: any) => {
    const { id, name, value } = e.nativeEvent.target;
    const { examData } = this.state;
    if (name === "department") {
      this.setState({
        examData: {
          ...examData,
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
        examData: {
          ...examData,
          batch: {
            id: value
          },
          subject: {
            id: ""
          },
         
        }
      });
    }else if (name === "subject") {
        this.setState({
          examData: {
            ...examData,
            subject: {
              ...this.createSubjects,
            }
          }
        });        
    }else {
      this.setState({
        examData: {
          ...examData,
          [name]: value
        }
      });
    }

  }

  

  handleChange = (e: any) => {
    const { id, value } = e.nativeEvent.target;
    const { examData } = this.state;
    const key = id;
    const val = value;
    e.preventDefault();
    let stDate = moment(val, "YYYY-MM-DD");
    console.log(stDate);
    let dow = stDate.day();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayname = days[dow];
    examData.textValueMap[id] = dayname;
    examData.exmDate[id] = stDate;
    this.setState({ examData: examData })

  }

  
  

  onClick = (e: any) => {

    const { mutate } = this.props;
    const { examData } = this.state;
    e.preventDefault();

   
       
   this.setState({examData:examData})
   for (let x = 0; x < this.state.noOfExams; x++) {
   let subOptions: any = document.querySelector("#subject" + x);
   for(let i=0; i<this.state.noOfExams; i++) {    
    let sd  = new SaData(
    3,
     examData.exmDate["examDate"+i],
      examData.exmStTime["startTime"+i],
      examData.exmNdTime["endTime"+i], 
      this.state.gradeType,
      examData.exmTotalMarks["totalMarks"+i],
      examData.exmPassMarks["passingMarks"+i],      
      "ACTIVE",              
      examData.academicYear.id, 
      subOptions.options[subOptions.selectedIndex].value,
      examData.department.id,
      examData.batch.id,
      "SEMESTER1",
      examData.section.id, 
      examData.branch.id,
      this.state.gradingId,
      examData.exmcountvalues["countvalue"+i],
      this.state.groupValue
      );
    examData.payLoad.push(sd);
 }
}
 this.setState({examData:examData})

console.log('total IDS : ', examData.selectedIds);
let btn : any = document.querySelector("#btnSave");
btn.setAttribute("disabled", true);
return mutate({
  variables: { input: examData.payLoad },
}).then(data => {
  btn.removeAttribute("disabled");
  console.log('Saved Result: ', data.data.addAcademicExamSetting);
  alert("Added Succesfully");
}).catch((error: any) => {
  btn.removeAttribute("disabled");
  console.log('there is some error ', error);
  return Promise.reject(`there is some error while updating : ${error}`);
});
} 




  createGrid(ary: any) {
    const { examData } = this.state;
    const retVal = [];
    for (let x = 0; x < this.state.noOfExams; x++) {
      let v = ary[x];
        retVal.push(
          <tbody>
            <tr id="custom-width-input">
           
             
              <td> 
                <input type="date" value={examData.dateofExam} id={"examDate" + x} name="examDate" maxLength={8} onChange={this.handleChange} ></input> 
              </td> 

              <td>{examData.textValueMap["examDate" + x]}</td>

              
   
            </tr>
          </tbody>
        );


      }
    return retVal;
  }
  render() {
    const { data: { createExamFilterDataCache, refetch }, mutate } = this.props;
    const { examData, departments, batches,subjects,  submitted } = this.state;

    return (
      <section className="plugin-bg-white">
      
        <h3 className="bg-heading p-1">
          <i className="fa fa-university stroke-transparent" aria-hidden="true" />{' '}
          Admin - Library Management 
        </h3>
        
        <div><button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick}>Save</button></div>

        <div className="p-1">
          <form className="gf-form-group" onSubmit={this.onFormSubmit} >
            <table id="t-attendance" className="markAttendance">
              <thead>
                <tr>

                  <th>Department</th>
                  <th>Year</th>
                  <th>Subject</th>
                   <th>Book Title</th>
                  <th>Book No</th>
                  <th>No Of Copies</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>
                    <select required name="department" id="department" onChange={this.onChange} value={examData.department.id} className="gf-form-input max-width-22">
                      {this.createDepartments(this.props.data.createExamFilterDataCache.departments, examData.branch.id)}
                    </select>
                  </td>

                  <td>
                    <select required name="batch" id="batch" onChange={this.onChange} value={examData.batch.id} className="gf-form-input max-width-22">
                      {this.createBatches(this.props.data.createExamFilterDataCache.batches, examData.department.id)}
                    </select>
                  </td>
                  <td>
                <select required name={"subject"} id="subject"  onChange={this.onChange} value={examData.subject.id} className="gf-form-input max-width-22">
                  {this.createSubjects(this.props.data.createExamFilterDataCache.subjects, examData.department.id, examData.batch.id)}
                </select>
              </td>
                 <td>
                  <input type="text" id={"particularsDesc"} name={"particularsDesc"} onChange={this.onChange}  className="fwidth" />
                   {/* value={feeSetupData.particularsDesc} */}</td>
                   <td>
                  <input type="text" id={"particularsDesc"} name={"particularsDesc"} onChange={this.onChange}  className="fwidth" />
                   {/* value={feeSetupData.particularsDesc} */}</td>

                   <td>
                  <input type="text" id={"particularsDesc"} name={"particularsDesc"} onChange={this.onChange}  className="fwidth" />
                   {/* value={feeSetupData.particularsDesc} */}</td>

                 

                  

                 

                </tr>
              </tbody>
            </table>

          

            <div className="hide" id="detailGridTable">
              <table className="fwidth">
                <thead >
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Passing Marks</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                {
                  this.createGrid(this.state.examData.mutateResult)
                }
              </table>

              <div className="d-flex fwidth justify-content-between pt-2">
                <p></p>
                <div>

                  <button className="btn btn-primary mr-1" id="btnSave" name="btnSave" onClick={this.onClick}>Save</button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withExamSubjDataLoader(
  compose(   
    graphql<AddExamMutation, ExamRootProps>(AddExamMutationGql, {
      name: "mutate",
    }),
  )
    (MarkExam) as any
);