// Constants
const proxy_address = 'https://qsp-9bf3216ba15c.herokuapp.com/'

// Functions
async function projects_update() {
    let group_data = await new Promise((resolve) => {
        fetch(proxy_address + 'https://games.roblox.com/v2/groups/9145179/games?accessFilter=2&limit=10&sortOrder=Desc')
        .then(response => {
            resolve(response.json())
        })
    })
    if (group_data) {
        let group_gamedata = []
        for (i = 0; i < group_data.data.length; i++) {
            let game_data = group_data.data[i]
            let thumbnail_data = await new Promise((resolve) => {
                fetch(proxy_address + 'https://games.roblox.com/v2/games/' + game_data.id + '/media')
                .then(response => {
                    resolve(response.json())
                })
            })
            if (thumbnail_data.data && thumbnail_data.data.length > 0) {
                let thumbnail_address = await new Promise((resolve) => {
                     fetch(proxy_address + 'https://thumbnails.roblox.com/v1/games/' + game_data.id + '/thumbnails?thumbnailIds=' + thumbnail_data.data[0].imageId + '&size=768x432&format=Png&isCircular=false')
                     .then(response => {
                        resolve(response.json())
                     })
                })
                group_gamedata[group_gamedata.length] = {id: game_data.rootPlace.id, url: thumbnail_address.data[0].imageUrl}
            }
        }

        let element_prefab_html = await new Promise((resolve) => {
            fetch(proxy_address + 'http://quadrostudios.xyz/website/content/home/prefabs/ourgamesdiv-game.html')
            .then(response => {
                resolve(response.text())
            })
        })

        let games_elements = document.getElementsByClassName('ourgamesdiv-game')
        for (let index = games_elements.length - 1; index >= 0; index--) {
            let element = games_elements[index]
            let group_game = group_gamedata[index]
            if (group_game) {
                element.getElementsByClassName('ourgamesdiv-game-link')[0].href = "https://roblox.com/games/" + group_game.id + "/"
                element.getElementsByClassName('ourgamesdiv-game-img')[0].src = group_game.url
            } else {
                element.remove()
            }
        }
        group_gamedata.forEach((game_data, index) => {
            if (!games_elements[index]) {
                let element_new = document.createElement('div')
                document.getElementsByClassName('ourgamessubdiv')[0].appendChild(element_new)
                element_new.className = "ourgamesdiv-game"
                element_new.innerHTML = element_prefab_html
                element_new.getElementsByClassName('ourgamesdiv-game-link')[0].href = "https://roblox.com/games/" + game_data.id + "/"
                element_new.getElementsByClassName('ourgamesdiv-game-img')[0].src = game_data.url
            }
        })
    }
}

function loop() {
    setTimeout(function() {
        projects_update()
        loop()
    }, 15*1000)
}
projects_update()