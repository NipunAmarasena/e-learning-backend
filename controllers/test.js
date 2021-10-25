exports.testget = (req, res, next)=> {
    res.status(200).json({
        data: 'ok'
    });
};