import post from './post'
import token from './token'
import App from './App'
import User from './User'
export default {
  ...token,
  ...post,
  ...App,
  ...User
}