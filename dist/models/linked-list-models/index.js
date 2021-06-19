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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleNode = exports.Node = void 0;
var Node = (function () {
    function Node(element, next) {
        this.element = element;
        this.next = next;
    }
    return Node;
}());
exports.Node = Node;
var DoubleNode = (function (_super) {
    __extends(DoubleNode, _super);
    function DoubleNode(element, next, prev) {
        var _this = _super.call(this, element, next) || this;
        _this.element = element;
        _this.next = next;
        _this.prev = prev;
        return _this;
    }
    return DoubleNode;
}(Node));
exports.DoubleNode = DoubleNode;
//# sourceMappingURL=index.js.map