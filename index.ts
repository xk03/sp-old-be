import app from "./config/express";
import connection from "./config/database";

const PORT = 5000;

connection();

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
