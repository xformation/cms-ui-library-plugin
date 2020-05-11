import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

type LibraryTableStates = {
    user: any;
    activeTab: any;
    lbObj: any;
    libraryData:any;
  };

export interface LibraryDetailsProps extends React.HTMLAttributes<HTMLElement> {
    [data: string]: any;
    user?: any;
  }
  class LibraryDetailsPage<T = {[data: string]: any}> extends React.Component<LibraryDetailsProps,LibraryTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
     activeTab: 0,
     lbObj: this.props.data,
     user: this.props.user,
     libraryData: {
     },
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  
  async componentDidMount() {
    this.setState({
      lbObj: this.props.data,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      lbObj: this.props.data,
    });
  }
  ;
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

 render() {
    const {activeTab,libraryData, lbObj} = this.state;
    console.log('Check the new obj in another page:', lbObj);
    return (    
      <TabContent activeTab={activeTab} className="ltab-contianer p-1">
        <div className="row">
          <div className="col-sm-2 col-xs-4 m-b-1 adminDetails">
            <span className="profile-label w-8">
               Department:
            </span>
            {lbObj.department !== undefined && (
            <span>{lbObj.department.name}</span>
            )}
           </div>
           {/* <div className="col-sm-3 col-xs-6 m-b-4 adminDetails">
             <span className="profile-label w-15">
                Semester:
              </span>
              <span className="">{lbObj.semester}</span>
            </div>
            <div className="col-sm-7 col-xs-5 m-b-1 adminDetails">
              <span className="profile-label w-20">
                Section: </span>
                {lbObj.section !== undefined && (
              <span>{lbObj.section.section}</span>
              )}
            </div> */}
          </div>
          <h4> BookTitle :{lbObj.bookTitle}</h4>
          <table id="libraryTable" className="striped-table fwidth bg-white p-3 m-t-1">
            <thead>
             <tr>
              <th>rowName</th>
              <th>bookTitle</th>
              <th>bookNo</th>
              <th>author</th>
              <th>noOfCopies</th>
              <th>uniqueNo</th>
             </tr>
            </thead>
              <td>{lbObj.rowName}</td>
              <td>{lbObj.bookTitle}</td>
              <td>{lbObj.bookNo}</td>
              <td>{lbObj.author}</td>
              <td>{lbObj.noOfCopies}</td>
              <td>{lbObj.uniqueNo}</td>
            </table>
       </TabContent> 
    );
    }
  }
  export default withApollo(LibraryDetailsPage);