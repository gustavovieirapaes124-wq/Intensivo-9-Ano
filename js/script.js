// ==========================================
// INTENSIVO - SCRIPT PRINCIPAL
// ==========================================


// ==========================================
// ELEMENTOS
// ==========================================

const intro = document.getElementById("intro");
const site = document.getElementById("site");
const startBtn = document.getElementById("startBtn");

const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");
const editProfileBtn = document.getElementById("editProfileBtn");
const profileForm = document.getElementById("profileForm");

const profileName = document.getElementById("profileName");
const profileClass = document.getElementById("profileClass");
const profileGoals = document.getElementById("profileGoals");

const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");


// ==========================================
// INICIAR SITE
// ==========================================

startBtn.addEventListener("click", function () {

    intro.style.display = "none";

    site.classList.remove("hidden");

    document.body.style.overflowX = "hidden";

    const nomeSalvo = localStorage.getItem("intensivoNome");

    if (!nomeSalvo) {
        setTimeout(function () {
            profileModal.classList.remove("hidden");
        }, 400);
    }

    atualizarProgresso();

});


// ==========================================
// MODAL DO PERFIL
// ==========================================

editProfileBtn.addEventListener("click", function () {

    profileModal.classList.remove("hidden");

});


closeModal.addEventListener("click", function () {

    profileModal.classList.add("hidden");

});


profileModal.addEventListener("click", function (event) {

    if (event.target === profileModal) {
        profileModal.classList.add("hidden");
    }

});


// ==========================================
// SALVAR PERFIL
// ==========================================

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome =
        document.getElementById("nameInput").value.trim();

    const turma =
        document.getElementById("classInput").value;

    const objetivos =
        document.querySelectorAll(
            'input[name="goal"]:checked'
        );

    let listaObjetivos = [];

    objetivos.forEach(function (objetivo) {

        listaObjetivos.push(
            objetivo.value
        );

    });


    if (listaObjetivos.length === 0) {

        listaObjetivos.push(
            "Ainda estou decidindo"
        );

    }


    // Salvar no navegador

    localStorage.setItem(
        "intensivoNome",
        nome
    );

    localStorage.setItem(
        "intensivoTurma",
        turma
    );

    localStorage.setItem(
        "intensivoObjetivos",
        JSON.stringify(listaObjetivos)
    );


    atualizarPerfil();

    profileModal.classList.add("hidden");

    atualizarProgresso();

});


// ==========================================
// CARREGAR PERFIL
// ==========================================

function atualizarPerfil() {

    const nome =
        localStorage.getItem("intensivoNome");

    const turma =
        localStorage.getItem("intensivoTurma");

    const objetivos =
        JSON.parse(
            localStorage.getItem(
                "intensivoObjetivos"
            ) || "[]"
        );


    if (nome) {

        profileName.textContent = nome;

    }


    if (turma) {

        profileClass.textContent = turma;

    }


    profileGoals.innerHTML = "";


    objetivos.forEach(function (objetivo) {

        const span =
            document.createElement("span");

        span.textContent = objetivo;

        profileGoals.appendChild(span);

    });


    const welcomeTitle =
        document.getElementById("welcomeTitle");

    const welcomeText =
        document.getElementById("welcomeText");


    if (nome) {

        welcomeTitle.textContent =
            "Olá, " + nome + ".";

        welcomeText.textContent =
            "Sua jornada pelo Intensivo está pronta. Explore, aprenda e teste seus conhecimentos.";

    }

}


// Executar assim que a página carregar

atualizarPerfil();


// ==========================================
// CONTAGEM REGRESSIVA
// ==========================================

