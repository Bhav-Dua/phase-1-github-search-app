const userList = document.querySelector('#user-list');
const repoList = document.querySelector('#repos-list');

document.querySelector('#github-form').addEventListener('submit', handleSearch);

function handleSearch(e) {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${document.querySelector('#search').value}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => searchUser(json))
}

function searchUser(users) {
    userList.replaceChildren();
    users.items.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.login}  (${user.html_url})`
        li.addEventListener('click', () => {
            fetch(`${user.repos_url}`, {
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then(resp => resp.json())
            .then(json => searchRepo(json))
        });
        userList.appendChild(li);
    })
}

function searchRepo(repos) {
    repoList.replaceChildren();
    repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = `${repo.name}   (${repo.html_url})`
        repoList.appendChild(li);
    })
}