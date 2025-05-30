import React from 'react';
import { DefaultButton, DetailsList, Dropdown, IDropdownOption, IDropdownStyles, IIconProps } from '@fluentui/react';
import { SPListService } from '../services/SPListService';
import { SPUserService } from '../services/SPUserService';
import { NumberData } from '../models/NumberData';
import { UserDetails } from '../models/UserDetails';
import { INumberManagerProps } from './INumberManagerProps';
//import styles from './NumberManager.module.scss';
import Utils from '../services/Utils';


interface IHomeState {
  // define state properties here
  isAdmin: boolean;
  all_HeadNumbers: any[];
  //locations: any[];
  //user_location: string;
  //curr_location: string;
  //curr_location_key: string | number;
  OUs: any[];
  user_OU: string;
  curr_OU: string;
  curr_OU_key: string | number;
  location_NumberData: any[];
  currentUser: UserDetails | null;
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
}

const refreshIcon: IIconProps = { iconName: 'Refresh' };

class HomePage extends React.Component<INumberManagerProps, IHomeState> {
  //private spListService_countries: SPListService; 
  private spListService_NumberRanges: SPListService
  private spListService_CompleteList: SPListService;
  private spUserService: SPUserService;
  //private numberData: NumberData[] = [];
  constructor(props: INumberManagerProps) {
    super(props);
    this.state = {
      isAdmin: false,
      all_HeadNumbers: [],
      //locations: [],
      //user_location: '',
      //curr_location: '',
      //curr_location_key: -1,
      OUs: [],
      user_OU: '',
      curr_OU: '',
      curr_OU_key: -1,
      location_NumberData: [],
      currentUser: null
    };
    //this.spListService_countries = new SPListService('Countries');
    this.spListService_NumberRanges = new SPListService('Number-Ranges');
    this.spListService_CompleteList = new SPListService('CompleteList_202408_wip');
    this.spUserService = new SPUserService();
    this.RefreshData = this.RefreshData.bind(this);
    this.getNumberTableData = this.getNumberTableData.bind(this);
  }

  async componentDidMount() {
    await this.getNumberTableData();
    await this.getUserLocation();
    //await this.getLocations();
    await this.getOUList(null);
    //this is for showing the values corresponding to the user
    await this.SetCurrentUserValues();
  }

  async SetCurrentUserValues(): Promise<any> {
    try {
      // //Set the Country value
      // let country_val = this.state.user_location;
      // let ou_val = '';
      // if (country_val != null && country_val != '') {
      //   this.setState({ curr_location_key: this.getCountry_index_from_Country(country_val) });
      //   ou_val = this.state.user_OU;
      // }
      // let optionCountryToSelect = {
      //   key: this.state.curr_location_key,
      //   text: this.state.curr_location
      // };
      // await this.handleCountryChange(optionCountryToSelect);
      // if (ou_val != null && ou_val != '') {
      //   this.setState({ curr_OU_key: this.getOU_index_from_OU(ou_val) });
      // }
      let optionOUToSelect = {
        key: this.state.curr_OU_key,
        text: this.state.curr_OU
      };
      await this.handleOUChange(optionOUToSelect, true);
      //console.log("Selected location-inside SetCurrentUserValues : ", this.state.curr_location);
      console.log("Selected OU-inside SetCurrentUserValues : ", this.state.curr_OU);
      return;
    }
    catch (error) {
      console.log("Error in SetCurrentUserValues: ", error);
      return null;
    }
  }

