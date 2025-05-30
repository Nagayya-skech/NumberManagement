import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-groups/web";

export class SPUserService {
    
    private _spCurrentUser: any;

    private _getCurrentUser = async (_sp: any): Promise<any> => {
        if(!_sp){
            _sp = getSP();
        }
        try {
            const user = await _sp.web.currentUser();
            this._spCurrentUser = user;
            return user
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
    }

    public GetCurrentUserDetails = async (_sp?: any): Promise<any> => {
        if(!this._spCurrentUser){
            await this._getCurrentUser(_sp);
        }
        return this._spCurrentUser;
    }

    public GetCurrentUsers_OU = (userTitle: any): string => {
        const ouRegex = /\(([^)]+)\)$/;
        const ouMatch = ouRegex.exec(userTitle);
        const ou = ouMatch ? ouMatch[1] : '';
        return ou;
    }

    public CheckUserIsAdmin = async (_sp?: any): Promise<boolean> => {  
        if(!this._spCurrentUser){
            await this._getCurrentUser(_sp);
        }
        const user = this._spCurrentUser;
        const isAdmin = user.IsSiteAdmin;
        return isAdmin;
    }

    public GetCurrentUsers_Country(user_ou: string): string {
        return user_ou.split('-')[0];
    }

    public async CheckUserIsOwner(_sp: any): Promise<boolean> {
        let sp : any; 
        let OwnerGroupName : string = 'M365 Communication - Enterprise Telephony number management Owners';
        if(!_sp){
            sp = getSP();
            console.log("Getting SPFI from pnpjsConfig file: " + sp);
        }
        else {
            sp = _sp;
            console.log("Transferred SPFI");
        }
        const currentUser = await sp.web.currentUser();
        const groupUsers = await sp.web.siteGroups.getByName(OwnerGroupName).users();
        return groupUsers.some((user: { Id: any; }) => user.Id === currentUser.Id);
    }

    public async GetCurrentUserGroups(_sp:any | null): Promise<any[]> {
        let sp : any; 
        if(!_sp){
            sp = getSP();
            //console.log("Getting SPFI from pnpjsConfig file: " + sp);
        }
        else {
            sp = _sp;
            //console.log("Transferred SPFI");
        }
        //const currentUser = await sp.web.currentUser();
        try{
            let userGrps = await sp.web.currentUser.groups();      
            return userGrps;
        }
        catch (error) {
            console.error("Error getting user groups:", error);
            throw error; 
        }
    }    
}