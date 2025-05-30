import React from 'react';
import { INumberManagerProps } from './INumberManagerProps';
import { SPListService } from '../services/SPListService';
import { SPUserService } from '../services/SPUserService';
// import { DetailsList, Modal, Label } from '@fluentui/react';
import styles from './NumberManager.module.scss'; 
import { IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
// import Select from "react-select";

import { ComboBox, IComboBoxOption, IComboBoxStyles, Label, Modal, TextField, Dropdown, IDropdownOption } from '@fluentui/react';
import ConfirmDialog from './DialogBox';

interface FieldLabels {
  Title: string;
  field_3: string;
  field_8: string;
  field_9: string;
  field_10: string;
  field_0: string;
  field_1: string;
}

const fieldLabels: FieldLabels = {
  Title: 'Number',
  field_3: 'Name',
  field_8: 'License Type',
  field_9: 'Usage',
  field_10: 'Billability',
  field_0: 'Region',
  field_1: 'Country'
};

const billableDropDownOptions: IDropdownOption[] = [
  { key: 'Billable', text: 'Billable' },
  { key: 'Non Billable', text: 'Non Billable' }
];


interface AssignedNumbersState {
  count: number;
  currentNumberRange_Row: any;
  currentHeadNumber: any;
  AssignedNumbers: any[];
  AssignedNumbersFilter: any[];
  optionsNumber: any[];
  optionsName: any[];
  optionsLicenseType: any[];
  optionsUsage: any[];
  optionsBillability: any[];
  currentNumberRange_id: number;
  isModalOpen: boolean;
  selectedItem: any;
  selectedNumberOptions: any[];
  selectedNameOptions: any[];
  selectedLicenseTypeOptions: any[];
  selectedUsageOptions: any[];
  selectedBillabilityOptions: any[];
  modalType: string;
  showDialog: boolean;
  itemToDelete: any;
  dialogTitle: string;
  dialogSubText: string;
  dialogType: 'confirmation' | 'information';
  isUserOwner: boolean;
  LicenseTypeDropdownOptions: any[];
  UsageDropdownOptions: any[];
}

class AssignedNumbersPage extends React.Component<INumberManagerProps, AssignedNumbersState> {
  private spListService_NumberRanges: SPListService
  private spListService_AssignedNumbers: SPListService
  private spUserService_CheckUserIsOwner: SPUserService
  private spListService_UsageLicensedNumbers: SPListService

  public filteredData:any[];

  constructor(props: INumberManagerProps) {
    super(props);
    this.state = {
      count: 0,
      currentNumberRange_Row: {},
      AssignedNumbers: [],  // Intial data of assigned numbers
      AssignedNumbersFilter: [], // Filtered data of assigned numbers
      optionsNumber: [], // Options for Number dropdown
      optionsName: [], // Options for 'Name' dropdown
      optionsLicenseType: [], // Options for 'License Type' dropdown
      optionsUsage: [], // Options for 'Usage' dropdown
      optionsBillability: [], // Options for 'Billability' dropdown
      currentHeadNumber:'',
      currentNumberRange_id: -1,
      isModalOpen: false,
      selectedItem: null,
      selectedNumberOptions: [], // State to store selected options for 'Number' dropdown
      selectedNameOptions: [], // State to store selected options for 'Name' dropdown
      selectedLicenseTypeOptions: [], // State to store selected options for 'License Type' dropdown
      selectedUsageOptions: [], // State to store selected options for 'Usage' dropdown
      selectedBillabilityOptions: [], // State to store selected options for 'Billability' dropdown
      modalType: '', // 'view' or 'edit'
      showDialog: false,
      itemToDelete: null,
      dialogTitle: '',
      dialogSubText: '',
      dialogType: 'confirmation', 
      isUserOwner: false,
      LicenseTypeDropdownOptions: [],
      UsageDropdownOptions: [],
    };
  }

  async componentDidMount() {
    // Check if the URL contains any query parameters
    if (window.location.href.indexOf('?') <= -1) {
      //Show the Blank page if no query parameters are found
      return
    }
    // Extract the query parameters from the URL
    let searchParams = window.location.href.split('?')[1]
    // Check if searchParams contains any data
    if (!searchParams) {
      // Log a message and exit if no search parameters are found
      console.log('No search parameters found');
      return;
    }
    // Create a URLSearchParams object to easily handle the query parameters
    let params = new URLSearchParams(searchParams);
    // Check if both 'id' and 'headnumber' parameters are present
    if (!params.has('id') || !params.has('headnumber')) {
      // Log a message and exit if required parameters are not found
      console.log('Required parameters not found');
      return;
    }
    // Get the values of 'id' and 'headnumber' from the query parameters
    const id = params.get('id');
    const headnumber = params.get('headnumber');
    // Use the id and headnumber as needed
    this.spListService_NumberRanges = new SPListService('Number-Ranges');
    this.spListService_AssignedNumbers = new SPListService('CompleteList_202408_wip');
    this.spListService_UsageLicensedNumbers = new SPListService('Master_UsageLicenses');
    this.spUserService_CheckUserIsOwner = new SPUserService();
    const isOwner = await this.spUserService_CheckUserIsOwner.CheckUserIsOwner(this.props._spContext);
    console.log('Is User Owner:', isOwner)
    // Call the function to get number range details
    await this.getNumberRangeDetails(id);
    await this.getUsageLicenses();
    // Call the function to get assigned numbers
    const data = await this.getAssignedNumbers(headnumber);
    this.setState({AssignedNumbers : data, AssignedNumbersFilter : data, isUserOwner: isOwner});
    await this.getOptions();
  }

  async getNumberRangeDetails(id:string | null): Promise<any> {
    //let count = 0;
    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        id = parsedId.toString();
      }
      this.setState({ currentNumberRange_id: parsedId });
      const numberRanges = await this.spListService_NumberRanges.getItemById(parsedId);
      console.log('Number Ranges:',numberRanges);
      this.setState({ currentNumberRange_Row: numberRanges });
      this.setState({ currentHeadNumber: numberRanges["Title"] });
      //count = numberRanges.filter((range: any) => range.ID === id).length;
    }
    else{
      //Get the Number Range of the current user's location-ou (mostly the first one)
    }
  }

