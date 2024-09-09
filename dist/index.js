"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ! We create an instance of an express app/server by calling this express function
const app = (0, express_1.default)();
const movieData = [
    { name: "Long Legs", id: 1 },
    { id: 2, name: "Notting Hill" },
    { id: 3, name: "Zombieland" }
];
// ! It helps us handle different ROUTES (pokemon.com/api/pikachu)
const router = express_1.default.Router();
// ! Getting all the movies. sample url /movies
router.route('/api/movies').get((req, res) => {
    res.send(movieData);
});
// ! getting an individual movie. sample url /movies/7
// ? :id lets us invent a wildcard(url param) so we can accept urls of the form
//        /api/movies/1 or /api/movies/2 or ...
//        (then req.params.id variable will contain the "2", e.g.)
router.route('/api/movies/:id').get((req, res) => {
    const incomingMovieID = Number(req.params.id);
    console.log("incoming movie ID is", incomingMovieID);
    let foundMovie = movieData.find((movieObj) => {
        return movieObj.id === incomingMovieID;
    });
    res.send(foundMovie);
});
// POST a movie to the server. sample url: POST /movies
// ? req.body is a variable that contains data submitted from the client
//   to our api server
router.route('/api/movies').post((req, res) => {
    console.log("user sent us a JSON", req.body);
    const submittedMovie = req.body;
    submittedMovie.id = movieData.length + 1; // a hack to always increment ids
    movieData.push(submittedMovie);
    //res.send(movieData)
    res.status(200).json(movieData);
});
// TODO: UPDATE a movie on srv. sample url: PUT /movies/7
// TODO: DELETE a movie on srv. sample url DELETE /movies/2
// ? use the router's .route() method, with another method called .get()
// ? req - a variable that contains useful information about the user's incoming REQUEST
// ? res - a variable that contains method to help us RESPOND to the user
router.route('/api/bulbasaur').get((req, res) => {
    res.send("Bulbasaur says Hello: ^ö^");
});
// just a demo of a catchall route to handle invalid requests
router.route('/*').get((req, res) => {
    res.send("404");
});
// ! To get POSTing to work, we need to add this line:
app.use(express_1.default.json());
// ? use the router we defined above, in our express app we created above
app.use(router);
// ! Our webserver needs to be running(listening) at all times -- otherwise you get downtime.
// ? first argument is a PORT number (typically 80 on production)
app.listen(8001, () => {
    console.log("Hey i'm running express! Yay. On localhost:8000");
});
