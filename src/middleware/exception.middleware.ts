import { Response } from "express";
import {
	ArgumentsHost, Catch, ExceptionFilter, HttpException,
} from "@nestjs/common";
import { ErrorResult } from "../models/Result";
import { ErrorCodes } from "../models/ErrorCodes";

@Catch()
export default class ExceptionHandler implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = 200;
		
		response
			.status(status)
			.json(new ErrorResult(exception.message || ErrorCodes.UNKNOWN_ERROR));
	}
}
