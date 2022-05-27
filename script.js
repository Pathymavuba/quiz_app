const page = document.querySelector("html")
const form1 = document.getElementById("page1")
const form2 = document.getElementById("page2")
const form17 = document.getElementById("page17")
const btn_commencer = document.getElementById("btn-commencer")
const nom = document.getElementById("nom")
const email = document.getElementById("email")
let mssg = document.querySelectorAll(".avertissement")
let name_result = document.getElementById("name-result")
let email_result = document.getElementById("email-result")
let reponse1 = document.querySelector("#question1")
let reponse2 = document.getElementById("question2")
let reponse3 = document.getElementById("question3")
let reponse4 = document.querySelector("#question4")
let reaction_reponse = document.querySelectorAll(".form-check")
let reponse_choisie;
let max
let reussite;
let score_obtenu
let echec;
let score = document.querySelector(".score")
let symbole_resultat = document.querySelector("i")
let timer = document.querySelector("#timer")
let mouv = null
let all_radio = document.querySelectorAll(".form-check-input")
const btn_suivant = document.querySelector("#btn-suivant")
const btn_quitter = document.querySelector("#btn-quitter")
const son_check = new Audio("/checkson_sound.mp3")
const son_resultat = new Audio("/score_sound.mp3")
const sucess_resultat = new Audio("/success.mp3")

