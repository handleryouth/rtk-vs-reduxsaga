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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
let todos = [
    'NestJS',
    'GraphQL',
    'Apollo',
    'TypeScript',
    'React',
    'Redux',
    'React Query',
    'Angular',
    'Vue',
    'D3',
    'Svelte',
    'SolidJS',
    'NextJS',
    'AWS',
].map((text, index) => ({
    id: index + 1,
    text: `Learn ${text}`,
    active: true,
    done: false,
}));
let TodosController = class TodosController {
    constructor() { }
    async index() {
        return todos.filter(({ active }) => active);
    }
    async show(id) {
        return todos.find((todo) => todo.id === parseInt(id));
    }
    async create({ text }) {
        const todo = {
            id: todos.length + 1,
            text,
            active: true,
            done: false,
        };
        todos.push(todo);
        return todo;
    }
    async update(id, data) {
        todos = todos.map((todo) => todo.id === parseInt(id) ? Object.assign(Object.assign({}, todo), data) : todo);
        return data;
    }
    async destroy(id) {
        todos = todos.map((todo) => todo.id === parseInt(id) ? Object.assign(Object.assign({}, todo), { active: false }) : todo);
        return parseInt(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "destroy", null);
TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todo.controller.js.map