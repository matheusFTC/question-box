module.exports = function () {
    return {
        url: "mongodb://ds141209.mlab.com:41209/question-box"
        , options: {
            server: { poolSize: 5 }
            , user: "qbuser"
            , pass: "qbpassword"
        }
    };
};