  render() {
    //const dist_locs = await this.getLocations(this.props._spContext);
    //console.log(dist_locs);
    let currentPage = window.location.href;
    let currentPage_initial = '';
    if (currentPage.indexOf("#") > -1) {
      currentPage_initial = currentPage.split("#")[0];
    }
    let OUs_count = this.state.OUs.length;
    //let HomePage = currentPage_initial + "#/";
    let AssignedNumbersPage = currentPage_initial + "#/assigned-numbers";
    let AvailableNumbersPage = currentPage_initial + "#/available-numbers";
    console.log("Current State while renedering the entire control: ", this.state);
    return (
      <div>
        <div id="headerTitle" style={{display:'-ms-inline-flexbox'}}>
          <h1>M365 Contact Center - Number Management</h1>
          <div style={{float: 'right'}}>
            <DefaultButton iconProps={refreshIcon} text="Refresh Data" ariaLabel="Refresh Data" onClick={this.RefreshData} />
          </div>
        </div>
        <div style={{display:'inline-block'}}>
          <div>
            {/* <Dropdown
              id="countryDropdown"
              label='Country'
              placeholder="Select a Country"
              options={this.state.locations}
              selectedKey={this.state.curr_location_key}
              styles={dropdownStyles}
              onChange={async (event, option) => {
                await this.handleCountryChange(option);
                console.log("Selected location-inside Element : ", this.state.curr_location);
              }}
              disabled={this.state.isAdmin ? false : true}
            /> */}
            <Dropdown
              id="ouDropdown"
              label='OU'
              placeholder="Select an OU"
              options={this.state.OUs}
              selectedKey={this.state.curr_OU_key}
              styles={dropdownStyles}
              onChange={async (event, option) => {
                await this.handleOUChange(option);
              }}
              disabled={OUs_count<=1 ? true : false}
            />
          </div>
          
        </div>
        
        <DetailsList
          items={this.state.location_NumberData}
          columns={[
            // { key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200 },
            { key: 'OU', name: 'OU', fieldName: 'OU', minWidth: 100, maxWidth: 200 },
            { key: 'SiteIDs', name: 'Site', fieldName: 'SiteIDs', minWidth: 100, maxWidth: 200 },
            { key: 'HeadNumber', name: 'HeadNumber', fieldName: 'HeadNumber', minWidth: 100, maxWidth: 200 }, //, onRender: (item: any) => <a href={`https://example.com/${item.HeadNumber}`}>{item.HeadNumber}</a> },
            { key: 'StartNumber', name: 'StartNumber', fieldName: 'StartNumber', minWidth: 100, maxWidth: 200 },
            { key: 'EndNumber', name: 'EndNumber', fieldName: 'EndNumber', minWidth: 100, maxWidth: 200 },
            { key: 'AssignedNumbers', name: 'Assigned Numbers', fieldName: 'AssignedNumbers', minWidth: 100, maxWidth: 200, onRender: (item: any) => <a href={`${AssignedNumbersPage}?id=${item.ID}&headnumber=${item.HeadNumber}`}>{item.AssignedNumbers}</a> },
            { key: 'FreeNumbers', name: 'Unassigned Numbers', fieldName: 'FreeNumbers', minWidth: 100, maxWidth: 200, onRender: (item: any) => <a href={`${AvailableNumbersPage}?id=${item.ID}&headnumber=${item.HeadNumber}`}>{item.FreeNumbers}</a> },
            { key: 'TotalNumbers', name: 'Total', fieldName: 'TotalNumbers', minWidth: 100, maxWidth: 200 },
          ]}
        />
      </div>
    );
  }

  // async handleCountryChange(option: IDropdownOption<any> | undefined): Promise<any> {
  //   console.log("Country Change Event Handler: ", option);;
  //   let selData = '';
  //   if (option) {
  //     this.setState({ curr_location_key: option.key, curr_location: option.text });
  //     selData = option.text;
  //     console.log("Selected location-stateVal: ", this.state.curr_location + "; Selected location-OptionVal: ", option.text);
  //   }

  //   //Populate the filtered OU list.
  //   await this.getOUList(selData);
  //   this.setState({ curr_OU_key: -1 });
  //   this.setState({ location_NumberData: [] });
  //   //await this.handleOUChange(undefined);
  //   //await this.setNumberTableData(selData);
  //   console.log("exit country change event handler:");
  //   return;
  // }

  async handleOUChange(option: IDropdownOption<any> | undefined, firstLoad?: boolean | false): Promise<any> {
    console.log("OU Change Event Handler: ", option);
    console.log("First Load: ", firstLoad); //This is to check if the event is triggered on the first load of the page
    let selData = '';
    if (option) {
      this.setState({ curr_OU_key: option.key, curr_OU: option.text });
      selData = option.text;
      console.log("Selected OU-OptionVal: ", option.text);
    }
    await this.setNumberTableData(selData);
    console.log("exit OU change event handler:");
    return;
  }

  private async getNumberTableData(): Promise<void> {
    try {
      const numbData = await this.spListService_NumberRanges.getAllItems(this.props._spContext);
      const numbData_tbOriginal: NumberData[] = numbData.map((item: any) => {
        let assignedNumber_val = 0;
        let freeNumber_val = item.TotalNumbers;
        if (item.AssignedNumbers != null) {
          assignedNumber_val = item.AssignedNumbers;
          freeNumber_val = item.TotalNumbers - assignedNumber_val;
        }
        //this.getNewStartNumberString(item);
        return {
          ID: item.Id,
          Coutry: item.Country,
          OU: item.OU,
          SiteIDs: item.SiteIDs,
          HeadNumber: item.Title,
          StartNumber: item.Range_x002d_StartNumber == 0 ? this.getNewStartNumberString(item)  : item.Range_x002d_StartNumber,
          EndNumber: item.Range_x002d_EndNumber,
          AssignedNumbers: assignedNumber_val,
          FreeNumbers: freeNumber_val,
          TotalNumbers: item.TotalNumbers
        };
      });
      this.setState({ all_HeadNumbers: numbData_tbOriginal });
    }
    catch (Error) {
      console.log("Error in getNumberTableData: ", Error);
      this.setState({ all_HeadNumbers: [] });
    }
  }

  private getNewStartNumberString(item: any):string {
    let endNumber_len = item.Range_x002d_EndNumber.toString().length;
    let startNumber_rev = '';
    for (let i = 0; i < endNumber_len; i++) {
      startNumber_rev = startNumber_rev + '0';
    }
    return startNumber_rev
  }

  // async getLocations(): Promise<any> {
  //   const originalData = this.state.all_HeadNumbers;
  //   const distinctLocations = originalData
  //     .map(item => item.Coutry)
  //     .filter((value, index, self) => self.indexOf(value) === index);
  //   const distinctLocations_DropData: IDropdownOption<any>[] = distinctLocations.map((item: any, index) => {
  //     return {
  //       key: index,
  //       text: item
  //     };
  //   });
  //   this.setState({ locations: distinctLocations_DropData });
  //   //await this.getOUList(null);
  // }

  sortList(list: any[]): any[] { 
    let orderedList = list;
    try{
      orderedList = list.sort((a, b) => (a != null && b != null ) ? (a.localeCompare(b)) : 0);
      return orderedList;
    }
    catch(error){
      console.log("Error in sortList: ", error);
      return list;
    }
  }

  async getOUList(country?: string | null): Promise<any> {
    if(this.state.isAdmin) {
      const originalData = this.state.all_HeadNumbers;
      let filteredData = originalData;
      if (country != null && country != '') {
        filteredData = originalData.filter(item => item.Coutry == country);
      }
      let distinctOUs = filteredData.map(item => item.OU).filter((value, index, self) => self.indexOf(value) === index);
      distinctOUs = this.sortList(distinctOUs);
      const distinctOUs_DropData: IDropdownOption<any>[] = distinctOUs.map((item: any, index) => {
        return {
          key: index,
          text: item
        };
      });
      this.setState({ OUs: distinctOUs_DropData });
      this.setState({ location_NumberData: [] });
    }
    else {
      if(this.state.user_OU.indexOf(";")>0)
      {
        //Has multi-OUs
        let userOUList = this.state.user_OU.split(';');
        userOUList = this.sortList(userOUList);
        const userOUList_dd: IDropdownOption<any>[] = userOUList.map((item: any, index) => {
          return {
            key: index,
            text: item
          };
        });
        this.setState({ OUs: userOUList_dd });
      }
      else{
        const onlyOU:IDropdownOption<any>[] = [{key:0, text:this.state.user_OU}];
        this.setState({ OUs: onlyOU });
      }
    }
  }

  async setNumberTableData(OUVal?: string): Promise<void> {
    if (!OUVal) {
      OUVal = this.state.curr_OU;
    }
    //TODO:: Depending on the user (if user == Admin, show All data; else show no Data if OUVal is empty or null)
    const originalData = this.state.all_HeadNumbers;
    let filteredData = originalData;
    if (OUVal != null && OUVal != '') {
      filteredData = originalData.filter(item => item.OU == OUVal);
    }
    else {
      if (!this.state.isAdmin) {
        filteredData = [];
      }
    }
    this.setState({ location_NumberData: filteredData });
  }

