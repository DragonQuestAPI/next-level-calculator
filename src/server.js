const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs"); // File system
const path = require("path");
require("dotenv").config();

const pathMonstersJSON = path.join(__dirname, "/data/monsters.json");
const monsters = JSON.parse(fs.readFileSync(pathMonstersJSON).toString());

const pathHeroesJSON = path.join(__dirname, "/data/heroes.json");
const heroes = JSON.parse(fs.readFileSync(pathHeroesJSON).toString());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const getVocabulary = (lang) => {
	switch (lang) {
		case "en" :
			return {
				number : "N°",
				hp : "HP",
				mp : "MP",
				attack : "Attack",
				defense : "Defense",
				speed : "Agility",
				exp : "Experience",
				gold : "Gold",
				items : "Item",
				zone : "Localization",
				name : "Name",
				send : "Send"
			}
		case "fr" :
			return {
				number : "N°",
				hp : "PV",
				mp : "PM",
				attack : "Attaque",
				defense : "Défense",
				speed : "Agilité",
				exp : "Exp",
				gold : "Or",
				items : "Objet",
				zone : "Localisation",
				name : "Nom",
				send : "Envoyer"
			}
	}
}

app.get("/", (req, res) => {
	const lang = "en";
	res.status(200).render("index", {monsters, lang, vocabulary : getVocabulary(lang)});
});
app.post("/", (req, res) => {
	filteredMonsters = monsters.filter(monster => {
		return (monster.name[req.body.lang].toLowerCase()).includes((req.body.name).toLowerCase());
	});
	console.log(filteredMonsters);
	const lang = req.body.lang;
	res.status(200).render("index", {monsters : filteredMonsters, lang, vocabulary : getVocabulary(lang)});
})
// app.get("/heroes", (req, res) => {
//     res.render("heroes", {heroes});
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));