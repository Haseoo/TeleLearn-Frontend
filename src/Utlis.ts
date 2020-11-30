import { IError } from './IError';

export class Utils {
    static GetIdFromLocationUrl(location: string) {
        const splittedLocation = location.split('/');
        return splittedLocation[splittedLocation.length - 1];
    }

    static HandleError(component: IError, response: any, timeOut: boolean = false) {
        component.errorMessage = (response.error.message) ? response.error.message : response.message;
        component.error = true;
        if (timeOut) {
            setTimeout(() => component.error = false, 5000);
        }
    }

    static GetTimeString(date: Date) {
        const hours: number = date.getHours();
        let hoursStr: string;
        const minutes: number = date.getMinutes();
        let minutesStr: string;
        if (hours < 10) {
            hoursStr = '0' + hours.toString();
        } else {
            hoursStr = hours.toString();
        }
        if (minutes < 10) {
            minutesStr = '0' + minutes.toString();
        } else {
            minutesStr = minutes.toString();
        }
        return `${hoursStr}:${minutesStr}`;
    }
}
