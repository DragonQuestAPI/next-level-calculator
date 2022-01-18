const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs"); // File system
const path = require("path");
require("dotenv").config();

const pathMonstersJSON = path.join(__dirname, "/data/monsters.json");
const monsters = JSON.parse(fs.readFileSync(pathMonstersJSON).toString());

// const pathHeroesJSON = path.join(__dirname, "/data/heroes.json");
// const heroes = JSON.parse(fs.readFileSync(pathHeroesJSON).toString());

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
				none : "None",
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
				none : "Aucun",
				zone : "Localisation",
				name : "Nom",
				send : "Envoyer"
			}
	}
}

app.get("/", (req, res) => {
	res.status(200).render("index", {
		monsters,
		lang : "en",
		prop : "id",
		order : "descending",
		vocabulary : getVocabulary("en")
	});
});
app.post("/", (req, res) => {
	const {lang, name, prop, order} = req.body;
	let filteredMonsters = monsters.filter(monster => (monster.name[lang].toLowerCase()).includes((name).toLowerCase()));

	const sortMonsters = (_prop, _order) => {
		if (_order === "descending") {
			filteredMonsters.sort((a, b) => (a[_prop] > b[_prop] ? -1 : 1));
		} else {
			filteredMonsters.sort((a, b) => (a[_prop] > b[_prop] ? 1 : -1));
		};
	};

	switch (prop) {
		case "name":
			if (order === "descending") {
				filteredMonsters.sort((a, b) => (a.name[lang] > b.name[lang] ? -1 : 1));
			} else {
				filteredMonsters.sort((a, b) => (a.name[lang] > b.name[lang] ? 1 : -1));
			}
			break;
		default:
			sortMonsters(prop, order);
	};

	res.status(200).render("index", {
		monsters : filteredMonsters,
		lang,
		prop,
		order,
		vocabulary : getVocabulary(lang)
	});
});
app.get("/calcul", (req, res) => {
	res.render("calcul");
});
// app.get("/heroes", (req, res) => {
//     res.render("heroes", {heroes});
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));