// Define the function to get assigned numbers
async getAssignedNumbers(headnumber: string | null) {
  // Construct the filter query
  const filterQuery = headnumber ? `substringof('${headnumber}', Title)` : undefined;
  // Specify the columns you want to retrieve
  const selectFields = ['ID', 'Title', 'field_1', 'field_0', 'field_3', 'field_8', 'field_9', 'field_10', 'field_11', 'Author/Title', 'Author/EMail'];
   // Specify the fields to expand
   const expandFields = ['Author'];
   // Specify the field to order by and the order direction
   const orderByField = 'ID';
  const assignedNumbers = await this.spListService_AssignedNumbers.getAllItemsWOThreshold(this.props._spContext, filterQuery, selectFields, expandFields, orderByField, false);
  return assignedNumbers;
}

async getUsageLicenses() {
  const selectFields = ['ID', 'Title', 'Usage'];
  const usageLicenses = await this.spListService_UsageLicensedNumbers.getAllItemsWOThreshold(this.props._spContext, '', selectFields, [], '', false);
  const uniqueLicenseTypes = Array.from(
    new Set(
      usageLicenses
        .map(item => (typeof item.Title === 'string' ? item.Title.trim().replace(/\u00A0/g, '') : ''))
    )
  ).filter((title, index, self) => title !== '' || self.indexOf(title) === index)
  .map(title => ({
    key: title,
    text: title
  }));
  // Ensure there is one empty option
  if (!uniqueLicenseTypes.some(option => option.key === '')) {
    uniqueLicenseTypes.unshift({ key: '', text: '' });
  }
  console.log(uniqueLicenseTypes);
  const uniqueUsages = Array.from(new Set(usageLicenses.map(item => item.Usage || ''))).map(Usage => ({
    key: Usage,
    text: Usage || ''
  }));
  this.setState({ LicenseTypeDropdownOptions: uniqueLicenseTypes, UsageDropdownOptions: uniqueUsages });
}

