import apiClient from "./apiClient";

/*
|--------------------------------------------------------------------------
| API Endpoints
|--------------------------------------------------------------------------
*/

const USERS_URL =
  "https://jsonplaceholder.typicode.com/users";

const POSTS_URL =
  "https://jsonplaceholder.typicode.com/posts";

const COMMENTS_URL =
  "https://dummyjson.com/comments";

/*
|--------------------------------------------------------------------------
| Fetch Users
|--------------------------------------------------------------------------
*/

export const fetchUsers = async () => {
  const response =
    await apiClient.get(USERS_URL);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Fetch Posts
|--------------------------------------------------------------------------
*/

export const fetchPosts = async () => {
  const response =
    await apiClient.get(POSTS_URL);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Fetch Comments
|--------------------------------------------------------------------------
*/

export const fetchComments = async () => {
  const response =
    await apiClient.get(COMMENTS_URL);

  return response.data.comments;
};

/*
|--------------------------------------------------------------------------
| Fetch Dashboard Data
|--------------------------------------------------------------------------
|
| Gets all APIs together using Promise.all()
|
*/

export const fetchDashboardData =
  async () => {
    try {
      const [
        usersResponse,
        postsResponse,
        commentsResponse,
      ] = await Promise.all([
        apiClient.get(USERS_URL),
        apiClient.get(POSTS_URL),
        apiClient.get(COMMENTS_URL),
      ]);

      return {
        users: usersResponse.data,
        posts: postsResponse.data,
        comments:
          commentsResponse.data.comments,

        stats: {
          totalUsers:
            usersResponse.data.length,

          totalPosts:
            postsResponse.data.length,

          totalComments:
            commentsResponse.data.comments
              .length,
        },
      };
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Refresh Dashboard
|--------------------------------------------------------------------------
*/

export const refreshDashboard =
  fetchDashboardData;