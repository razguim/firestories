import {apiSlice} from './apiSlice'
const USER_URL = '/api/users'
const UPLOAD_URL = '/api/upload'
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/auth`,
                method:'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query:(data)=>({
                url:`${USER_URL}`,
                method:'POST',
                body: data
            }),
        }),
        createMod: builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/mod`,
                method:'POST',
                body: data
            }),
        }),
        followUnfollowUser : builder.mutation({
            query:(username)=>({
                url:`${USER_URL}/follow/${username}`,
                method:'PATCH',
                body:username
            }),
            invalidatesTags:['User']
        }),
        getUserFollowing : builder.query({
            query:(username)=>({
                url:`${USER_URL}/${username}/following`,
            }),
            providesTags:['Users']
        }),
        getUserFollowers : builder.query({
            query:(username)=>({
                url:`${USER_URL}/${username}/followers`,
            }),
            providesTags:['Users']
        }),
        getUserFavorites : builder.query({
            query:(username)=>({
                url:`${USER_URL}/${username}/favorites`,
            }),
            providesTags:['Users']
        }),
        getUserByUserName : builder.query({
            query:(username)=>({
                url:`${USER_URL}/${username}`,
            }),
            providesTags:['User']
        }),
        uploadUserAvatar: builder.mutation({
            query:(data) =>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data,
            }),
        }),
        updateUser: builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method:'PUT',
                body: data
            }),
            invalidatesTags:['User'],
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST',
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
              url: `${USER_URL}/${userId}`,
              method: "DELETE",
            }),
            invalidatesTags:['Users']
          }),
          banUser: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/ban`,
              method: "PATCH",
              body:data
            }),
            invalidatesTags:['Users']
          }),
    })
})

export const {useLoginMutation,useRegisterMutation,useCreateModMutation,useFollowUnfollowUserMutation,useUpdateUserMutation,useUploadUserAvatarMutation,useGetUserByUserNameQuery,useGetUserFollowingQuery,useGetUserFollowersQuery,useGetUserFavoritesQuery,useDeleteUserMutation,useBanUserMutation,useLogoutMutation} = usersApiSlice