  //Get the user-location and set the values of Country and OU according to the user location
  async getUserLocation(): Promise<any> {
    let flag_isAdmin = await this.spUserService.CheckUserIsAdmin();
    //let flag_isAdmin = false;
    const user = await this.spUserService.GetCurrentUserDetails(this.props._spContext);
    this.setState({ isAdmin: flag_isAdmin });
    try {
      if(flag_isAdmin){        
        //Get the User Location from his title. Title (OU-Code)
        const user_ou = this.spUserService.GetCurrentUsers_OU(user.Title);
        const user_country = this.getCountryFromOU(user_ou);
        //this.setState({ user_location: user_country });
        //this.setState({ curr_location: user_country });
        this.setState({ user_OU: user_ou });
        this.setState({ curr_OU: user_ou });
        const userDetails: UserDetails = {
          ID: user.Id,
          Title: user.Title,
          OU: user_ou,
          Country: user_country,
          IsAdmin: user.IsSiteAdmin
        };
        this.setState({ currentUser: userDetails });
      }
      else {
        //He is a Business User. Get all his OUs from the Groups he Belong to...
        let userGroups = await this.spUserService.GetCurrentUserGroups(this.props._spContext);
        let userOU = '';
        let firstUserOU = '';
        if(userGroups != undefined && userGroups != null && userGroups.length > 0 ){          
          for (let i = 0; i < userGroups.length; i++) {
            const groupName = userGroups[i].Title;
            const groupNameParts = groupName.split('_');
            if (groupNameParts.length === 2) {
              if(userOU == '') {
                userOU = groupNameParts[1];   
                firstUserOU = userOU;        
                console.log("First OU: " + firstUserOU);     
              }
              else {                
                userOU = userOU + ";" + groupNameParts[1];
              }                
            }
          }         
        }
        this.setState({ user_OU: userOU });
        this.setState({ curr_OU: firstUserOU });
        this.setState({ curr_OU_key: 0});
        const userDetails_bu: UserDetails = {
          ID: user.Id,
          Title: user.Title,
          OU: userOU,
          Country: '',
          IsAdmin: false
        };
        this.setState({ currentUser: userDetails_bu });        
      } 
      console.log("UserOU: ", this.state.currentUser?.OU);     
      return;
    }
    catch (error) {
      console.log("Error in getUserLocation: ", error);
    }
  }

  getCountryFromOU(ou: string): string {
    const originalData = this.state.all_HeadNumbers;
    let filteredData = originalData;
    if (ou != null && ou != '') {
      filteredData = originalData.filter(item => item.OU == ou);
    }
    if (filteredData.length > 0) {
      return filteredData[0].Coutry;
    }
    else {
      return '';
    }
  }

  // getCountry_index_from_Country(CountryVal: string): string | number {
  //   try {
  //     const loc_list = this.state.locations;
  //     const loc_index = loc_list.filter(x => x.text == CountryVal)[0].key;
  //     return loc_index;
  //   }
  //   catch (error) {
  //     console.log("Error in getCountry_index_from_Country: ", error);
  //     return -1;
  //   }
  // }

  getOU_index_from_OU(OUVal: string): string | number {
    try {
      let ou_list = this.state.OUs;
      const ou_index = ou_list.filter(x => x.text == OUVal)[0].key;
      return ou_index;
    }
    catch (error) {
      console.log("Error in getOU_index_from_OU: ", error);
      return -1;
    }
  }

  async RefreshData(): Promise<any> {
    try {
      console.log("Refresh Data Clicked");
      await this.getNumberTableData();
      console.log("Number Table Data Refreshed");
      let loc_headNumberData = this.state.all_HeadNumbers;
      loc_headNumberData.map(async (item) => {
        if(item != null && item != ''){
          let res = await this.UpdateNumberCountsForHeader(item.ID, item.HeadNumber);
          if(res != null){
            //console.log("Updated the Assigned Numbers count for the HeadNumber: ", item.HeadNumber);
          }
          else{
            console.log("Error in updating the Assigned Numbers count for the HeadNumber: ", item.HeadNumber);
          }
        }
      });
      console.log("Assigned Numbers Count Updated. Getting Refreshed Data");
      await this.getNumberTableData();
      return;
    }
    catch (error) {
      console.log("Error in RefreshData: ", error);
      return null;
    }
  }

  async UpdateNumberCountsForHeader(id: number, headNumber: string): Promise<any> {
    console.log("Updating the HeadNumber: ", headNumber);
    let searchResults: any[] = [];
    if(id != undefined && id != null && headNumber !=undefined && headNumber!=null) {
      try{
        //searchResults = await this.spListService_CompleteList.getListItems_search_v4('Title', headNumber,this.props._spContext, ["Status"]);
        searchResults = await Utils.GetAssignedNumbers(headNumber, this.spListService_CompleteList, this.props._spContext);
        //searchResults = searchResults.filter(item => item.Status !== 'Unassigned');           
      }
      catch(error){
        console.log("Error in UpdateNumberCountsForHeader: ", headNumber, error);
      }
      if(searchResults.length > 0){
        //Update the Assigned Numbers count with the length of the searchResults
        let item2Upd = {
          AssignedNumbers: searchResults.length
        };
        try{
          let res = await this.spListService_NumberRanges.updateItem(id, item2Upd, this.props._spContext);
          console.log("Updated the Assigned Numbers count for the HeadNumber: ", headNumber, ": SUCCESS");
          return res;
        }
        catch(error){
          console.error("Error in updating the Assigned Numbers count for the HeadNumber: ", headNumber, error);
          return null;
        }
      }
    }    
  }

}

export default HomePage;


// import React from 'react';

// const HomePage: React.FC = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// };

// export default HomePage;