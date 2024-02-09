module.exports = {
    async up(db, client) {
        await db
            .collection("users")
            .insertMany([
                { userName: "test", premiumUser: true, password: "test" }

            ]);
    },

    async down(db, client) {
        await db.collection("users").deleteMany({
            userName: {
                $in: ["test"],
            },
        });
    },
};
