import { apiSlice } from "./apiSlice";
const STORIES_URL = "/api/stories";
const REPORTS_URL = "/api/reports";

const UPLOAD_URL = "/api/upload";

export const storiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStories: builder.query({
      query: ({searchQuery,pageNumber}) => ({
        url: STORIES_URL,
        params:{
          searchQuery,
          pageNumber,
        },
      }),
      providesTags: ["Stories"],
      keepUnusedDataFor:5
    }),
    getFeedStories: builder.query({
      query: ({pageNumber}) => ({
        url: `${STORIES_URL}/feed`,
        params:{
          pageNumber,
        },
      }),
      providesTags: ["Stories"],
      keepUnusedDataFor:5
    }),
    getFavoriteStories: builder.query({
      query: ({pageNumber}) => ({
        url: `${STORIES_URL}/favorites`,
        params:{
          pageNumber,
        },
      }),
      providesTags: ["Stories"],
    }),
    getStory: builder.query({
      query: (storyId) => ({
        url: `${STORIES_URL}/${storyId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Story"],
    }),
    createStory: builder.mutation({
      query: (data) => ({
        url: STORIES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stories"],
    }),
    uploadStoryCover: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateStory: builder.mutation({
      query: (data) => ({
        url: `${STORIES_URL}/${data.storyId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Stories"],
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `${STORIES_URL}/${storyId}`,
        method: "DELETE",
        body: storyId,
      }),
      providesTags: ["Stories"],
    }),
    favoriteStory: builder.mutation({
      query: (storyId) => ({
        url: `${STORIES_URL}/favorite/${storyId}`,
        method: "PATCH",
        body: storyId,
      }),
      invalidatesTags: ["Stories"],
    }),
    upvoteStory: builder.mutation({
      query: (storyId) => ({
        url: `${STORIES_URL}/upvote/${storyId}`,
        method: "PATCH",
        body: storyId,
      }),
      invalidatesTags: ["Stories"],
    }),
    downvoteStory: builder.mutation({
      query: (storyId) => ({
        url: `${STORIES_URL}/downvote/${storyId}`,
        method: "PATCH",
        body: storyId,
      }),
      invalidatesTags: ["Stories"],
    }),
    
  }),
});

export const {
  useGetStoriesQuery,
  useGetFavoriteStoriesQuery,
  useGetFeedStoriesQuery,
  useGetStoryQuery,
  useCreateStoryMutation,
  useUploadStoryCoverMutation,
  useFavoriteStoryMutation,
  useUpvoteStoryMutation,
  useDownvoteStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} = storiesApiSlice;
