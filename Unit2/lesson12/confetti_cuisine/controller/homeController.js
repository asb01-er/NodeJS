exports.showCourses = (req,res) => {
    res.render("courses");
};
exports.showSignUp = (req, res) => {
    res.render("contacts");
};
exports.postedSignUpForm = (req,res) => {
    res.render("thanks");
};
exports.showCourses = (req, res) => {
    res.render("courses", {
        offeredCourses: courses
    });
};