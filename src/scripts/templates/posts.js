import { prototypePage } from './../core/Page'

const posts = (val) => {
  const Posts = []
  for (const item of val) {
    const post = prototypePage.produce()

    post.namespace = `post-${item}`

    Posts.push(post)
  }
  return Posts
}

export default posts
