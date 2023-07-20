console.log('hello')
console.log('working?')

const getPokemon = async (e) => {
    e.preventDefault();
    const pokemon = e.target.pokesearch.value.toLowerCase()
    console.log(pokemon)

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    console.log(typeof data)

    const container = document.querySelector('#pokecardholder')
    container.innerHTML = ''

    console.log(data.abilities[0].ability.name)

    const titleCase = some_string =>{
        return some_string.charAt(0).toUpperCase()+some_string.slice(1)
    }

    const abilitiesCounter = () =>{
        let return_string = ''
        let i = 1
        for (let ab in data.abilities){
            // abilities[`Ability ${i}`] = titleCase(data.abilities[ab].ability.name)
            return_string += `<li class="list-group-item">Ability ${i}:</li>`
            i++
        }
        return return_string
    }

    const abilitiesNames = () =>{
        let return_string = ''
        for (let ab in data.abilities){
            // abilities[`Ability ${i}`] = titleCase(data.abilities[ab].ability.name)
            return_string += `<li class="list-group-item">${titleCase(data.abilities[ab].ability.name)}</li>`
        }
        return return_string
    }

    if (data) {
        let card = `
            <div class="card" style="width: 24rem;">
                <img src="${data['sprites']['other']['official-artwork']['front_default']}" class="card-img-top" alt="poke avatar">
                <div class="card-body mx-auto position-relative">
                    <h3 class="card-title text-center">#${data.id} - ${titleCase(data.name)}</h3>
                </div>
                <ul class="list-group list-group-flush">
                    <div class="row">
                        <div class="col pe-0">
                            ${abilitiesCounter()}
                            <li class="list-group-item">Base Experience:</li>
                            <li class="list-group-item">HP Base Stat:</li>
                            <li class="list-group-item">Attack Base Stat:</li>
                            <li class="list-group-item">Defense Base Stat:</li>
                        </div>
                        <div class="col ps-0">
                            ${abilitiesNames()}
                            <li class="list-group-item">${data.base_experience}</li>
                            <li class="list-group-item">${data.stats[0].base_stat}</li>
                            <li class="list-group-item">${data.stats[1].base_stat}</li>
                            <li class="list-group-item">${data.stats[2].base_stat}</li>
                        </div>
                    </div>
                </ul>
            </div>
        `
        container.innerHTML = card
    }
}

const form = document.querySelector('#pokesearchform')
form.addEventListener('submit',getPokemon)