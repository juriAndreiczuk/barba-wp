import Page from './../core/Page'

const posts = (val) => {
  const Posts = []
  for (const item of val) {
    Posts.push(new Page({
      pageName: `post-${item}`,
      beforeEnter: () => {
      },
      afterEnter: () => {
      }
    }))
  }
  return Posts
}

export default posts
