
// Colocando tudo dentro to DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
    const classNamePokemon = document.querySelector('.namePokemon');
    const classPsPokemon = document.querySelector('.PsPokemon');
    const classAbilityPokemon = document.querySelector('.habilidadesPokemon');
    const classImagePokemon = document.querySelector('.imagePokemon');

    async function obterdataApi(pokemon) {
        const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        try {
            const response = await fetch(pokeApi);

            if (!response.ok) {
                throw new Error("Sabe nem digitar o nome de um pokemon o AMEBA!!");
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
                classAbilityPokemon.innerHTML = `${habilidades.join(', ')}`; 
            }
      
            if(classImagePokemon){
                classImagePokemon.innerHTML = `<img src="${image}" alt="Imagem_${image}" >` ;
            }

        } catch (erro) {
            console.log(erro);
        }
    }
    

    //Buscando dataApi do Pokémon com ID 12
    obterdataApi(12);
});

