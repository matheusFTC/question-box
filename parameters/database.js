module.exports = function () {
    return {
        url: "mongodb://localhost/question-box"
        , options: {
            db: { native_parser: true }
            , server: { poolSize: 5 }
            , user: "qbuser"
            , pass: "qbpassword"
        }
    };
};