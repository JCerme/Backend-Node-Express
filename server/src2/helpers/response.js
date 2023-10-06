import { productsModel } from '../dao/models/mongoose.js';

export default async function response(status, resul, params){
    const documents = await productsModel.find().count();
    let pages = (params.limit && Math.floor(documents / params.limit)) || 1;
    let page = Number(params.page) || 1;

    return {
        "status": status,
        "payload": resul,
        "totalPages": pages,
        "page": page,
        "hasPrevPage": page > 1,
        "prevPage": page > 1 ? page - 1 : null,
        "prevLink": prevLink(page, params),
        "hasNextPage": page < pages,
        "nextPage": page < pages ? page + 1 : null,
        "nextLink": nextLink(page, pages, params),
    }
}

function prevLink(page, params){
    let prevPage = page > 1 ? page - 1 : null;
    return buildURL(params, prevPage);
}

function nextLink(page, pages, params){
    let nextPage = page < pages ? page + 1 : null;
    return buildURL(params, nextPage);
}

// Build the new URL
function buildURL(params, page){
    let url = `${params.url}?`;
    if(page || params.page) url += `&page=${page || params.page}`;
    if(params.limit) url += `&limit=${params.limit}`;
    if(params.sort) url += `&sort=${params.sort}`;
    if(params.query) url += `&query=${params.query}`;
    return url;
}