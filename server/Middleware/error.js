const errormiddleare = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
      }
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ message });
}
module.exports = errormiddleare;