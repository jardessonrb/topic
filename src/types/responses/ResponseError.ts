type ResponseError = {
  message: string;
  type: "error" | "error validation";
  errors?: any[];
}

export { ResponseError };
