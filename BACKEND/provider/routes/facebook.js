const router = (passport, app) => {
	app.get("/auth/facebook", passport.authenticate("facebook"));
	app.get(
		"/auth/facebook/callback",
		passport.authenticate("facebook", {}),
		(req, res) => {
			res.redirect("/profile");
		}
	);
};
module.exports = router;