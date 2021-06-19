"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require("./\u94FE\u8868"));
var linked_list_models_1 = require("../models/linked-list-models");
var util_1 = require("../util");
var DoubleLinkedLike = (function (_super) {
    __extends(DoubleLinkedLike, _super);
    function DoubleLinkedLike(equalsFn) {
        if (equalsFn === void 0) { equalsFn = util_1.defaultEquals; }
        var _this = _super.call(this, equalsFn) || this;
        _this.equalsFn = equalsFn;
        return _this;
    }
    DoubleLinkedLike.prototype.push = function (element) {
        var node = new linked_list_models_1.DoubleNode(element);
        if (this.size === 0) {
            this.head = node;
            this.footer = node;
        }
        else {
            this.footer.next = node;
            node.prev = this.footer;
            this.footer = node;
        }
        this.count++;
    };
    DoubleLinkedLike.prototype.insert = function (element, index) {
        if (index >= 0 && index <= this.size) {
            var node = new linked_list_models_1.DoubleNode(element);
            if (index === 0) {
                if (this.size === 0) {
                    this.push(element);
                }
                else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                    this.count++;
                }
            }
            else if (index === this.size) {
                this.push(element);
            }
            else {
                var previous = this.getElementAt(index - 1);
                node.next = previous.next;
                node.prev = previous;
                previous.next.prev = node;
                previous.next = node;
                this.count++;
            }
            return true;
        }
        return false;
    };
    DoubleLinkedLike.prototype.removeAt = function (index) {
        var current = this.head;
        if (index >= 0 && index < this.size) {
            if (index === 0) {
                if (this.size === 1) {
                    this.head = undefined;
                    this.footer = undefined;
                }
                else {
                    this.head = this.head.next;
                    this.head.prev = undefined;
                }
            }
            else if (index === this.size - 1) {
                current = this.footer;
                this.footer = this.footer.prev;
                this.footer.next = undefined;
            }
            else {
                current = this.getElementAt(index);
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    };
    DoubleLinkedLike.prototype.getFooter = function () {
        return this.footer;
    };
    DoubleLinkedLike.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.footer = undefined;
    };
    DoubleLinkedLike.prototype.inverseToString = function () {
        if (this.footer === undefined) {
            return '';
        }
        var objString = '' + this.footer.element;
        var previous = this.footer.prev;
        while (previous !== undefined) {
            objString += (',' + previous.element);
            previous = previous.prev;
        }
        return objString;
    };
    return DoubleLinkedLike;
}(__1.default));
exports.default = DoubleLinkedLike;
//# sourceMappingURL=%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8.js.map