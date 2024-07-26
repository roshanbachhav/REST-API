const data = require("../Model/Data");

const getAllData = async (request, response) => {
    const queryObject = {};

    // Create a query object based on the request parameters
    if (request.query.name) {
        queryObject.name = { $regex: request.query.name, $options: 'i' };
    }

    if (request.query.typeOf) {
        queryObject.typeOf = request.query.typeOf;
    }

    if (request.query.featured) {
        queryObject.featured = request.query.featured === 'true';
    }

    // Initialize sorting and selection
    let API = data.find(queryObject);

    if (request.query.sort) {
        const sortFix = request.query.sort.replace(",", " ");
        API = API.sort(sortFix);
    }

    if (request.query.select) {
        const fields = request.query.select.split(',').join(' ');
        API = API.select(fields);
    }

    // Get the total count of items matching the query
    const totalCount = await data.countDocuments(queryObject);

    // Handle pagination
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Apply pagination
    const places = await API.skip(skip).limit(limit).exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Send response with paginated data and total pages
    response.status(200).json({
        places,
        totalCount,
        totalPages
    });
};

module.exports = { getAllData };