// creation du tableau des objets(contenus de pages)
let questions = [{
    id: 0, q: "quel est le type d'un fichier javascript?", nq: "1/15",
    rep: [{ text: ".ts", iscorect: false },   // iscorect est la valeur de la reponse
    { text: ".jsx", iscorect: false },
    { text: ".js", iscorect: true },
    { text: ".jv", iscorect: false }]
},
{
    id: 1, q: "quel est le fondateur de javascript?", nq: "2/15",
    rep: [{ text: "Brendan Eich", iscorect: true },
    { text: "Steve Jobs", iscorect: false },
    { text: "Mark Elliot Zuckerberg", iscorect: false },
    { text: "Ronald Wayne", iscorect: false }]
},
{
    id: 2, q: "En quelle annéé  javascript est créé?", nq: "3/15",
    rep: [{ text: "1985", iscorect: false },
    { text: "1996", iscorect: false },
    { text: "1990", iscorect: false },
    { text: "1995", iscorect: true }]
},
{
    id: 3, q: "Laquelle de ces syntaxes est correcte?", nq: "4/15",
    rep: [{ text: "if a <> 2 {}5", iscorect: false },
    { text: "if a != 2 {}", iscorect: false },
    { text: "if (a != 2) {}", iscorect: true },
    { text: "if (a <> 2) {}", iscorect: false }]
},
{
    id: 4, q: " Quel attribut des noeuds de l'arbre DOM correspond à l'attribut HTML class ?", nq: "5/15",
    rep: [{ text: "class", iscorect: false },
    { text: "listClass", iscorect: false },
    { text: "className", iscorect: true },
    { text: "CLASS", iscorect: false }]
},
{
    id: 5, q: " Quelle méthode n'existe pas dans le DOM ?", nq: "6/15",
    rep: [{ text: "document.getElementsByAttribute", iscorect: true },
    { text: "document.getElementById", iscorect: false },
    { text: "document.getElementsByClassName", iscorect: false },
    { text: "document.getElementsByTagName", iscorect: false }]
},
{
    id: 6, q: "la méthode pour comparer deux chaînes texte est ?", nq: "7/15",
    rep: [{ text: "charCodeAt()", iscorect: false },
    { text: "localeCompare()", iscorect: true },
    { text: "charAt()", iscorect: false },
    { text: "indexOf()", iscorect: false }]
},
{
    id: 7, q: "Quels sont les types de nombres définis en JavaScript ? ", nq: "8/15",
    rep: [{ text: "Number et Integer.", iscorect: false },
    { text: "Integer et Float.", iscorect: false },
    { text: "Number et Double.", iscorect: false },
    { text: "Number. ", iscorect: true }]
},
{
    id: 8, q: " Lequel de ces types d'événements n'existe pas ?", nq: "9/15",
    rep: [{ text: "blur ", iscorect: false },
    { text: " mouseclick ", iscorect: true },
    { text: " mouseout", iscorect: false },
    { text: "load ", iscorect: false }]
},
{
    id: 9, q: "Quelle syntaxe est correcte pour que la fonction init soit appelée au chargement de la page ? ", nq: "10/15",
    rep: [{ text: "window.onload = init;", iscorect: true },
    { text: "window.onload = init();", iscorect: false },
    { text: "window.onload() = init;", iscorect: false },
    { text: "window.onload() = init();", iscorect: false }]
},
{
    id: 10, q: "Peut-on accéder aux commentaires d'un document HTML ?", nq: "11/15",
    rep: [{ text: "Oui, avec Node.COMMENT_NODE ", iscorect: true },
    { text: "Oui, avec document.body.commentaries", iscorect: false },
    { text: "Non, ce n'est pas possible ", iscorect: false },
    { text: "Oui, avec node.nodeType évalué à 7;", iscorect: false }]
},
{
    id: 11, q: "for(; ; ) { ... } Que se passe-t-il avec cette instruction ?", nq: "12/15",
    rep: [{ text: " On obtient la valeur undefined", iscorect: false },
    { text: " On obtient la valeur null ", iscorect: false },
    { text: " Il ne se passe rien !", iscorect: false },
    { text: "Aucune bonne reponse", iscorect: true }]
},
{
    id: 12, q: "Lequel de ces codes n’affichera pas 3 ?", nq: "13/15",
    rep: [{ text: "alert(Math.max(-4, 3)", iscorect: false },
    { text: "aucune bonne reponse", iscorect: false },
    { text: "alert(Math.floor(2.9)", iscorect: true },
    { text: "var i = 3; alert(i++)", iscorect: false }]
},
{
    id: 13, q: "Dans une boucle, l'instruction continue permet de :", nq: "14/15",
    rep: [{ text: " supprimer toutes les variables globales.", iscorect: false },
    { text: "continuer l'exécution du code après la boucle.", iscorect: false },
    { text: "revenir au début de l'itération courante.", iscorect: false },
    { text: "passer à l'itération suivante.", iscorect: true }]
},
{
    id: 14, q: " var a = 12; iNum %= 2; A la suite de cette expression, a vaut:", nq: "15/15",
    rep: [{ text: "6", iscorect: false },
    { text: "0.12", iscorect: false },
    { text: " 14", iscorect: false },
    { text: " 0 ", iscorect: true }]
}]
let page2 = document.getElementById("page2")
let label1 = document.getElementById("lb_1")
let label2 = document.getElementById("lb_2")
let label3 = document.getElementById("lb_3")
let label4 = document.getElementById("lb_4")
let qst = document.getElementById("qst")
let n_qst = document.getElementById("n_qst")
let v1; let v2; let v3; let v4
// parcours de pages     

function parcours(id) {
    qst.textContent = questions[id].q;
    n_qst.textContent = questions[id].nq;
    label1.textContent = questions[id].rep[0].text;
    label2.textContent = questions[id].rep[1].text;
    label3.textContent = questions[id].rep[2].text;
    label4.textContent = questions[id].rep[3].text;

}
function inititalisationradio(){
    all_radio[0].checked = false
    all_radio[1].checked = false
    all_radio[2].checked = false
    all_radio[3].checked = false
}

