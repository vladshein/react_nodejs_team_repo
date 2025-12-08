import Contact from "../db/models/Contact.js";

async function listContacts(where) {
    return await Contact.findAll({ where });
}

async function getContactById(where) {
    return await Contact.findOne({ where });
}

async function removeContact(where) {
    const contact = await getContactById(where);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}

async function addContact(owner, name, email, phone, favorite = false) {
    const newContact = Contact.create({ owner, name, email, phone, favo rite });
    return newContact;
}

async function updateContact(where, name, email, phone, favorite) {
    const contact = await getContactById(where);
    if (!contact) return null;

    const updatedContact = { name, email, phone, favorite };
    return await contact.update(updatedContact);
}

async function updateContactFavorite(where, payload) {
    const contact = await getContactById(where);
    if (!contact) return null;

    await contact.update(payload);
    return contact;
}

export default {
    listContacts,
    addContact,
    removeContact,
    getContactById,
    updateContact,
    updateContactFavorite,
};
