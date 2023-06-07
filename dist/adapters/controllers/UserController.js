"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typedi_1 = require("typedi");
const UserService_1 = require("../../application/services/UserService");
let UserController = exports.UserController = class UserController {
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, message, category, phone } = req.body;
                const me = yield this.userService.getUserById(userId === null || userId === void 0 ? void 0 : userId.toString());
                if (me) {
                    const date = new Date();
                    const response = yield this.userService.sendMessage({
                        userId,
                        name: me === null || me === void 0 ? void 0 : me.name,
                        email: me.email,
                        message,
                        category: Number(category),
                        phone,
                        date,
                    });
                    // Send the response
                    return response
                        ? res.status(200).send("ok")
                        : res.status(500).send("Something was wrong, please try again later");
                }
                return res
                    .status(500)
                    .send("Something was wrong, please try again later");
            }
            catch (error) {
                console.log("error", error);
                return res
                    .status(500)
                    .send("Something was wrong, please try again later");
            }
        });
    }
    getLogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getLogs();
                return res.status(200).send(response);
            }
            catch (error) {
                console.log("error", error);
                return res
                    .status(500)
                    .send("Something was wrong, please try again later");
            }
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", UserService_1.UserService)
], UserController.prototype, "userService", void 0);
exports.UserController = UserController = __decorate([
    (0, typedi_1.Service)()
], UserController);
//# sourceMappingURL=UserController.js.map