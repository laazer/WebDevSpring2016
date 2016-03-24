String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function range(n) {
    return Array.apply(null, Array(n)).map(function (_, i) {return i;});
}