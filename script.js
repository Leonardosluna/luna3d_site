// Função para fechar a barra de aviso
function fecharAviso() {
    const aviso = document.getElementById('aviso-construcao');
    if (aviso) {
        aviso.style.display = 'none';
    }
}

// 1. Função para rolar suavemente até a vitrine (Home)
function rolarParaProdutos() {
    const sectionProdutos = document.getElementById('produtos');
    if (sectionProdutos) {
        sectionProdutos.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. Função de Filtro de Categorias
function filtrar(categoria) {
    const botoes = document.querySelectorAll('.btn-filtro');
    
    // Atualiza visual dos botões
    botoes.forEach(btn => {
        btn.classList.remove('ativo');
        if(btn.getAttribute('onclick').includes(categoria)) {
            btn.classList.add('ativo');
        }
    });

    // Mostra ou esconde produtos
    const produtos = document.querySelectorAll('.card-produto');
    produtos.forEach(produto => {
        const categoriaProduto = produto.getAttribute('data-categoria');
        if (categoria === 'todos' || categoriaProduto === categoria) {
            produto.style.display = 'block'; 
        } else {
            produto.style.display = 'none'; 
        }
    });
}

// 3. Lógica do Modal de Compra
document.addEventListener('DOMContentLoaded', () => {
    
    // Pegamos todos os botões "Tenho Interesse" e elementos do modal
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    const modal = document.getElementById('modal-compra');
    const tituloProdutoModal = document.getElementById('produto-titulo-modal');
    const btnWhatsModal = document.getElementById('btn-whats-modal');

    // Quando clicar em "Tenho Interesse"
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            // Acha o cartão do produto (usando closest para maior segurança)
            const card = botao.closest('.card-produto');
            
            // Pega os dados do produto
            const nomeProduto = card.querySelector('h3').innerText;
            const precoElemento = card.querySelector('.preco');
            const preco = precoElemento ? precoElemento.innerText : '';

            // 1. Atualiza o texto dentro do Modal
            if (tituloProdutoModal) {
                tituloProdutoModal.innerText = `${nomeProduto} - ${preco}`;
            }

            // 2. Prepara o Link do WhatsApp Específico
            // === IMPORTANTE: INSIRA SEU NÚMERO REAL ABAIXO (apenas números) ===
            const seuNumero = "5524999999999"; 
            
            const mensagem = `Olá! Vi o *${nomeProduto}* ${preco} no site Luna3D e gostaria de negociar.`;
            
            if (btnWhatsModal) {
                btnWhatsModal.href = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
            }

            // 3. Mostra o Modal
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    // Fechar o modal clicando fora dele (na parte escura)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Função para fechar clicando no X (precisa ser global)
function fecharModal() {
    const modal = document.getElementById('modal-compra');
    if (modal) {
        modal.style.display = "none";
    }
}