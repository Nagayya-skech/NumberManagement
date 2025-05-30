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
import React from 'react';
import { DefaultButton, DetailsList, Dropdown } from '@fluentui/react';
import { SPListService } from '../services/SPListService';
import { SPUserService } from '../services/SPUserService';
//import styles from './NumberManager.module.scss';
import Utils from '../services/Utils';
var dropdownStyles = {
    dropdown: { width: 300 },
};
var refreshIcon = { iconName: 'Refresh' };
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    //private numberData: NumberData[] = [];
    function HomePage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
        _this.spListService_NumberRanges = new SPListService('Number-Ranges');
        _this.spListService_CompleteList = new SPListService('CompleteList_202408_wip');
        _this.spUserService = new SPUserService();
        _this.RefreshData = _this.RefreshData.bind(_this);
        _this.getNumberTableData = _this.getNumberTableData.bind(_this);
        return _this;
    }
    HomePage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNumberTableData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getUserLocation()];
                    case 2:
                        _a.sent();
                        //await this.getLocations();
                        return [4 /*yield*/, this.getOUList(null)];
                    case 3:
                        //await this.getLocations();
                        _a.sent();
                        //this is for showing the values corresponding to the user
                        return [4 /*yield*/, this.SetCurrentUserValues()];
                    case 4:
                        //this is for showing the values corresponding to the user
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.SetCurrentUserValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var optionOUToSelect, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        optionOUToSelect = {
                            key: this.state.curr_OU_key,
                            text: this.state.curr_OU
                        };
                        return [4 /*yield*/, this.handleOUChange(optionOUToSelect, true)];
                    case 1:
                        _a.sent();
                        //console.log("Selected location-inside SetCurrentUserValues : ", this.state.curr_location);
                        console.log("Selected OU-inside SetCurrentUserValues : ", this.state.curr_OU);
                        return [2 /*return*/];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error in SetCurrentUserValues: ", error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.render = function () {
        var _this = this;
        //const dist_locs = await this.getLocations(this.props._spContext);
        //console.log(dist_locs);
        var currentPage = window.location.href;
        var currentPage_initial = '';
        if (currentPage.indexOf("#") > -1) {
            currentPage_initial = currentPage.split("#")[0];
        }
        var OUs_count = this.state.OUs.length;
        //let HomePage = currentPage_initial + "#/";
        var AssignedNumbersPage = currentPage_initial + "#/assigned-numbers";
        var AvailableNumbersPage = currentPage_initial + "#/available-numbers";
        console.log("Current State while renedering the entire control: ", this.state);
        return (React.createElement("div", null,
            React.createElement("div", { id: "headerTitle", style: { display: '-ms-inline-flexbox' } },
                React.createElement("h1", null, "M365 Contact Center - Number Management"),
                React.createElement("div", { style: { float: 'right' } },
                    React.createElement(DefaultButton, { iconProps: refreshIcon, text: "Refresh Data", ariaLabel: "Refresh Data", onClick: this.RefreshData }))),
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("div", null,
                    React.createElement(Dropdown, { id: "ouDropdown", label: 'OU', placeholder: "Select an OU", options: this.state.OUs, selectedKey: this.state.curr_OU_key, styles: dropdownStyles, onChange: function (event, option) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.handleOUChange(option)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, disabled: OUs_count <= 1 ? true : false }))),
            React.createElement(DetailsList, { items: this.state.location_NumberData, columns: [
                    // { key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200 },
                    { key: 'OU', name: 'OU', fieldName: 'OU', minWidth: 100, maxWidth: 200 },
                    { key: 'SiteIDs', name: 'Site', fieldName: 'SiteIDs', minWidth: 100, maxWidth: 200 },
                    { key: 'HeadNumber', name: 'HeadNumber', fieldName: 'HeadNumber', minWidth: 100, maxWidth: 200 },
                    { key: 'StartNumber', name: 'StartNumber', fieldName: 'StartNumber', minWidth: 100, maxWidth: 200 },
                    { key: 'EndNumber', name: 'EndNumber', fieldName: 'EndNumber', minWidth: 100, maxWidth: 200 },
                    { key: 'AssignedNumbers', name: 'Assigned Numbers', fieldName: 'AssignedNumbers', minWidth: 100, maxWidth: 200, onRender: function (item) { return React.createElement("a", { href: "".concat(AssignedNumbersPage, "?id=").concat(item.ID, "&headnumber=").concat(item.HeadNumber) }, item.AssignedNumbers); } },
                    { key: 'FreeNumbers', name: 'Unassigned Numbers', fieldName: 'FreeNumbers', minWidth: 100, maxWidth: 200, onRender: function (item) { return React.createElement("a", { href: "".concat(AvailableNumbersPage, "?id=").concat(item.ID, "&headnumber=").concat(item.HeadNumber) }, item.FreeNumbers); } },
                    { key: 'TotalNumbers', name: 'Total', fieldName: 'TotalNumbers', minWidth: 100, maxWidth: 200 },
                ] })));
    };
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
    HomePage.prototype.handleOUChange = function (option, firstLoad) {
        return __awaiter(this, void 0, void 0, function () {
            var selData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("OU Change Event Handler: ", option);
                        console.log("First Load: ", firstLoad); //This is to check if the event is triggered on the first load of the page
                        selData = '';
                        if (option) {
                            this.setState({ curr_OU_key: option.key, curr_OU: option.text });
                            selData = option.text;
                            console.log("Selected OU-OptionVal: ", option.text);
                        }
                        return [4 /*yield*/, this.setNumberTableData(selData)];
                    case 1:
                        _a.sent();
                        console.log("exit OU change event handler:");
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getNumberTableData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numbData, numbData_tbOriginal, Error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.spListService_NumberRanges.getAllItems(this.props._spContext)];
                    case 1:
                        numbData = _a.sent();
                        numbData_tbOriginal = numbData.map(function (item) {
                            var assignedNumber_val = 0;
                            var freeNumber_val = item.TotalNumbers;
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
                                StartNumber: item.Range_x002d_StartNumber == 0 ? _this.getNewStartNumberString(item) : item.Range_x002d_StartNumber,
                                EndNumber: item.Range_x002d_EndNumber,
                                AssignedNumbers: assignedNumber_val,
                                FreeNumbers: freeNumber_val,
                                TotalNumbers: item.TotalNumbers
                            };
                        });
                        this.setState({ all_HeadNumbers: numbData_tbOriginal });
                        return [3 /*break*/, 3];
                    case 2:
                        Error_1 = _a.sent();
                        console.log("Error in getNumberTableData: ", Error_1);
                        this.setState({ all_HeadNumbers: [] });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getNewStartNumberString = function (item) {
        var endNumber_len = item.Range_x002d_EndNumber.toString().length;
        var startNumber_rev = '';
        for (var i = 0; i < endNumber_len; i++) {
            startNumber_rev = startNumber_rev + '0';
        }
        return startNumber_rev;
    };
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
    HomePage.prototype.sortList = function (list) {
        var orderedList = list;
        try {
            orderedList = list.sort(function (a, b) { return (a != null && b != null) ? (a.localeCompare(b)) : 0; });
            return orderedList;
        }
        catch (error) {
            console.log("Error in sortList: ", error);
            return list;
        }
    };
    HomePage.prototype.getOUList = function (country) {
        return __awaiter(this, void 0, void 0, function () {
            var originalData, filteredData, distinctOUs, distinctOUs_DropData, userOUList, userOUList_dd, onlyOU;
            return __generator(this, function (_a) {
                if (this.state.isAdmin) {
                    originalData = this.state.all_HeadNumbers;
                    filteredData = originalData;
                    if (country != null && country != '') {
                        filteredData = originalData.filter(function (item) { return item.Coutry == country; });
                    }
                    distinctOUs = filteredData.map(function (item) { return item.OU; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
                    distinctOUs = this.sortList(distinctOUs);
                    distinctOUs_DropData = distinctOUs.map(function (item, index) {
                        return {
                            key: index,
                            text: item
                        };
                    });
                    this.setState({ OUs: distinctOUs_DropData });
                    this.setState({ location_NumberData: [] });
                }
                else {
                    if (this.state.user_OU.indexOf(";") > 0) {
                        userOUList = this.state.user_OU.split(';');
                        userOUList = this.sortList(userOUList);
                        userOUList_dd = userOUList.map(function (item, index) {
                            return {
                                key: index,
                                text: item
                            };
                        });
                        this.setState({ OUs: userOUList_dd });
                    }
                    else {
                        onlyOU = [{ key: 0, text: this.state.user_OU }];
                        this.setState({ OUs: onlyOU });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.setNumberTableData = function (OUVal) {
        return __awaiter(this, void 0, void 0, function () {
            var originalData, filteredData;
            return __generator(this, function (_a) {
                if (!OUVal) {
                    OUVal = this.state.curr_OU;
                }
                originalData = this.state.all_HeadNumbers;
                filteredData = originalData;
                if (OUVal != null && OUVal != '') {
                    filteredData = originalData.filter(function (item) { return item.OU == OUVal; });
                }
                else {
                    if (!this.state.isAdmin) {
                        filteredData = [];
                    }
                }
                this.setState({ location_NumberData: filteredData });
                return [2 /*return*/];
            });
        });
    };
    //Get the user-location and set the values of Country and OU according to the user location
    HomePage.prototype.getUserLocation = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var flag_isAdmin, user, user_ou, user_country, userDetails, userGroups, userOU, firstUserOU, i, groupName, groupNameParts, userDetails_bu, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.spUserService.CheckUserIsAdmin()];
                    case 1:
                        flag_isAdmin = _b.sent();
                        return [4 /*yield*/, this.spUserService.GetCurrentUserDetails(this.props._spContext)];
                    case 2:
                        user = _b.sent();
                        this.setState({ isAdmin: flag_isAdmin });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 7, , 8]);
                        if (!flag_isAdmin) return [3 /*break*/, 4];
                        user_ou = this.spUserService.GetCurrentUsers_OU(user.Title);
                        user_country = this.getCountryFromOU(user_ou);
                        //this.setState({ user_location: user_country });
                        //this.setState({ curr_location: user_country });
                        this.setState({ user_OU: user_ou });
                        this.setState({ curr_OU: user_ou });
                        userDetails = {
                            ID: user.Id,
                            Title: user.Title,
                            OU: user_ou,
                            Country: user_country,
                            IsAdmin: user.IsSiteAdmin
                        };
                        this.setState({ currentUser: userDetails });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.spUserService.GetCurrentUserGroups(this.props._spContext)];
                    case 5:
                        userGroups = _b.sent();
                        userOU = '';
                        firstUserOU = '';
                        if (userGroups != undefined && userGroups != null && userGroups.length > 0) {
                            for (i = 0; i < userGroups.length; i++) {
                                groupName = userGroups[i].Title;
                                groupNameParts = groupName.split('_');
                                if (groupNameParts.length === 2) {
                                    if (userOU == '') {
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
                        this.setState({ curr_OU_key: 0 });
                        userDetails_bu = {
                            ID: user.Id,
                            Title: user.Title,
                            OU: userOU,
                            Country: '',
                            IsAdmin: false
                        };
                        this.setState({ currentUser: userDetails_bu });
                        _b.label = 6;
                    case 6:
                        console.log("UserOU: ", (_a = this.state.currentUser) === null || _a === void 0 ? void 0 : _a.OU);
                        return [2 /*return*/];
                    case 7:
                        error_2 = _b.sent();
                        console.log("Error in getUserLocation: ", error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getCountryFromOU = function (ou) {
        var originalData = this.state.all_HeadNumbers;
        var filteredData = originalData;
        if (ou != null && ou != '') {
            filteredData = originalData.filter(function (item) { return item.OU == ou; });
        }
        if (filteredData.length > 0) {
            return filteredData[0].Coutry;
        }
        else {
            return '';
        }
    };
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
    HomePage.prototype.getOU_index_from_OU = function (OUVal) {
        try {
            var ou_list = this.state.OUs;
            var ou_index = ou_list.filter(function (x) { return x.text == OUVal; })[0].key;
            return ou_index;
        }
        catch (error) {
            console.log("Error in getOU_index_from_OU: ", error);
            return -1;
        }
    };
    HomePage.prototype.RefreshData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loc_headNumberData, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("Refresh Data Clicked");
                        return [4 /*yield*/, this.getNumberTableData()];
                    case 1:
                        _a.sent();
                        console.log("Number Table Data Refreshed");
                        loc_headNumberData = this.state.all_HeadNumbers;
                        loc_headNumberData.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(item != null && item != '')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.UpdateNumberCountsForHeader(item.ID, item.HeadNumber)];
                                    case 1:
                                        res = _a.sent();
                                        if (res != null) {
                                            //console.log("Updated the Assigned Numbers count for the HeadNumber: ", item.HeadNumber);
                                        }
                                        else {
                                            console.log("Error in updating the Assigned Numbers count for the HeadNumber: ", item.HeadNumber);
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log("Assigned Numbers Count Updated. Getting Refreshed Data");
                        return [4 /*yield*/, this.getNumberTableData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        error_3 = _a.sent();
                        console.log("Error in RefreshData: ", error_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.UpdateNumberCountsForHeader = function (id, headNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var searchResults, error_4, item2Upd, res, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Updating the HeadNumber: ", headNumber);
                        searchResults = [];
                        if (!(id != undefined && id != null && headNumber != undefined && headNumber != null)) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utils.GetAssignedNumbers(headNumber, this.spListService_CompleteList, this.props._spContext)];
                    case 2:
                        //searchResults = await this.spListService_CompleteList.getListItems_search_v4('Title', headNumber,this.props._spContext, ["Status"]);
                        searchResults = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Error in UpdateNumberCountsForHeader: ", headNumber, error_4);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(searchResults.length > 0)) return [3 /*break*/, 8];
                        item2Upd = {
                            AssignedNumbers: searchResults.length
                        };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.spListService_NumberRanges.updateItem(id, item2Upd, this.props._spContext)];
                    case 6:
                        res = _a.sent();
                        console.log("Updated the Assigned Numbers count for the HeadNumber: ", headNumber, ": SUCCESS");
                        return [2 /*return*/, res];
                    case 7:
                        error_5 = _a.sent();
                        console.error("Error in updating the Assigned Numbers count for the HeadNumber: ", headNumber, error_5);
                        return [2 /*return*/, null];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return HomePage;
}(React.Component));
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
//# sourceMappingURL=Home.js.map