Range = function(min, max, dist) {
    this.min = min || 0;
    this.max = max || 0;
    this.dist = dist || "uniform";
    this.type = "range";
}