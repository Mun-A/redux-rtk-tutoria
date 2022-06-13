import { useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
  const [limit, setLimit] = useState(100);
  const {
    data: posts,
    isLoading,
    isError,
  } = postAPI.useFetchAllPostsQuery(limit); // Также есть в свойствах refetch - позволяет отправить запрос. И в параметрах limit, { pollingInterval } через указанный интервал отправляет запрос
  const [createPost, { error: createError, isLoading: isCreateLoading }] =
    postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLimit(3);
  //   }, 2000);
  // }, []);

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <div className="post__list">
        <button onClick={handleCreate}>Add new post</button>
        {(isLoading || isCreateLoading) && <h1>Идёт загрузка...</h1>}
        {(isError || createError) && (
          <h1>Произошла ошибка при загрузке постов</h1>
        )}
        {posts &&
          posts.map((post) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
