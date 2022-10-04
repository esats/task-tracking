export class Result<T>{
    public data: T;
    public success = true;
    public message = '';

    constructor(success: boolean, data: T, message: string) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}

export class SuccessResult extends Result<any> {
    constructor(data: any = { status: true }) {
        super(true, data, '');
    }
}

export class ErrorResult extends Result<any>{
    constructor(message: string) {
        super(false, {}, message);
    }
}