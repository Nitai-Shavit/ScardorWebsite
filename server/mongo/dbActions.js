const get = async (model, query = {}) => {
  try {
    const documents = await model.find(query);

    if (!documents.length) {
      throw new Error("No documents found");
    }

    return documents;
  } catch (error) {
    return [{ error: error }];
  }
};

const insert = async (model, body) => {
  const newDocument = new model(body);

  try {
    const savedDocument = await newDocument.save();

    if (!savedDocument) {
      throw new Error("Error saving document");
    }

    return savedDocument;
  } catch (error) {
    // This will catch validation errors or other save-related issues
    return { error: error };
  }
};

const update = async (model, query, updateData) => {
  try {
    // Find the document and update it
    const updatedDocument = await model.findOneAndUpdate(query, updateData, {
      new: true, // This option returns the modified document rather than the original
      runValidators: true, // Ensures all updates meet schema validation
    });

    if (!updatedDocument) {
      throw new Error("Document not found");
    }

    return updatedDocument;
  } catch (error) {
    return { error: error }; // You can handle the error here or throw it to be handled by the calling function
  }
};

const remove = async (model, query) => {
  try {
    const deletedDocument = await model.findOneAndDelete(query);

    if (!deletedDocument) {
      throw new Error("Document not found");
    }

    return deletedDocument;
  } catch (error) {
    return { error: error };
  }
};

module.exports = { get, insert, update, remove };
