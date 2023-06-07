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
exports.NotificationPersistenceRepository = void 0;
const typedi_1 = require("typedi");
const fs = require("fs");
let NotificationPersistenceRepository = exports.NotificationPersistenceRepository = class NotificationPersistenceRepository {
    constructor() {
        // Filename where datas are going to store
        this.filename = "datastore.json";
        try {
            fs.accessSync(this.filename);
        }
        catch (err) {
            // If file not exist
            // it is created with empty array
            fs.writeFileSync(this.filename, "[]");
        }
    }
    getLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonRecords = yield fs.promises.readFile(this.filename, {
                    encoding: "utf8",
                });
                const records = JSON.parse(jsonRecords);
                return records.sort((x, y) => {
                    return new Date(y.date).getTime() - new Date(x.date).getTime();
                });
            }
            catch (error) {
                return [];
            }
        });
    }
    createNotification(message, toUsers = []) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assign unique Id to each record
            // Read filecontents of the datastore
            const jsonRecords = yield fs.promises.readFile(this.filename, {
                encoding: "utf8",
            });
            // Parsing JSON records in JavaScript
            // object type records
            const objRecord = JSON.parse(jsonRecords);
            // Adding new record
            const notifSent = toUsers.map((user) => {
                const notification = Object.assign(Object.assign({}, message), { type: user.channels, fromUserEmail: user.email, fromUserId: user.id });
                objRecord.push(notification);
                return notification;
            });
            yield fs.promises.writeFile(this.filename, JSON.stringify(objRecord, null, 2));
            return notifSent;
        });
    }
};
exports.NotificationPersistenceRepository = NotificationPersistenceRepository = __decorate([
    (0, typedi_1.Service)({ global: true }),
    __metadata("design:paramtypes", [])
], NotificationPersistenceRepository);
//# sourceMappingURL=NotificationPersistenceRepository.js.map