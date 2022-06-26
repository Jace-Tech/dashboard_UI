

const fetchGames = async () => {
    const request = await fetch("./js/data.json")
    const response = await request.json()
    return response.games
}

const fetchLinks = async () => {
    const request = await fetch("./js/data.json")
    const response = await request.json()
    return response.navItem
}

const fetchContacts = async () => {
    const request = await fetch("./js/data.json")
    const response = await request.json()
    return response.onlineContacts
}

onmessage = async ({ data }) => {
    const { payload } = data

    if(payload.toLowerCase() == "games"){
        const games = await fetchGames()
        postMessage(JSON.stringify({ data: games, type: payload }))
    }

    if(payload.toLowerCase() == "links"){
        const games = await fetchLinks()
        postMessage(JSON.stringify({ data: games, type: payload }))
    }

    if(payload.toLowerCase() == "contacts"){
        const contacts = await fetchContacts()
        postMessage(JSON.stringify({ data: contacts, type: payload }))
    }
}