//recuperation des reponses   
function radio_checked(id) {

    if (reponse1.checked == true) {
        reponse_choisie = questions[id].rep[0].iscorect

    }
    if (reponse2.checked == true) {
        reponse_choisie = questions[id].rep[1].iscorect
    }
    if (reponse3.checked == true) {
        reponse_choisie = questions[id].rep[2].iscorect
    }
    if (reponse4.checked == true) {
        reponse_choisie = questions[id].rep[3].iscorect
    }
        inititalisationradio()
    return reponse_choisie
}
//recuperation de l'id
function recuperation(){
    let monId;
    for (let i = 0 ; i < questions.length ; i++){
       if (label1.textContent == questions[i].rep[0].text){
        monId = questions[i].id
       }      
    }  
    return monId;  
}
// fonction progress and timer
function run() {
    if (mouv) {
        clearInterval(mouv)

    }
    let innerbar = document.querySelector(".innerbar")
    let counter = 60

    function ref() {
        counter--

        if (counter == -1) {
            clearInterval(mouv)
            if(id<15){
            let idParcours = recuperation ()
            parcours(idParcours+1) 
            if (document.querySelector('.form-check.valid')) {
                document.querySelector('.form-check.valid').classList.remove('valid');
            }  
            inititalisationradio()
            run() 
            id++
            }  
                     
            else {
                Affichage_resultat()
            }
           
        }

        else {
            console.log(counter)
            timer.textContent = counter;
            innerbar.style.width = counter * 1.6667 + "%"
        }

    }
    mouv = setInterval(ref, 1000)

}




btn_commencer.addEventListener("click", () => {

    // gestion de validation coté client
    // validation nom
    let position = email.value.indexOf("@gmail.com")
    let name = nom.value
    if (((nom.value == "")||(name.length <= 3))||((email.value == "")|| (position == -1)) ){
        nom.classList.add("error")
        mssg[0].style.display = "block"
        email.classList.add("error")
        mssg[1].style.display = "block"
    }
    else {
        form1.classList.add("disappear")
        form2.style.display = "block"
        run()
        parcours(0)
    }

})

// Au clic du radio button
for (let i = 0; i < 4; i++) {
 all_radio[i].addEventListener("change", () => {
     btn_suivant.disabled = false
     son_check.play()
   // reinitialisation de la bordure verte des radio
     if (document.querySelector('.form-check.valid')) {
            document.querySelector('.form-check.valid').classList.remove('valid');
        }  
     if (all_radio[i].checked == true) {
            reaction_reponse[i].classList.add("valid")
        }
    })
}

//Affichage de la page-resultat
function Affichage_resultat()
{
    form2.style.display = "none"
    form17.style.display = "block"
    name_result.textContent = nom.value
    email_result.textContent = email.value
    score.textContent = score_obtenu;
    

    if (reussite > echec) {
      sucess_resultat.play()
        symbole_resultat.classList.add("fa-regular", "fa-circle-check", "couleur_reussite")
    }
    else {
      son_resultat.play()
        symbole_resultat.classList.add("fa-regular", "fa-circle-xmark", "couleur_echec")
    }
}

id = 1;
reussite = 0;
max = 15;
btn_suivant.addEventListener("click", function (event) {
    // reinitialisation de la bordure verte des radio
    if (document.querySelector('.form-check.valid')) {
        document.querySelector('.form-check.valid').classList.remove('valid');
    }
    run()
    btn_suivant.disabled = true;
    if (id < 15) {
       
        radio_checked(id - 1)
        if (reponse_choisie == true) {
            reussite++
            echec = Math.abs(reussite - max)
            score_obtenu = reussite + "/15"
        }
        if (reponse_choisie == false) {
            score_obtenu = reussite + "/15"
        }
        parcours(id)
        id++;

    }

    else {
        
        Affichage_resultat()   
    }

})
// quitter et avoir le score

btn_quitter.addEventListener("click", () => {
    Affichage_resultat()
})

//revenir à la prémière page pour rejouer

const btn_accueil = document.getElementById("btn-accueil")
btn_accueil.addEventListener("click", () => {

    form17.style.display = "none"
    form2.style.display = "none"
    form1.style.display = "block"
    location.reload()
})


