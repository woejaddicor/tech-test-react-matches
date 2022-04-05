import {products} from "./mockData";

export const mockFetch = async (...args) => {
    if(!args[0].includes('page=')) throw new Error('API requires query parameter of page, please see README for more information');
    const page = args[0].split('page=')[1]

    const pages = new Map([
        ['0', products.slice(0, 10)],
        ['1', products.slice(11, 20)],
        ['2', products.slice(21, 30)],
        ['3', products.slice(31, 40)],
        ['4', products.slice(41, 50)],
        ['5', products.slice(51, products.length)],
    ])

    return {
        ok: true,
        status: 200,
        json: () => Promise.resolve({products: pages.get(page), count: products.length})
    };
};
