function pesquisar() {
    const section = document.getElementById("resultados-pesquisa");
    const campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

    // Se campoPesquisa estiver vazio
    if (!campoPesquisa) {
        section.innerHTML = "<p class='mensagem-erro'>Nenhum resultado encontrado. Digite o nome de uma teoria da conspiração ou revise sua pesquisa.</p>";
        return;
    }
    

    let resultados = "";
    
    // Verifica se a lista de dados está definida
    if (Array.isArray(dados)) {
        // Itera sobre cada dado na lista de dados
        for (let dado of dados) {
            const titulo = dado.titulo.toLowerCase();
            const descricao = dado.descricao.toLowerCase();
            const tags = dado.tags.toLowerCase();

            // Verifica se o dado corresponde ao campo de pesquisa
            if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
                resultados += `
                <div class="item-resultado">
                    <img src="${dado.imagem}" alt="${dado.titulo}" class="imagem-resultado">
                    <div class="info">
                        <h2>${dado.titulo}</h2>
                        <p class="descricao-meta">${dado.descricao}</p>
                        <a href="${dado.link}" class="botao-resultado" target="_blank">Mais informações</a>
                    </div>
                </div>
                `;
            }              
        }
    } else {
        resultados = "<p class='mensagem-erro'>Dados não encontrados.</p>";
    }

    if (!resultados) {
        resultados = "<p class='mensagem-erro'>Nada foi encontrado.</p>";
    }

    // Atualiza o conteúdo da seção com os resultados
    section.innerHTML = resultados;
}

function gerarCards() {
    const container = document.getElementById("cards-container");
    container.innerHTML = ''; // Limpa o conteúdo existente

    // Limita a 5 cards
    const cardsParaExibir = dados.slice(0, 4);

    cardsParaExibir.forEach(dado => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${dado.imagem}" alt="${dado.titulo}">
            <h3>${dado.titulo}</h3>
            <p><strong>Data:</strong> ${dado.data}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Mais informações</a>
        `;

        container.appendChild(card);
    });
}

function iniciarCarrossel() {
    const container = document.querySelector('.cards-container');
    let scrollAmount = 0;

    function autoScroll() {
        container.scrollLeft += 1;
        scrollAmount += 1;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
            scrollAmount = 0;
            container.scrollLeft = 0;
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();
}

// Gera os cards ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    gerarCards();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
