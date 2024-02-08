module.exports = {
    async up(db, client) {
        await db
            .collection("users")
            .insertMany([
                { userName: "test", premiumUser: true, password: "test" },
                { userName: "test2", premiumUser: true, password: "test2" }

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
