// 1. Função para rolar suavemente até a vitrine (usada na Home)
function rolarParaProdutos() {
    const sectionProdutos = document.getElementById('produtos');
    if (sectionProdutos) {
        sectionProdutos.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. Função de Filtro (Nova!)
function filtrar(categoria) {
    // A. Atualiza o visual dos botões (muda a cor do ativo)
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => {
        btn.classList.remove('ativo');
        
        // Verifica se este é o botão clicado para deixá-lo colorido
        if(btn.getAttribute('onclick').includes(categoria)) {
            btn.classList.add('ativo');
        }
    });

    // B. Esconde ou mostra os produtos
    const produtos = document.querySelectorAll('.card-produto');

    produtos.forEach(produto => {
        // Pega a etiqueta que colocamos no HTML (ex: data-categoria="decoracao")
        const categoriaProduto = produto.getAttribute('data-categoria');

        if (categoria === 'todos' || categoriaProduto === categoria) {
            // Se for "todos" ou se a etiqueta bater, mostra o produto
            produto.style.display = 'block'; 
        } else {
            // Se não, esconde
            produto.style.display = 'none'; 
        }
    });
}

// 3. Configuração dos botões "Tenho Interesse" (WhatsApp)
// Usamos um evento que espera a página carregar para garantir que os botões existam
document.addEventListener('DOMContentLoaded', () => {
    const botoesComprar = document.querySelectorAll('.btn-comprar');

    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const card = event.target.parentElement;
            const nomeProduto = card.querySelector('h3').innerText;
            
            // Tenta pegar o preço, se não tiver, deixa vazio
            const precoElemento = card.querySelector('.preco');
            const preco = precoElemento ? precoElemento.innerText : '';

            // === SEU NÚMERO AQUI ===
            const seuNumero = "5524999999999"; 

            const mensagem = `Olá! Vi o *${nomeProduto}* ${preco} no site Luna3D e tenho interesse.`;
            const linkWhatsApp = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;

            window.open(linkWhatsApp, '_blank');
        });
    });
});