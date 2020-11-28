import { IError } from './IError';

export class Utils {
    static GetIdFromLocationUrl(location: string) {
        let splittedLocation = location.split('/');
        return splittedLocation[splittedLocation.length - 1];
    }

    static HandleError(component: IError, response: any) {
        component.errorMessage = (response.error.message) ? response.error.message : response.message;
        component.error = true;
    }
}