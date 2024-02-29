var qNo = document.getElementById("Qno");
var score = document.getElementById("score");
var buttons = document.querySelectorAll(".answer-card button");
var start = document.getElementById("start-btn");
var fScore = document.getElementById("final-score");
var startBox = document.getElementById("start-game");
var gameBox = document.getElementById("in-game");
var endBox = document.getElementById("end-game");
var progress = document.getElementById("progress");
var message = document.getElementById("message");
var Ranswer;

function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block"
    startBox.style.display = "none";
    endBox.style.display = "none";
    
}

function whenFinished() {
    console.log("Finished.")
    gameBox.style.display = "none"
    startBox.style.display = "none";
    endBox.style.display = "flex";
    lastmessage();
}

function nextQuestion() {
    progress.style.width = "100%";
    timed();
    fScore.innerHTML = score.innerHTML;
    if (qNo.innerText == "10") {
        whenFinished();
    }

    getOptions();
    getQNo();
}

function getOptions() {
    let options= ['שאג', 'האם', 'ו', 'תור,תפקיד', 'דוקטור', 'או', 'ארזים', 'ורדים','הוא','היא','יהודי','הלך','זאת','זה','ביתו','ביתה','ברח','שם-הדר','שם-יהודה','שם-ביאדר','ב','בדואי','דרוזי','דלת','אב','איזה','שם-רבאב','שם-אורי','מקרר','קור','אירופה','שם-ראדא','בית','דרוזים','שר','יד','ביקר','רדיו','שם-ודאד','שם-דאוד','נחל','שם-זיד','בגד','בית','ראיתי','שמן','דואר','מילת פנייה','שם-תאבת','שם-האדי','ריהוט','ריבונו של עולם','תות','התחיל','ביירות','הלכה','ברחה','אבא','שם-רות','רצה','אדיב','שם-יזיד','שם-ראזי','אני','אתה','את','בין','בן','ילדה','איפה','זיתים','פה','שם-אנוור','אוזן','שם-נורא','איראן','נתניה','נהריה','שם-הינד','שם-אהרון','תאנים','ל','משפחה','ארץ','לא','תל אביב','ירד','לבנון','לילה','לי','ילד','עיר','שם-דלאל','הורה','שלוש','ספטמבר','מאי','לבנוני','לה','לו','תלמיד','אימא','מנהל','מכתב','מלך','יום','אתם','אתן','הם','מה','מ','ממנו','ממנה','שם-אמל','שם-מרים','שם-איבראהים','היום','ירדן','הן','מאין','0','1','2','3','4','5','6','7','8','9','10','ספר','כלב','חנות','שם','סופר,פקיד','גדול','עזב','כתב','אכל','היה','לך','שם-זכי','כווית','שם-לינא','אני רוצה','בנק','קובה','קנדה','תורכיה','הייתה','תא מרבוטה','מחברת','טלפון','יפו','איך','בתוך','מי','טלוויזיה','שם-פהמי','שם-פוזיה','הבין','למי','כל','למה','עיר','ביקור','חשוב','באחד מהימים','מילה','מצוין','משרד'];
    let shuffledOptions = options.sort(() => Math.random() - 0.5).slice(0, 4);

    Ranswer = shuffledOptions[Math.floor(Math.random() * 4)];

    let imgSrc = `${Ranswer}.png`;

    document.getElementById("equation").innerHTML = `<img src="${imgSrc}">`;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = shuffledOptions[i];
    }
}

function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
}

function getScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width) + 10;
}

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
}

function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

function lastmessage() {
    clearInterval(t);
    if (fScore.innerText >= 800) {
        var emoji = "&#128525";
        message.innerHTML = "וואו!!! בלתי יאומן" + emoji;
    } else if (fScore.innerText >= 500) {
        var emoji = "&#128531";
        message.innerHTML = "כל כך קרוב" + emoji;
    } else if (fScore.innerText >= 100) {
        var emoji = "&#128549";
        message.innerHTML = "מקווים שבפעם הבאה יהיה יותר מוצלח" + emoji;
    } else {
        var emoji = "&#128577";
        message.innerHTML = "מזל רע" + emoji;
    }
}

function timed() {
    t = setInterval(() => {
        console.log(Ranswer)

        progress.style.width = (parseInt(progress.style.width) - 5) + "%";
        console.log(progress.style.width)
        if (parseInt(progress.style.width) <= 0) {
            clearInterval(t);
            nextQuestion();
        }
    }, 1000)
}

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        if (button.innerText == Ranswer) {
            doWhenCorrect(i);
        } else {
            doWhenIncorrect(i);
        }
        clearInterval(t);
        outro(i);
    });
});

start.addEventListener('click', () => {
    restart();
});
