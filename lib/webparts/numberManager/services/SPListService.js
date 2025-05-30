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
import { SPHttpClient } from '@microsoft/sp-http';
import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/presets/all";
import "@pnp/sp/search";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
//import { SearchQueryInit,  SearchResults, SearchQueryBuilder } from "@pnp/sp/search";
import { SearchQueryBuilder } from "@pnp/sp/search";
var SPListService = /** @class */ (function () {
    function SPListService(listName) {
        this.listName = listName;
    }
    // Get list ID
    SPListService.prototype.GetListId = function (_sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, list, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName)()];
                    case 2:
                        list = _a.sent();
                        return [2 /*return*/, list.Id];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error getting list ID:", error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Create a new item
    SPListService.prototype.createListItem = function (item, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.add(item)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error creating item while saving the data", error_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Read all items
    SPListService.prototype.getAllItems = function (_sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, items, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.top(5000)()];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error getting items:", error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Read all items with only one Column
    SPListService.prototype.getAllItems_singleColumn = function (_sp, columnName, distinctData) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, items, uniqueItems, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items().Select([columnName])()];
                    case 2:
                        items = _a.sent();
                        if (distinctData) {
                            uniqueItems = items.filter(function (v, i, a) { return a.findIndex(function (t) { return (t[columnName] === v[columnName]); }) === i; });
                            return [2 /*return*/, uniqueItems];
                        }
                        return [2 /*return*/, items];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error getting items:", error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Read a single item by ID
    SPListService.prototype.getItemById = function (id, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, item, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.getById(id)()];
                    case 2:
                        item = _a.sent();
                        return [2 /*return*/, item];
                    case 3:
                        error_5 = _a.sent();
                        console.error("Error getting item:", error_5);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SPListService.prototype.getItemsFilteredByColumn = function (columnName, columnValue, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, items, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.filter("".concat(columnName, " eq '").concat(columnValue, "'")).top(5000)()];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, items];
                    case 3:
                        error_6 = _a.sent();
                        console.error("Error getting items:", error_6);
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Read all items with only one Column
    SPListService.prototype.getAllItems_singleColumn_FilteredByColumnValue = function (_sp, columnNameToFetch, columnNameToFilter, columnValueToFilter, distinctData) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, items, uniqueItems, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName)
                                .items
                                .select(columnNameToFetch)
                                .filter("".concat(columnNameToFilter, " eq '").concat(columnValueToFilter, "'")).top(5000)()];
                    case 2:
                        items = _a.sent();
                        if (distinctData) {
                            uniqueItems = items.filter(function (v, i, a) { return a.findIndex(function (t) { return (t[columnNameToFetch] === v[columnNameToFetch]); }) === i; });
                            return [2 /*return*/, uniqueItems];
                        }
                        return [2 /*return*/, items];
                    case 3:
                        error_7 = _a.sent();
                        console.error("Error getting items:", error_7);
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Update an item by ID
    SPListService.prototype.updateItem = function (id, item, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.getById(id).update(item)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_8 = _a.sent();
                        console.error("Error updating item:", error_8);
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete an item by ID
    SPListService.prototype.deleteItem = function (id, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.listName).items.getById(id).delete()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        console.error("Error deleting item:", error_9);
                        throw error_9;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Search for a string in a column
    SPListService.prototype.getListItems_search = function (columnName, columnValue, _sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, YourListName, web_details, web_url, queryUrl, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        YourListName = this.listName;
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        return [4 /*yield*/, sp.web()];
                    case 1:
                        web_details = _a.sent();
                        web_url = web_details.Url;
                        queryUrl = "".concat(web_url, "/_api/search/query?querytext='").concat(columnName, ":").concat(columnValue, " AND Path:").concat(web_url, "/Lists/").concat(YourListName, "'&selectproperties='Title,Id,Created,Modified'&rowlimit=5000");
                        return [4 /*yield*/, sp.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.PrimaryQueryResult.RelevantResults.Table.Rows.map(function (row) {
                                var item = {};
                                row.Cells.forEach(function (cell) {
                                    item[cell.Key] = cell.Value;
                                });
                                return item;
                            })];
                    case 4: throw new Error('Error fetching list items');
                }
            });
        });
    };
    SPListService.prototype.getListItems_search_v4 = function (columnName, columnValue, _sp, otherColumnNames) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, allTitles, startRow, hasMoreResults, listid_string, allColumnProperties, query, results, titles_allProps, titles, error_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allTitles = [];
                        startRow = 0;
                        hasMoreResults = true;
                        return [4 /*yield*/, this.GetListId(_sp)];
                    case 1:
                        listid_string = _a.sent();
                        //console.log("List ID:", listid_string);
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        allColumnProperties = [columnName];
                        if (otherColumnNames != null) {
                            allColumnProperties = allColumnProperties.concat(otherColumnNames);
                        }
                        _a.label = 2;
                    case 2:
                        if (!hasMoreResults) return [3 /*break*/, 7];
                        query = SearchQueryBuilder()
                            .text(columnName + ":" + columnValue + "*") // This searches for titles starting with 'YourValue'
                            //.text(columnValue +"*") // This searches for titles starting with 'YourValue'            
                            .rowLimit(5000) // Fetch 500 items per request
                            .startRow(startRow)
                            .sourceId(listid_string);
                        //.sortList(columnName, false)
                        if (otherColumnNames != null) {
                            query = query.selectProperties.apply(query, __spreadArray([columnName], allColumnProperties, false));
                        }
                        else {
                            query = query.selectProperties(columnName);
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, sp.search(query)];
                    case 4:
                        results = _a.sent();
                        titles_allProps = results.PrimarySearchResults.filter(function (x) { return ((x.Path) && x.Path.indexOf("Lists/" + _this.listName) > -1); });
                        titles = titles_allProps.map(function (item) { return item.Title; });
                        allTitles = allTitles.concat(titles);
                        // Check if there are more results
                        hasMoreResults = results.TotalRows > startRow + results.RowCount;
                        startRow += results.RowCount;
                        return [3 /*break*/, 6];
                    case 5:
                        error_10 = _a.sent();
                        console.error("Error:", error_10);
                        hasMoreResults = false;
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 2];
                    case 7: 
                    //console.log("AllTitles:-");
                    //console.log(allTitles);
                    return [2 /*return*/, allTitles];
                }
            });
        });
    };
    // Read all items by handling threshold Limit
    SPListService.prototype.getAllItemsWOThreshold = function (_sp, filterQuery, selectFields, expandFields, orderByField, ascending) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, batchSize, items, skip, hasMoreItems, query, batchItems, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            sp = getSP();
                            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            //console.log("Transferred SPFI");
                        }
                        batchSize = 3000;
                        items = [];
                        skip = 0;
                        hasMoreItems = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        _a.label = 2;
                    case 2:
                        if (!hasMoreItems) return [3 /*break*/, 4];
                        query = sp.web.lists.getByTitle(this.listName).items.top(batchSize).skip(skip);
                        if (filterQuery) {
                            query = query.filter(filterQuery);
                        }
                        if (selectFields && selectFields.length > 0) {
                            query = query.select.apply(query, selectFields);
                        }
                        if (expandFields && expandFields.length > 0) {
                            query = query.expand.apply(query, expandFields);
                        }
                        return [4 /*yield*/, query()];
                    case 3:
                        batchItems = _a.sent();
                        items = items.concat(batchItems);
                        skip += batchSize;
                        hasMoreItems = batchItems.length === batchSize;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, items];
                    case 5:
                        error_11 = _a.sent();
                        console.error("Error getting items:", error_11);
                        throw error_11;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SPListService;
}());
export { SPListService };
//# sourceMappingURL=SPListService.js.map