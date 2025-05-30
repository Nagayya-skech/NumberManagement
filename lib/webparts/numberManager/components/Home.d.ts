import React from 'react';
import { IDropdownOption } from '@fluentui/react';
import { UserDetails } from '../models/UserDetails';
import { INumberManagerProps } from './INumberManagerProps';
interface IHomeState {
    isAdmin: boolean;
    all_HeadNumbers: any[];
    OUs: any[];
    user_OU: string;
    curr_OU: string;
    curr_OU_key: string | number;
    location_NumberData: any[];
    currentUser: UserDetails | null;
}
declare class HomePage extends React.Component<INumberManagerProps, IHomeState> {
    private spListService_NumberRanges;
    private spListService_CompleteList;
    private spUserService;
    constructor(props: INumberManagerProps);
    componentDidMount(): Promise<void>;
    SetCurrentUserValues(): Promise<any>;
    render(): JSX.Element;
    handleOUChange(option: IDropdownOption<any> | undefined, firstLoad?: boolean | false): Promise<any>;
    private getNumberTableData;
    private getNewStartNumberString;
    sortList(list: any[]): any[];
    getOUList(country?: string | null): Promise<any>;
    setNumberTableData(OUVal?: string): Promise<void>;
    getUserLocation(): Promise<any>;
    getCountryFromOU(ou: string): string;
    getOU_index_from_OU(OUVal: string): string | number;
    RefreshData(): Promise<any>;
    UpdateNumberCountsForHeader(id: number, headNumber: string): Promise<any>;
}
export default HomePage;
//# sourceMappingURL=Home.d.ts.map