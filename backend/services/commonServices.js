import Category from "../db/models/Category.js";
import Area from "../db/models/Area.js";
import Testimonial from "../db/models/Testimonial.js";
import Ingredient from "../db/models/Ingredient.js";

export async function getCategories() {
    return await Category.findAll();
}

export async function getAreas() {
    return await Area.findAll();
}

export async function getIngredients() {
    return await Ingredient.findAll();
}

export async function getTestimonials(where) {
    return await Testimonial.findAll();
}
