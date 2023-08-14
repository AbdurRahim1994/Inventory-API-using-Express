const CreateService = async (request, model) => {
    try {
        const { email } = request.headers;
        const postBody = request.body;
        postBody.userEmail = email;
        const data = await model.create(postBody);
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = CreateService