async getOptions() {
  try {
    const addCheckAllOptions = (options: any) => {
      return [
        { key: 'checkAll', text: 'Check All' },
        { key: 'uncheckAll', text: 'Uncheck All' },
        ...options
      ];
    };
    const optionsNumSet = new Set();
    const OptionsNum = await this.state.AssignedNumbers.reduce((acc, data) => {
      const id = data.Title;
      if (id && !optionsNumSet.has(id)) {
        optionsNumSet.add(id);
        acc.push({
          key: id,
          text: id,
        });
      }
      return acc; 
    }, []);
    this.setState({optionsNumber:addCheckAllOptions(OptionsNum)})

    const optionsNamSet = new Set();
    const optionsNam = await this.state.AssignedNumbers.reduce((acc, data) => {
      const id = data.field_3;
      if (id && !optionsNamSet.has(id)) {
        optionsNamSet.add(id);
        acc.push({
          key: id,
          text: id,
        });
      }
      return acc; 
    }, []);
    this.setState({optionsName: addCheckAllOptions(optionsNam)})

    const optionsLTSet = new Set();
    const optionsLT = await this.state.AssignedNumbers.reduce((acc, data) => {
      const id = data.field_8;
      if (id && !optionsLTSet.has(id)) {
        optionsLTSet.add(id);
        acc.push({
          key: id,
          text: id,
        });
      }
      return acc; 
    }, []);
    this.setState({optionsLicenseType:addCheckAllOptions(optionsLT)})

    const optionsUsagSet = new Set();
    const optionsUsag = await this.state.AssignedNumbers.reduce((acc, data) => {
      const id = data.field_9;
      if (id && !optionsUsagSet.has(id)) {
        optionsUsagSet.add(id);
        acc.push({
          key: id,
          text: id,
        });
      }
      return acc; 
    }, []);
    this.setState({optionsUsage: addCheckAllOptions(optionsUsag)})

    const optionsBillSet = new Set();
    const optionsBill = await this.state.AssignedNumbers.reduce((acc, data) => {
      const id = data.field_10;
      if (id && !optionsBillSet.has(id)) {
        optionsBillSet.add(id);
        acc.push({
          key: id,
          text: id,
        });
      }
      return acc; 
    }, []);
    this.setState({optionsBillability: addCheckAllOptions(optionsBill)})
  } catch (error) {
    console.error("Error Message", error)
  }
}

handleCloseModal = () => {
  this.setState({ isModalOpen: false, selectedItem: null, modalType: '', });
}

handleView = (item: any) => {
  this.setState({ isModalOpen: true, selectedItem: item, modalType: 'view' }, );
}

handleEdit = (item: any) => {
  this.setState({ selectedItem: item, isModalOpen: true, modalType: 'edit'}, );
}

handleDelete = async (item: any) => {
  this.setState({ itemToDelete: item, showDialog: true, dialogTitle: 'Confirm Deletion', dialogType: 'confirmation',
    dialogSubText: 'Are you sure you want to delete the item?' });
}

handleConfirmDelete = async () => {
  const { itemToDelete } = this.state;
  this.clearSelections();
    await this.spListService_AssignedNumbers.deleteItem(itemToDelete.ID, this.props._spContext);
    const data = await this.getAssignedNumbers(this.state.currentHeadNumber); //get updated table data
    this.setState({ AssignedNumbers: data, AssignedNumbersFilter: data, showDialog: false }, async () => {
      await this.getOptions(); // get updated options for dropdown 
      this.showDeleteDialog('Item deleted successfully!');
    });
}

