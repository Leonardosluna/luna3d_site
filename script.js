document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LÓGICA DO AVISO DE CONSTRUÇÃO ===
    const btnFecharAviso = document.getElementById('btn-fechar-aviso');
    const avisoConstrucao = document.getElementById('aviso-construcao');

    if (btnFecharAviso && avisoConstrucao) {
        btnFecharAviso.addEventListener('click', () => {
            avisoConstrucao.style.display = 'none';
        });
    }

    // === 2. LÓGICA DO CARROSSEL DE DESTAQUES (HOME - COM LOOP) ===
    const trackDestaques = document.getElementById('track-destaques');
    const btnDestPrev = document.getElementById('destaque-prev');
    const btnDestNext = document.getElementById('destaque-next');

    if (trackDestaques && btnDestPrev && btnDestNext) {
        
        // Tamanho do card (300px) + Gap (30px) = 330px de deslocamento
        const scrollAmount = 330; 

        btnDestNext.addEventListener('click', () => {
            // Verifica se chegou no fim (com uma margem de erro de 10px)
            const maxScroll = trackDestaques.scrollWidth - trackDestaques.clientWidth;
            
            if (trackDestaques.scrollLeft >= maxScroll - 10) {
                // SE CHEGOU NO FIM -> VOLTA PARA O INÍCIO (0)
                trackDestaques.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // SE NÃO -> ROLA PARA A DIREITA
                trackDestaques.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        btnDestPrev.addEventListener('click', () => {
            // Verifica se está no início
            if (trackDestaques.scrollLeft <= 0) {
                // SE ESTÁ NO INÍCIO -> VAI PARA O FINAL
                trackDestaques.scrollTo({ left: trackDestaques.scrollWidth, behavior: 'smooth' });
            } else {
                // SE NÃO -> ROLA PARA A ESQUERDA
                trackDestaques.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }

    // === 3. VARIÁVEIS DOS MODAIS ===
    const modalCompra = document.getElementById('modal-compra');
    const modalDetalhes = document.getElementById('modal-detalhes');
    
    // Elementos do Modal de Detalhes
    const detImg = document.getElementById('detalhe-img');
    const detTitulo = document.getElementById('detalhe-titulo');
    const detPreco = document.getElementById('detalhe-preco');
    const detDesc = document.getElementById('detalhe-descricao');
    const detDim = document.getElementById('detalhe-dimensoes');
    
    // Botões de Navegação DO MODAL (Troca de Foto)
    const btnPrevModal = document.getElementById('btn-prev-img');
    const btnNextModal = document.getElementById('btn-next-img');

    // Variáveis de controle do Carrossel do Modal
    let imagensAtuais = [];
    let indiceAtual = 0;

    // Botões de ação globais
    const botoesComprarCards = document.querySelectorAll('.btn-comprar'); 
    const containersFoto = document.querySelectorAll('.trigger-detalhe'); 
    const btnTenhoInteresseDetalhe = document.getElementById('btn-comprar-detalhe');


    // === 4. FUNÇÃO DO CARROSSEL INTERNO (MODAL) ===
    function atualizarImagemCarrossel() {
        if (imagensAtuais.length > 0) {
            detImg.style.opacity = 0; // Efeito fade
            setTimeout(() => {
                detImg.src = imagensAtuais[indiceAtual];
                detImg.style.opacity = 1;
            }, 200);
        }
    }

    // Clique na seta ANTERIOR (Modal) - JÁ TEM LOOP
    if(btnPrevModal) {
        btnPrevModal.addEventListener('click', () => {
            if (imagensAtuais.length > 1) {
                indiceAtual--;
                if (indiceAtual < 0) {
                    indiceAtual = imagensAtuais.length - 1; // Loop: vai pro último
                }
                atualizarImagemCarrossel();
            }
        });
    }

    // Clique na seta PRÓXIMA (Modal) - JÁ TEM LOOP
    if(btnNextModal) {
        btnNextModal.addEventListener('click', () => {
            if (imagensAtuais.length > 1) {
                indiceAtual++;
                if (indiceAtual >= imagensAtuais.length) {
                    indiceAtual = 0; // Loop: volta pro primeiro
                }
                atualizarImagemCarrossel();
            }
        });
    }


    // === 5. FUNÇÃO PARA ABRIR MODAL DE OPÇÕES DE COMPRA ===
    function abrirModalOpcoesCompra(nomeProduto, precoProduto) {
        const tituloModal = document.getElementById('produto-titulo-modal');
        if (tituloModal) tituloModal.innerText = `${nomeProduto} - ${precoProduto}`;

        const btnWhatsModal = document.getElementById('btn-whats-modal');
        const seuNumero = "5524999999999"; 
        const mensagem = `Olá! Tenho interesse no *${nomeProduto}* (${precoProduto}) que vi no site.`;
        
        if (btnWhatsModal) {
            btnWhatsModal.href = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
        }

        if (modalCompra) modalCompra.style.display = 'flex';
    }


    // === 6. EVENTOS DE CLIQUE NOS PRODUTOS ===

    // A) Clicou em "Tenho Interesse" direto no CARD
    botoesComprarCards.forEach(botao => {
        botao.addEventListener('click', () => {
            const card = botao.closest('.card-produto');
            const nome = card.querySelector('h3').innerText;
            const preco = card.querySelector('.preco').innerText;
            abrirModalOpcoesCompra(nome, preco);
        });
    });

    // B) Clicou na FOTO (Abre Detalhes e Carrega Carrossel)
    containersFoto.forEach(container => {
        container.addEventListener('click', () => {
            const card = container.closest('.card-produto');
            
            // 1. Pega imagem principal
            const imagemPrincipalElement = container.querySelector('img');
            const imagemPrincipal = imagemPrincipalElement.src; 

            // 2. Tenta pegar a lista de imagens extras
            const stringImagens = card.dataset.imagens; 

            // 3. Lógica: Monta o array de fotos
            if (stringImagens) {
                imagensAtuais = stringImagens.split(',');
            } else {
                imagensAtuais = [imagemPrincipal];
            }

            // Reseta
            indiceAtual = 0;
            detImg.src = imagensAtuais[0];

            // Mostra/Esconde setas do modal
            if (imagensAtuais.length > 1) {
                btnPrevModal.classList.remove('hidden');
                btnNextModal.classList.remove('hidden');
            } else {
                btnPrevModal.classList.add('hidden');
                btnNextModal.classList.add('hidden');
            }

            // 4. Preenche textos
            const nome = card.querySelector('h3').innerText;
            const preco = card.querySelector('.preco').innerText;
            const descricao = card.dataset.descricao || "Descrição não disponível.";
            const dimensoes = card.dataset.dimensoes || "Consulte medidas.";

            detTitulo.innerText = nome;
            detPreco.innerText = preco;
            detDesc.innerText = descricao;
            detDim.innerText = dimensoes;

            // Abre o Modal
            modalDetalhes.style.display = 'flex';
        });
    });

    // C) Clicou em "Tenho Interesse" DENTRO do Modal de Detalhes
    if (btnTenhoInteresseDetalhe) {
        btnTenhoInteresseDetalhe.addEventListener('click', () => {
            const nomeAtual = detTitulo.innerText;
            const precoAtual = detPreco.innerText;
            
            modalDetalhes.style.display = 'none'; 
            abrirModalOpcoesCompra(nomeAtual, precoAtual); 
        });
    }

    // === 7. FECHAR MODAIS ===
    window.onclick = function(event) {
        if (event.target == modalCompra) modalCompra.style.display = "none";
        if (event.target == modalDetalhes) modalDetalhes.style.display = "none";
    }
});

// Funções chamadas pelo HTML (Botões X)
function fecharModal() {
    document.getElementById('modal-compra').style.display = 'none';
}

function fecharModalDetalhes() {
    document.getElementById('modal-detalhes').style.display = 'none';
}

// === 8. FUNÇÕES GLOBAIS DE NAVEGAÇÃO ===
function rolarParaProdutos() {
    const s = document.getElementById('produtos');
    if (s) s.scrollIntoView({ behavior: 'smooth' });
}

function filtrar(categoria) {
    const btns = document.querySelectorAll('.btn-filtro');
    btns.forEach(b => b.classList.remove('ativo'));
    
    const btnClicado = Array.from(btns).find(b => b.getAttribute('onclick').includes(categoria));
    if(btnClicado) btnClicado.classList.add('ativo');

    const prods = document.querySelectorAll('.card-produto');
    prods.forEach(p => {
        if (categoria === 'todos' || p.dataset.categoria === categoria) {
            p.style.display = 'block'; 
        } else {
            p.style.display = 'none'; 
        }
    });
}