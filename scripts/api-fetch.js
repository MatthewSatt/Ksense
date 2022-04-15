const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET"
    })
    if(res.ok){
        const users = await res.json()
        return users
    }
}

const getUserPosts = async (userId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    if(res.ok) {
      const posts = await res.json()
      return posts
    }
  };


const renderUserPosts = async (userId) => {
    const users = await getUsers()
    const thisUser = users.find(user => user.id === userId)
    const posts = await getUserPosts(userId)
    const postDiv = document.querySelector(".posts")
    postDiv.id = 'eachpost'
    postDiv.innerHTML = ''
    const userName = document.createElement('h2')
    userName.id = 'userName'
    userName.innerText = `${thisUser.name}'s Posts`
    postDiv.appendChild(userName)
    posts.forEach((post) => {
        const onePost = document.createElement('div')
        onePost.id = 'post'
        const postTitle = document.createElement('h2')
        postTitle.id = 'posttitle'
        postTitle.innerText = post.title
        const postBody = document.createElement('p')
        postBody.id = 'postbody'
        postBody.innerText = post.body
        onePost.appendChild(postTitle)
        onePost.appendChild(postBody)
        postDiv.appendChild(onePost)

    })
}

const renderUsers = async () => {
    const users = await getUsers()
    const userDiv = document.querySelector('.users')
    users.forEach((user) => {
        const oneUser = document.createElement('div')
        oneUser.id = 'user'
        oneUser.innerHTML = user.name
        userDiv.appendChild(oneUser)
        oneUser.addEventListener('click', async () => {
            await renderUserPosts(user.id)
        })
    })
}

renderUsers()
