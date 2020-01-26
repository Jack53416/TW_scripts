export class LocationError extends Error {
    constructor(...params) {
        super(params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, LocationError);
        }

        this.name = 'LocationError';
    }
}