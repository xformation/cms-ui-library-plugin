import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

type BookTableStates = {
    user: any;
    activeTab: any;
    bObj: any;
    bookData:any;
  };

export interface BookDetailsProps extends React.HTMLAttributes<HTMLElement> {
    [data: string]: any;
    user?: any;
  }
  class BookDetailsPage<T = {[data: string]: any}> extends React.Component<BookDetailsProps,BookTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
     activeTab: 0,
     bObj: this.props.data,
     user: this.props.user,
     bookData: {
     },
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  
  async componentDidMount() {
    this.setState({
      bObj: this.props.data,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      bObj: this.props.data,
    });
  }
  ;
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

 render() {
    const {activeTab,bookData, bObj} = this.state;
    console.log('Check the new obj in another page:', bObj);
    return (    
      <TabContent activeTab={activeTab} className="ltab-contianer p-1">
        <div className="row">
          <div className="col-sm-2 col-xs-4 m-b-1 adminDetails">
            <span className="profile-label w-8">
               Department:
            </span>
            {bObj.department !== undefined && (
            <span>{bObj.department.name}</span>
            )}
           </div>
           <div className="col-sm-2 col-xs-4 m-b-1 adminDetails">
             <span className="profile-label w-8">
              Year:
              </span>
                {bObj.batch !== undefined && (
                <span>{bObj.batch.batch}</span>
              )}
            </div>
            <div className="col-sm-7 col-xs-5 m-b-1 adminDetails">
              <span className="profile-label w-20">
                Student: </span>
                {bObj.student !== undefined && (
              <span>{bObj.student.studentName}</span>
              )}
            </div>
            <div className="col-sm-7 col-xs-5 m-b-1 adminDetails">
              <span className="profile-label w-20">
                Library: </span>
                {bObj.library !== undefined && (
              <span>{bObj.library.bookTitle}</span>
              )}
            </div>
          </div>
          <h4> RollNo :{bObj.student !== undefined && (
                  <h6>{bObj.student.rollNo}</h6>
          )}</h4>
          <table id="bookTable" className="striped-table fwidth bg-white p-3 m-t-1">
            <thead>
             <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Issue  Date</th>
              <th>Due  Date</th>
              <th>No Of Copies Available </th>
              <th>Department Name</th>
              <th>Year</th>
              <th>Book Title</th>
              <th>Book No</th>
              <th>Book Status</th>
             </tr>
            </thead>
                {bObj.student !== undefined && (
                        <td>{bObj.student.rollNo}</td>
                )}
                 {bObj.student !== undefined && (
                        <td>{bObj.student.studentName}</td>
                )}
               <td>{bObj.strIssueDate}</td>
               <td>{bObj.strDueDate}</td>
               <td>{bObj.noOfCopiesAvailable}</td>
               {bObj.department !== undefined && (
                        <td>{bObj.department.name}</td>
                      )}
                {bObj.batch !== undefined && (
                        <td>{bObj.batch.batch}</td>
                      )}
                 {bObj.library !== undefined && (
                        <td>{bObj.library.bookTitle}</td>
                      )}
                {bObj.library !== undefined && (
                        <td>{bObj.library.bookNo}</td>
                      )}
               <td>{bObj.bookStatus}</td>
            </table>
       </TabContent> 
    );
    }
  }
  export default withApollo(BookDetailsPage);