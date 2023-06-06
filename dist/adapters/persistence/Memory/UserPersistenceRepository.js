"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPersistenceRepository = void 0;
const typedi_1 = require("typedi");
const constants_1 = require("../../../constants");
const Users = [
    {
        id: "1",
        name: "User1",
        email: "email1",
        subscribed: [constants_1.MESSAGE_CATEGORIES.FINANCE],
        phone: "phone1",
        channels: [constants_1.NOTIFICATION_TYPES.EMAIL, constants_1.NOTIFICATION_TYPES.PUSH, constants_1.NOTIFICATION_TYPES.SMS],
    },
    {
        id: "2",
        name: "User2",
        email: "email2",
        subscribed: [constants_1.MESSAGE_CATEGORIES.MOVIES],
        phone: "phone2",
        channels: [constants_1.NOTIFICATION_TYPES.PUSH, constants_1.NOTIFICATION_TYPES.SMS],
    },
    {
        id: "3",
        name: "User3",
        email: "email3",
        subscribed: [constants_1.MESSAGE_CATEGORIES.SPORTS],
        phone: "phone3",
        channels: [constants_1.NOTIFICATION_TYPES.EMAIL, constants_1.NOTIFICATION_TYPES.SMS],
    },
    {
        id: "3",
        name: "User3",
        email: "email3",
        subscribed: [constants_1.MESSAGE_CATEGORIES.SPORTS, constants_1.MESSAGE_CATEGORIES.FINANCE, constants_1.MESSAGE_CATEGORIES.MOVIES],
        phone: "phone3",
        channels: [constants_1.NOTIFICATION_TYPES.EMAIL, constants_1.NOTIFICATION_TYPES.PUSH, constants_1.NOTIFICATION_TYPES.SMS],
    }
];
let UserPersistenceRepository = exports.UserPersistenceRepository = class UserPersistenceRepository {
    getUsersByCategory(category) {
        return Users.filter(u => u.subscribed.includes(category));
    }
    getUserById(id) {
        console.log('getUserById', id);
        return Users.find(u => u.id === id);
    }
};
exports.UserPersistenceRepository = UserPersistenceRepository = __decorate([
    (0, typedi_1.Service)()
], UserPersistenceRepository);
//# sourceMappingURL=UserPersistenceRepository.js.map