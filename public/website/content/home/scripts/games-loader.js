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
        let game_getmedia = async function(game_data) {
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
                group_gamedata[group_gamedata.length] = {id: game_data.id, url: thumbnail_address.data[0].imageUrl}
            }
        }
        group_data.data.forEach((game_data) => game_getmedia(game_data))

        let element_prefab_html = await new Promise((resolve) => {
            fetch(proxy_address + 'http://quadrostudios.xyz/website/content/home/prefabs/ourgamesdiv-game.html')
            .then(response => {
                resolve(response.text())
            })
        })
        console.log(element_prefab_html)

        let games_elements = document.getElementsByClassName('ourgamesdiv-game')
        games_elements.forEach((element, index) => {
            let group_game = group_gamedata[index]
            if (group_game) {
                element.childNodes[0].href = "https://roblox.com/" + group_game.id
                element.childNodes[1].src = group_game.url
            } else {
                element.remove()
            }
        })
        group_gamedata.forEach((game_data, index) => {
            if (!games_elements[index]) {
                let element_new = document.createElement('div')
                element_new.className = "ourgamesdiv-game"
                element_new.innerHTML = fs.readFile('./prefabs/ourgamesdiv-game.html')
            }
        })
    }
}

projects_update()