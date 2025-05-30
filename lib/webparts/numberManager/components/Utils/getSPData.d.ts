import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
export declare class GetSPData {
    static getAllListItems(listName: string, _sp: any): Promise<any[]>;
    static getListItemById(listName: string, itemId: number, _sp: any): Promise<any>;
    static createListItem(listName: string, itemData: any, _sp: any): Promise<any>;
    static updateListItem(listName: string, itemId: number, itemData: any, _sp: any): Promise<any>;
    static deleteListItem(listName: string, itemId: number, _sp: any): Promise<void>;
}
//# sourceMappingURL=getSPData.d.ts.map