module.exports = resHelper = {

    async createResponseSuccess(data) {
        return {
            status: 200,
            data
        };
    },
    async createResponseError(status, message) {
        return {
            status: status || 500,
            data: {
                error: message || 'Okänt fel'
            }
        };
    },
    async createResonseMessag(status, message) {
        return {
            status: status || 200,
            data: { message }
        };

    },
}