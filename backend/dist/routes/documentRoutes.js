"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentController_1 = require("../controllers/documentController");
const router = (0, express_1.Router)();
// Define routes
router.get("/find/:id/:name", documentController_1.findDoc);
router.get("/find_draw/:id/:name", documentController_1.findDraw);
router.get("/find_code/:id/:name", documentController_1.findCode);
router.get("/find_recent_stops/:name", documentController_1.findRecentStops);
router.get("/create_doc/:id/:name", documentController_1.createDoc);
exports.default = router;
