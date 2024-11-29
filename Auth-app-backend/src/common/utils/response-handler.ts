import { HttpException, HttpStatus } from '@nestjs/common';

export class ResponseHandler {
  static sendSuccessResponse<responseData>(
    data: responseData,
    message: string = 'Request successful',
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    return {
      statusCode,
      message,
      data,
    };
  }

  static throwBadRequestException(
    message: string = 'Bad Request',
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    throw new HttpException(message, statusCode);
  }

  static throwUnauthorizedException(
    message: string = 'Unauthorized access',
    statusCode: HttpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    throw new HttpException(message, statusCode);
  }

  static throwServerErrorException(
    message: string = 'Internal server error',
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(message, statusCode);
  }
}