showDeleteDialog = (message: string) => {
  this.setState({
    showDialog: true,
    dialogTitle: 'Delete Successful',
    dialogSubText: message,
    dialogType: 'information',
  });
}

showUpdateDialog = (message: string) => {
  this.setState({
    showDialog: true,
    dialogTitle: 'Update Successful',
    dialogSubText: message,
    dialogType: 'information',
  });
}

handleSave = async () => {
  // Implement save logic here
  const { selectedItem } = this.state; 
  const currItem = {
    Title: selectedItem.Title,
    field_0: selectedItem.field_0,
    field_1: selectedItem.field_1,
    field_3: selectedItem.field_3,
    field_8: selectedItem.field_8,
    field_9: selectedItem.field_9,
    field_10: selectedItem.field_10,
  };
  try {
    this.clearSelections();
    await this.spListService_AssignedNumbers.updateItem(selectedItem.ID, currItem, this.props._spContext);
    const data = await this.getAssignedNumbers(this.state.currentHeadNumber);
    this.setState({ AssignedNumbers: data, AssignedNumbersFilter: data }, async () => {
      await this.getOptions(); // get updated options for dropdown 
      this.showUpdateDialog('Item Updated successfully!');
      this.handleCloseModal();
    });
  } catch (error) {
    alert("Error updating item: " + error.message);
  }
};

handleChange = (key: string, value: string | undefined) => {
  this.setState((prevState) => ({
    selectedItem: {
      ...prevState.selectedItem,
      [key]: value,
    },
  }));
};

handleOptionsFilter = ( event: React.FormEvent<any>, option?: IComboBoxOption, index?: number, label?: string ): void => {
  if (option) {
    let selectedKeys = [];
    const updateState = (stateKey: keyof AssignedNumbersState, selectedKeys: any[]) => {
      this.setState((prevState: AssignedNumbersState) => ({
        ...prevState,
        [stateKey]: selectedKeys
      }), this.filterData);
    };
    // Update the state based on the dropdown label
    switch (label) {
      case 'Number':
        if (option.key === 'checkAll') {
          selectedKeys = this.state.optionsNumber.map(opt => opt.key).filter(key => key !== 'checkAll' && key !== 'uncheckAll');
        } else if (option.key === 'uncheckAll') {
          selectedKeys = [];
        } else {
          selectedKeys = option.selected
            ? [...this.state.selectedNumberOptions, option.key as string]
            : this.state.selectedNumberOptions.filter((key) => key !== option.key);
        }
        updateState('selectedNumberOptions', selectedKeys);
        break;
      case 'Name':
        if (option.key === 'checkAll') {
          selectedKeys = this.state.optionsName.map(opt => opt.key).filter(key => key !== 'checkAll' && key !== 'uncheckAll');
        } else if (option.key === 'uncheckAll') {
          selectedKeys = [];
        } else {
          selectedKeys = option.selected
            ? [...this.state.selectedNameOptions, option.key as string]
            : this.state.selectedNameOptions.filter((key) => key !== option.key);
        }
        updateState('selectedNameOptions', selectedKeys);
        break;
      case 'License Type':
        if (option.key === 'checkAll') {
          selectedKeys = this.state.optionsLicenseType.map(opt => opt.key).filter(key => key !== 'checkAll' && key !== 'uncheckAll');
        } else if (option.key === 'uncheckAll') {
          selectedKeys = [];
        } else {
          selectedKeys = option.selected
            ? [...this.state.selectedLicenseTypeOptions, option.key as string]
            : this.state.selectedLicenseTypeOptions.filter((key) => key !== option.key);
        }
        updateState('selectedLicenseTypeOptions', selectedKeys);
        break;
      case 'Usage':
        if (option.key === 'checkAll') {
          selectedKeys = this.state.optionsUsage.map(opt => opt.key).filter(key => key !== 'checkAll' && key !== 'uncheckAll');
        } else if (option.key === 'uncheckAll') {
          selectedKeys = [];
        } else {
          selectedKeys = option.selected
            ? [...this.state.selectedUsageOptions, option.key as string]
            : this.state.selectedUsageOptions.filter((key) => key !== option.key);
        }
        updateState('selectedUsageOptions', selectedKeys);
        break;
      case 'Billability':
        if (option.key === 'checkAll') {
          selectedKeys = this.state.optionsBillability.map(opt => opt.key).filter(key => key !== 'checkAll' && key !== 'uncheckAll');
        } else if (option.key === 'uncheckAll') {
          selectedKeys = [];
        } else {
          selectedKeys = option.selected
            ? [...this.state.selectedBillabilityOptions, option.key as string]
            : this.state.selectedBillabilityOptions.filter((key) => key !== option.key);
        }
        updateState('selectedBillabilityOptions', selectedKeys);
        break;
      default:
        break;
    }
  } 
};

