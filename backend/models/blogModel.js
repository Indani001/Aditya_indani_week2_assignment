const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/database.sqlite');

// Create the blogs table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
});

const Blog = {
    getAll: (callback) => {
        db.all("SELECT * FROM blogs", [], callback);
    },
    create: (blog, callback) => {
        const { title, content } = blog;
        db.run("INSERT INTO blogs (title, content) VALUES (?, ?)", [title, content], function (err) {
            callback(err, this.lastID);
        });
    },
    update: (id, blog, callback) => {
        const { title, content } = blog;
        db.run("UPDATE blogs SET title = ?, content = ? WHERE id = ?", [title, content, id], callback);
    },
    delete: (id, callback) => {
        db.run("DELETE FROM blogs WHERE id = ?", [id], callback);
    }
};

module.exports = Blog;
