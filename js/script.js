//funcion obtener el renderizado de pokemons
//funcion template.
//paginacion( de 10 en 10).
//

const pokemonsList = document.getElementById("pokemonsList")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const resetBtn = document.getElementById("resetBtn")
const contentApp = document.getElementById("app")
//const limit = 10;
//let offset = 0;
let nextPage = ''
let previousPage = ''

const getPokedex = async (URL = 'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=10') => {
    try {
        const data = await fetch(URL);
        if (!data.ok) {
            throw new Error('Ha surgido un error', data.status);
        } 
        const responseData = await data.json()
        console.log(responseData)
        nextPage = responseData.next
        previousPage = responseData.previous
        pokemonsInfo(responseData.results)
        //return responseData;
        
    } catch (error) {
        console.log('Error al obtener', error)
    }
}

async function pokemonsInfo(pokemons) {

    try {
        console.log(pokemons)
        const pokemon = pokemons.map(async(pokemon)=>{
             //console.log(pokemon.name)
            //console.log(pokemon.url)
            const getPokemons = await fetch(pokemon.url);
            const response = await getPokemons.json()
            //console.log(response.name)
            //console.log(response.sprites.other.home.front_default);
            const pokemonData = {name:response.name, img:response.sprites.other.home.front_default}
            return pokemonData 
        })
        console.log(pokemon)
        const allPromise = await Promise.all(pokemon)
        functionTemplate(allPromise)
    } catch (error) {
        console.log('Error al obtener', error)
    }
}

async function functionTemplate(pokemones) {
    console.log(pokemones)
    contentApp.innerHTML = " ";
    pokemones.forEach(async(poke) => {
        const {name, img} = poke;
        contentApp.innerHTML +=
        `
        <li>
            <div class"pokemonsCard">
              <img src=${img} alt=${name} class="card"/>
            </div>
           <div class="name">
        <h2><span><b>${name} </b></span></h2>
        </div>
        </li>
        ` 
    })
}

getPokedex();

