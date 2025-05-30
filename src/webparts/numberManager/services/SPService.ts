import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

export class SPService {
    private _spCtx:any;
    constructor(_sp?:any) {
        if(!_sp){
            this._spCtx = getSP();
            console.log("Getting SPFI from pnpjsConfig file: " + this._spCtx);
        }
        else {
            this._spCtx = _sp;
            console.log("Transferred SPFI");
        }
    }
    
    public async search(queryText: string, listPath: string): Promise<any[]> {
        try {
            const response = await this._spCtx.sp.search({
                Querytext: queryText,
                Path: listPath
            });
            return response.PrimarySearchResults;
        } catch (error) {
            console.log("Error occurred while searching:", error);
            return [];
        }
    }

}

