"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
var Yup = __importStar(require("yup"));
var typeorm_1 = require("typeorm");
var TopicRepository_1 = require("../repositories/TopicRepository");
var UserRepository_1 = require("../repositories/UserRepository");
var CommentRepository_1 = require("../repositories/CommentRepository");
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    CommentController.createComment = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, topicId, userId, body, user, topic, schemaValidation, error_1, res, topicRepository, commentRepository, res, res, error_2, res, commentCreated, comment, res, error_3, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, topicId = _a.topicId, userId = _a.userId, body = _a.body;
                        schemaValidation = Yup.object().shape({
                            userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
                            topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido"),
                            body: Yup.string().required("O corpo do comentario é obrigatorio")
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schemaValidation.validate({ userId: userId, topicId: topicId, body: body }, {
                                abortEarly: false
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res = { message: "Erro de validação", type: "error validation", errors: error_1.errors };
                        return [2 /*return*/, response.status(403).json(res)];
                    case 4:
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        commentRepository = (0, typeorm_1.getConnection)().getCustomRepository(CommentRepository_1.CommentRepository);
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(UserRepository_1.UserRepository).findOne(userId)];
                    case 6:
                        user = _b.sent();
                        if (!user) {
                            res = { message: "Usuario não valido", type: "error validation", errors: [] };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [4 /*yield*/, topicRepository.findOne(topicId)];
                    case 7:
                        topic = _b.sent();
                        if (!topic) {
                            res = { message: "Topico não valido", type: "error validation", errors: [] };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server", errors: [] };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 9:
                        commentCreated = commentRepository.create({
                            user: user,
                            topic: topic,
                            body: body
                        });
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, commentRepository.save(commentCreated)];
                    case 11:
                        comment = _b.sent();
                        res = { message: "Comentario criado com sucesso", type: "success", body: comment };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 12:
                        error_3 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server", errors: [] };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return CommentController;
}());
exports.CommentController = CommentController;
