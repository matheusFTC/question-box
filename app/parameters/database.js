module.exports = function () {
    return {
        url: "mongodb://ds145289.mlab.com:45289/question-box"
        , options: {
            server: { poolSize: 5 }
            , user: "qbuser"
            , pass: "qbpassword"
        }
    };
};