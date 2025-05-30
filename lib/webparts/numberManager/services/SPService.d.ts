import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
export declare class SPService {
    private _spCtx;
    constructor(_sp?: any);
    search(queryText: string, listPath: string): Promise<any[]>;
}
//# sourceMappingURL=SPService.d.ts.map