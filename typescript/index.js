var Knight = (function () {
    function Knight(position) {
    }
    return Knight;
}());
var Board;
(function (Board) {
    var Position = (function () {
        function Position(horizontal, vertical) {
            this.horizontal = horizontal;
            this.vertical = vertical;
        }
        return Position;
    }());
    Board.Position = Position;
})(Board || (Board = {}));