function atualizarContagem() {

    const destino =
        new Date(
            "December 6, 2026 08:00:00"
        ).getTime();


    const agora =
        new Date().getTime();


    const distancia =
        destino - agora;


    const dias =
        Math.floor(
            distancia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (distancia %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (distancia %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (distancia %
                (1000 * 60)) /
            1000
        );


    if (distancia <= 0) {

        document.getElementById("days")
            .textContent = "0";

        document.getElementById("hours")
            .textContent = "0";

        document.getElementById("minutes")
            .textContent = "0";

        document.getElementById("seconds")
            .textContent = "0";

        return;

    }


    document.getElementById("days")
        .textContent = dias;

    document.getElementById("hours")
        .textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(segundos).padStart(2, "0");

}


atualizarContagem();

setInterval(
    atualizarContagem,
    1000
);


// ==========================================
// JORNADA / ETAPAS
// ==========================================

const etapas =
    document.querySelectorAll(".etapa");

const stepContent =
    document.getElementById("stepContent");


const textosEtapas = [

    {
        titulo: "O que é um vestibulinho?",
        texto:
            "Vestibulinho é um processo seletivo utilizado por instituições de ensino para selecionar estudantes para determinadas vagas. Por isso, conhecer o formato da prova e estudar os conteúdos é uma ótima forma de se preparar."
    },

    {
        titulo: "Preparação",
        texto:
            "Uma boa preparação envolve revisar conteúdos, resolver questões, organizar o tempo e identificar os assuntos que precisam de mais atenção."
    },

    {
        titulo: "O processo",
        texto:
            "Depois da preparação vem o momento da prova. Leia as questões com atenção, controle o tempo e mantenha a calma para utilizar tudo aquilo que você estudou."
    }

];


function mostrarEtapa(numero) {

    etapas.forEach(function (etapa, index) {

        etapa.classList.toggle(
            "ativa",
            index === numero
        );

    });


    stepContent.innerHTML = `

        <h3>
            ${textosEtapas[numero].titulo}
        </h3>

        <p>
            ${textosEtapas[numero].texto}
        </p>

    `;

}


etapas.forEach(function (etapa) {

    etapa.addEventListener(
        "click",
        function () {

            const numero =
                Number(
                    etapa.dataset.step
                );

            mostrarEtapa(numero);

            atualizarProgresso();

        }
    );

});


mostrarEtapa(0);


// ==========================================
// CAMINHOS
// ==========================================

const caminhos =
    document.querySelectorAll(".caminho");

const pathInfo =
    document.getElementById("pathInfo");


const informacoesCaminhos = {

    "ETEC":
        "<strong>ETEC</strong><br><br>As Escolas Técnicas Estaduais oferecem cursos técnicos e diferentes possibilidades de formação para estudantes.",

    "Instituto Federal":
        "<strong>Instituto Federal</strong><br><br>Os Institutos Federais oferecem educação profissional, técnica e tecnológica em diferentes áreas.",

    "Escolas Técnicas":
        "<strong>Escolas Técnicas</strong><br><br>Existem diferentes instituições de ensino técnico. Pesquisar os cursos disponíveis pode ajudar você a descobrir qual caminho combina com seus objetivos."

};


caminhos.forEach(function (caminho) {

    caminho.addEventListener(
        "click",
        function () {

            const caminhoEscolhido =
                caminho.dataset.path;


            pathInfo.innerHTML =
                informacoesCaminhos[
                    caminhoEscolhido
                ];


            pathInfo.classList.remove(
                "hidden"
            );


            pathInfo.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            atualizarProgresso();

        }
    );

});


// ==========================================
// DESAFIOS POR MATÉRIA
// ==========================================

const materiaBotoes =
    document.querySelectorAll(
        ".materias button"
    );

const subjectChallenge =
    document.getElementById(
        "subjectChallenge"
    );


const desafios = {

    "Matemática": {

        pergunta:
            "Se uma prova possui 50 questões e um estudante acertou 40, qual porcentagem da prova ele acertou?",

        resposta:
            "80%"

    },


    "Português": {

        pergunta:
            "Na interpretação de um texto, qual é uma das atitudes mais importantes?",

        resposta:
            "Ler o texto com atenção e considerar o contexto."

    },


    "História": {

        pergunta:
            "Qual é a importância de estudar História?",

        resposta:
            "Compreender acontecimentos do passado e suas relações com o presente."

    },


    "Geografia": {

        pergunta:
            "O que a Geografia estuda?",

        resposta:
            "As relações entre sociedade, espaço e natureza."

    },


    "Ciências": {

        pergunta:
            "Por que o método científico é importante?",

        resposta:
            "Porque ajuda a investigar fenômenos de maneira organizada e baseada em evidências."

    }

};


materiaBotoes.forEach(function (botao) {

    botao.addEventListener(
        "click",
        function () {

            const materia =
                botao.dataset.subject;

            const desafio =
                desafios[materia];


            subjectChallenge.classList.remove(
                "hidden"
            );


            subjectChallenge.innerHTML = `

                <h3>
                    ${materia}
                </h3>

                <p>
                    ${desafio.pergunta}
                </p>

                <button
                    onclick="mostrarResposta('${materia}')">
                    MOSTRAR RESPOSTA
                </button>

                <div
                    id="respostaMateria"
                    style="margin-top:15px;">
                </div>

            `;


            subjectChallenge.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            atualizarProgresso();

        }
    );

});


function mostrarResposta(materia) {

    const resposta =
        desafios[materia].resposta;


    document.getElementById(
        "respostaMateria"
    ).innerHTML =

        "<strong>Resposta:</strong> " +
        resposta;

}


// ==========================================
// QUIZ - 10 QUESTÕES
// NÍVEL VESTIBULINHO
// ==========================================

const perguntas = [

    {
        pergunta:
            "Uma escola possui 240 alunos. Se 25% participam de um projeto, quantos alunos participam?",

        opcoes: [
            "40",
            "50",
            "60",
            "80"
        ],

        correta: 2
    },


    {
        pergunta:
            "Leia: 'Estudar exige dedicação, mas também organização.' Qual é a ideia principal da frase?",

        opcoes: [
            "Estudar não exige esforço.",
            "Organização e dedicação são importantes para estudar.",
            "Apenas organização é necessária.",
            "Estudar é impossível."
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual alternativa apresenta uma fonte de energia renovável?",

        opcoes: [
            "Carvão mineral",
            "Petróleo",
            "Energia solar",
            "Gás natural"
        ],

        correta: 2
    },


    {
        pergunta:
            "Se x + 15 = 32, qual é o valor de x?",

        opcoes: [
            "15",
            "17",
            "18",
            "20"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual foi uma das principais consequências da Revolução Industrial?",

        opcoes: [
            "Fim das cidades",
            "Desenvolvimento das máquinas e das fábricas",
            "Fim do comércio",
            "Desaparecimento da agricultura"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual é a função principal da vegetação em um ecossistema?",

        opcoes: [
            "Produzir apenas minerais",
            "Participar das cadeias alimentares e dos ciclos naturais",
            "Eliminar toda a água do solo",
            "Impedir a existência de animais"
        ],

        correta: 1
    },


    {
        pergunta:
            "Um produto custa R$ 80 e recebeu desconto de 10%. Qual será o novo preço?",

        opcoes: [
            "R$ 70",
            "R$ 72",
            "R$ 74",
            "R$ 78"
        ],

        correta: 1
    },


    {
        pergunta:
            "Em um mapa, a escala é importante porque permite:",

        opcoes: [
            "Representar uma área real em tamanho reduzido.",
            "Mudar o clima de uma região.",
            "Aumentar a população.",
            "Alterar a localização dos países."
        ],

        correta: 0
    },


    {
        pergunta:
            "Qual alternativa apresenta uma característica de um texto argumentativo?",

        opcoes: [
            "Apresentar apenas personagens.",
            "Defender uma ideia utilizando argumentos.",
            "Não possuir nenhum assunto.",
            "Ser formado somente por números."
        ],

        correta: 1
    },


    {
        pergunta:
            "Um estudante estudou 2 horas por dia durante 5 dias. Quantas horas ele estudou ao todo?",

        opcoes: [
            "5 horas",
            "7 horas",
            "10 horas",
            "12 horas"
        ],

        correta: 2
    }

];


let perguntaAtual = 0;
let pontuacao = 0;
let quizRespondido = false;


const quizCounter =
    document.getElementById(
        "quizCounter"
    );

const quizScore =
    document.getElementById(
        "quizScore"
    );

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizContent =
    document.getElementById(
        "quizContent"
    );


function carregarPergunta() {

    quizRespondido = false;


    const pergunta =
        perguntas[perguntaAtual];


    quizCounter.textContent =
        "Pergunta " +
        (perguntaAtual + 1) +
        " de " +
        perguntas.length;


    quizScore.textContent =
        pontuacao +
        " acertos";


    quizProgress.style.width =
        (
            ((perguntaAtual + 1) /
                perguntas.length) *
            100
        ) +
        "%";


    let html = `

        <div class="quiz-pergunta">

            ${pergunta.pergunta}

        </div>

        <div class="quiz-opcoes">

    `;


    pergunta.opcoes.forEach(
        function (opcao, index) {

            html += `

                <button
                    class="quiz-opcao"
                    data-index="${index}">

                    <strong>
                        ${String.fromCharCode(65 + index)})
                    </strong>

                    ${opcao}

                </button>

            `;

        }
    );


    html += `
        </div>

        <div id="quizFeedback"></div>
    `;


    quizContent.innerHTML = html;


    const opcoes =
        document.querySelectorAll(
            ".quiz-opcao"
        );


    opcoes.forEach(function (opcao) {

        opcao.addEventListener(
            "click",
            function () {

                responderQuiz(
                    Number(
                        opcao.dataset.index
                    )
                );

            }
        );

    });

}


function responderQuiz(indice) {

    if (quizRespondido) {
        return;
    }


    quizRespondido = true;


    const pergunta =
        perguntas[perguntaAtual];


    const opcoes =
        document.querySelectorAll(
            ".quiz-opcao"
        );


    opcoes.forEach(function (opcao) {

        const resposta =
            Number(
                opcao.dataset.index
            );


        if (
            resposta ===
            pergunta.correta
        ) {

            opcao.classList.add(
                "correta"
            );

        }


        if (
            resposta === indice &&
            resposta !== pergunta.correta
        ) {

            opcao.classList.add(
                "errada"
            );

        }


        opcao.disabled = true;

    });


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    if (
        indice ===
        pergunta.correta
    ) {

        pontuacao++;

        feedback.innerHTML = `

            <div class="quiz-feedback">

                ✅ <strong>Correto!</strong>
                Você acertou.

            </div>

        `;

    } else {

        feedback.innerHTML = `

            <div class="quiz-feedback">

                ❌ <strong>Não foi dessa vez.</strong>
                A resposta correta está destacada.

            </div>

        `;

    }


    quizScore.textContent =
        pontuacao +
        " acertos";


    const botao =
        document.createElement(
            "button"
        );


    botao.className =
        "quiz-proximo";


    botao.textContent =
        perguntaAtual === perguntas.length - 1
            ? "VER RESULTADO"
            : "PRÓXIMA PERGUNTA →";


    botao.addEventListener(
        "click",
        proximaPergunta
    );


    feedback.appendChild(botao);

}


function proximaPergunta() {

    perguntaAtual++;


    if (
        perguntaAtual >=
        perguntas.length
    ) {

        mostrarResultado();

        return;

    }


    carregarPergunta();

    atualizarProgresso();

}


function mostrarResultado() {

    quizProgress.style.width =
        "100%";


    let mensagem;


    if (pontuacao >= 9) {

        mensagem =
            "Excelente! Seu desempenho foi incrível.";

    } else if (pontuacao >= 7) {

        mensagem =
            "Muito bem! Você demonstrou uma ótima preparação.";

    } else if (pontuacao >= 5) {

        mensagem =
            "Bom trabalho! Continue praticando para evoluir.";

    } else {

        mensagem =
            "Continue estudando. Cada questão é uma oportunidade para aprender.";

    }


    quizContent.innerHTML = `

        <div class="quiz-resultado">

            <strong>
                ${pontuacao}/10
            </strong>

            <h3>
                Quiz concluído!
            </h3>

            <p>
                ${mensagem}
            </p>

            <button
                class="quiz-proximo"
                id="refazerQuiz">

                FAZER NOVAMENTE

            </button>

        </div>

    `;


    document
        .getElementById("refazerQuiz")
        .addEventListener(
            "click",
            reiniciarQuiz
        );


    atualizarProgresso();

}


function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    carregarPergunta();

}


carregarPergunta();


// ==========================================
// FRASES MOTIVACIONAIS
// ==========================================

const frases = [

    "Grandes conquistas começam com pequenas decisões.",

    "A preparação transforma oportunidade em resultado.",

    "Você não precisa saber tudo. Precisa continuar aprendendo.",

    "Cada questão resolvida é um passo a mais.",

    "Seu futuro também é construído pelas escolhas de hoje.",

    "Persistência é continuar mesmo quando o resultado ainda não apareceu.",

    "Conhecimento é uma ferramenta que acompanha você para sempre."

];


let fraseAtual = 0;


const quoteText =
    document.getElementById(
        "quoteText"
    );

const nextQuote =
    document.getElementById(
        "nextQuote"
    );


nextQuote.addEventListener(
    "click",
    function () {

        fraseAtual++;


        if (
            fraseAtual >=
            frases.length
        ) {

            fraseAtual = 0;

        }


        quoteText.style.opacity = "0";


        setTimeout(function () {

            quoteText.textContent =
                "“" +
                frases[fraseAtual] +
                "”";

            quoteText.style.opacity = "1";

        }, 200);

    }
);

// ==========================================
// BARRA DE PROGRESSO
// ==========================================

function atualizarProgresso() {

    let progresso = 10;


    const nome =
        localStorage.getItem(
            "intensivoNome"
        );


    if (nome) {
        progresso += 10;
    }


    const caminhoSelecionado =
        document.querySelector(
            ".caminho.selecionado"
        );


    if (caminhoSelecionado) {
        progresso += 10;
    }


    const desafioAberto =
        !subjectChallenge.classList.contains(
            "hidden"
        );


    if (desafioAberto) {
        progresso += 10;
    }


    if (perguntaAtual > 0) {
        progresso += 20;
    }


    if (perguntaAtual >= perguntas.length) {
        progresso = 100;
    }


    progresso =
        Math.min(
            progresso,
            100
        );


    progressBar.style.width =
        progresso + "%";


    progressLabel.textContent =
        progresso + "%";

}


// ==========================================
// MARCAR CAMINHO
// ==========================================

caminhos.forEach(function (caminho) {

    caminho.addEventListener(
        "click",
        function () {

            caminhos.forEach(
                function (item) {

                    item.classList.remove(
                        "selecionado"
                    );

                }
            );


            caminho.classList.add(
                "selecionado"
            );

        }
    );

});


// ==========================================
// BOTÃO REINICIAR
// ==========================================

const restartBtn =
    document.getElementById(
        "restartBtn"
    );


restartBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "intensivoNome"
        );

        localStorage.removeItem(
            "intensivoTurma"
        );

        localStorage.removeItem(
            "intensivoObjetivos"
        );


        location.reload();

    }
);


// ==========================================
// ANIMAÇÃO AO ENTRAR NAS SEÇÕES
// ==========================================

const elementos =
    document.querySelectorAll(
        ".cards article, " +
        ".dicas article, " +
        ".caminho, " +
        ".materias button, " +
        ".galeria figure"
    );


const observador =
    new IntersectionObserver(
        function (entradas) {

            entradas.forEach(
                function (entrada) {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


elementos.forEach(
    function (elemento) {

        elemento.style.opacity = "0";

        elemento.style.transform =
            "translateY(20px)";

        elemento.style.transition =
            "opacity .6s ease, transform .6s ease";

        observador.observe(elemento);

    }
);


// ==========================================
// ATUALIZAÇÃO INICIAL
// ==========================================

atualizarProgresso();

console.log(
    "INTENSIVO carregado com sucesso."
	
);
// ==========================================
// ÁUDIO
// ==========================================

const musica = document.getElementById("musica");
const soundBtn = document.getElementById("soundBtn");

// Começa a música quando clicar em COMEÇAR
startBtn.addEventListener("click", function () {

    musica.play().catch(function (erro) {
        console.log("Não foi possível iniciar o áudio:", erro);
    });

});

// Botão de som
soundBtn.addEventListener("click", function () {

    if (musica.paused) {

        musica.play();
        soundBtn.textContent = "🔊";

    } else {

        musica.pause();
        soundBtn.textContent = "🔇";

    }

});