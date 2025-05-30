import "@pnp/sp/presets/all";
import "@pnp/sp/search";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
export declare class SPListService {
    private listName;
    constructor(listName: string);
    GetListId(_sp: any | null): Promise<string>;
    createListItem(item: any, _sp?: any): Promise<any>;
    getAllItems(_sp: any): Promise<any[]>;
    getAllItems_singleColumn(_sp: any, columnName: string, distinctData?: boolean): Promise<any[]>;
    getItemById(id: number, _sp?: any): Promise<any>;
    getItemsFilteredByColumn(columnName: string, columnValue: string, _sp?: any): Promise<any[]>;
    getAllItems_singleColumn_FilteredByColumnValue(_sp: any, columnNameToFetch: string, columnNameToFilter: string, columnValueToFilter: string, distinctData?: boolean): Promise<any[]>;
    updateItem(id: number, item: any, _sp?: any): Promise<any>;
    deleteItem(id: number, _sp?: any): Promise<void>;
    getListItems_search(columnName: string, columnValue: string | null, _sp: any | null): Promise<any[]>;
    getListItems_search_v4(columnName: string, columnValue: string | null, _sp: any | null, otherColumnNames?: string[] | null): Promise<any[]>;
    getAllItemsWOThreshold(_sp: any, filterQuery?: string, selectFields?: string[], expandFields?: string[], orderByField?: string, ascending?: boolean): Promise<any[]>;
}
//# sourceMappingURL=SPListService.d.ts.map