
// variáveis que contém os elementos html
const boxs = document.querySelectorAll('.poke-box');
const n = document.getElementById('n');
const p = document.getElementById('p');
const container = document.querySelector('.container');

// index para representar o elemento a ser ultilizado
let index = 0;

// função que altera o index e aplica 'active' ao elemento que estiver na posição correta
const changeIndex = () => {
    for (let box of boxs) {
        box.classList.remove('active')
    }
    boxs[index].classList.add('active');
}

changeIndex()

// ouvintes de evento para realizar o scroll da tela manualmente e corretamente de acordo com a necessidade
n.addEventListener('click', () => {
    if (index < boxs.length - 1) {
        index++;
        container.scroll((container.clientWidth / 100) * 25 * index, 0);
        changeIndex()
    }
})
p.addEventListener('click', () => {
    if (index > 0) {
        index--;
        container.scroll((container.clientWidth / 100) * 25 * index, 0);
        changeIndex()    
    }
})

// função assincrona que utiliza a api de pokemons e gera elementos html de acordo com os dados retornados
const getPokemons = async (p) => {
    // url representa o endereço da api para chamada
    const url = `https://pokeapi.co/api/v2/pokemon/${p}`
    const response = await fetch(url)
    // jsonResponse representa os dados da resposta em formato json
    const jsonResponse = await response.json();
    // data é um objeto contendo todos os elementos que serão necessarios para construção das imagens
    const data = {
        nome: await jsonResponse.name,
        imgSrc: await jsonResponse.sprites.other.dream_world.front_default,
    }
    // console.log(data)
    // box recebe como conteúdo uma string que será transformada em elemento html
    boxs[p - 1].innerHTML = `
        <div class="poke-item">
            <h1 class="poke-name"> ${data.nome} </h1>
            <img class="poke-img" src="${data.imgSrc}">
        </div>
        `
}

// um loop que chama a função de gerar os elementos de acordo com o número de boxs que ouver na página
for (let i = 0; i < boxs.length; i++) {
    const parameter = i + 1;
    getPokemons(parameter);
}