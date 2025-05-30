var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Add the following line at the top of the file to suppress unused variable and method warnings
// @ts-ignore
import React from 'react';
import { SPListService } from '../services/SPListService';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Link } from '@fluentui/react/lib/Link';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, DetailsList } from '@fluentui/react';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import styles from './NumberManager.module.scss';
import Utils from '../services/Utils';
var dropdownStyles = {
    dropdown: { width: 300 },
};
var AvailableNumbersPage = /** @class */ (function (_super) {
    __extends(AvailableNumbersPage, _super);
    function AvailableNumbersPage(props) {
        var _this = _super.call(this, props) || this;
        _this.filterIcon = { iconName: 'Filter' };
        _this.searchBoxStyles = { root: { width: 200 } };
        _this.createFullList = function () {
            var _a = _this.state, headNumber = _a.headNumber, startNumber = _a.startNumber, endNumber = _a.endNumber;
            //console.log("Creating Full List with Head Number:" + this.state.headNumber + " Start Number:" + this.state.startNumber + " End Number:" + this.state.endNumber);
            var fullList = [];
            for (var i = startNumber; i <= endNumber; i++) {
                var numberDigits = endNumber.toString().length;
                var iDigits = i.toString().length;
                var zerosToAdd = numberDigits - iDigits;
                var paddedI = "0".repeat(zerosToAdd) + i.toString();
                var number = "".concat(headNumber).concat(paddedI);
                fullList.push(number);
            }
            _this.setState({ fullList: fullList });
            //console.log('Full List:', fullList);
            // Do something with the full list
        };
        _this.loadAssignedNumbers = function (param_headNumber) { return __awaiter(_this, void 0, void 0, function () {
            var searchResults_allProps, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utils.GetAssignedNumbers(param_headNumber, this._spListService_CompleteList, this._spContext)];
                    case 1:
                        searchResults_allProps = _a.sent();
                        searchResults = searchResults_allProps.map(function (item) { return item.Title; });
                        //let searchResults = await this._spListService_CompleteList.getListItems_search('HeadNumber', param_headNumber, null);
                        //console.log('Search Results:', searchResults);
                        // allocatedNumbers = searchResults.map(item => item.Title);
                        ////console.log('Allocated Numbers:', allocatedNumbers);
                        this.setState({ assignedNumbers: searchResults });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.previousPage = function () {
            _this.setState(function (prevState) { return ({
                currentPage: prevState.currentPage <= 0 ? 0 : prevState.currentPage - 1,
            }); });
        };
        _this.nextPage = function () {
            _this.setState(function (prevState) { return ({
                currentPage: prevState.currentPage >= prevState.lastPage ? prevState.lastPage : prevState.currentPage + 1,
            }); });
        };
        _this.firstPage = function () {
            _this.setState({ currentPage: 0 });
        };
        _this.lastPage = function () {
            _this.setState({ currentPage: _this.state.lastPage });
        };
        _this.openPanelSubmitNumber = function (number) {
            _this.setState({ isOpen_PanelSubmitNumber: true });
            //console.log(number);
            _this.setState({ selectedNumber: number });
            var inputFormDetails_local = _this.state.inputFormDetails;
            inputFormDetails_local.Number = number;
            inputFormDetails_local.Region = _this.state.currentPage_region;
            inputFormDetails_local.Country = _this.state.currentPage_country;
            //inputFormDetails_local.OU = parseInt(this.state.currentPage_OU);
            inputFormDetails_local.OU = _this.state.currentPage_OU;
            _this.setState({ inputFormDetails: inputFormDetails_local });
        };
        _this.closePanelSubmitNumber = function () {
            _this.loadInitialValues().then(function () {
                _this.setState({ isOpen_PanelSubmitNumber: false });
            });
        };
        _this.onTextChange = function (ev, text) {
            //console.log('Text changed:', text);
            var inputFormDetails_local = _this.state.inputFormDetails;
            if (ev.currentTarget.id == 'txtName' && text != null) {
                inputFormDetails_local.Name = text;
            }
            if (ev.currentTarget.id == 'txtRegion' && text != null) {
                inputFormDetails_local.Region = text;
            }
            if (ev.currentTarget.id == 'txtCountry' && text != null) {
                inputFormDetails_local.Country = text;
            }
            if (ev.currentTarget.id == 'txtOU' && text != null) {
                inputFormDetails_local.OU = parseInt(text);
            }
            if (ev.currentTarget.id == 'txtLic' && text != null) {
                inputFormDetails_local.LicenseType = text;
            }
            if (ev.currentTarget.id == 'txtUsage' && text != null) {
                inputFormDetails_local.Usage = text;
            }
            if (ev.currentTarget.id == 'txtBillable') {
                inputFormDetails_local.Billability = !inputFormDetails_local.Billability;
            }
            if (ev.currentTarget.id == 'txtStatus' && text != null) {
                inputFormDetails_local.Status = text;
            }
            if (ev.currentTarget.id == 'txtTicketNumber' && text != null) {
                inputFormDetails_local.VersionComments = text;
            }
            if (ev.currentTarget.id == 'txtNotes' && text != null) {
                inputFormDetails_local.Notes = text;
            }
            _this.setState({ inputFormDetails: inputFormDetails_local });
        };
        _this.onDropdownChange = function (ev, option, index) {
            var inputFormDetails_local = _this.state.inputFormDetails;
            if (ev.currentTarget.id.indexOf('drpDownOU') >= 0 && option != null) {
                _this.setState({ curr_OU_key: option.key, curr_OU: option.text });
                inputFormDetails_local.Selected_OU = option.text;
                console.log("OU Changed: ", option.text);
            }
            if (ev.currentTarget.id.indexOf('drpDownUsage') >= 0 && option != null) {
                _this.setState({ curr_Usage_key: option.key, curr_Usage: option.text });
                inputFormDetails_local.Usage = option.text;
            }
            if (ev.currentTarget.id.indexOf('drpDownLicenseType') >= 0 && option != null) {
                _this.setState({ curr_LicenseType_key: option.key, curr_LicenseType: option.text });
                inputFormDetails_local.LicenseType = option.text;
            }
            if (ev.currentTarget.id.indexOf('drpDownStatus') >= 0 && option != null) {
                _this.setState({ curr_Status_key: option.key, curr_Status: option.text });
                inputFormDetails_local.Status = option.text;
            }
            _this.setState({ inputFormDetails: inputFormDetails_local });
        };
        _this.onBillabilityChange = function (ev, option) {
            ////console.log('Billability changed:', option);
            var inputFormDetails_local = _this.state.inputFormDetails;
            var bill_string = option.text;
            if (option != null) {
                if (option.key == 'Billable') {
                    inputFormDetails_local.Billability = true;
                }
                else {
                    inputFormDetails_local.Billability = false;
                }
            }
            _this.setState({ inputFormDetails: inputFormDetails_local, curr_Billability: bill_string });
            ////console.log("Checking the State ater Billability change");
            ////console.log(this.state);
        };
        // Initialize state here
        _this._spListService_headNumber = new SPListService('Number-Ranges');
        _this._spListService_CompleteList = new SPListService('CompleteList_202408_wip'); //This has to be defaulted either to User's own country or the country to which Headcountry belongs to
        _this._spContext = _this.props._spContext;
        _this.state = {
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
            lastPage: 0,
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
            regions: [],
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
        _this.Save_Number = _this.Save_Number.bind(_this);
        _this.createFullList = _this.createFullList.bind(_this);
        return _this;
    }
    AvailableNumbersPage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Code to run on component mount
                    //Get the Headnumber from the Query String
                    // Get the current URL of the page
                    //await this.loadInitialValues();
                    ////console.log("Before Load Initial Values from ComponentDidMount");
                    return [4 /*yield*/, this.loadInitialValues()];
                    case 1:
                        // Code to run on component mount
                        //Get the Headnumber from the Query String
                        // Get the current URL of the page
                        //await this.loadInitialValues();
                        ////console.log("Before Load Initial Values from ComponentDidMount");
                        _a.sent();
                        ////console.log("After Load Initial Values from ComponentDidMount");
                        return [4 /*yield*/, this.loadDropdownValues()];
                    case 2:
                        ////console.log("After Load Initial Values from ComponentDidMount");
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AvailableNumbersPage.prototype.loadAvailableNumbers = function () {
        var _a = this.state, fullList = _a.fullList, assignedNumbers = _a.assignedNumbers;
        var availableNumbers_obj = fullList.filter(function (number) { return !assignedNumbers.includes(number); });
        this.setState({ availableNumbers: availableNumbers_obj });
        //console.log('Available Numbers from the loadAvailableNumbers method :');
        //console.log(this.state.availableNumbers);
        var availableNumbers_2dObj = [];
        var chunkSize = 100; // Define the size of each chunk of the 2d array
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
    };
    AvailableNumbersPage.prototype.Convert1dTo2D = function (availableNumbers_obj, availableNumbers_2dObj, chunkSize) {
        var chunkSize_local = 100;
        if (chunkSize != null) {
            chunkSize_local = chunkSize;
        }
        for (var i = 0; i < availableNumbers_obj.length; i += chunkSize_local) {
            var chunk = availableNumbers_obj.slice(i, i + chunkSize_local);
            availableNumbers_2dObj.push(chunk);
        }
    };
    AvailableNumbersPage.prototype.loadInitialValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUrl, headNumber_ret, id_ret, item, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentUrl = window.location.href;
                        headNumber_ret = this.extractHeadNumberFromUrl(currentUrl);
                        if (!(headNumber_ret != '-1')) return [3 /*break*/, 6];
                        this.setState({ headNumber: headNumber_ret });
                        id_ret = this.extractIdFromUrl(currentUrl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._spListService_headNumber.getItemById(id_ret, this._spContext)];
                    case 2:
                        item = _a.sent();
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
                        return [4 /*yield*/, this.LoadTheAvailableNumbersTable(headNumber_ret)];
                    case 3:
                        // Create the Full List using the Head Number and the Start and End Numbers
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error retrieving item:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AvailableNumbersPage.prototype.LoadTheAvailableNumbersTable = function (headNumber_ret) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.createFullList();
                        //Load all the Assigned Numbers from the Assigned Numbers list
                        return [4 /*yield*/, this.loadAssignedNumbers(headNumber_ret)];
                    case 1:
                        //Load all the Assigned Numbers from the Assigned Numbers list
                        _a.sent();
                        // Calculate the Available numbers by calculating the free numbers from the above two 
                        this.loadAvailableNumbers();
                        return [2 /*return*/];
                }
            });
        });
    };
    AvailableNumbersPage.prototype.loadFilteredAvailableNumbers = function (value) {
        // const { searchingNumber } = this.state;
        var availableNumbers_local = this.state.availableNumbers;
        var local_filtered_2d = [];
        var availableNumbers_filtered = availableNumbers_local.filter(function (row) { return row.includes(value); });
        this.Convert1dTo2D(availableNumbers_filtered, local_filtered_2d, 100);
        this.setState({ availableNumbers_2d: local_filtered_2d, currentPage: 0, lastPage: local_filtered_2d.length - 1 });
    };
    AvailableNumbersPage.prototype.extractIdFromUrl = function (currentUrl) {
        if (currentUrl.indexOf('id=') > -1) {
            var id_string = currentUrl.split('id=')[1];
            var id = parseInt(id_string);
            this.setState({ id_HeadNumberRange: id });
            //console.log('Head Number Range ID:', id);
            return id;
        }
        else {
            this.setState({ id_HeadNumberRange: -1 });
            //console.log('Head Number Range ID:', -1);
            return -1;
        }
    };
    AvailableNumbersPage.prototype.extractHeadNumberFromUrl = function (currentUrl) {
        if (currentUrl.indexOf('headnumber=') > -1) {
            var id_string = currentUrl.split('headnumber=')[1];
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
    };
    AvailableNumbersPage.prototype.render = function () {
        // Add the following line inside the render method to suppress unused variable and method warnings
        // @ts-ignore
        //console.log("Inside Render Method");
        //console.log(this.state);
        return (React.createElement("div", { id: "divParent_AvailableNumbers" },
            React.createElement("h1", null, "Available Numbers Page"),
            React.createElement("div", { id: "divMainContent" },
                React.createElement("div", { id: "divavailableNumbersList_container", style: { display: 'inline-block', marginRight: '10px', margin: '10px', padding: '10px' } }, this.List_AvailableNumbers()),
                React.createElement("div", { id: "divNumberSubmitForm", style: { display: 'inline-block', margin: '10px', padding: '10px' } }, this.Form_SubmitNumber()))));
    };
    AvailableNumbersPage.prototype.List_AvailableNumbers = function () {
        var _this = this;
        return (React.createElement("div", { id: "divAvailableNumberList_Panel", style: { display: 'inline-block' } },
            React.createElement("div", { id: "header_totalCount", className: styles.totalCount },
                React.createElement("div", { id: "divHeadNumberRange", style: { display: 'inline-block' } },
                    React.createElement("h3", null,
                        "Total Available Numbers - ",
                        this.state.availableNumbers_count)),
                React.createElement("div", { id: "divSearchBox", style: { display: 'inline-block', margin: '10px', padding: '5px' } },
                    React.createElement(SearchBox, { placeholder: "Filter", iconProps: this.filterIcon, styles: this.searchBoxStyles, onEscape: function (ev) {
                            //console.log('Custom onEscape Called');
                            // Check if you have to call the loadInitial values here
                            _this.loadInitialValues();
                            // this.setState({ availableNumbers_2d: this.state.availableNumbers_2d_unfiltered, searchingNumber: '' });
                        }, onClear: function (ev) {
                            //console.log('Custom onClear Called');
                            // Check if you have to call the loadInitial values here
                            _this.loadInitialValues();
                            // this.setState({ availableNumbers_2d: this.state.availableNumbers_2d_unfiltered, searchingNumber: '' });
                        }, 
                        // onChange={(_, newValue) => {
                        //   //console.log('SearchBox onChange fired: ' + newValue);
                        //   this.loadFilteredAvailableNumbers(newValue);
                        // }}
                        onSearch: function (newValue) {
                            //console.log('SearchBox onSearch fired: ' + newValue);
                            _this.loadFilteredAvailableNumbers(newValue);
                        } }))),
            React.createElement("div", null,
                React.createElement("h5", null,
                    this.state.currentPage_region,
                    " - ",
                    this.state.currentPage_country,
                    " - ",
                    this.state.currentPage_OU)),
            this.renderAvailableNumbers_1d_paged()));
    };
    AvailableNumbersPage.prototype.renderAvailableNumbers_1d_paged = function () {
        var _this = this;
        var currentArray = [];
        var currentArray_2d = [];
        try {
            //console.log("Checking State in renderAvailableNumbers_1d_paged");
            //console.log(this.state);
            currentArray = this.state.availableNumbers_2d[this.state.currentPage];
            for (var index = 0; index < currentArray.length; index += 10) {
                currentArray_2d.push(currentArray.slice(index, index + 10));
            }
        }
        catch (error) {
            //console.log("Error in getting the current Array: Method-renderAvailableNumbers_1d_paged");
        }
        if (currentArray != null && currentArray.length > 0) {
            return (React.createElement("div", { id: "divAvailableNumbersList" },
                React.createElement("div", { id: "divPageButtons" },
                    React.createElement("button", { onClick: this.firstPage },
                        React.createElement("span", { role: "img", "aria-label": "First Page" }, "\u23EA")),
                    React.createElement("button", { onClick: this.previousPage },
                        React.createElement("span", { role: "img", "aria-label": "Previous Page" }, "\u23EE\uFE0F")),
                    React.createElement("button", { onClick: this.nextPage },
                        React.createElement("span", { role: "img", "aria-label": "Next Page" }, "\u23ED\uFE0F")),
                    React.createElement("button", { onClick: this.lastPage },
                        React.createElement("span", { role: "img", "aria-label": "Last Page" }, "\u23E9"))),
                (currentArray_2d != null && currentArray_2d.length > 0) ? (React.createElement("div", null,
                    React.createElement("div", { id: "divListMatrixForm" }, currentArray_2d.map(function (currentArray_inner, yIndex) { return (React.createElement("div", { key: yIndex, style: { display: 'inline-block', margin: '10px', padding: '2px' } }, currentArray_inner.map(function (number, xIndex) { return (React.createElement("div", { key: xIndex, style: { marginBottom: '5px', padding: '2px' } }, React.createElement(Link, { onClick: function () { return _this.openPanelSubmitNumber(number); } }, number))); }))); })))) : (React.createElement("div", null, "No Tabular format"))));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("h3", null, "No Available Numbers")));
        }
    };
    AvailableNumbersPage.prototype.Save_Number = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var isSuccessfulSave, listItem, ou_local_sel, check_Item, item_id, error_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.setState({ isSaving: true });
                        isSuccessfulSave = false;
                        listItem = {};
                        ou_local_sel = 0;
                        if (this.state != undefined && this.state.inputFormDetails != undefined && this.state.inputFormDetails != null && this.state.inputFormDetails.Number != null) {
                            if (this.state.inputFormDetails.OU.toString().includes(';') || this.state.inputFormDetails.OU.toString().includes(',')) {
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
                                Title: (_a = document.getElementById('txtNumber')) === null || _a === void 0 ? void 0 : _a.value,
                                field_3: (_b = document.getElementById('txtName')) === null || _b === void 0 ? void 0 : _b.value, //Text Field
                                // Region: (document.getElementById('txtRegion') as HTMLInputElement)?.value,    //Dropdown
                                // Country: (document.getElementById('txtCountry') as HTMLInputElement)?.value,  //Dropdown
                                // OU: (document.getElementById('txtOU') as HTMLInputElement)?.value,            //Dropdown
                                // LicenseType: (document.getElementById('txtLic') as HTMLInputElement)?.value,  //Dropdown
                                // Usage: (document.getElementById('txtUsage') as HTMLInputElement)?.value,      //Dropdown
                                // Billability: (document.getElementById('txtBillable') as HTMLInputElement)?.value, //Checkbox
                                // Status: (document.getElementById('txtStatus') as HTMLInputElement)?.value     //Dropdown
                                // Notes: (document.getElementById('txtNotes') as HTMLInputElement)?.value        //Multiline Text Field
                            };
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._spListService_CompleteList.getItemsFilteredByColumn('Title', listItem.Title, this._spContext)];
                    case 2:
                        check_Item = _c.sent();
                        if (check_Item != null && check_Item.length > 0) {
                            item_id = check_Item[0].Id;
                            console.log("Updating the existing Item: ItemId" + item_id);
                            this._spListService_CompleteList.updateItem(item_id, listItem, this._spContext).then(function (upd_response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (upd_response != null) {
                                        isSuccessfulSave = true;
                                        console.log("Item Updated Successfully");
                                    }
                                    return [2 /*return*/];
                                });
                            }); }).catch(function (error) {
                                console.error('Error updating item:', error);
                            }).finally(function () {
                                _this.setState({ isOpen_PanelSubmitNumber: false, isSaving: false });
                                _this.createFullList();
                            });
                        }
                        else {
                            console.log("Creating a new Item");
                            this._spListService_CompleteList.createListItem(listItem, this._spContext).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    //this.render();
                                    if (response != null && response.ID > 0) {
                                        isSuccessfulSave = true;
                                        //remove that number from available numbers
                                        // let avail_numbers = this.state.availableNumbers;
                                        // avail_numbers = avail_numbers.filter(number => number !== this.state.inputFormDetails.Number);
                                        // let avail_numb_count = this.state.availableNumbers_count - 1; 
                                        // this.setState({availableNumbers : avail_numbers, availableNumbers_count: avail_numb_count});
                                        // this.forceUpdate();
                                    }
                                    return [2 /*return*/];
                                });
                            }); }).catch(function (error) {
                                console.error('Error creating item:', error);
                            }).finally(function () {
                                _this.setState({ isOpen_PanelSubmitNumber: false, isSaving: false });
                                _this.createFullList();
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        console.error('Error in Save_Number:', error_2);
                        alert('Error in Save_Number');
                        return [3 /*break*/, 4];
                    case 4:
                        if (isSuccessfulSave) {
                            //Reload the entire page TODO
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AvailableNumbersPage.prototype.loadDropdownValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loc_results, error_3, loc_usageLics, error_4, loc_statuses, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._spListService_MasterList_loc = new SPListService('Master_Locations');
                        this._spListService_MasterList_usageTypes = new SPListService('Master_UsageLicenses');
                        this._spListService_MasterList_status = new SPListService('Master_StatusList');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._spListService_MasterList_loc.getAllItems(this._spContext)];
                    case 2:
                        loc_results = _a.sent();
                        this.setState({ locations: loc_results });
                        this.load_OUs();
                        this.load_Countries();
                        this.load_regions();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error in loading Locations", error_3);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this._spListService_MasterList_usageTypes.getAllItems(this._spContext)];
                    case 5:
                        loc_usageLics = _a.sent();
                        this.setState({ Usage_Lic_Combo: loc_usageLics });
                        this.load_Usages();
                        this.load_LicenseTypes();
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        console.error("Error in loading LicenseType and Usage Types", error_4);
                        return [3 /*break*/, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this._spListService_MasterList_status.getAllItems(this._spContext)];
                    case 8:
                        loc_statuses = _a.sent();
                        loc_statuses = loc_statuses.filter(function (item) { return item.Title !== "Unassigned"; });
                        loc_statuses = loc_statuses.map(function (item) {
                            return { key: item.Id, text: item.Title };
                        });
                        loc_statuses = loc_statuses.filter(function (item, index, self) {
                            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
                        });
                        this.setState({ Statuses: loc_statuses });
                        return [3 /*break*/, 10];
                    case 9:
                        error_5 = _a.sent();
                        console.error("Error in loading Status Types", error_5);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AvailableNumbersPage.prototype.load_OUs = function (filteredCountry, filteredRegion) {
        var loc_Locations = this.state.locations;
        var loc_OUs = [];
        if (filteredCountry != null && filteredCountry != '' && filteredRegion != null && filteredRegion != '') {
            loc_OUs = loc_Locations.filter(function (item) { return item.Country == filteredCountry && item.Region == filteredRegion; });
        }
        else if (filteredRegion != null && filteredRegion != '') {
            loc_OUs = loc_Locations.filter(function (item) { return item.Region == filteredRegion; });
        }
        else if (filteredCountry != null && filteredCountry != '') {
            loc_OUs = loc_Locations.filter(function (item) { return item.Country == filteredCountry; });
        }
        else {
            loc_OUs = loc_Locations;
        }
        var f_OUs = loc_OUs.map(function (item) {
            return { key: item.Id, text: item.Title };
        });
        f_OUs = f_OUs.filter(function (item, index, self) {
            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
        });
        this.setState({ OUs: f_OUs });
        ////console.log("This OU List: ", this.state.OUs);
    };
    AvailableNumbersPage.prototype.load_Countries = function (filteredRegion) {
        var loc_Locations = this.state.locations;
        var loc_countries = [];
        if (filteredRegion != null) {
            loc_countries = loc_Locations.filter(function (item) { return item.Region == filteredRegion; });
        }
        else {
            loc_countries = loc_Locations;
        }
        var f_countries = loc_countries.map(function (item) {
            return { key: item.Id, text: item.Country };
        });
        f_countries = f_countries.filter(function (item, index, self) {
            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
        });
        f_countries.unshift({ key: '', text: '' });
        this.setState({ countries: f_countries });
    };
    AvailableNumbersPage.prototype.load_regions = function () {
        var loc_Locations = this.state.locations;
        var loc_regions = loc_Locations.map(function (item) {
            return { key: item.Id, text: item.Region };
        });
        var f_regions = loc_regions.map(function (item) {
            return { key: item.key, text: item.text };
        });
        f_regions = f_regions.filter(function (item, index, self) {
            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
        });
        f_regions.unshift({ key: '', text: '' });
        this.setState({ regions: f_regions });
    };
    AvailableNumbersPage.prototype.load_Usages = function () {
        var loc_usageLics = this.state.Usage_Lic_Combo;
        var loc_usages = loc_usageLics.map(function (item) {
            return { key: item.Id, text: item.Usage };
        });
        loc_usages = loc_usages.filter(function (item, index, self) {
            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
        });
        this.setState({ Usages: loc_usages });
    };
    AvailableNumbersPage.prototype.load_LicenseTypes = function () {
        var loc_usageLics = this.state.Usage_Lic_Combo;
        var loc_licenseTypes = loc_usageLics.map(function (item) {
            return { key: item.Id, text: item.Title };
        });
        loc_licenseTypes = loc_licenseTypes.filter(function (item, index, self) {
            return item.text !== "" && self.findIndex(function (i) { return i.text === item.text; }) === index;
        });
        this.setState({ LicenseTypes: loc_licenseTypes });
    };
    AvailableNumbersPage.prototype.Form_SubmitNumber = function () {
        var _this = this;
        //Load the Dropdown values required for the form
        var detailsListInputs = [];
        detailsListInputs.push({ Region: this.state.inputFormDetails.Region, Country: this.state.inputFormDetails.Country, OU: this.state.inputFormDetails.OU });
        // detailsListInputs.push({ col_name: 'Region', col_val: this.state.inputFormDetails.Region });
        // detailsListInputs.push({ col_name: 'Country', col_val: this.state.inputFormDetails.Country });
        // detailsListInputs.push({ col_name: 'OU', col_val: this.state.inputFormDetails.OU });
        var curr_panel_OU = this.state.inputFormDetails.OU.toString();
        var dropdownList_OU = [];
        if (curr_panel_OU.includes(';') || curr_panel_OU.includes(',')) {
            var arr_OU = [];
            if (curr_panel_OU.includes(';')) {
                arr_OU = curr_panel_OU.split(';');
            }
            if (curr_panel_OU.includes(',')) {
                arr_OU = curr_panel_OU.split(',');
            }
            if (arr_OU.length > 0) {
                arr_OU.map(function (item) {
                    dropdownList_OU.push({ key: item, text: item });
                });
            }
        }
        return (React.createElement(Panel, { isOpen: this.state.isOpen_PanelSubmitNumber, onDismiss: this.closePanelSubmitNumber, headerText: ("Submit Number: " + this.state.selectedNumber), closeButtonAriaLabel: 'Close', type: PanelType.medium, onRenderFooterContent: function () {
                return (React.createElement("div", null,
                    React.createElement(PrimaryButton, { onClick: _this.Save_Number, style: { marginRight: '8px' } }, "Submit"),
                    React.createElement(DefaultButton, { onClick: _this.closePanelSubmitNumber }, "Close")));
            }, isFooterAtBottom: true }, (this.state.isSaving) ?
            (React.createElement("div", { id: "divProgressBar" },
                React.createElement(ProgressIndicator, { label: "Saving...", description: "Please wait while the form is saving..." }))) :
            (React.createElement("div", { id: "divNumberSubmitForm_inner" },
                React.createElement("div", null,
                    React.createElement(DetailsList, { items: detailsListInputs, columns: [
                            { key: '1', name: 'Region', fieldName: 'Region', minWidth: 100, maxWidth: 200 },
                            { key: '2', name: 'Country', fieldName: 'Country', minWidth: 100, maxWidth: 200 },
                            { key: '3', name: 'OU', fieldName: 'OU', minWidth: 100, maxWidth: 200 }
                        ] }),
                    React.createElement(TextField, { id: "txtName", label: "Name", onChange: this.onTextChange }),
                    (dropdownList_OU.length > 1) ?
                        React.createElement(Dropdown, { id: "drpDownOU", label: 'OU', placeholder: "Select OU", options: dropdownList_OU, selectedKey: this.state.curr_OU_key, styles: dropdownStyles, onChange: function (event, option) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.onDropdownChange(event, option)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); } }) : '',
                    React.createElement(Dropdown, { id: "drpDownUsage", label: 'Usage', placeholder: "Select Usage", options: this.state.Usages, selectedKey: this.state.curr_Usage_key, styles: dropdownStyles, onChange: function (event, option) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.onDropdownChange(event, option)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); } }),
                    React.createElement(Dropdown, { id: "drpDownLicenseType", label: 'License Type', placeholder: "Select License Type", options: this.state.LicenseTypes, selectedKey: this.state.curr_LicenseType_key, styles: dropdownStyles, onChange: function (event, option) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.onDropdownChange(event, option)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); } }),
                    React.createElement(ChoiceGroup, { id: "chkBillable", label: "Billability", defaultSelectedKey: "NonBillable", options: [
                            { key: 'Billable', text: 'Billable' },
                            { key: 'NonBillable', text: 'Non Billable' }
                        ], onChange: this.onBillabilityChange }),
                    React.createElement(Dropdown, { id: "drpDownStatus", label: 'Status', placeholder: "Select Status", options: this.state.Statuses, selectedKey: this.state.curr_Status_key, styles: dropdownStyles, onChange: function (event, option) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.onDropdownChange(event, option)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); } }),
                    React.createElement(TextField, { id: "txtTicketNumber", label: "Ticket Number", onChange: this.onTextChange }),
                    React.createElement(TextField, { id: "txtNotes", label: "Notes", multiline: true, rows: 3, onChange: this.onTextChange }))))));
    };
    return AvailableNumbersPage;
}(React.Component));
export default AvailableNumbersPage;
//# sourceMappingURL=AvailableNumbers.js.map