
// Colocando tudo dentro to DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
    const classNamePokemon = document.querySelector('.namePokemon');
    const classPsPokemon = document.querySelector('.PsPokemon');
    const classAbilityPokemon = document.querySelector('.habilidadesPokemon');
    const classImagePokemon = document.querySelector('.img');
    const searchPokemon = document.querySelector('.search_pokemon');
    const btn_send_pokemon = document.querySelector('.btn_send_Pokemon');
    const btn_add_in_deck = document.querySelector('.add_in_deck');
    const msg_add_deck = document.querySelector('.msg_add_deck');
    const deck = [];
    const deck_user = document.querySelector('.deck_user');

    async function obterdataApi(pokemon) {
        const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        try {
            const response = await fetch(pokeApi);

            if (!response.ok) {
                classNamePokemon.innerHTML = `Not Found <img src="imagens/pikachu_Not_Found.png">`;
                classAbilityPokemon.innerHTML = ""; 
                classImagePokemon.innerHTML = ""; 
                classPsPokemon.innerHTML = "";
            }

            const dataApi = await response.json();
            const nomePokemon = dataApi.name;
            const idPokemon = dataApi.id;
            const habilidades = dataApi.abilities.map(habilidade => habilidade.ability.name);
            const image = dataApi.sprites.front_default;
            const psPokemon = dataApi.stats.find(stat => stat.stat.name === 'hp');;
            

            console.log(nomePokemon);
            console.log(idPokemon);
            console.log(habilidades);
            console.log(image);
            console.log(psPokemon);

            // Verificando se a classe foi encontrada no DOM.
            if (classNamePokemon) {
                classNamePokemon.innerHTML = `${nomePokemon}`;
            } else {
                console.log("Elemento .namePokemon não encontrado.");
            }

            if(psPokemon){
                classPsPokemon.innerHTML = `${psPokemon.base_stat}`;
            }

            if (classAbilityPokemon) {
                // join() -> cria uma string com as habiliades dos pokemons separadas por virgula.
                classAbilityPokemon.innerHTML = `${habilidades.join('<br> ')}`; 
            }
      
            if(classImagePokemon){
                classImagePokemon.innerHTML = `<img src="${image}" alt="Imagem_${image}" >` ;
            }

            msg_add_deck.innerHTML = "";

        } catch (erro) {
            console.log(erro);
        }
    }
    

    //Buscando dataApi do Pokémon com ID 12

    btn_send_pokemon.addEventListener('click',()=>{
        
        const pokemon = searchPokemon.value;        
        obterdataApi(pokemon);        
        
    });


});


