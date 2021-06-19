"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var linked_list_models_1 = require("../models/linked-list-models");
var LinkedList = (function () {
    function LinkedList(equalsFn) {
        if (equalsFn === void 0) { equalsFn = util_1.defaultEquals; }
        this.equalsFn = equalsFn;
        this.count = 0;
    }
    LinkedList.prototype.push = function (element) {
        var node = new linked_list_models_1.Node(element);
        var current;
        if (this.head === undefined) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next !== undefined) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    };
    LinkedList.prototype.getElementAt = function (index) {
        if (index >= 0 && index < this.count) {
            var node = this.head;
            for (var i = 0; i < index; i++) {
                node = node === null || node === void 0 ? void 0 : node.next;
            }
            return node;
        }
        return undefined;
    };
    LinkedList.prototype.removeAt = function (index) {
        var _a;
        if (index >= 0 && index < this.count) {
            index = Math.floor(index);
            var current = this.head;
            if (index === 0) {
                this.head = (_a = this.head) === null || _a === void 0 ? void 0 : _a.next;
            }
            else {
                var previous = this.getElementAt(index - 1);
                previous.next = current === null || current === void 0 ? void 0 : current.next;
                this.count--;
                return current === null || current === void 0 ? void 0 : current.element;
            }
            return undefined;
        }
    };
    LinkedList.prototype.insert = function (element, index) {
        var node = new linked_list_models_1.Node(element);
        if (index >= 0 && index <= this.count) {
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            }
            else {
                var previous = this.getElementAt(index - 1);
                var current = previous === null || previous === void 0 ? void 0 : previous.next;
                node.next = current;
                previous.next = node;
                this.count++;
                return true;
            }
        }
        return false;
    };
    LinkedList.prototype.indexOf = function (element) {
        var current = this.head;
        for (var i = 0; i < this.count; i++) {
            if (this.equalsFn(element, this.getElementAt(i).element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    };
    LinkedList.prototype.remove = function (element) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    };
    Object.defineProperty(LinkedList.prototype, "size", {
        get: function () {
            return this.count;
        },
        enumerable: false,
        configurable: true
    });
    LinkedList.prototype.isEmpty = function () {
        return this.size === 0;
    };
    LinkedList.prototype.getHead = function () {
        return this.head;
    };
    LinkedList.prototype.toString = function () {
        if (this.head === undefined) {
            return '';
        }
        var objString = '' + this.head.element, current = this.head.next;
        while (current !== undefined) {
            objString += ',' + current.element;
            current = current.next;
        }
        return objString;
    };
    LinkedList.prototype.clear = function () {
        this.head = undefined;
        this.count = 0;
    };
    return LinkedList;
}());
exports.default = LinkedList;
//# sourceMappingURL=%E9%93%BE%E8%A1%A8.js.map