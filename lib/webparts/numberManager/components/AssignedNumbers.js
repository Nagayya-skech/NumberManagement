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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import { SPListService } from '../services/SPListService';
import { SPUserService } from '../services/SPUserService';
// import { DetailsList, Modal, Label } from '@fluentui/react';
import styles from './NumberManager.module.scss';
import { IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
// import Select from "react-select";
import { ComboBox, Label, Modal, TextField, Dropdown } from '@fluentui/react';
import ConfirmDialog from './DialogBox';
var fieldLabels = {
    Title: 'Number',
    field_3: 'Name',
    field_8: 'License Type',
    field_9: 'Usage',
    field_10: 'Billability',
    field_0: 'Region',
    field_1: 'Country'
};
var billableDropDownOptions = [
    { key: 'Billable', text: 'Billable' },
    { key: 'Non Billable', text: 'Non Billable' }
];
var AssignedNumbersPage = /** @class */ (function (_super) {
    __extends(AssignedNumbersPage, _super);
    function AssignedNumbersPage(props) {
        var _this = _super.call(this, props) || this;
        _this.handleCloseModal = function () {
            _this.setState({ isModalOpen: false, selectedItem: null, modalType: '', });
        };
        _this.handleView = function (item) {
            _this.setState({ isModalOpen: true, selectedItem: item, modalType: 'view' });
        };
        _this.handleEdit = function (item) {
            _this.setState({ selectedItem: item, isModalOpen: true, modalType: 'edit' });
        };
        _this.handleDelete = function (item) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ itemToDelete: item, showDialog: true, dialogTitle: 'Confirm Deletion', dialogType: 'confirmation',
                    dialogSubText: 'Are you sure you want to delete the item?' });
                return [2 /*return*/];
            });
        }); };
        _this.handleConfirmDelete = function () { return __awaiter(_this, void 0, void 0, function () {
            var itemToDelete, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemToDelete = this.state.itemToDelete;
                        this.clearSelections();
                        return [4 /*yield*/, this.spListService_AssignedNumbers.deleteItem(itemToDelete.ID, this.props._spContext)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getAssignedNumbers(this.state.currentHeadNumber)];
                    case 2:
                        data = _a.sent();
                        this.setState({ AssignedNumbers: data, AssignedNumbersFilter: data, showDialog: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getOptions()];
                                    case 1:
                                        _a.sent(); // get updated options for dropdown 
                                        this.showDeleteDialog('Item deleted successfully!');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.showDeleteDialog = function (message) {
            _this.setState({
                showDialog: true,
                dialogTitle: 'Delete Successful',
                dialogSubText: message,
                dialogType: 'information',
            });
        };
        _this.showUpdateDialog = function (message) {
            _this.setState({
                showDialog: true,
                dialogTitle: 'Update Successful',
                dialogSubText: message,
                dialogType: 'information',
            });
        };
        _this.handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
            var selectedItem, currItem, data, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedItem = this.state.selectedItem;
                        currItem = {
                            Title: selectedItem.Title,
                            field_0: selectedItem.field_0,
                            field_1: selectedItem.field_1,
                            field_3: selectedItem.field_3,
                            field_8: selectedItem.field_8,
                            field_9: selectedItem.field_9,
                            field_10: selectedItem.field_10,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.clearSelections();
                        return [4 /*yield*/, this.spListService_AssignedNumbers.updateItem(selectedItem.ID, currItem, this.props._spContext)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getAssignedNumbers(this.state.currentHeadNumber)];
                    case 3:
                        data = _a.sent();
                        this.setState({ AssignedNumbers: data, AssignedNumbersFilter: data }, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getOptions()];
                                    case 1:
                                        _a.sent(); // get updated options for dropdown 
                                        this.showUpdateDialog('Item Updated successfully!');
                                        this.handleCloseModal();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        alert("Error updating item: " + error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.handleChange = function (key, value) {
            _this.setState(function (prevState) {
                var _a;
                return ({
                    selectedItem: __assign(__assign({}, prevState.selectedItem), (_a = {}, _a[key] = value, _a)),
                });
            });
        };
        _this.handleOptionsFilter = function (event, option, index, label) {
            if (option) {
                var selectedKeys = [];
                var updateState = function (stateKey, selectedKeys) {
                    _this.setState(function (prevState) {
                        var _a;
                        return (__assign(__assign({}, prevState), (_a = {}, _a[stateKey] = selectedKeys, _a)));
                    }, _this.filterData);
                };
                // Update the state based on the dropdown label
                switch (label) {
                    case 'Number':
                        if (option.key === 'checkAll') {
                            selectedKeys = _this.state.optionsNumber.map(function (opt) { return opt.key; }).filter(function (key) { return key !== 'checkAll' && key !== 'uncheckAll'; });
                        }
                        else if (option.key === 'uncheckAll') {
                            selectedKeys = [];
                        }
                        else {
                            selectedKeys = option.selected
                                ? __spreadArray(__spreadArray([], _this.state.selectedNumberOptions, true), [option.key], false) : _this.state.selectedNumberOptions.filter(function (key) { return key !== option.key; });
                        }
                        updateState('selectedNumberOptions', selectedKeys);
                        break;
                    case 'Name':
                        if (option.key === 'checkAll') {
                            selectedKeys = _this.state.optionsName.map(function (opt) { return opt.key; }).filter(function (key) { return key !== 'checkAll' && key !== 'uncheckAll'; });
                        }
                        else if (option.key === 'uncheckAll') {
                            selectedKeys = [];
                        }
                        else {
                            selectedKeys = option.selected
                                ? __spreadArray(__spreadArray([], _this.state.selectedNameOptions, true), [option.key], false) : _this.state.selectedNameOptions.filter(function (key) { return key !== option.key; });
                        }
                        updateState('selectedNameOptions', selectedKeys);
                        break;
                    case 'License Type':
                        if (option.key === 'checkAll') {
                            selectedKeys = _this.state.optionsLicenseType.map(function (opt) { return opt.key; }).filter(function (key) { return key !== 'checkAll' && key !== 'uncheckAll'; });
                        }
                        else if (option.key === 'uncheckAll') {
                            selectedKeys = [];
                        }
                        else {
                            selectedKeys = option.selected
                                ? __spreadArray(__spreadArray([], _this.state.selectedLicenseTypeOptions, true), [option.key], false) : _this.state.selectedLicenseTypeOptions.filter(function (key) { return key !== option.key; });
                        }
                        updateState('selectedLicenseTypeOptions', selectedKeys);
                        break;
                    case 'Usage':
                        if (option.key === 'checkAll') {
                            selectedKeys = _this.state.optionsUsage.map(function (opt) { return opt.key; }).filter(function (key) { return key !== 'checkAll' && key !== 'uncheckAll'; });
                        }
                        else if (option.key === 'uncheckAll') {
                            selectedKeys = [];
                        }
                        else {
                            selectedKeys = option.selected
                                ? __spreadArray(__spreadArray([], _this.state.selectedUsageOptions, true), [option.key], false) : _this.state.selectedUsageOptions.filter(function (key) { return key !== option.key; });
                        }
                        updateState('selectedUsageOptions', selectedKeys);
                        break;
                    case 'Billability':
                        if (option.key === 'checkAll') {
                            selectedKeys = _this.state.optionsBillability.map(function (opt) { return opt.key; }).filter(function (key) { return key !== 'checkAll' && key !== 'uncheckAll'; });
                        }
                        else if (option.key === 'uncheckAll') {
                            selectedKeys = [];
                        }
                        else {
                            selectedKeys = option.selected
                                ? __spreadArray(__spreadArray([], _this.state.selectedBillabilityOptions, true), [option.key], false) : _this.state.selectedBillabilityOptions.filter(function (key) { return key !== option.key; });
                        }
                        updateState('selectedBillabilityOptions', selectedKeys);
                        break;
                    default:
                        break;
                }
            }
        };
        _this.filterData = function () {
            var _a = _this.state, selectedNumberOptions = _a.selectedNumberOptions, selectedNameOptions = _a.selectedNameOptions, selectedLicenseTypeOptions = _a.selectedLicenseTypeOptions, selectedUsageOptions = _a.selectedUsageOptions, selectedBillabilityOptions = _a.selectedBillabilityOptions, AssignedNumbers = _a.AssignedNumbers;
            var filteredData = AssignedNumbers;
            // Apply filters based on selected options from each dropdown
            if (selectedNumberOptions.length > 0) {
                filteredData = filteredData.filter(function (data) { return selectedNumberOptions.includes(data.Title); });
            }
            if (selectedNameOptions.length > 0) {
                filteredData = filteredData.filter(function (data) { return selectedNameOptions.includes(data.field_3); });
            }
            if (selectedLicenseTypeOptions.length > 0) {
                filteredData = filteredData.filter(function (data) { return selectedLicenseTypeOptions.includes(data.field_8); });
            }
            if (selectedUsageOptions.length > 0) {
                filteredData = filteredData.filter(function (data) { return selectedUsageOptions.includes(data.field_9); });
            }
            if (selectedBillabilityOptions.length > 0) {
                filteredData = filteredData.filter(function (data) { return selectedBillabilityOptions.includes(data.field_10); });
            }
            // Update the state with the filtered data
            _this.setState({ AssignedNumbersFilter: filteredData });
        };
        _this.clearSelections = function () {
            _this.setState({
                selectedNumberOptions: [],
                selectedNameOptions: [],
                selectedLicenseTypeOptions: [],
                selectedUsageOptions: [],
                selectedBillabilityOptions: [],
                AssignedNumbersFilter: _this.state.AssignedNumbers // Reset to show all data
            });
        };
        _this.state = {
            count: 0,
            currentNumberRange_Row: {},
            AssignedNumbers: [],
            AssignedNumbersFilter: [],
            optionsNumber: [],
            optionsName: [],
            optionsLicenseType: [],
            optionsUsage: [],
            optionsBillability: [],
            currentHeadNumber: '',
            currentNumberRange_id: -1,
            isModalOpen: false,
            selectedItem: null,
            selectedNumberOptions: [],
            selectedNameOptions: [],
            selectedLicenseTypeOptions: [],
            selectedUsageOptions: [],
            selectedBillabilityOptions: [],
            modalType: '',
            showDialog: false,
            itemToDelete: null,
            dialogTitle: '',
            dialogSubText: '',
            dialogType: 'confirmation',
            isUserOwner: false,
            LicenseTypeDropdownOptions: [],
            UsageDropdownOptions: [],
        };
        return _this;
    }
    AssignedNumbersPage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchParams, params, id, headnumber, isOwner, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check if the URL contains any query parameters
                        if (window.location.href.indexOf('?') <= -1) {
                            //Show the Blank page if no query parameters are found
                            return [2 /*return*/];
                        }
                        searchParams = window.location.href.split('?')[1];
                        // Check if searchParams contains any data
                        if (!searchParams) {
                            // Log a message and exit if no search parameters are found
                            console.log('No search parameters found');
                            return [2 /*return*/];
                        }
                        params = new URLSearchParams(searchParams);
                        // Check if both 'id' and 'headnumber' parameters are present
                        if (!params.has('id') || !params.has('headnumber')) {
                            // Log a message and exit if required parameters are not found
                            console.log('Required parameters not found');
                            return [2 /*return*/];
                        }
                        id = params.get('id');
                        headnumber = params.get('headnumber');
                        // Use the id and headnumber as needed
                        this.spListService_NumberRanges = new SPListService('Number-Ranges');
                        this.spListService_AssignedNumbers = new SPListService('CompleteList_202408_wip');
                        this.spListService_UsageLicensedNumbers = new SPListService('Master_UsageLicenses');
                        this.spUserService_CheckUserIsOwner = new SPUserService();
                        return [4 /*yield*/, this.spUserService_CheckUserIsOwner.CheckUserIsOwner(this.props._spContext)];
                    case 1:
                        isOwner = _a.sent();
                        console.log('Is User Owner:', isOwner);
                        // Call the function to get number range details
                        return [4 /*yield*/, this.getNumberRangeDetails(id)];
                    case 2:
                        // Call the function to get number range details
                        _a.sent();
                        return [4 /*yield*/, this.getUsageLicenses()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getAssignedNumbers(headnumber)];
                    case 4:
                        data = _a.sent();
                        this.setState({ AssignedNumbers: data, AssignedNumbersFilter: data, isUserOwner: isOwner });
                        return [4 /*yield*/, this.getOptions()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AssignedNumbersPage.prototype.getNumberRangeDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedId, numberRanges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 2];
                        parsedId = parseInt(id, 10);
                        if (!isNaN(parsedId)) {
                            id = parsedId.toString();
                        }
                        this.setState({ currentNumberRange_id: parsedId });
                        return [4 /*yield*/, this.spListService_NumberRanges.getItemById(parsedId)];
                    case 1:
                        numberRanges = _a.sent();
                        console.log('Number Ranges:', numberRanges);
                        this.setState({ currentNumberRange_Row: numberRanges });
                        this.setState({ currentHeadNumber: numberRanges["Title"] });
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // Define the function to get assigned numbers
    AssignedNumbersPage.prototype.getAssignedNumbers = function (headnumber) {
        return __awaiter(this, void 0, void 0, function () {
            var filterQuery, selectFields, expandFields, orderByField, assignedNumbers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filterQuery = headnumber ? "substringof('".concat(headnumber, "', Title)") : undefined;
                        selectFields = ['ID', 'Title', 'field_1', 'field_0', 'field_3', 'field_8', 'field_9', 'field_10', 'field_11', 'Author/Title', 'Author/EMail'];
                        expandFields = ['Author'];
                        orderByField = 'ID';
                        return [4 /*yield*/, this.spListService_AssignedNumbers.getAllItemsWOThreshold(this.props._spContext, filterQuery, selectFields, expandFields, orderByField, false)];
                    case 1:
                        assignedNumbers = _a.sent();
                        return [2 /*return*/, assignedNumbers];
                }
            });
        });
    };
    AssignedNumbersPage.prototype.getUsageLicenses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectFields, usageLicenses, uniqueLicenseTypes, uniqueUsages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectFields = ['ID', 'Title', 'Usage'];
                        return [4 /*yield*/, this.spListService_UsageLicensedNumbers.getAllItemsWOThreshold(this.props._spContext, '', selectFields, [], '', false)];
                    case 1:
                        usageLicenses = _a.sent();
                        uniqueLicenseTypes = Array.from(new Set(usageLicenses
                            .map(function (item) { return (typeof item.Title === 'string' ? item.Title.trim().replace(/\u00A0/g, '') : ''); }))).filter(function (title, index, self) { return title !== '' || self.indexOf(title) === index; })
                            .map(function (title) { return ({
                            key: title,
                            text: title
                        }); });
                        // Ensure there is one empty option
                        if (!uniqueLicenseTypes.some(function (option) { return option.key === ''; })) {
                            uniqueLicenseTypes.unshift({ key: '', text: '' });
                        }
                        console.log(uniqueLicenseTypes);
                        uniqueUsages = Array.from(new Set(usageLicenses.map(function (item) { return item.Usage || ''; }))).map(function (Usage) { return ({
                            key: Usage,
                            text: Usage || ''
                        }); });
                        this.setState({ LicenseTypeDropdownOptions: uniqueLicenseTypes, UsageDropdownOptions: uniqueUsages });
                        return [2 /*return*/];
                }
            });
        });
    };
    AssignedNumbersPage.prototype.getOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addCheckAllOptions, optionsNumSet_1, OptionsNum, optionsNamSet_1, optionsNam, optionsLTSet_1, optionsLT, optionsUsagSet_1, optionsUsag, optionsBillSet_1, optionsBill, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        addCheckAllOptions = function (options) {
                            return __spreadArray([
                                { key: 'checkAll', text: 'Check All' },
                                { key: 'uncheckAll', text: 'Uncheck All' }
                            ], options, true);
                        };
                        optionsNumSet_1 = new Set();
                        return [4 /*yield*/, this.state.AssignedNumbers.reduce(function (acc, data) {
                                var id = data.Title;
                                if (id && !optionsNumSet_1.has(id)) {
                                    optionsNumSet_1.add(id);
                                    acc.push({
                                        key: id,
                                        text: id,
                                    });
                                }
                                return acc;
                            }, [])];
                    case 1:
                        OptionsNum = _a.sent();
                        this.setState({ optionsNumber: addCheckAllOptions(OptionsNum) });
                        optionsNamSet_1 = new Set();
                        return [4 /*yield*/, this.state.AssignedNumbers.reduce(function (acc, data) {
                                var id = data.field_3;
                                if (id && !optionsNamSet_1.has(id)) {
                                    optionsNamSet_1.add(id);
                                    acc.push({
                                        key: id,
                                        text: id,
                                    });
                                }
                                return acc;
                            }, [])];
                    case 2:
                        optionsNam = _a.sent();
                        this.setState({ optionsName: addCheckAllOptions(optionsNam) });
                        optionsLTSet_1 = new Set();
                        return [4 /*yield*/, this.state.AssignedNumbers.reduce(function (acc, data) {
                                var id = data.field_8;
                                if (id && !optionsLTSet_1.has(id)) {
                                    optionsLTSet_1.add(id);
                                    acc.push({
                                        key: id,
                                        text: id,
                                    });
                                }
                                return acc;
                            }, [])];
                    case 3:
                        optionsLT = _a.sent();
                        this.setState({ optionsLicenseType: addCheckAllOptions(optionsLT) });
                        optionsUsagSet_1 = new Set();
                        return [4 /*yield*/, this.state.AssignedNumbers.reduce(function (acc, data) {
                                var id = data.field_9;
                                if (id && !optionsUsagSet_1.has(id)) {
                                    optionsUsagSet_1.add(id);
                                    acc.push({
                                        key: id,
                                        text: id,
                                    });
                                }
                                return acc;
                            }, [])];
                    case 4:
                        optionsUsag = _a.sent();
                        this.setState({ optionsUsage: addCheckAllOptions(optionsUsag) });
                        optionsBillSet_1 = new Set();
                        return [4 /*yield*/, this.state.AssignedNumbers.reduce(function (acc, data) {
                                var id = data.field_10;
                                if (id && !optionsBillSet_1.has(id)) {
                                    optionsBillSet_1.add(id);
                                    acc.push({
                                        key: id,
                                        text: id,
                                    });
                                }
                                return acc;
                            }, [])];
                    case 5:
                        optionsBill = _a.sent();
                        this.setState({ optionsBillability: addCheckAllOptions(optionsBill) });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.error("Error Message", error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AssignedNumbersPage.prototype.render = function () {
        var _this = this;
        var _a = this.state, AssignedNumbersFilter = _a.AssignedNumbersFilter, isModalOpen = _a.isModalOpen, selectedItem = _a.selectedItem, modalType = _a.modalType, showDialog = _a.showDialog, dialogTitle = _a.dialogTitle, dialogSubText = _a.dialogSubText, dialogType = _a.dialogType;
        var viewButtonStyles = {
            root: {
                backgroundColor: 'teal',
                color: 'white',
                marginRight: '8px',
                selectors: {
                    ':hover': {
                        backgroundColor: 'darkslategray',
                        color: 'white' // Hover icon color
                    }
                }
            }
        };
        var editButtonStyles = {
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
        var deleteButtonStyles = {
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
        var comboBoxStyles = {
            label: { fontWeight: 'bold', textAlign: 'center', width: '100%' },
            root: { width: '13vw' },
            optionsContainer: {
                overflowY: 'auto',
                maxHeight: '300px' // Sets a maximum height for the dropdown
            },
            callout: {
                minWidth: '13vw' // Sets a minimum width for the dropdown menu
            }
        };
        var customOptionStyles = {
            fontWeight: 'bold',
        };
        var onRenderOption = function (option) {
            if (option.key === 'uncheckAll' || option.key === 'checkAll') {
                return (React.createElement("div", { style: customOptionStyles }, option.text));
            }
            return React.createElement("div", null, option.text);
        };
        var headerClass = modalType === 'view' ? styles.viewHeader : styles.editHeader;
        return (React.createElement("div", null,
            React.createElement("div", { className: styles.totalCountContainer },
                React.createElement("div", { className: styles.totalCount },
                    "Assigned Numbers: ",
                    AssignedNumbersFilter.length),
                React.createElement("button", { className: styles.resetButton, onClick: this.clearSelections }, "Reset Filters")),
            React.createElement("div", null,
                React.createElement(ConfirmDialog, { hidden: !showDialog, onDismiss: function () { return _this.setState({ showDialog: false }); }, onConfirm: this.handleConfirmDelete, title: dialogTitle, subText: dialogSubText, dialogType: dialogType })),
            React.createElement("div", { className: styles.detailsListContainer },
                React.createElement("div", { className: styles.headerRow },
                    React.createElement(ComboBox, { placeholder: "Select", options: this.state.optionsNumber, selectedKey: this.state.selectedNumberOptions, autoComplete: 'on', allowFreeform: true, multiSelect: true, label: 'Number', styles: comboBoxStyles, className: styles.columnHeader, onChange: function (event, option, index) { return _this.handleOptionsFilter(event, option, index, 'Number'); }, onRenderOption: onRenderOption }),
                    React.createElement(ComboBox, { placeholder: "Select", options: this.state.optionsName, selectedKey: this.state.selectedNameOptions, autoComplete: 'on', allowFreeform: true, multiSelect: true, label: 'Name', styles: comboBoxStyles, className: styles.columnHeader, onChange: function (event, option, index) { return _this.handleOptionsFilter(event, option, index, 'Name'); }, onRenderOption: onRenderOption }),
                    React.createElement(ComboBox, { placeholder: "Select", options: this.state.optionsLicenseType, selectedKey: this.state.selectedLicenseTypeOptions, autoComplete: 'on', allowFreeform: true, multiSelect: true, label: 'License Type', styles: comboBoxStyles, className: styles.columnHeader, onChange: function (event, option, index) { return _this.handleOptionsFilter(event, option, index, 'License Type'); }, onRenderOption: onRenderOption }),
                    React.createElement(ComboBox, { placeholder: "Select", options: this.state.optionsUsage, selectedKey: this.state.selectedUsageOptions, autoComplete: 'on', allowFreeform: true, multiSelect: true, label: 'Usage', styles: comboBoxStyles, className: styles.columnHeader, onChange: function (event, option, index) { return _this.handleOptionsFilter(event, option, index, 'Usage'); }, onRenderOption: onRenderOption }),
                    React.createElement(ComboBox, { placeholder: "Select", options: this.state.optionsBillability, selectedKey: this.state.selectedBillabilityOptions, autoComplete: 'on', allowFreeform: true, multiSelect: true, label: 'Billability', styles: comboBoxStyles, className: styles.columnHeader, onChange: function (event, option, index) { return _this.handleOptionsFilter(event, option, index, 'Billability'); }, onRenderOption: onRenderOption }),
                    React.createElement(Label, { className: styles.columnHeader }, "Actions")),
                AssignedNumbersFilter.map(function (item) {
                    return (React.createElement("div", { key: item.ID, className: styles.dataRow },
                        React.createElement("div", { className: styles.cell }, item.Title),
                        React.createElement("div", { className: styles.cell }, item.field_3),
                        React.createElement("div", { className: styles.cell }, item.field_8),
                        React.createElement("div", { className: styles.cell }, item.field_9),
                        React.createElement("div", { className: styles.cell }, item.field_10),
                        React.createElement("div", { className: styles.cell },
                            React.createElement(IconButton, { iconProps: { iconName: 'View' }, title: "View", ariaLabel: "View", styles: viewButtonStyles, onClick: function () { return _this.handleView(item); } }),
                            React.createElement(IconButton, { iconProps: { iconName: 'Edit' }, title: "Edit", ariaLabel: "Edit", styles: editButtonStyles, onClick: function () { return _this.handleEdit(item); } }),
                            _this.state.isUserOwner && (React.createElement(IconButton, { iconProps: { iconName: 'Delete' }, title: "Delete", ariaLabel: "Delete", styles: deleteButtonStyles, onClick: function () { return _this.handleDelete(item); } })))));
                })),
            isModalOpen && selectedItem && (React.createElement(Modal, { isOpen: isModalOpen, onDismiss: this.handleCloseModal, isBlocking: false, containerClassName: styles.modalContainer },
                React.createElement("div", { className: "".concat(styles.modalHeader, " ").concat(headerClass) },
                    React.createElement("span", null,
                        selectedItem.Title,
                        " Details"),
                    React.createElement(IconButton, { iconProps: { iconName: 'Cancel' }, ariaLabel: "Close popup modal", onClick: this.handleCloseModal, className: styles.modalCloseButton })),
                React.createElement("div", { className: styles.modalBody }, Object.keys(fieldLabels).map(function (key) {
                    var _a, _b, _c;
                    return (selectedItem[key] !== undefined && (React.createElement("div", { key: key, className: styles.modalRow },
                        React.createElement(Label, { className: styles.modalLabel }, fieldLabels[key]),
                        modalType === 'view' ? (React.createElement("span", { className: styles.modalValue }, typeof selectedItem[key] === 'object' && selectedItem[key] !== null
                            ? JSON.stringify(selectedItem[key])
                            : selectedItem[key])) : (key === 'field_8' ? (React.createElement(Dropdown, { className: styles.dropdownField, selectedKey: (_a = selectedItem[key]) === null || _a === void 0 ? void 0 : _a.toString(), options: _this.state.LicenseTypeDropdownOptions, onChange: function (e, option) { var _a; return _this.handleChange(key, (_a = option === null || option === void 0 ? void 0 : option.key) === null || _a === void 0 ? void 0 : _a.toString()); } })) : (key === 'field_9' ? (React.createElement(Dropdown, { className: styles.dropdownField, selectedKey: (_b = selectedItem[key]) === null || _b === void 0 ? void 0 : _b.toString(), options: _this.state.UsageDropdownOptions, onChange: function (e, option) { var _a; return _this.handleChange(key, (_a = option === null || option === void 0 ? void 0 : option.key) === null || _a === void 0 ? void 0 : _a.toString()); } })) : (key === 'field_10' ? (React.createElement(Dropdown, { selectedKey: (_c = selectedItem[key]) === null || _c === void 0 ? void 0 : _c.toString(), className: styles.dropdownField, options: billableDropDownOptions, onChange: function (e, option) { var _a; return _this.handleChange(key, (_a = option === null || option === void 0 ? void 0 : option.key) === null || _a === void 0 ? void 0 : _a.toString()); } })) : (React.createElement(TextField, { value: selectedItem[key], className: styles.textField, onChange: function (e, newValue) { return _this.handleChange(key, newValue); }, disabled: key === 'Title' || key === 'field_0' || key === 'field_1' }))))))));
                })),
                modalType === 'edit' && (React.createElement("div", { className: styles.modalFooter },
                    React.createElement(PrimaryButton, { text: "Save", className: styles.saveButton, onClick: this.handleSave })))))));
    };
    return AssignedNumbersPage;
}(React.Component));
export default AssignedNumbersPage;
//# sourceMappingURL=AssignedNumbers.js.map