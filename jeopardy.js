const baseURL = 'http://jservice.io/api/';
const numOfCategories = 6;
const numOfClues = 5;
let categories = [];

async function getCategoryIds() {
  const res = await axios.get(`${baseURL}categories`, {
    params: { count: 100 }
  });
  let catIDs = res.data.map(c => c.id);

  const newArray = [];
  let length = catIDs.length;

  if (numOfCategories > length) {
    throw new Error("Sample size too large");
  }

  for (let i = 0; i < numOfCategories; i++) {
    const randomIdx = Math.floor(Math.random() * length);
    newArray.push(catIDs[randomIdx]);
    catIDs.splice(randomIdx, 1);
    length--;
  }

  return newArray;
}

async function getCategory() {
  let finalArray = await getCategoryIds();
  let catArray = [];
  let catArray2 = [];
  let catArray3 = [];

  for (const categoryID of finalArray) {
    let response = await axios.get(`${baseURL}category`, {
      params: { id: categoryID }
    });
    const cat = response.data.title;
    const clues = response.data.clues;

    const questions = clues.slice(0, numOfClues).map(clue => clue.question);
    const answers = clues.slice(0, numOfClues).map(clue => clue.answer);

    catArray.push(cat);
    catArray2.push(questions);
    catArray3.push(answers);
  }

  return {
    categories: catArray,
    questions: catArray2,
    answers: catArray3
  };
}

async function fillTable() {
  showLoadingView();
    const data = await getCategory();
    const categories = data.categories;
    const questions = data.questions;
    const answers = data.answers;

    const tableHead = document.querySelector('thead');
    const tableBody = document.querySelector('tbody');

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const category of categories) {
      const headCat = document.createElement("th");
      headCat.textContent = category;
      tableHead.querySelector('tr').appendChild(headCat);
    }

    for (let i = 0; i < numOfClues; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < numOfCategories; j++) {
        const cell = document.createElement('td');
        cell.textContent = questions[j][i];
        cell.setAttribute('data-answer', answers[j][i])
        cell.addEventListener('click', revealAnswer)
        row.appendChild(cell)
      }
      tableBody.appendChild(row);
    }
    hideLoadingView()
}


function revealAnswer(e) {
  const cell = e.target;
  const answer = cell.getAttribute('data-answer');
  cell.textContent = answer;

  cell.removeEventListener('click', revealAnswer);
}

function showLoadingView(){
  $("#jeopardy thead").empty();
  $("#jeopardy tbody").empty();

  $("#spin-container").show();
  $("#start").addClass("disabled").text('loading...')
}

function hideLoadingView() {
    $("#start").removeClass("disabled").text("Restart!");
    $("#spin-container").hide()
}

async function setupAndStart()  {
    let isLoading = $("#start").text() === "Loading...";
    if (!isLoading) {
      showLoadingView()

      let catIDs = await getCategoryIds()
      categories = []

      for (let catID of catIDs){
        categories.push(await getCategory(catID));
      }
      fillTable()
    }
} 



document.getElementById('start').addEventListener('click', fillTable);


// function showLoadingView() {

// }

// /** Remove the loading spinner and update the button used to fetch data. */






// function revealAnswer(e) {
//   let $tgt = $(e.target);
//   let id = $tgt.attr("id")
//   let [catId,clueId] = id.split("-");
//   let clue = categories[catId].clues[clueId]

//   let msg

//   if (!clue.showing) {
//     msg = clue.question;
//     clue.showing = 'question';
//   } else if (clue.showing === "question") {
//     msg = clue.answer;
//     clue.showing = 'answer';
//     $tgt.addClass("disabled")
//   } else {
//     return
//   }
//     $tgt.html(msg)
// }
