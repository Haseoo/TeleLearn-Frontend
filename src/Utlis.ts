export class Utils {
    static GetIdFromLocationUrl(location: string) {
        let splittedLocation = location.split('/');
        return splittedLocation[splittedLocation.length - 1];
    }
}