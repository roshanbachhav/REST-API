const data = require("../Model/Data");

const getAllData =  async (request , response) => {
    const queryObject = {};

    let API = data.find(queryObject);

    if(request.query.sort){
        const sortFix = request.query.sort.replace("," , " ");
        API = API.sort(sortFix);
    }

     if (request.query.select) {
        const fields = request.query.select.split(',').join(' ');
        API = API.select(fields);
    }


    if (request.query.name) {
        queryObject.name = { $regex: request.query.name, $options: 'i' };
    }

    if (request.query.typeOf) {
        queryObject.typeOf = request.query.typeOf;
    }

    if (request.query.featured) {
        queryObject.featured = request.query.featured === 'true';
    }

    pages = Number(request.query.page) || 1;
    limit = Number(request.query.limit) || 6;

    let skip = (pages - 1) * limit;
    API = API.skip(skip).limit(limit);

    const Places = await API;
    response.status(200).json({Places , nbHits : Places.lenght});
};


module.exports = {getAllData};