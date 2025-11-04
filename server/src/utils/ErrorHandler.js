class ErrorHandler extends Error{
    constructor(
        statusCode = 400,
        message = "Something went wrong!",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.success = false

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ErrorHandler