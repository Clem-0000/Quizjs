const yourQuestionsData = [
    {
        question: "Quel langage de programmation a été créé par Dennis Ritchie en 1972?",
        choices: ["COBOL", "C", "Python", "Langage des Schtroumpfs"],
        correctAnswerIndex: 1,
    },
    {
        question: "Quel est le nom du premier ordinateur électronique, construit en 1946?",
        choices: ["ENIAC", "EDVAC", "UNIVAC", "Terminator"],
        correctAnswerIndex: 0,
    },
    {
        question: "Qu'est-ce que l'algorithme de recherche Google?",
        choices: ["PageRank", "GoogleBot", "Bing", "Jus de cerveau"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel langage de programmation a été créé par Yukihiro Matsumoto?",
        choices: ["Ruby", "JavaScript", "Python", "Java"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel système d'exploitation a été développé par Linus Torvalds?",
        choices: ["Windows", "macOS", "Android", "Linux"],
        correctAnswerIndex: 3,
    },
    {
        question: "Quel est le protocole utilisé pour transférer des fichiers sur le web?",
        choices: ["HTTP", "FTP", "SMTP", "Protocole de transfert de pizzas"],
        correctAnswerIndex: 1,
    },
    {
        question: "Quelle est la principale utilisation du langage de programmation SQL?",
        choices: ["Gestion de base de données", "Développement web", "Calcul scientifique", "Rédaction de romans"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quelle entreprise a développé le langage de programmation Java?",
        choices: ["Microsoft", "Apple", "Sun Microsystems", "Pieds Nickelés Inc."],
        correctAnswerIndex: 2,
    },
    {
        question: "Quelle est la principale différence entre IPv4 et IPv6?",
        choices: ["Taille de l'adresse IP", "Vitesse de connexion", "Sécurité", "Goût de la pizza"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel est le nom du superordinateur développé par IBM qui a joué au jeu 'Jeopardy!'?",
        choices: ["Deep Blue", "Watson", "AlphaGo", "Super Skynet"],
        correctAnswerIndex: 1,
    },
    {
        question: "Quelle est la principale utilisation du langage de programmation R?",
        choices: ["Développement web", "Calcul scientifique", "Intelligence artificielle", "Création de memes"],
        correctAnswerIndex: 1,
    },
    {
        question: "Quel est le nom du langage de balisage utilisé pour structurer le contenu d'une page web?",
        choices: ["HTML", "CSS", "JavaScript", "Gâteau au chocolat"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel est le nom de l'unité de mesure de la capacité de stockage des disques durs?",
        choices: ["Byte", "Bit", "Nibble", "Croissant"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quelle technologie est utilisée pour créer des images 3D dans les navigateurs web?",
        choices: ["WebGL", "HTML5", "CSS3", "Peinture à l'huile"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel est le nom de l'inventeur de la machine à écrire?",
        choices: ["Christopher Latham Sholes", "Charles Babbage", "Herman Hollerith", "Chapelier Fou"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quelle est la vitesse de la lumière dans la fibre optique?",
        choices: ["300 000 km/s", "225 000 km/s", "200 000 km/s", "1 escargot/s"],
        correctAnswerIndex: 1,
    },
    {
        question: "Quel est le nom du format d'image sans perte de qualité?",
        choices: ["JPEG", "GIF", "PNG", "Format dinosaure"],
        correctAnswerIndex: 2,
    },
    {
        question: "Quel est le nom du célèbre test d'intelligence artificielle proposé par Alan Turing?",
        choices: ["Le test de Turing", "Le test de Farnsworth", "Le test de Voight-Kampff", "Le test des petits pois"],
        correctAnswerIndex: 0,
    },
    {
        question: "Quel est le nom du réseau de neurones développé par Google pour la reconnaissance d'image?",
        choices: ["Inception", "ResNet", "VGG", "PicassoNet"],
        correctAnswerIndex: 0,
    },
    {
        question: "Qui est le fondateur de l'entreprise SpaceX?",
        choices: ["Jeff Bezos", "Richard Branson", "Elon Musk", "Buzz l'Éclair"],
        correctAnswerIndex: 2,
    }
];

let score = 0;
let numberQuestion = 0;
let selectedResponse = null;

const startButton = document.querySelector("#start");
const app = document.querySelector("#app");

startButton.addEventListener("click", () => {
    displayQuiz();
})

const displayQuestion = (content) => {
    const question = document.createElement('h3');
    question.textContent = content;
    app.appendChild(question);
}
const handleReponseClick = (index) => {
    selectedResponse = index;

    // réponse sélectionné donc on peut autoriser l'utilisateur à valider sa réponse
    const buttonNext = document.querySelector("#next");
    buttonNext.disabled = false;

    // Réinitialise le style de toutes les réponses
    const reponses = document.querySelectorAll('.reponse');
    reponses.forEach((reponse, i) => {
        reponse.classList.remove('reponseClick');
        if (i === selectedResponse) {
            reponse.classList.add('reponseClick');
        }
    });
}

const displayReponse = (content, index) => {
    const reponse = document.createElement('div');
    reponse.className = "reponse";
    reponse.id = `reponse_${index}`;
    reponse.textContent = content;
    reponse.addEventListener('click', () => handleReponseClick(index));
    app.appendChild(reponse);
}

const displayDynamicHr = () => {
    // contain both empty hr and dynamic hr and set the position for both hr
    const divHr = document.createElement('div');
    divHr.className = "dynamicHr";

    const emptyHr = document.createElement('div');
    emptyHr.className = "progress-empty";
    divHr.appendChild(emptyHr);

    const dynamicHr = document.createElement('div');
    dynamicHr.className = "progress-filled";
    const percentProgress = numberQuestion * 5;
    dynamicHr.style.width = `${percentProgress}%`;
    dynamicHr.id = "progressFilled";
    divHr.appendChild(dynamicHr);

    app.appendChild(divHr);
}

const displayQuiz = () => {
    // reset la vue et initialise la réponse à afficher
    app.innerHTML = '';
    let dataQuestion = yourQuestionsData[numberQuestion];
   displayDynamicHr();

    if (numberQuestion <= yourQuestionsData.length) {
        // display question
        displayQuestion(dataQuestion.question)

        // parcourir les questions
        dataQuestion.choices.map((choice, index) => {
            displayReponse(choice, index);
        })

        const buttonConfirm = document.createElement("button");
        buttonConfirm.id = "next";
        buttonConfirm.className = "buttonStyle";
        buttonConfirm.disabled = true;
        buttonConfirm.innerText = "valider";
        app.appendChild(buttonConfirm);

        const buttonNext = document.querySelector("#next");

        buttonNext.addEventListener("click", () => {
            validerReponse(dataQuestion.correctAnswerIndex);
        })
    }
    console.log(numberQuestion, yourQuestionsData.length)

}

const validerReponse = (correctAnswer) => {
    const selectedButton = document.querySelector(`#reponse_${selectedResponse}`);

    if (selectedResponse === correctAnswer) {
        selectedButton.style.backgroundColor = "#95d5b2";
    } else {
        const correctAnswerToDisplay = document.querySelector(`#reponse_${correctAnswer}`);
        selectedButton.style.backgroundColor = "#efb8d2";
        correctAnswerToDisplay.style.backgroundColor = "#95d5b2";
    }


    const buttonNext = document.querySelector(".buttonStyle");
    buttonNext.innerText = "Question suivante";

    buttonNext.addEventListener("click", () => {
        if (selectedResponse === correctAnswer) {
            score += 1
        }
        nextQuestion();
    });
}

const nextQuestion = () => {
    numberQuestion += 1;
    if (numberQuestion >= yourQuestionsData.length) {
        displayResultat();
    } else {
        displayQuiz();
    }
}

const displayResultat = () => {
    app.innerHTML = '';

    const fullHr = document.createElement("hr");
    fullHr.className="startHr"

    const title = document.createElement("h3");
    title.innerText = "Bravo ! Tu as terminé le quiz.";

    const scoreElement = document.createElement('p');
    scoreElement.innerText = `tu as eu ${score} sur ${numberQuestion}`;

    app.appendChild(fullHr)
    app.appendChild(title);
    app.appendChild(scoreElement);
    score = 0;
    numberQuestion = 0;
}
