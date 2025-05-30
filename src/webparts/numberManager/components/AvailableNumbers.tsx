// Add the following line at the top of the file to suppress unused variable and method warnings
// @ts-ignore
import React, { ReactElement } from 'react';
import { SPListService } from '../services/SPListService';
import { INumberManagerProps } from './INumberManagerProps';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { Link } from '@fluentui/react/lib/Link';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, DetailsList } from '@fluentui/react';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import styles from './NumberManager.module.scss';
import Utils from '../services/Utils';
// interface AvailableNumbersProps {
//   // Define props here
// }

interface inputFormDetails {
  Number: string;
  Region: string;
  Country: string;
  OU: number | string;
  Selected_OU: string;
  Name: string;
  LicenseType: string; //Later this has to be converted to choice type (Drop down field)
  Usage: string //Later this has to be converted to Choice type (Drop down field)
  Billability: boolean; //Should be a check-box
  Status: string; //Later this has to be converted to Choice type (Drop down field - Assigned/Reserved)
  VersionComments: string; //Multiline Text Field
  Notes: string; 
 }

interface AvailableNumbersState {
  // Define state here
  id_HeadNumberRange: number | string ;
  headNumber: string;
  startNumber: number;
  endNumber: number;
  currentPage_region: string;
  currentPage_country: string;
  currentPage_OU: string;
  fullList: string[];
  assignedNumbers: string[];
  availableNumbers: string[];
  availableNumbers_2d: string[][];
  availableNumbers_2d_unfiltered: string[][],
  availableNumbers_count: number;
  country_listName: string;
  currentPage: number;
  lastPage: number;
  pageSize: number;
  rowSize_page: number;
  isOpen_PanelSubmitNumber: boolean;
  selectedNumber: string;
  searchingNumber: string;
  inputFormDetails: inputFormDetails;
  locations:any[]
  countries: any[];
  regions: any[];
  OUs:any[];
  Usage_Lic_Combo: any[];
  Usages: any[];
  LicenseTypes: any[];  
  Statuses: any[];
  curr_Country_key: string | number;
  curr_Country: string;
  curr_Region_key: string | number;
  curr_Region: string;
  curr_OU_key: string | number;
  curr_OU: string;
  curr_LicenseType_key: string | number;
  curr_LicenseType: string;
  curr_Usage_key: string | number;
  curr_Usage: string;
  curr_Billability: boolean;
  curr_Status_key: string | number;
  curr_Status: string;
  isSaving: boolean;
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
 }

