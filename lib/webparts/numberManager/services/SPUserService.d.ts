import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-groups/web";
export declare class SPUserService {
    private _spCurrentUser;
    private _getCurrentUser;
    GetCurrentUserDetails: (_sp?: any) => Promise<any>;
    GetCurrentUsers_OU: (userTitle: any) => string;
    CheckUserIsAdmin: (_sp?: any) => Promise<boolean>;
    GetCurrentUsers_Country(user_ou: string): string;
    CheckUserIsOwner(_sp: any): Promise<boolean>;
    GetCurrentUserGroups(_sp: any | null): Promise<any[]>;
}
//# sourceMappingURL=SPUserService.d.ts.map