filterData = () => {
  const {
    selectedNumberOptions,
    selectedNameOptions,
    selectedLicenseTypeOptions,
    selectedUsageOptions,
    selectedBillabilityOptions,
    AssignedNumbers
  } = this.state;

  let filteredData = AssignedNumbers;
  // Apply filters based on selected options from each dropdown
  if (selectedNumberOptions.length > 0) {
    filteredData = filteredData.filter((data) => selectedNumberOptions.includes(data.Title));
  }
  if (selectedNameOptions.length > 0) {
    filteredData = filteredData.filter((data) => selectedNameOptions.includes(data.field_3));
  }
  if (selectedLicenseTypeOptions.length > 0) {
    filteredData = filteredData.filter((data) => selectedLicenseTypeOptions.includes(data.field_8));
  }
  if (selectedUsageOptions.length > 0) {
    filteredData = filteredData.filter((data) => selectedUsageOptions.includes(data.field_9));
  }
  if (selectedBillabilityOptions.length > 0) {
    filteredData = filteredData.filter((data) => selectedBillabilityOptions.includes(data.field_10));
  }
  // Update the state with the filtered data
  this.setState({ AssignedNumbersFilter: filteredData });
};

clearSelections = () => {
  this.setState({
    selectedNumberOptions: [],
    selectedNameOptions: [],
    selectedLicenseTypeOptions: [],
    selectedUsageOptions: [],
    selectedBillabilityOptions: [],
    AssignedNumbersFilter: this.state.AssignedNumbers // Reset to show all data
  });
};

  render() {
    const { AssignedNumbersFilter, isModalOpen, selectedItem, modalType, showDialog, dialogTitle, dialogSubText, dialogType} = this.state;
    
    const viewButtonStyles = {
      root: {
        backgroundColor: 'teal', // Change this to your desired background color
        color: 'white', // Icon color
        marginRight: '8px', // Space between buttons
        selectors: {
          ':hover': {
            backgroundColor: 'darkslategray', // Hover background color
            color: 'white' // Hover icon color
          }
        }
      }
    };
    const editButtonStyles = {
      root: {
        backgroundColor: '#007bff',
        color: 'white',
        marginRight: '8px',
        selectors: {
          ':hover': {
            backgroundColor: 'darkorange',
            color: 'white'
          }
        }
      }
    };

    const deleteButtonStyles = {
      root: {
        backgroundColor: '#dc3545',
        color: 'white',
        selectors: {
          ':hover': {
            backgroundColor: 'darkred',
            color: 'white'
          }
        }
      }
    };

    const comboBoxStyles: Partial<IComboBoxStyles> = {
      label: { fontWeight: 'bold', textAlign: 'center', width: '100%' },
      root: { width: '13vw' },
      optionsContainer: {
        overflowY: 'auto', // Enables vertical scrolling
        maxHeight: '300px' // Sets a maximum height for the dropdown
      },
      callout: {
        minWidth: '13vw' // Sets a minimum width for the dropdown menu
      }
    };
    const customOptionStyles: React.CSSProperties = {
      fontWeight: 'bold',
    };
    
    const onRenderOption = (option: IComboBoxOption): JSX.Element => {
      if (option.key === 'uncheckAll' || option.key === 'checkAll') {
          return (
              <div style={customOptionStyles}>
                  {option.text}
              </div>
          );
      }
      return <div>{option.text}</div>;
  };
  const headerClass = modalType === 'view' ? styles.viewHeader : styles.editHeader;
    return (
      <div>
        <div className={styles.totalCountContainer}>
          <div className={styles.totalCount}>
            Assigned Numbers: {AssignedNumbersFilter.length}
          </div>
          <button className={styles.resetButton} onClick={this.clearSelections}>
            Reset Filters
          </button>
        </div>
        <div>
          <ConfirmDialog
            hidden={!showDialog}
            onDismiss={() => this.setState({ showDialog: false })}
            onConfirm={this.handleConfirmDelete}
            title={dialogTitle}
            subText={dialogSubText}
            dialogType={dialogType}
          />
        </div>
        <div className={styles.detailsListContainer}>
          <div className={styles.headerRow}>

            <ComboBox
              placeholder="Select"
              options={this.state.optionsNumber as IComboBoxOption[]}
              selectedKey={this.state.selectedNumberOptions}
              autoComplete='on'
              allowFreeform={true}
              multiSelect={true}
              label='Number'
              styles={comboBoxStyles}
              className={styles.columnHeader}
              onChange={(event, option, index) => this.handleOptionsFilter(event, option, index, 'Number')}
              onRenderOption={onRenderOption}
            // onInputValueChange={(newValue: any) => this.onInputValueChange(newValue || '')}
            />
            <ComboBox
              placeholder="Select"
              options={this.state.optionsName as IComboBoxOption[]}
              selectedKey={this.state.selectedNameOptions}
              autoComplete='on'
              allowFreeform={true}
              multiSelect={true}
              label='Name'
              styles={comboBoxStyles}
              className={styles.columnHeader}
              onChange={(event, option, index) => this.handleOptionsFilter(event, option, index, 'Name')}
              onRenderOption={onRenderOption}
            // onInputValueChange={(newValue: any) => this.onInputValueChange(newValue || '')}
            />
            <ComboBox
              placeholder="Select"
              options={this.state.optionsLicenseType as IComboBoxOption[]}
              selectedKey={this.state.selectedLicenseTypeOptions}
              autoComplete='on'
              allowFreeform={true}
              multiSelect={true}
              label='License Type'
              styles={comboBoxStyles}
              className={styles.columnHeader}
              onChange={(event, option, index) => this.handleOptionsFilter(event, option, index, 'License Type')}
              onRenderOption={onRenderOption}
            // onInputValueChange={(newValue: any) => this.onInputValueChange(newValue || '')}
            />
            <ComboBox
              placeholder="Select"
              options={this.state.optionsUsage as IComboBoxOption[]}
              selectedKey={this.state.selectedUsageOptions}
              autoComplete='on'
              allowFreeform={true}
              multiSelect={true}
              label='Usage'
              styles={comboBoxStyles}
              className={styles.columnHeader}
              onChange={(event, option, index) => this.handleOptionsFilter(event, option, index, 'Usage')}
              onRenderOption={onRenderOption}
            // onInputValueChange={(newValue: any) => this.onInputValueChange(newValue || '')}
            />
            <ComboBox
              placeholder="Select"
              options={this.state.optionsBillability as IComboBoxOption[]}
              selectedKey={this.state.selectedBillabilityOptions}
              autoComplete='on'
              allowFreeform={true}
              multiSelect={true}
              label='Billability'
              styles={comboBoxStyles}
              className={styles.columnHeader}
              onChange={(event, option, index) => this.handleOptionsFilter(event, option, index, 'Billability')}
              onRenderOption={onRenderOption}
            // onInputValueChange={(newValue: any) => this.onInputValueChange(newValue || '')}
            />
            <Label className={styles.columnHeader}>Actions
            </Label>

          </div>
          {AssignedNumbersFilter.map((item) => {
            return (
              <div key={item.ID} className={styles.dataRow}>
                <div className={styles.cell}>{item.Title}</div>
                <div className={styles.cell}>{item.field_3}</div>
                <div className={styles.cell}>{item.field_8}</div>
                <div className={styles.cell}>{item.field_9}</div>
                <div className={styles.cell}>{item.field_10}</div>
                <div className={styles.cell}>
                  <IconButton
                    iconProps={{ iconName: 'View' }}
                    title="View"
                    ariaLabel="View"
                    styles={viewButtonStyles}
                    onClick={() => this.handleView(item)}
                  />
                  <IconButton
                    iconProps={{ iconName: 'Edit' }}
                    title="Edit"
                    ariaLabel="Edit"
                    styles={editButtonStyles}
                    onClick={() => this.handleEdit(item)}
                  />
                  {this.state.isUserOwner && (
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      title="Delete"
                      ariaLabel="Delete"
                      styles={deleteButtonStyles}
                      onClick={() => this.handleDelete(item)}
                    />
                  )}
                </div>

              </div>
            )
          })}
        </div>

        {isModalOpen && selectedItem && (
          <Modal
            isOpen={isModalOpen}
            onDismiss={this.handleCloseModal}
            isBlocking={false}
            containerClassName={styles.modalContainer}
          >
            <div className={`${styles.modalHeader} ${headerClass}`}>
              <span>{selectedItem.Title} Details</span>
              <IconButton
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel="Close popup modal"
                onClick={this.handleCloseModal}
                className={styles.modalCloseButton}
              />
            </div>
            <div className={styles.modalBody}>
            {Object.keys(fieldLabels).map((key) => (
              selectedItem[key] !== undefined && (
                <div key={key} className={styles.modalRow}>
                  <Label className={styles.modalLabel}>{fieldLabels[key as keyof FieldLabels]}</Label>
                  {modalType === 'view' ? (
                      <span className={styles.modalValue}>
                        {typeof selectedItem[key] === 'object' && selectedItem[key] !== null
                          ? JSON.stringify(selectedItem[key])
                          : selectedItem[key]}
                      </span>
                    ) : (
                      key === 'field_8' ? (
                        <Dropdown
                        className={styles.dropdownField}
                        selectedKey={selectedItem[key]?.toString()}
                        options={this.state.LicenseTypeDropdownOptions}
                        onChange={(e, option) => this.handleChange(key, option?.key?.toString())}
                      />
                      ) : (
                        key === 'field_9' ? (
                          <Dropdown
                          className={styles.dropdownField}
                          selectedKey={selectedItem[key]?.toString()}
                          options={this.state.UsageDropdownOptions}
                          onChange={(e, option) => this.handleChange(key, option?.key?.toString())}
                        />
                        ) : (
                      key === 'field_10' ? (
                        <Dropdown
                          selectedKey={selectedItem[key]?.toString()}  className={styles.dropdownField}
                          options={billableDropDownOptions}
                          onChange={(e, option) => this.handleChange(key, option?.key?.toString())}
                        />
                      ) : (
                      <TextField
                        value={selectedItem[key]} className={styles.textField}
                        onChange={(e, newValue) => this.handleChange(key, newValue)}
                        disabled={key === 'Title' || key === 'field_0' || key === 'field_1'}
                      />
                      )
                    )))}
                </div>
              )
            ))}
            </div>
            {modalType === 'edit' && (
                <div className={styles.modalFooter}>
                  <PrimaryButton text="Save" className={styles.saveButton} onClick={this.handleSave} />
                </div>
              )}
          </Modal>
        )}
      </div>
    );
  }
}

export default AssignedNumbersPage;
