// TODO: add RECIPE model
// import Contact from "../db/models/Contact.js";

async function getCategories(where) {
    return await Contact.findAll({ where });
}

async function getAreas(where) {
    return await Contact.findAll({ where });
}

async function getIngredients(where) {
    return await Contact.findAll({ where });
}

async function getTestimonials(where) {
    return await Contact.findAll({ where });
}
