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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.NotificationService = void 0;
const typedi_1 = require("typedi");
const NotificationPersistenceRepository_1 = require("../../adapters/persistence/fs/NotificationPersistenceRepository");
const PushNotificationRepository_1 = require("../../adapters/notifications/push/PushNotificationRepository");
const EmailNotificationRepository_1 = require("../../adapters/notifications/email/EmailNotificationRepository");
const SMSNotificationRepository_1 = require("../../adapters/notifications/sms/SMSNotificationRepository");
const constants_1 = require("../../constants");
let NotificationService = exports.NotificationService = class NotificationService {
    constructor(notificationPersistenceRepository, pushSenderRepository, smsSenderRepository, emailSenderRepository) {
        this.notificationPersistenceRepository = notificationPersistenceRepository;
        this.pushSenderRepository = pushSenderRepository;
        this.emailSenderRepository = emailSenderRepository;
        this.smsSenderRepository = smsSenderRepository;
    }
    sendMessage(message, toUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = [];
                const emailUsers = [];
                const smsUsers = [];
                const pushUsers = [];
                console.log("toUsers", toUsers);
                toUsers.forEach((user) => {
                    if (user.channels.includes(constants_1.NOTIFICATION_TYPES.EMAIL))
                        emailUsers.push(user);
                    if (user.channels.includes(constants_1.NOTIFICATION_TYPES.SMS))
                        smsUsers.push(user);
                    if (user.channels.includes(constants_1.NOTIFICATION_TYPES.PUSH))
                        pushUsers.push(user);
                });
                if (emailUsers.length)
                    promises.push(this.emailSenderRepository.sendNotification(message, emailUsers));
                if (smsUsers.length)
                    promises.push(this.smsSenderRepository.sendNotification(message, smsUsers));
                if (pushUsers.length)
                    promises.push(this.pushSenderRepository.sendNotification(message, pushUsers));
                promises.push(this.notificationPersistenceRepository.createNotification(message, toUsers));
                yield Promise.allSettled(promises);
                return true;
            }
            catch (error) {
                //code some error handler
                console.log("error", error);
                return error;
            }
        });
    }
    getLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logs = yield this.notificationPersistenceRepository.getLogs();
                return logs;
            }
            catch (error) {
                //code some error handler
                console.log("error", error);
                return error;
            }
        });
    }
};
exports.NotificationService = NotificationService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __param(1, (0, typedi_1.Inject)()),
    __param(2, (0, typedi_1.Inject)()),
    __param(3, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [NotificationPersistenceRepository_1.NotificationPersistenceRepository,
        PushNotificationRepository_1.PushNotificationsRepository,
        SMSNotificationRepository_1.SMSNotificationsRepository,
        EmailNotificationRepository_1.EmailNotificationsRepository])
], NotificationService);
//# sourceMappingURL=NotificationService.js.map