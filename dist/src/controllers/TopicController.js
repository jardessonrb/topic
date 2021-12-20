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
exports.TopicController = void 0;
var typeorm_1 = require("typeorm");
var TopicRepository_1 = require("../repositories/TopicRepository");
var UserRepository_1 = require("../repositories/UserRepository");
var Yup = __importStar(require("yup"));
var VoteRecordRepository_1 = require("../repositories/VoteRecordRepository");
var TopicView_1 = require("../views/TopicView");
var VoteRecordView_1 = require("../views/VoteRecordView");
var TopicController = /** @class */ (function () {
    function TopicController() {
    }
    TopicController.createTopic = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, body, userId, user, schemaValidation, error_1, res, res, error_2, res, topicRepository, topicCreated, topic, topicResponse, res, error_3, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, title = _a.title, body = _a.body, userId = _a.userId;
                        schemaValidation = Yup.object().shape({
                            title: Yup.string().required("O titulo do topico é obrigatorio"),
                            body: Yup.string().required("O conteudo do topico é obrigatorio"),
                            userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido")
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schemaValidation.validate({ title: title, body: body, userId: userId }, {
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
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(UserRepository_1.UserRepository).findById(userId)];
                    case 5:
                        user = _b.sent();
                        if (!user) {
                            res = { message: "Usuario não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 7:
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        topicCreated = topicRepository.create({
                            title: title,
                            body: body,
                            upVotes: 0,
                            downVotes: 0,
                            user: user
                        });
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, topicRepository.save(topicCreated)];
                    case 9:
                        topic = _b.sent();
                        topicResponse = TopicView_1.TopicView.viewTopic(topic);
                        res = { message: "Topico criado com sucesso", type: "success", body: topicResponse };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 10:
                        error_3 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    TopicController.listTopics = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, _d, full, isFullListing, topicRepository, topics, topicsResponse, res, error_4, res;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = request.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.full, full = _d === void 0 ? false : _d;
                        isFullListing = full.toString() === "true";
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, topicRepository.listTopics(Number(page), Number(limit), isFullListing)];
                    case 2:
                        topics = _e.sent();
                        topicsResponse = TopicView_1.TopicView.viewTopics(topics);
                        res = { message: isFullListing ? "Lista de todos os topicos" : "Topicos em aberto", type: "success", body: topicsResponse };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 3:
                        error_4 = _e.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TopicController.registerVote = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, topicId, typeVote, user, topic, schemaValidation, error_5, res, topicRepository, res, res, res, error_6, res, queryRunnerTransaction, voteRecord, voteRecordResponse, res, error_7, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, userId = _a.userId, topicId = _a.topicId, typeVote = _a.typeVote;
                        schemaValidation = Yup.object().shape({
                            userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
                            topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido"),
                            typeVote: Yup.boolean().required("O tipo de voto é obrigatorio")
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schemaValidation.validate({ userId: userId, topicId: topicId, typeVote: typeVote }, {
                                abortEarly: false
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        res = { message: "Erro de validação", type: "error validation", errors: error_5.errors };
                        return [2 /*return*/, response.status(403).json(res)];
                    case 4:
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 9, , 10]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(UserRepository_1.UserRepository).findOne(userId)];
                    case 6:
                        user = _b.sent();
                        if (!user) {
                            res = { message: "Usuario não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [4 /*yield*/, topicRepository.findOne(topicId)];
                    case 7:
                        topic = _b.sent();
                        if (!topic) {
                            res = { message: "Topico não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [4 /*yield*/, topicRepository.topicAlreadyVoted(topic, user)];
                    case 8:
                        if (_b.sent()) {
                            res = { message: "Usuario já voltou nesse topico", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_6 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 10:
                        queryRunnerTransaction = (0, typeorm_1.getConnection)().createQueryRunner();
                        return [4 /*yield*/, queryRunnerTransaction.startTransaction()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        _b.trys.push([12, 15, 17, 19]);
                        topicRepository.insertVote(typeVote, topicId);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(VoteRecordRepository_1.VoteRecordRepository).registerRecord(typeVote, user, topic)];
                    case 13:
                        voteRecord = _b.sent();
                        voteRecordResponse = VoteRecordView_1.VoteRecordView.viewVoteRecord(voteRecord);
                        return [4 /*yield*/, queryRunnerTransaction.commitTransaction()];
                    case 14:
                        _b.sent();
                        res = { message: "Voto registrado com sucesso", type: "success", body: voteRecordResponse };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 15:
                        error_7 = _b.sent();
                        return [4 /*yield*/, queryRunnerTransaction.rollbackTransaction()];
                    case 16:
                        _b.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 17: return [4 /*yield*/, queryRunnerTransaction.release()];
                    case 18:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    TopicController.findTopic = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var topicId, schemaValidation, res, topic, res_1, topicResponse, res, error_8, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topicId = request.params.topicId;
                        schemaValidation = Yup.string().uuid();
                        return [4 /*yield*/, schemaValidation.isValid(topicId)];
                    case 1:
                        if (!(_a.sent())) {
                            res = { message: "Erro de validação, topico não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository).findOneTopic(topicId)];
                    case 3:
                        topic = _a.sent();
                        if (!topic) {
                            res_1 = { message: "Nenhum topico encontrado", type: "success", body: {} };
                            return [2 /*return*/, response.status(200).json(res_1)];
                        }
                        topicResponse = TopicView_1.TopicView.viewTopic(topic);
                        res = { message: "Topico encontrado", type: "success", body: topicResponse };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 4:
                        error_8 = _a.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TopicController.closeTopic = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, topicId, userId, schemaValidation, error_9, res, topicRepository, res_2, res, error_10, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, topicId = _a.topicId, userId = _a.userId;
                        schemaValidation = Yup.object().shape({
                            userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
                            topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido")
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schemaValidation.validate({ userId: userId, topicId: topicId }, {
                                abortEarly: false
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _b.sent();
                        res = { message: "Erro de validação", type: "error validation", errors: error_9.errors };
                        return [2 /*return*/, response.status(403).json(res)];
                    case 4:
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, topicRepository.userIsOwnerTopic(topicId, userId)];
                    case 6:
                        if (!(_b.sent())) {
                            res_2 = { message: "Usuario não autorizado a fechar esse topico", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res_2)];
                        }
                        topicRepository.closeTopic(topicId);
                        res = { message: "Topico fechado com sucesso", type: "success", body: {} };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 7:
                        error_10 = _b.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TopicController.listTopicsByUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, _b, page, _c, limit, schemaValidation, res, topicRepository, user, res_3, topics, topicsResponse, res, error_11, res;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        userId = request.params.userId;
                        _a = request.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        schemaValidation = Yup.string().uuid();
                        return [4 /*yield*/, schemaValidation.isValid(userId)];
                    case 1:
                        if (!(_d.sent())) {
                            res = { message: "Erro de validação, usuario não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res)];
                        }
                        topicRepository = (0, typeorm_1.getConnection)().getCustomRepository(TopicRepository_1.TopicRepository);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, (0, typeorm_1.getConnection)().getCustomRepository(UserRepository_1.UserRepository).findOne(userId)];
                    case 3:
                        user = _d.sent();
                        if (!user) {
                            res_3 = { message: "Usuario não valido", type: "error validation" };
                            return [2 /*return*/, response.status(403).json(res_3)];
                        }
                        return [4 /*yield*/, topicRepository.listTopicsByUser(user, Number(page), Number(limit))];
                    case 4:
                        topics = _d.sent();
                        topicsResponse = TopicView_1.TopicView.viewTopics(topics);
                        res = { message: "Topicos buscados", type: "success", body: topicsResponse };
                        return [2 /*return*/, response.status(200).json(res)];
                    case 5:
                        error_11 = _d.sent();
                        res = { message: "Erro no servidor", type: "error server" };
                        return [2 /*return*/, response.status(500).json(res)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return TopicController;
}());
exports.TopicController = TopicController;
