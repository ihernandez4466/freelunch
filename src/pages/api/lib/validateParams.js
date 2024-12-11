export const validateParams = (requiredParams, body) => {
    const missingParams = requiredParams.filter(param => 
        body[param] != null
    );

    if (missingParams.length == 0) {
        return false
    }
    return true
};