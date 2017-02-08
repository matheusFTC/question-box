module.exports = function (app) {

    app.route("/mock/categories").get(function (req, res) {
        res.status(200).json([
            {
                "_id": {
                    "$oid": "589a5beda6b6cf2594bd270e"
                },
                "name": "Top Category",
                "isActive": true,
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "589a5c5ea6b6cf2594bd270f"
                },
                "name": "Subcategory One",
                "top": {
                    "$oid": "589a5beda6b6cf2594bd270e"
                },
                "isActive": true,
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "589a5efe28b140092010478b"
                },
                "name": "Subcategory Two",
                "top": {
                    "$oid": "589a5beda6b6cf2594bd270e"
                },
                "isActive": true,
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "589a5f0a28b140092010478c"
                },
                "name": "Subcategory Three",
                "top": {
                    "$oid": "589a5beda6b6cf2594bd270e"
                },
                "isActive": true,
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "589a5f1d28b140092010478d"
                },
                "name": "Subcategory Four",
                "top": {
                    "$oid": "589a5beda6b6cf2594bd270e"
                },
                "isActive": true,
                "__v": 0
            }
        ]);
    });
};