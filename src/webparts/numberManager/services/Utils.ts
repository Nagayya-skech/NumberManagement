import { SPListService } from './SPListService';

// Define the static class Utils
export default class Utils {
    // Define the static method to get assigned numbers
    static async GetAssignedNumbers(headnumber: string | null, spListService_AssignedNumbers: SPListService, spContext:any): Promise<any> {
        // Construct the filter query
        const filterQuery = headnumber ? `substringof('${headnumber}', Title)` : undefined;
        // Specify the columns you want to retrieve
        const selectFields = ['ID', 'Title', 'field_1', 'field_0', 'field_3', 'field_8', 'field_9', 'field_10', 'field_11', 'Author/Title', 'Author/EMail'];
        // Specify the fields to expand
        const expandFields = ['Author'];
        // Specify the field to order by and the order direction
        const orderByField = 'ID';
        let assignedNumbers = await spListService_AssignedNumbers.getAllItemsWOThreshold(spContext, filterQuery, selectFields, expandFields, orderByField, false);
        assignedNumbers = assignedNumbers.filter((item: any) => { return item.field_11 !== 'Unassigned'; });
        return assignedNumbers;
    }
}