class AvailableNumbersPage extends React.Component<INumberManagerProps, AvailableNumbersState> {
  // Add the following line inside the AvailableNumbersPage class to suppress unused variable and method warnings
  // @ts-ignore
  _spListService_headNumber: SPListService;
  _spListService_CompleteList: SPListService;
  _spListService_MasterList_loc: SPListService;
  _spListService_MasterList_usageTypes: SPListService;
  _spListService_MasterList_status: SPListService;
  _spContext: any;
  filterIcon: IIconProps = { iconName: 'Filter' };
  searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 }};

  constructor(props: INumberManagerProps) {
    super(props);
    // Initialize state here
    this._spListService_headNumber = new SPListService('Number-Ranges');
    this._spListService_CompleteList = new SPListService('CompleteList_202408_wip'); //This has to be defaulted either to User's own country or the country to which Headcountry belongs to
    this._spContext = this.props._spContext;
    this.state = {
      id_HeadNumberRange: '',
      headNumber: '',
      startNumber: 0,
      endNumber: 0,
      currentPage_region: '',
      currentPage_country: '',
      currentPage_OU: '',
      fullList: [],
      assignedNumbers: [],
      availableNumbers: [],
      availableNumbers_2d: [],
      availableNumbers_2d_unfiltered: [],
      availableNumbers_count: 0,
      country_listName: '',
      currentPage: 0,
      lastPage:0,
      pageSize: 20,
      rowSize_page: 20,
      isOpen_PanelSubmitNumber: false,
      selectedNumber: '',
      searchingNumber: '',
      inputFormDetails: {
        Number: '',
        Region: '',
        Country: '',
        OU: 0,
        Selected_OU: '',
        Name: '',
        LicenseType: '',
        Usage: '',
        Billability: false,
        Status: '',
        Notes: '',
        VersionComments: ''
      },
      locations: [],
      countries: [],
      regions:[],
      OUs: [],
      Usage_Lic_Combo: [],
      Usages: [],
      LicenseTypes: [],
      Statuses: [],
      curr_Country_key: -1,
      curr_Country: '',
      curr_Region_key: -1,
      curr_Region: '',
      curr_OU_key: -1,
      curr_OU: '',
      curr_LicenseType_key: -1,
      curr_LicenseType: '',
      curr_Usage_key: -1,
      curr_Usage: '',
      curr_Billability: false,
      curr_Status_key: -1,
      curr_Status: '',
      isSaving: false
    };

    //Binders for Event Handlers
    this.Save_Number = this.Save_Number.bind(this);
    this.createFullList = this.createFullList.bind(this);
  }

  async componentDidMount(): Promise<void> {
    // Code to run on component mount
    //Get the Headnumber from the Query String
    
    // Get the current URL of the page
    //await this.loadInitialValues();
    ////console.log("Before Load Initial Values from ComponentDidMount");
    await this.loadInitialValues();
    ////console.log("After Load Initial Values from ComponentDidMount");
    await this.loadDropdownValues();
  }

  createFullList = (): void => {
    const { headNumber, startNumber, endNumber } = this.state;
    //console.log("Creating Full List with Head Number:" + this.state.headNumber + " Start Number:" + this.state.startNumber + " End Number:" + this.state.endNumber);
    const fullList: string[] = [];

    for (let i = startNumber; i <= endNumber; i++) {
      const numberDigits = endNumber.toString().length;
      const iDigits = i.toString().length;
      const zerosToAdd = numberDigits - iDigits;
      const paddedI = "0".repeat(zerosToAdd) + i.toString();
      const number = `${headNumber}${paddedI}`;
      fullList.push(number);
    }

    this.setState({  fullList: fullList });
    //console.log('Full List:', fullList);
    // Do something with the full list
  };

  loadAssignedNumbers = async (param_headNumber: string | null ): Promise<void> => { 
    
    //let searchResults = await this._spListService_CompleteList.getListItems_search_v4('Title', param_headNumber,this._spContext, ["field_11"]);
    let searchResults_allProps = await Utils.GetAssignedNumbers(param_headNumber, this._spListService_CompleteList, this._spContext);
    let searchResults = searchResults_allProps.map((item:any) => item.Title);
    //let searchResults = await this._spListService_CompleteList.getListItems_search('HeadNumber', param_headNumber, null);
    //console.log('Search Results:', searchResults);
    // allocatedNumbers = searchResults.map(item => item.Title);
    ////console.log('Allocated Numbers:', allocatedNumbers);
    
    this.setState({ assignedNumbers: searchResults });
    //console.log("After Load Assigned Numbers");
    //console.log(this.state);
  }

  private loadAvailableNumbers() {
    const { fullList, assignedNumbers } = this.state;
    const availableNumbers_obj = fullList.filter(number => !assignedNumbers.includes(number));
    this.setState({ availableNumbers: availableNumbers_obj });
    //console.log('Available Numbers from the loadAvailableNumbers method :');
    //console.log(this.state.availableNumbers);
    const availableNumbers_2dObj: string[][] = [];
    const chunkSize = 100; // Define the size of each chunk of the 2d array

    //Setting the total number of Available numbers
    this.setState({ availableNumbers_count: availableNumbers_obj.length });

    //Converting the 1d into 2d array
    this.Convert1dTo2D(availableNumbers_obj, availableNumbers_2dObj, chunkSize);

    //Setting the available numbers as 2d array in state
    this.setState({ availableNumbers_2d: availableNumbers_2dObj, 
                    lastPage: availableNumbers_2dObj.length - 1,
                    availableNumbers_2d_unfiltered: availableNumbers_2dObj });

    //console.log('Available Numbers 2D from the state :')
    //console.log(this.state.availableNumbers_2d);
  }

  private Convert1dTo2D(availableNumbers_obj: string[], availableNumbers_2dObj: string[][], chunkSize ?: number, ) {
    let chunkSize_local = 100;
    if(chunkSize != null){
      chunkSize_local = chunkSize;
    }
    for (let i = 0; i < availableNumbers_obj.length; i += chunkSize_local) {
      const chunk = availableNumbers_obj.slice(i, i + chunkSize_local);
      availableNumbers_2dObj.push(chunk);
    }
  }

  private async loadInitialValues() {
    const currentUrl = window.location.href;
    let headNumber_ret = this.extractHeadNumberFromUrl(currentUrl);
    if (headNumber_ret != '-1') {
      this.setState({ headNumber: headNumber_ret });
      //This is a case of page navigated from Home Page. So disable the Country Dropdown
      let id_ret = this.extractIdFromUrl(currentUrl);

      // Get the List Item by id 34 for Number-Ranges list
      try {
        //let id_num = parseInt(this.state.id_HeadNumberRange.toString());
        let item = await this._spListService_headNumber.getItemById(id_ret, this._spContext);
        // Handle the retrieved item
        //console.log('Retrieved item:', item);
        if (item != null) {
          this.setState({ id_HeadNumberRange: item.Id });
          this.setState({ startNumber: item["Range_x002d_StartNumber"] });
          this.setState({ endNumber: item["Range_x002d_EndNumber"] });
          this.setState({ country_listName: item["Country"] });
          this.setState({ currentPage_region: item["Region"] });
          this.setState({ currentPage_country: item["Country"] });
          this.setState({ currentPage_OU: item["OU"] });
        }

        // Create the Full List using the Head Number and the Start and End Numbers
        await this.LoadTheAvailableNumbersTable(headNumber_ret);  

        //console.log("Completed Load Initial Values");
      }
      catch (error) {
        console.error('Error retrieving item:', error);
      }
    }
    else {
      //This is page is accessed directly. So, show the Country Dropdown in this case
      //TODO: Load the Country Dropdown with the list of Countries
    }
  } 
  
  private async LoadTheAvailableNumbersTable(headNumber_ret: string) {
    this.createFullList();

    //Load all the Assigned Numbers from the Assigned Numbers list
    await this.loadAssignedNumbers(headNumber_ret);

    // Calculate the Available numbers by calculating the free numbers from the above two 
    this.loadAvailableNumbers();
  }

  private loadFilteredAvailableNumbers(value ?:any): void {
    // const { searchingNumber } = this.state;
    let availableNumbers_local = this.state.availableNumbers
    let local_filtered_2d : string[][] = [];
    const availableNumbers_filtered = availableNumbers_local.filter(row => row.includes(value));
    this.Convert1dTo2D(availableNumbers_filtered, local_filtered_2d, 100);
    this.setState({ availableNumbers_2d: local_filtered_2d, currentPage:0, lastPage: local_filtered_2d.length - 1 });
  }

  private extractIdFromUrl(currentUrl: string): number {
    if (currentUrl.indexOf('id=') > -1) {
      let id_string = currentUrl.split('id=')[1];
      let id = parseInt(id_string);
      this.setState({ id_HeadNumberRange: id });
      //console.log('Head Number Range ID:', id);
      return id
    }
    else {
      this.setState({ id_HeadNumberRange: -1 });
      //console.log('Head Number Range ID:', -1);
      return -1;
    }    
  }

  private extractHeadNumberFromUrl(currentUrl: string): string {
    if (currentUrl.indexOf('headnumber=') > -1) { 
      let id_string = currentUrl.split('headnumber=')[1];
      //let id = parseInt(id_string);
      this.setState({ headNumber: id_string });
      //console.log('Head Number :', id_string);
      return id_string;
    }
    else {
      this.setState({ headNumber: '-1' });
      //console.log('Head Number:', -1);
      return '-1';
    }    
  }

  render() {
    // Add the following line inside the render method to suppress unused variable and method warnings
    // @ts-ignore
    //console.log("Inside Render Method");
    //console.log(this.state);
    return (
      <div id="divParent_AvailableNumbers">
        <h1>Available Numbers Page</h1>
        <div id="divMainContent">
          <div id="divavailableNumbersList_container" style={{ display: 'inline-block', marginRight: '10px', margin: '10px', padding: '10px' }}>
            {this.List_AvailableNumbers()}
          </div>
          <div id="divNumberSubmitForm" style={{ display: 'inline-block', margin: '10px', padding: '10px' }}>
            {this.Form_SubmitNumber()}
          </div>
        </div>      
      </div>
    );
  }

  private List_AvailableNumbers() {
    return (
      <div id="divAvailableNumberList_Panel" style={{ display: 'inline-block'}}>
        <div id="header_totalCount" className={styles.totalCount}>
          <div id="divHeadNumberRange" style={{ display: 'inline-block' }}>
            <h3>Total Available Numbers - {this.state.availableNumbers_count}</h3>            
          </div>
          <div id="divSearchBox" style={{ display: 'inline-block', margin: '10px', padding: '5px' }}>
            <SearchBox placeholder="Filter"
              iconProps={this.filterIcon}
              styles={this.searchBoxStyles}
              onEscape={ev => {
                //console.log('Custom onEscape Called');
                // Check if you have to call the loadInitial values here
                this.loadInitialValues();
                // this.setState({ availableNumbers_2d: this.state.availableNumbers_2d_unfiltered, searchingNumber: '' });
              }}
              onClear={ev => {
                //console.log('Custom onClear Called');
                // Check if you have to call the loadInitial values here
                this.loadInitialValues();
                // this.setState({ availableNumbers_2d: this.state.availableNumbers_2d_unfiltered, searchingNumber: '' });
              }}
              // onChange={(_, newValue) => {
              //   //console.log('SearchBox onChange fired: ' + newValue);
              //   this.loadFilteredAvailableNumbers(newValue);
              // }}
              onSearch={newValue => {
                //console.log('SearchBox onSearch fired: ' + newValue);
                this.loadFilteredAvailableNumbers(newValue);
              }}
            />
          </div>
        </div>
        <div><h5>{this.state.currentPage_region} - {this.state.currentPage_country} - {this.state.currentPage_OU}</h5></div>
        {this.renderAvailableNumbers_1d_paged()}
        {/* {this.renderAvailableNumbers_1d()} */}
        {/*{this.renderAvailableNumbers_2d()} */}
      </div>
    );
  }

  private renderAvailableNumbers_1d_paged() {
    let currentArray:any[] = [];
    let currentArray_2d:any[][] = [];
    try{
      //console.log("Checking State in renderAvailableNumbers_1d_paged");
      //console.log(this.state);
      currentArray = this.state.availableNumbers_2d[this.state.currentPage];
      for (let index = 0; index < currentArray.length; index += 10) {
        currentArray_2d.push(currentArray.slice(index, index + 10));
      }
    }
    catch(error){
      //console.log("Error in getting the current Array: Method-renderAvailableNumbers_1d_paged");
    }
    if(currentArray != null && currentArray.length > 0)
    {
      return (
      <div id="divAvailableNumbersList" >
        <div id="divPageButtons">
          <button onClick={this.firstPage}>
          <span role="img" aria-label="First Page">
        ⏪
          </span>
          </button>
          <button onClick={this.previousPage}>
          <span role="img" aria-label="Previous Page">
        ⏮️
          </span>
          </button>          
          <button onClick={this.nextPage}>
          <span role="img" aria-label="Next Page">
        ⏭️
          </span>
          </button>
          <button onClick={this.lastPage}>
          <span role="img" aria-label="Last Page">
        ⏩
          </span>
          </button>        
        </div>
        {(currentArray_2d != null && currentArray_2d.length > 0) ? (
          <div>
            <div id="divListMatrixForm">
              {currentArray_2d.map((currentArray_inner, yIndex) => (
                <div key={yIndex} style={{ display: 'inline-block', margin: '10px', padding: '2px' }}>
                  {currentArray_inner.map((number, xIndex) => (
                    <div key={xIndex} style={{ marginBottom: '5px', padding: '2px' }}>
                      {
                        <Link onClick={() => this.openPanelSubmitNumber(number)}>{number}</Link>
                      }
                    </div>))}
                </div>
              ))}
            </div>
          </div>) : (<div>No Tabular format</div>)
        }          
      </div>);
    }
    else{
      return (
        <div><h3>No Available Numbers</h3></div>
      );
    }
  }

  private previousPage = (): void => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage <= 0 ? 0 : prevState.currentPage - 1,
    }));
  };
  
  private nextPage = (): void => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage >= prevState.lastPage ? prevState.lastPage : prevState.currentPage + 1,
    }));
  };

  private firstPage = (): void => { 
    this.setState({ currentPage: 0 });
  }

  private lastPage = (): void => { 
    this.setState({ currentPage: this.state.lastPage });
  }
  
  private openPanelSubmitNumber = (number ?: any): void => {
    this.setState({ isOpen_PanelSubmitNumber: true });
    //console.log(number);
    this.setState({ selectedNumber: number });
    let inputFormDetails_local = this.state.inputFormDetails;
    inputFormDetails_local.Number = number;
    inputFormDetails_local.Region = this.state.currentPage_region;
    inputFormDetails_local.Country = this.state.currentPage_country;
    //inputFormDetails_local.OU = parseInt(this.state.currentPage_OU);
    inputFormDetails_local.OU = this.state.currentPage_OU;
    this.setState({ inputFormDetails: inputFormDetails_local });
  }

  private closePanelSubmitNumber = (): void => { 
    this.loadInitialValues().then(() => {
      this.setState({ isOpen_PanelSubmitNumber: false });
    });
  }

  private async Save_Number() { 
    this.setState({ isSaving: true });
    let isSuccessfulSave = false;
    let listItem: any = {};
    let ou_local_sel = 0;
    if(this.state != undefined && this.state.inputFormDetails != undefined && this.state.inputFormDetails != null && this.state.inputFormDetails.Number != null) {
      if(this.state.inputFormDetails.OU.toString().includes(';') || this.state.inputFormDetails.OU.toString().includes(',')) {
        ou_local_sel = Number(this.state.inputFormDetails.Selected_OU);
      }
      else {
        ou_local_sel = Number(this.state.inputFormDetails.OU);
      }
      listItem = {
        //This should be final Column Names once the list for each OU is created
        // Title: this.state.inputFormDetails.Number,
        // Name: this.state.inputFormDetails.Name,
        // Region: this.state.inputFormDetails.Region,
        // Country: this.state.inputFormDetails.Country,
        // OU: this.state.inputFormDetails.OU,
        // LicenseType: this.state.inputFormDetails.LicenseType,
        // Usage: this.state.inputFormDetails.Usage,
        // Billability: this.state.inputFormDetails.Billability,
        // Status: this.state.inputFormDetails.Status
        // Notes: this.state.inputFormDetails.Notes        //Multiline Text Field

        Title: String(this.state.inputFormDetails.Number),
        field_3: this.state.inputFormDetails.Name,
        field_0: this.state.inputFormDetails.Region,
        field_1: this.state.inputFormDetails.Country,
        field_5: ou_local_sel,
        field_8: this.state.inputFormDetails.LicenseType,
        field_9: this.state.inputFormDetails.Usage,
        field_10: this.state.inputFormDetails.Billability ? "Billable" : "Non Billable",
        field_11: this.state.inputFormDetails.Status,
        field_12: this.state.inputFormDetails.Notes,
        VersionHistory: this.state.inputFormDetails.VersionComments
      };      
    }
    else {
      //console.log("Input Form Details are null. Getting from Form Field Values");
      //Get all the details from the input fields and save it to the list
      listItem = {
        Title: (document.getElementById('txtNumber') as HTMLInputElement)?.value,    //Text Field
        field_3: (document.getElementById('txtName') as HTMLInputElement)?.value,        //Text Field
        // Region: (document.getElementById('txtRegion') as HTMLInputElement)?.value,    //Dropdown
        // Country: (document.getElementById('txtCountry') as HTMLInputElement)?.value,  //Dropdown
        // OU: (document.getElementById('txtOU') as HTMLInputElement)?.value,            //Dropdown
        // LicenseType: (document.getElementById('txtLic') as HTMLInputElement)?.value,  //Dropdown
        // Usage: (document.getElementById('txtUsage') as HTMLInputElement)?.value,      //Dropdown
        // Billability: (document.getElementById('txtBillable') as HTMLInputElement)?.value, //Checkbox
        // Status: (document.getElementById('txtStatus') as HTMLInputElement)?.value     //Dropdown
        // Notes: (document.getElementById('txtNotes') as HTMLInputElement)?.value        //Multiline Text Field
      }       
    }
    
    try {
      //Check if the item is already existing... If yes, then update the item..else create a new item
      let check_Item = await this._spListService_CompleteList.getItemsFilteredByColumn('Title', listItem.Title, this._spContext);
      if(check_Item != null && check_Item.length > 0) { 
        //Update Item
        let item_id = check_Item[0].Id;
        console.log("Updating the existing Item: ItemId" + item_id);
        this._spListService_CompleteList.updateItem(item_id, listItem, this._spContext).then(async (upd_response) => {
          if(upd_response != null) {
            isSuccessfulSave = true;
            console.log("Item Updated Successfully");
          }
        }).catch((error) => {
          console.error('Error updating item:', error);
        }).finally(() => {
          this.setState({ isOpen_PanelSubmitNumber: false, isSaving: false });      
          this.createFullList();  
        });
      }
      else{
        console.log("Creating a new Item");
        this._spListService_CompleteList.createListItem(listItem, this._spContext).then(async (response) => {
          //this.render();
          if(response != null && response.ID > 0) {
            isSuccessfulSave = true;
            //remove that number from available numbers
            // let avail_numbers = this.state.availableNumbers;
            // avail_numbers = avail_numbers.filter(number => number !== this.state.inputFormDetails.Number);
            // let avail_numb_count = this.state.availableNumbers_count - 1; 
            // this.setState({availableNumbers : avail_numbers, availableNumbers_count: avail_numb_count});
            // this.forceUpdate();
          }
        }).catch((error) => {
          console.error('Error creating item:', error);
        }).finally(() => {
          this.setState({ isOpen_PanelSubmitNumber: false, isSaving: false });      
          this.createFullList();  
        });  
      }    
    }
    catch(error) {
      console.error('Error in Save_Number:', error);
      alert('Error in Save_Number');
    } 
    if(isSuccessfulSave){
      //Reload the entire page TODO
    }
  }

  private onTextChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string | undefined): void => {
    //console.log('Text changed:', text);
    let inputFormDetails_local = this.state.inputFormDetails;
    if(ev.currentTarget.id == 'txtName' && text != null) { inputFormDetails_local.Name = text; }
    if(ev.currentTarget.id == 'txtRegion' && text != null) { inputFormDetails_local.Region = text; }
    if(ev.currentTarget.id == 'txtCountry' && text != null) { inputFormDetails_local.Country = text; }
    if(ev.currentTarget.id == 'txtOU' && text != null) { inputFormDetails_local.OU = parseInt(text); }
    if(ev.currentTarget.id == 'txtLic' && text != null) { inputFormDetails_local.LicenseType = text; }
    if(ev.currentTarget.id == 'txtUsage' && text != null) { inputFormDetails_local.Usage = text; }
    if(ev.currentTarget.id == 'txtBillable') { inputFormDetails_local.Billability = !inputFormDetails_local.Billability; }
    if(ev.currentTarget.id == 'txtStatus' && text != null) { inputFormDetails_local.Status = text; }
    if(ev.currentTarget.id == 'txtTicketNumber' && text != null) { inputFormDetails_local.VersionComments = text; }
    if(ev.currentTarget.id == 'txtNotes' && text != null) { inputFormDetails_local.Notes = text; }
       
    this.setState({ inputFormDetails: inputFormDetails_local });
  }

  private onDropdownChange = (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    let inputFormDetails_local = this.state.inputFormDetails;
    
    if(ev.currentTarget.id.indexOf('drpDownOU')>=0 && option != null) {
      this.setState({ curr_OU_key: option.key, curr_OU: option.text });       
      inputFormDetails_local.Selected_OU = option.text; 
      console.log("OU Changed: ", option.text);
    }
    
    if(ev.currentTarget.id.indexOf('drpDownUsage')>=0 && option != null) {
      this.setState({ curr_Usage_key: option.key, curr_Usage: option.text }); 
      inputFormDetails_local.Usage = option.text;     
    }
    if(ev.currentTarget.id.indexOf('drpDownLicenseType')>=0 && option != null) {
      this.setState({ curr_LicenseType_key: option.key, curr_LicenseType: option.text });   
      inputFormDetails_local.LicenseType = option.text;   
    }
    if(ev.currentTarget.id.indexOf('drpDownStatus')>=0 && option != null) { 
      this.setState({ curr_Status_key: option.key, curr_Status: option.text });      
      inputFormDetails_local.Status = option.text;
    }
    
    this.setState({ inputFormDetails: inputFormDetails_local });
  }

  private onBillabilityChange = (ev: React.FormEvent<HTMLInputElement>, option?: any): void => {
    ////console.log('Billability changed:', option);
    let inputFormDetails_local = this.state.inputFormDetails;
    let bill_string = option.text;
    if(option != null) {
      if(option.key == 'Billable') { inputFormDetails_local.Billability = true; }
      else { inputFormDetails_local.Billability = false; }
    }
    this.setState({ inputFormDetails: inputFormDetails_local, curr_Billability: bill_string });
    ////console.log("Checking the State ater Billability change");
    ////console.log(this.state);
  }

  private async loadDropdownValues() {
    this._spListService_MasterList_loc = new SPListService('Master_Locations');
    this._spListService_MasterList_usageTypes = new SPListService('Master_UsageLicenses');
    this._spListService_MasterList_status = new SPListService('Master_StatusList');
    //Load OUs / Countries / Regions
    try{
      let loc_results = await this._spListService_MasterList_loc.getAllItems(this._spContext);
      this.setState({ locations: loc_results });
      this.load_OUs();
      this.load_Countries();
      this.load_regions();      
    }
    catch(error) {
      console.error("Error in loading Locations",error);
    }

    //Load LicenseType and Usage Types
    try{
      let loc_usageLics = await this._spListService_MasterList_usageTypes.getAllItems(this._spContext);
      this.setState({ Usage_Lic_Combo: loc_usageLics });
      this.load_Usages();
      this.load_LicenseTypes();
      
    }
    catch(error) {
      console.error("Error in loading LicenseType and Usage Types", error);
    }

    //Load the Status Types
    try{
      let loc_statuses = await this._spListService_MasterList_status.getAllItems(this._spContext);
      loc_statuses = loc_statuses.filter((item) => item.Title !== "Unassigned");
      loc_statuses = loc_statuses.map((item) => {
        return { key: item.Id, text: item.Title };
      });
      loc_statuses = loc_statuses.filter((item, index, self) => {
        return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
      });
      this.setState({ Statuses: loc_statuses });
    }
    catch(error){
      console.error("Error in loading Status Types", error);
    }
  }

  private load_OUs(filteredCountry?: string | null , filteredRegion?: string | null) { 
    let loc_Locations = this.state.locations;
    let loc_OUs:any[] = [];
    if(filteredCountry != null && filteredCountry != '' && filteredRegion != null && filteredRegion != '') {
      loc_OUs = loc_Locations.filter((item) => item.Country == filteredCountry && item.Region == filteredRegion);      
    }
    else if(filteredRegion != null && filteredRegion != '') {
      loc_OUs = loc_Locations.filter((item) => item.Region == filteredRegion);
    }
    else if(filteredCountry != null && filteredCountry != '') {
      loc_OUs = loc_Locations.filter((item) => item.Country == filteredCountry);
    }
    else {
      loc_OUs = loc_Locations;
    }
    
    let f_OUs = loc_OUs.map((item) => {
      return { key: item.Id, text: item.Title };
    });

    f_OUs = f_OUs.filter((item, index, self) => {
      return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
    });
    
    this.setState({ OUs: f_OUs });
    ////console.log("This OU List: ", this.state.OUs);
  }

  private load_Countries(filteredRegion?: string | null) {
    let loc_Locations = this.state.locations;
    let loc_countries:any[] = [];
    if(filteredRegion != null) {
      loc_countries = loc_Locations.filter((item) => item.Region == filteredRegion);
    }
    else {
      loc_countries = loc_Locations;
    }
    
    let f_countries = loc_countries.map((item) => {
      return { key: item.Id, text: item.Country };
    });
    f_countries = f_countries.filter((item, index, self) => {
      return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
    });
    f_countries.unshift({ key: '', text: '' });
    this.setState({ countries: f_countries });
  }

  private load_regions() {
    let loc_Locations = this.state.locations;
    let loc_regions = loc_Locations.map((item) => {
      return { key: item.Id, text: item.Region };
    });
    
    let f_regions = loc_regions.map((item) => {
      return { key: item.key, text: item.text };
    });
    f_regions = f_regions.filter((item, index, self) => {
      return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
    });
    f_regions.unshift({ key: '', text: '' });
    this.setState({ regions: f_regions});
  }

  private load_Usages() {
    let loc_usageLics = this.state.Usage_Lic_Combo;
    let loc_usages = loc_usageLics.map((item) => {
      return { key: item.Id, text: item.Usage };
    });
    loc_usages = loc_usages.filter((item, index, self) => {
      return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
    });
    this.setState({ Usages: loc_usages });
  }

  private load_LicenseTypes() {
    let loc_usageLics = this.state.Usage_Lic_Combo;
    let loc_licenseTypes = loc_usageLics.map((item) => {
      return { key: item.Id, text: item.Title };
    });
    loc_licenseTypes = loc_licenseTypes.filter((item, index, self) => {
      return item.text !== "" && self.findIndex(i => i.text === item.text) === index;
    });
    this.setState({ LicenseTypes: loc_licenseTypes });
  }

  private Form_SubmitNumber() {
    //Load the Dropdown values required for the form
    let detailsListInputs  = [];
    detailsListInputs.push({ Region: this.state.inputFormDetails.Region, Country: this.state.inputFormDetails.Country, OU: this.state.inputFormDetails.OU });
    // detailsListInputs.push({ col_name: 'Region', col_val: this.state.inputFormDetails.Region });
    // detailsListInputs.push({ col_name: 'Country', col_val: this.state.inputFormDetails.Country });
    // detailsListInputs.push({ col_name: 'OU', col_val: this.state.inputFormDetails.OU });
    let curr_panel_OU = this.state.inputFormDetails.OU.toString();
    let dropdownList_OU : any[] = [];
    if(curr_panel_OU.includes(';') || curr_panel_OU.includes(',')) { 
      let arr_OU:any[] = [];
      if(curr_panel_OU.includes(';')) {
        arr_OU = curr_panel_OU.split(';');        
      }
      if(curr_panel_OU.includes(',')) { 
        arr_OU = curr_panel_OU.split(',');
      }
      if(arr_OU.length > 0) { 
        arr_OU.map((item) => { 
          dropdownList_OU.push({ key: item, text: item });
        });
      }
    }

    return (
      <Panel 
        isOpen={this.state.isOpen_PanelSubmitNumber} 
        onDismiss={this.closePanelSubmitNumber}  
        headerText={(`Submit Number: ` + this.state.selectedNumber)} 
        closeButtonAriaLabel='Close'
        type={PanelType.medium}
        onRenderFooterContent={() => {
          return (
            <div>
              <PrimaryButton onClick={this.Save_Number} style={{ marginRight: '8px' }}>Submit</PrimaryButton>
              <DefaultButton onClick={this.closePanelSubmitNumber}>Close</DefaultButton>
            </div>
          );
        }}
        isFooterAtBottom={true}
      > 
        {(this.state.isSaving) ? 
          (<div id="divProgressBar"><ProgressIndicator label="Saving..." description="Please wait while the form is saving..." /></div>) : 
          (<div id="divNumberSubmitForm_inner">
          <div>
            <DetailsList
              items={detailsListInputs}
              columns={[
                { key: '1', name:'Region', fieldName: 'Region', minWidth: 100, maxWidth: 200 },
                { key: '2', name:'Country', fieldName: 'Country', minWidth: 100, maxWidth: 200 },
                { key: '3', name:'OU', fieldName: 'OU', minWidth: 100, maxWidth: 200 }
              ]}
            />
            {/* <TextField label="Number" value={this.state.inputFormDetails.Number}  readOnly disabled={true}/>
            <TextField label="Region" value={this.state.inputFormDetails.Region}  readOnly disabled={true}/>
            <TextField label="Country" value={this.state.inputFormDetails.Country}  readOnly disabled={true}/>
            <TextField label="OU" value={this.state.inputFormDetails.OU.toString()}  readOnly disabled={true}/> */}
            <TextField id="txtName" label="Name" onChange={this.onTextChange} />

            {(dropdownList_OU.length > 1)? 
              <Dropdown id="drpDownOU" label='OU' placeholder="Select OU" options={dropdownList_OU} 
                        selectedKey={this.state.curr_OU_key} styles={dropdownStyles}
                        onChange={async (event, option) => {
                          await this.onDropdownChange(event,option);
                        }}/> : ''
            }           
            
            <Dropdown id="drpDownUsage" label='Usage' placeholder="Select Usage" options={this.state.Usages}
                      selectedKey={this.state.curr_Usage_key} styles={dropdownStyles}
                      onChange={async (event, option) => {
                        await this.onDropdownChange(event,option);
                      }}/>
            <Dropdown id="drpDownLicenseType" label='License Type' placeholder="Select License Type" options={this.state.LicenseTypes}  
                      selectedKey={this.state.curr_LicenseType_key} styles={dropdownStyles}
                      onChange={async (event, option) => {
                        await this.onDropdownChange(event,option);
                        ////console.log("Selected LicenseType-inside Element : ", this.state.curr_LicenseType);
                      }}/>
            <ChoiceGroup id="chkBillable" label="Billability" defaultSelectedKey="NonBillable" options={[
              { key: 'Billable', text: 'Billable' },
              { key: 'NonBillable', text: 'Non Billable' }
            ]} onChange={this.onBillabilityChange} />         
            <Dropdown id="drpDownStatus" label='Status' placeholder="Select Status" options={this.state.Statuses}
                      selectedKey={this.state.curr_Status_key} styles={dropdownStyles}
                      onChange={async (event, option) => {
                        await this.onDropdownChange(event,option);
                        ////console.log("Selected Status-inside Element : ", this.state.curr_Status);
                      }}/>
            <TextField id="txtTicketNumber" label="Ticket Number" onChange={this.onTextChange} />
            <TextField id="txtNotes" label="Notes" multiline rows={3} onChange={this.onTextChange} />
          </div>
          </div>)
        }        
      </Panel>
    );
  }
}

export default AvailableNumbersPage;
