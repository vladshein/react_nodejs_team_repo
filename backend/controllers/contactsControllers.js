import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const { id: owner } = req.user;
    const contacts = await contactsService.listContacts({ owner });
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id: owner } = req.user;
    const contact = await contactsService.getContactById({ id: req.params.id, owner });
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

export const deleteContact = async (req, res) => {
    const { id: owner } = req.user;
    const contact = await contactsService.removeContact({ id: req.params.id, owner });
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

export const createContact = async (req, res) => {
    const { id: owner } = req.user;
    const { name, email, phone, favorite } = req.body;

    const contact = await contactsService.addContact(owner, name, email, phone, favorite);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const { name, email, phone, favorite } = req.body;

    const contact = await contactsService.updateContact(
        { id, owner },
        name,
        email,
        phone,
        favorite
    );
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
    const { id: owner } = req.user;
    const { id } = req.params;
    const contact = await contactsService.updateContactFavorite({ id, owner }, req.body);
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
};
