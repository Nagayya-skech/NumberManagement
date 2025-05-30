import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
var _sp = new SPFI();
export var getSP = function (context) {
    if (!!context) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
        console.log("Getting new SPFI object from SPFx - Context");
    }
    return _sp;
};
//# sourceMappingURL=pnpjsConfig.js.map