import { WebPartContext } from '@microsoft/sp-webpart-base'; 
import { spfi, SPFI, SPFx } from '@pnp/sp'; 
import { LogLevel, PnPLogging } from '@pnp/logging'; 
import "@pnp/sp/webs"
import "@pnp/sp/lists"
import "@pnp/sp/items"
import "@pnp/sp/batching"

let _sp:SPFI = new SPFI();

export const getSP = (context?:WebPartContext) : SPFI => {
    if(!!context){
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
        console.log("Getting new SPFI object from SPFx - Context");
    }
    return _sp;
}
