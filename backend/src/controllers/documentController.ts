import Document from "../model/documentSchema";

const defaultValue = "create here";

export const findOrCreateDoc = async (id: string, name: string) => {
  if (!id || !name) return;

  const filter = { _id: id };
  const update = {
    $addToSet: { users: name },
    $setOnInsert: { doc: defaultValue, draw: [], code: "" },
  };

  const options = {
    new: true,
    upsert: true,
  };

  const updatedDoc = await Document.findOneAndUpdate(filter, update, options);
  return updatedDoc;
};

export const getAllDocIdsForUser = async (userName: string) => {
  if (!userName) return [];

  try {
    const docs = await Document.find({ users: userName }, "_id");
    const docIds = docs.map((doc) => (doc._id ? doc._id.toString() : null)).filter(Boolean);
    return docIds;
  } catch (error) {
    console.error("Error fetching document IDs:", error);
    return [];
  }
};
