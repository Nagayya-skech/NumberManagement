import React from 'react';
import { SPListService } from '../services/SPListService';
import { INumberManagerProps } from './INumberManagerProps';
import { ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { IIconProps } from '@fluentui/react/lib/Icon';
interface inputFormDetails {
    Number: string;
    Region: string;
    Country: string;
    OU: number | string;
    Selected_OU: string;
    Name: string;
    LicenseType: string;
    Usage: string;
    Billability: boolean;
    Status: string;
    VersionComments: string;
    Notes: string;
}
interface AvailableNumbersState {
    id_HeadNumberRange: number | string;
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
    availableNumbers_2d_unfiltered: string[][];
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
    locations: any[];
    countries: any[];
    regions: any[];
    OUs: any[];
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
declare class AvailableNumbersPage extends React.Component<INumberManagerProps, AvailableNumbersState> {
    _spListService_headNumber: SPListService;
    _spListService_CompleteList: SPListService;
    _spListService_MasterList_loc: SPListService;
    _spListService_MasterList_usageTypes: SPListService;
    _spListService_MasterList_status: SPListService;
    _spContext: any;
    filterIcon: IIconProps;
    searchBoxStyles: Partial<ISearchBoxStyles>;
    constructor(props: INumberManagerProps);
    componentDidMount(): Promise<void>;
    createFullList: () => void;
    loadAssignedNumbers: (param_headNumber: string | null) => Promise<void>;
    private loadAvailableNumbers;
    private Convert1dTo2D;
    private loadInitialValues;
    private LoadTheAvailableNumbersTable;
    private loadFilteredAvailableNumbers;
    private extractIdFromUrl;
    private extractHeadNumberFromUrl;
    render(): JSX.Element;
    private List_AvailableNumbers;
    private renderAvailableNumbers_1d_paged;
    private previousPage;
    private nextPage;
    private firstPage;
    private lastPage;
    private openPanelSubmitNumber;
    private closePanelSubmitNumber;
    private Save_Number;
    private onTextChange;
    private onDropdownChange;
    private onBillabilityChange;
    private loadDropdownValues;
    private load_OUs;
    private load_Countries;
    private load_regions;
    private load_Usages;
    private load_LicenseTypes;
    private Form_SubmitNumber;
}
export default AvailableNumbersPage;
//# sourceMappingURL=AvailableNumbers.d.ts.map