const worker = new Worker('worker.js')
const pagerItems = document.querySelectorAll(".pager-item")
const handleSidebarBtn = document.querySelector("#handleSidebar")
const dashboardCloseBtn = document.querySelector("#dashboardClose")
const sidebar = document.querySelector('.dashboard-sidebar')
const object = document.querySelector('.item-image')

let linkBtns = null
let LINKS = null


const switchTabs = () => {

}

const getAllLinksItem = () => {
    linkBtns = document.querySelectorAll('.dashboard-link')
    linkBtns.forEach((btn, index) => btn.addEventListener('click', (e) => handleLinkClick(e, btn, index)))
}

const handleGameScreens = (games = []) => {
    const gameScreens = document.querySelector(".section-slider-container").children[0]
    games.slice(0, 3).forEach(game => {
        const gameScreen = document.createElement("div")
        gameScreen.className = "col-sm-12 col-md-6 col-lg-4"
        gameScreen.innerHTML = `
            <div class="section-slider-card">
                <img src="${game.image}" alt="" class="section-card-img">
                <h3 class="section-card-title">${game.name}</h3>
                <p class="section-card-time">${game.length} hrs</p>
            </div>`;

        gameScreens.appendChild(gameScreen)
    })
}

const handleLinkScreens = (links = []) => {
    const linkScreens = document.querySelector(".dashboard-menu")
    links.forEach((link, index) => {
        const linkScreen = document.createElement("li")
        linkScreen.className = "dashboard-link-item"
        linkScreen.innerHTML = `
                <a href="" class="dashboard-link ${ index == 0 && 'active' }">
                    <ion-icon name="${link.icon}"></ion-icon>
                </a>`;

        linkScreens.appendChild(linkScreen)
    })
}

const handleContactScreens = (contacts = []) => {
    const contactScreens = document.querySelector(".social-items")
    contacts.forEach((contact, index) => {
        const contactScreen = document.createElement("div")
        contactScreen.className = "social-item"
        contactScreen.innerHTML = `
                <img src="${ contact.image }" alt="" class="social-avater">
                <div class="social-details">
                    <h3 class="social-name">${ contact.name }</h3>
                    <p class="social-status">${ contact.status }</p>
                </div>`;

        contactScreens.appendChild(contactScreen)
    })
}

const handleScreenFlash = async (value) => {
    const flashElem = document.createElement('div')
    flashElem.className = "screen-flash"
    flashElem.innerHTML = `<div class="flash-message">${ value }</div>`

    document.body.append(flashElem)

    await new Promise((resolve) => {
        setTimeout(() => {
            flashElem.classList.add('fading')
            return resolve("")
        }, 1000)
    })

    flashElem.addEventListener('animationend', () => flashElem.remove())


}


const handleLinkClick = (e, btn, index) => {
    e.preventDefault()
    const value = LINKS[index].name
    ;[...linkBtns].map(item => item.classList.contains('active') ? item.classList.remove('active') : item)
    btn.classList.add('active')

    handleScreenFlash(value)
}


worker.postMessage({ payload: "games"})
worker.postMessage({ payload: "links"})
worker.postMessage({ payload: "contacts"})

worker.addEventListener("message", (msg) => {
    const { type, data } = JSON.parse(msg.data)

    if(type == 'games') {
        handleGameScreens(data)
    }

    if(type == 'links') {
        LINKS = data
        handleLinkScreens(data)
        getAllLinksItem()
    }

    if(type == 'contacts') {
        handleContactScreens(data)
    }
})

handleSidebarBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    sidebar.classList.toggle('show')
})

dashboardCloseBtn.addEventListener('click', () => {
    if(sidebar.classList.contains('show')) {
        sidebar.classList.remove('show')
    }
})

object.addEventListener('mousemove', (e) => {
    const y = e.pageY
    const x = e.pageX

    const left = e.target.getBoundingClientRect().left
    const top = e.target.getBoundingClientRect().top

    const offsetX = (left - x) / 10
    const offsetY = (top - y) / 10

    e.target.style.transform = `translate(${offsetX}px, ${offsetY}px)`
})

object.addEventListener('mouseleave', (e) => {
    e.target.style.transform = `translate(${0}px, ${0}px)`
})

pagerItems.forEach((pager, index, pagers) => {
    pager.addEventListener("click", () => {
        ;[...pagers].map(item => item.classList.contains('active') ? item.classList.remove('active') : item)
        pager.classList.add('active')
    })
})

if(window.innerWidth < 992) {
    if(!sidebar.classList.contains('mobile')) {
        sidebar.classList.add('mobile')
    }
}

sidebar.addEventListener('click', (e) => {
    e.stopPropagation()
    return
})



window.addEventListener('resize', () => {
    if(window.innerWidth < 992) {
        if(!sidebar.classList.contains('mobile')) {
            sidebar.classList.add('mobile')
        }
    }
    else {
        if(sidebar.classList.contains('mobile')) {
            sidebar.classList.remove('mobile')
        }
    }
})

window.addEventListener("click", e => {
    if(sidebar.classList.contains('show')) {
        sidebar.classList.remove('show')
    }
})

