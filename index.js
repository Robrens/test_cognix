import axios from 'axios';

// BUG #1 - Vérifier l'endpoint ?
const endpoint = 'https://www.reddit.com/r/aww.js0n?sort=new';

const mainContent = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');


main();

/**
 * Main
 */
function main() {
    document.querySelector('.button--getposts').addEventListener('click', () => {
        getPosts(endpoint);
    })
}

/**
 * Print post title + images to #main
 * 
 * @param array redditPosts 
 * @return void
 */
function printPosts(redditPosts) {
    const posts = redditPosts.map((item, index) => {
        const thumbnail = (redditPosts[index].data.thumbnail !== 'self') ? 
                `<img src='${item.data.thumbnail}' alt='${redditPosts[index].data.title}'/>` : '';

        return `
            <li>
                <a href='${item.data.url}'>
                    ${thumbnail}
                    <h2>${item.data.title}</h2>
                </a>
            </li>
        `;
    });

    // BUG #2 - Retirer la ',' supplémentaire dans `posts.join() - ?
    mainContent.querySelector('ul').innerHTML = posts.join();
}


// BUG #3 - Le titre (h6) pour la sidebar doit etre transformer en majuscule, mais pas le titre (h2) dans printPosts().
//          Modifier la fonction pour resoudre cette erreur 
//          Explique (ci-dessous) pourquoi cette erreur est survenue
//          -> ...
//          -> ...
function printPostsSidebar(redditPosts) {
    redditPosts.forEach((item) => {
        item.data.title = item.data.title.toUpperCase();
    })

    const posts = redditPosts.map((item, index) => {
        return `
            <li>
                <a href='${item.data.url}'>
                    <h6>${item.data.title}</h6>
                </a>
            </li>
        `;
    })

    sidebar.querySelector('ul').innerHTML = posts.join('');
}

/**
 * Perform ajax request to specified URL
 * 
 * @param string endpointURL URL to target
 * @return void
 */
function getPosts(endpointURL) {
    axios.get(endpointURL)
        .then( (response) => {
        const redditPosts = response.data.data.children;
            printPostsSidebar(redditPosts);
            printPosts(redditPosts);
        })
        .catch( (error) => {
            console.error('Une erreur est survenue : ', error);
        })
}