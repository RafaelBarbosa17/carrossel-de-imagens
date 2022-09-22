const boxs = document.querySelectorAll('.box');
const n = document.getElementById('n');
const p = document.getElementById('p');
const container = document.querySelector('.container');

let index = 0;
let scX = 0;
let widthBox;
boxs[index].style.minWidth = '40%'
boxs[index].style.minHeight = '400px'

const changeIndex = () => {
    boxs[index].style.minWidth = '40%';
    boxs[index].style.minHeight = '400px';
    boxs.forEach(i => {
        if (i.className !== `box ${index}`) {
            i.style.minWidth = '30%';
            i.style.minHeight = '300px'
        }
    })
    container.scroll(scX, 0)
    // console.log(index)
}

const changeSizeBox = () => {
    boxs.forEach(box => {
        widthBox = box.clientWidth + 4;
        console.log(widthBox)
    })
}

n.addEventListener('click', () => {
    changeSizeBox()
    if (index < boxs.length - 1) {
        index += 1;
        scX += widthBox
    }
    changeIndex()
})

p.addEventListener('click', () => {
    changeSizeBox()
    if (index > 0) {
        index -= 1;
        scX -= widthBox
    }
    changeIndex()
})

const items = document.querySelectorAll('.box .item');

const getPokemons = async (p) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${p}`
    const response = await fetch(url)
    const jsonResponse = await response.json();
    const data = {
        nome: await jsonResponse.name,
        imgSrc: await jsonResponse.sprites.other.dream_world.front_default,
    }
    // console.log(data)
    items[p - 1].innerHTML = `<h1 class="poke-name"> ${data.nome} </h1> <img class="poke-img" src="${data.imgSrc}">`
}

for (let i = 0; i < items.length; i++) {
    const parameter = i + 1;
    getPokemons(parameter);
}