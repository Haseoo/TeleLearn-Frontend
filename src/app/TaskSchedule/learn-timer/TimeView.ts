export class TimeView {
    hours: number
    minutes: number;
    seconds: number;
    
    constructor(miliseconds: number) {
        const totalSeconds: number = miliseconds / 1000;
        this.hours = Math.floor(totalSeconds / 3600.0);
        this.minutes = Math.floor(totalSeconds / 60.0) - this.hours * 60;
        this.seconds = totalSeconds - this.hours * 3600 - this.minutes * 60;
    }

    
}