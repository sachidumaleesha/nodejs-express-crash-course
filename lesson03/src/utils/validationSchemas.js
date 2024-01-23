export const userValidationSchemas = {
    username: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Must be at least 5-32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be String!"
        }
    },
    displayName: {
        notEmpty: {
            errorMessage: "display cannot be empty"
        }
    }
}