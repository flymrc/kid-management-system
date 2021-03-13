package com.kms.openapi.api

import org.openapitools.client.infrastructure.CollectionFormats.*
import retrofit2.http.*
import retrofit2.Response
import okhttp3.RequestBody

import com.kms.openapi.dto.CommentDto
import com.kms.openapi.dto.CommentFindResultDto
import com.kms.openapi.dto.PostDto
import com.kms.openapi.dto.PostExtendedDto
import com.kms.openapi.dto.PostFindResultDto
import com.kms.openapi.dto.PostReactionDto
import com.kms.openapi.dto.PostReactionListResultDto

interface DefaultApi {
    /**
     * # Get post list
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param sortBy  
     * @param before  (optional)
     * @param after  (optional)
     * @param limit  (optional)
     * @param parentPostId  (optional)
     * @param development  (optional, default to false)
     * @return [PostFindResultDto]
     */
    @GET("post/find")
    suspend fun postFindGet(@Query("sortBy") sortBy: kotlin.String, @Query("before") before: java.time.Instant? = null, @Query("after") after: java.time.Instant? = null, @Query("limit") limit: kotlin.Int? = null, @Query("parentPostId") parentPostId: kotlin.String? = null, @Query("development") development: kotlin.Boolean? = null): Response<PostFindResultDto>

    /**
     * # Get post by id
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param id post id 
     * @return [PostExtendedDto]
     */
    @GET("post/{id}")
    suspend fun postIdGet(@Path("id") id: kotlin.String): Response<PostExtendedDto>

    /**
     * # Get comment list
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param pid Id from Post. 
     * @param before  (optional)
     * @param after  (optional)
     * @param limit  (optional)
     * @return [CommentFindResultDto]
     */
    @GET("post/{pid}/comment/find")
    suspend fun postPidCommentFindGet(@Path("pid") pid: kotlin.String, @Query("before") before: java.time.Instant? = null, @Query("after") after: java.time.Instant? = null, @Query("limit") limit: kotlin.Int? = null): Response<CommentFindResultDto>

    /**
     * # Create a comment
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param pid Id from Post. 
     * @param authorId  
     * @param content  
     * @param parentCommentId  (optional)
     * @return [CommentDto]
     */
    @FormUrlEncoded
    @POST("post/{pid}/comment")
    suspend fun postPidCommentPost(@Path("pid") pid: kotlin.String, @Field("authorId") authorId: kotlin.String, @Field("content") content: kotlin.String, @Query("parentCommentId") parentCommentId: kotlin.String? = null): Response<CommentDto>

    /**
     * # Get reaction for post and user
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param pid Id from Post. 
     * @param userId  
     * @return [PostReactionListResultDto]
     */
    @GET("post/{pid}/reaction")
    suspend fun postPidReactionGet(@Path("pid") pid: kotlin.String, @Query("userId") userId: kotlin.String): Response<PostReactionListResultDto>

    /**
     * # Delete reaction by id
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param pid Id from Post. 
     * @param id post reaction id 
     * @return [kotlin.Boolean]
     */
    @DELETE("post/{pid}/reaction/{id}")
    suspend fun postPidReactionIdDelete(@Path("pid") pid: kotlin.String, @Path("id") id: kotlin.String): Response<kotlin.Boolean>

    /**
     * # Create a post reaction
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param pid Id from Post. 
     * @param userId  
     * @param emoji  
     * @return [PostReactionDto]
     */
    @FormUrlEncoded
    @POST("post/{pid}/reaction")
    suspend fun postPidReactionPost(@Path("pid") pid: kotlin.String, @Field("userId") userId: kotlin.String, @Field("emoji") emoji: kotlin.String): Response<PostReactionDto>

    /**
     * # Create a post
     * 
     * Responses:
     *  - 200: Success
     * 
     * @param authorId  
     * @param title  
     * @param content  
     * @param parentPostId  (optional)
     * @param development  (optional, default to false)
     * @return [PostDto]
     */
    @FormUrlEncoded
    @POST("post")
    suspend fun postPost(@Field("authorId") authorId: kotlin.String, @Field("title") title: kotlin.String, @Field("content") content: kotlin.String, @Query("parentPostId") parentPostId: kotlin.String? = null, @Query("development") development: kotlin.Boolean? = null): Response<PostDto>

}
