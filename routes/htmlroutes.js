// require path for sending HTML documents from public folder
var path = require("path");

module.exports = function(app) {
// Routes
    app.get("/savedArticles", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/htmls/savedArticles.html"));
    });
}
