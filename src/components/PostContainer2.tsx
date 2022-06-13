import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer2 = () => {
  const { data: posts, isLoading, isError } = postAPI.useFetchAllPostsQuery(100);

  return (
    <div>
      <div className="post__list">
        {isLoading && <h1>Идёт загрузка...</h1>}
        {isError && <h1>Произошла ошибка при загрузке постов</h1>}
        {/* {posts && posts.map((post) => <PostItem key={post.id} post={post} />)} */}
      </div>
    </div>
  );
};

export default PostContainer2;
