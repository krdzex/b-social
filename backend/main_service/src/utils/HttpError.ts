class HttpError extends Error {
    status: number;
    data: any;
  
    constructor({ message, status = 500, data = null }: { message: string; status?: number; data?: any }) {
      super(message);
      this.name = "HttpError";
      this.status = status;
      this.data = data;
    }
  
    static BadRequest(message: string) {
      return new HttpError({ message, status: 400 });
    }
  
    static Unauthorized(message: string) {
      return new HttpError({ message, status: 401 });
    }
  
    static NotFound(message: string) {
      return new HttpError({ message, status: 404 });
    }
  
    static InternalServerError(message: string) {
      return new HttpError({ message, status: 500 });
    }
  }
  
  export default HttpError;