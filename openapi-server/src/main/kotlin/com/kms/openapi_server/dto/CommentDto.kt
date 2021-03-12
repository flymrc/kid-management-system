package com.kms.openapi_server.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import javax.validation.constraints.DecimalMax
import javax.validation.constraints.DecimalMin
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size
import javax.validation.Valid

/**
 * 
 * @param objectId 
 * @param postId 
 * @param authorId 
 * @param content 
 * @param parentCommentId 
 */
data class CommentDto(

    @get:NotNull  
    @field:JsonProperty("objectId") val objectId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("postId") val postId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("authorId") val authorId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("content") val content: kotlin.String,

    @field:JsonProperty("parentCommentId") val parentCommentId: kotlin.String? = null
) {

}

