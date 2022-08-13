import styles from '../styles/home.module.css'
import { Post } from '../components/index';
import Proptypes from 'prop-types';


const Home=({posts})=>{
    return (
        
        <div className={styles.home}>
        <div className={styles.postsList}>
          
          {posts.map((post) => {
            return(
              <Post post={post} key={`post-${post._id}`} />
            )
          }
            
          )}
        </div>
        {/* {auth.user && <FriendsList />} */}
      </div>
    )
}

Home.propTypes={
  posts:Proptypes.array.isRequired,
}

export default Home;

