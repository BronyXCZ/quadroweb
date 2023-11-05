// Constants
const proxy_address = 'https://qsp-9bf3216ba15c.herokuapp.com/';

// Functions
async function projects_update() {
    let group_data = await new Promise((resolve) => {
        fetch(proxy_address + 'https://games.roblox.com/v2/groups/9145179/games?accessFilter=2&limit=10&sortOrder=Desc')
        .then(response => {
            resolve(response.json());
        })
    })
    if (group_data) {
        group_data.data.forEach((game_data) => async function() {
            let thumbnail_data = await new Promise((resolve) => {
                fetch(proxy_address + 'https://games.roblox.com/v2/games/' + game_data.id + '/media')
                .then(response => {
                    resolve(response.json());
                })
            })
            console.log(thumbnail_data);
            if (thumbnail_data) {
                let thumbnail_address = await new Promise((resolve) => {
                     fetch(proxy_address + 'https://thumbnails.roblox.com/v1/games/' + game_data.id + '/thumbnails?thumbnailIds=' + thumbnail_data.data[0].imageId + '&size=768x432&format=Png&isCircular=false')
                     .then(response => {
                        resolve(response.json());
                     })
                })
                console.log(thumbnail_address);
            }
        })
    }
}

projects_update()