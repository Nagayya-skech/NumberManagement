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
import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-groups/web";
var SPUserService = /** @class */ (function () {
    function SPUserService() {
        var _this = this;
        this._getCurrentUser = function (_sp) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_sp) {
                            _sp = getSP();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, _sp.web.currentUser()];
                    case 2:
                        user = _a.sent();
                        this._spCurrentUser = user;
                        return [2 /*return*/, user];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error getting current user:", error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.GetCurrentUserDetails = function (_sp) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._spCurrentUser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getCurrentUser(_sp)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._spCurrentUser];
                }
            });
        }); };
        this.GetCurrentUsers_OU = function (userTitle) {
            var ouRegex = /\(([^)]+)\)$/;
            var ouMatch = ouRegex.exec(userTitle);
            var ou = ouMatch ? ouMatch[1] : '';
            return ou;
        };
        this.CheckUserIsAdmin = function (_sp) { return __awaiter(_this, void 0, void 0, function () {
            var user, isAdmin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._spCurrentUser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getCurrentUser(_sp)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        user = this._spCurrentUser;
                        isAdmin = user.IsSiteAdmin;
                        return [2 /*return*/, isAdmin];
                }
            });
        }); };
    }
    SPUserService.prototype.GetCurrentUsers_Country = function (user_ou) {
        return user_ou.split('-')[0];
    };
    SPUserService.prototype.CheckUserIsOwner = function (_sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, OwnerGroupName, currentUser, groupUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OwnerGroupName = 'M365 Communication - Enterprise Telephony number management Owners';
                        if (!_sp) {
                            sp = getSP();
                            console.log("Getting SPFI from pnpjsConfig file: " + sp);
                        }
                        else {
                            sp = _sp;
                            console.log("Transferred SPFI");
                        }
                        return [4 /*yield*/, sp.web.currentUser()];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, sp.web.siteGroups.getByName(OwnerGroupName).users()];
                    case 2:
                        groupUsers = _a.sent();
                        return [2 /*return*/, groupUsers.some(function (user) { return user.Id === currentUser.Id; })];
                }
            });
        });
    };
    SPUserService.prototype.GetCurrentUserGroups = function (_sp) {
        return __awaiter(this, void 0, void 0, function () {
            var sp, userGrps, error_2;
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
                        return [4 /*yield*/, sp.web.currentUser.groups()];
                    case 2:
                        userGrps = _a.sent();
                        return [2 /*return*/, userGrps];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error getting user groups:", error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SPUserService;
}());
export { SPUserService };
//# sourceMappingURL=SPUserService.js.map