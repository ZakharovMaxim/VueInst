import post from './post'
import token from './token'
import App from './App'
import User from './User'
import NewPost from './newPost'
export default {
  ...post,
  ...token,
  ...App,
  ...User,
  ...NewPost
}
