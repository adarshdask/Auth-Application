export function getErrorMessage(error: any): string {
  if (error?.response?.data?.message) {
    const message = error.response.data.message;
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    return message;
  }
  return "Something went wrong. Please try again later.";
}
