"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = exports.findRecentStops = exports.findCode = exports.findDraw = exports.findDoc = exports.getAllDocIdsForUser = exports.findOrCreateDoc = void 0;
const documentSchema_1 = __importDefault(require("../model/documentSchema"));
// Helper functions
const defaultValue = "create here ";
const findOrCreateDoc = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (id === null || name === null)
        return;
    const filter = { _id: id };
    const update = {
        $addToSet: { users: name },
        $setOnInsert: { doc: defaultValue, draw: [], code: "" },
    };
    const options = {
        new: true,
        upsert: true,
    };
    const updatedDoc = yield documentSchema_1.default.findOneAndUpdate(filter, update, options);
    return updatedDoc;
});
exports.findOrCreateDoc = findOrCreateDoc;
const getAllDocIdsForUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    if (userName === null)
        return [];
    try {
        const docs = yield documentSchema_1.default.find({ users: userName }, "_id");
        const docIds = docs.map((doc) => { var _a; return (_a = doc._id) === null || _a === void 0 ? void 0 : _a.toString(); }).filter((id) => id !== null);
        return docIds;
    }
    catch (error) {
        console.error("Error fetching document IDs:", error);
        return [];
    }
});
exports.getAllDocIdsForUser = getAllDocIdsForUser;
// Route Handlers
const findDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.params;
    try {
        const document = yield (0, exports.findOrCreateDoc)(id, name);
        document ? res.json({ doc: document.doc }) : res.status(404).json({ message: "Document not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.findDoc = findDoc;
const findDraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.params;
    try {
        const document = yield (0, exports.findOrCreateDoc)(id, name);
        document ? res.json({ elements: document.draw }) : res.status(404).json({ message: "Document not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.findDraw = findDraw;
const findCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.params;
    try {
        const document = yield (0, exports.findOrCreateDoc)(id, name);
        document ? res.json({ editorContent: document.code }) : res.status(404).json({ message: "Document not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.findCode = findCode;
const findRecentStops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const docIds = yield (0, exports.getAllDocIdsForUser)(name);
        docIds ? res.json({ docIds }) : res.status(404).json({ message: "Documents not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.findRecentStops = findRecentStops;
const createDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.params;
    try {
        const document = yield (0, exports.findOrCreateDoc)(id, name);
        document ? res.sendStatus(200) : res.status(404).json({ message: "Document not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createDoc = createDoc;
