const _ = require('lodash')
import _ from 'lodash'
const baseURL = 'http://jservice.io/api/';
const numOfCategories = 6;
const numOfClues = 5;
let categories = [];

const $game = $("#game");
const $board = $("#board");

// const count = 6
// const offset = Math.floor(Math.random() * 100)
// const catagoryURL =  `http://jservice.io/api/categories?count=${count}&offset=${offset}`
// const response = await axios.get(APIurl)
// const categories = response.data

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


async function test(){
    const count = 6
    const offset = Math.floor(Math.random() * 100)
    const catagoryURL =  `http://jservice.io/api/categories?count=${count}&offset=${offset}`
    const clueURL =  `http://jservice.io/api/clues?count=${count}&offset=${offset}`
    const catResponse = await axios.get(catagoryURL)
    const clueResponse = await axios.get(clueURL)
    const categories = catResponse.data
    const clues = clueResponse.data
    console.log(clues)
    console.log(categories)

    // categories.forEach(category => {
    //     console.log(category)
    // })
}



async function getCategoryIds() {
    const res = await axios.get(`${baseURL}categories`, {
        params: {count:100}
    })
    let catIDs = res.data.map(c => c.id);
    return sampleSize(catIDs, numOfCategories)
}

async function getCategory(catId) {
    let response = await axios.get(`${baseURL}categories`, {
        params: { id:catId }
    })
    let cat = response.data;
    let randomClues = sampleSize(cat.clues, numOfClues).map(c => ({
        question: c.question,
        answer: c.answer,
        showing: null
    }))
    return {title:cat.title, clues:randomClues}
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

$("div").on("click", async function fillTable(e) {
    e.preventDefault();

    const count = 6
    const offset = Math.floor(Math.random() * 100)
    const catagoryURL =  `http://jservice.io/api/categories?count=${count}&offset=${offset}`
    const response = await axios.get(catagoryURL)
    const categories = response.data

    categories.forEach(category => {
        console.log(category)
    })
})

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO