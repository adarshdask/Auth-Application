export interface ApiResponse<responseData> {
  statusCode: number;
  message: string;
  error?: string;
  data?: responseData;
}
