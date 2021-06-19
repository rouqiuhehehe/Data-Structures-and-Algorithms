"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require("./src/\u94FE\u8868"));
var ____1 = __importDefault(require("./src/\u53CC\u5411\u94FE\u8868"));
var linkedlist = new __1.default();
linkedlist.push(11);
linkedlist.push(20);
linkedlist.push(30);
linkedlist.insert(99, 3);
linkedlist.push({
    a: 1,
    b: function () { return 12; }
});
console.log(linkedlist.getElementAt(4));
console.log(linkedlist.toString());
console.log(linkedlist.size);
var doubleLinkedLike = new ____1.default();
doubleLinkedLike.push(1);
doubleLinkedLike.push(20);
doubleLinkedLike.push(5);
doubleLinkedLike.insert(35, 1);
console.log(doubleLinkedLike.inverseToString());
//# sourceMappingURL=index.js.map