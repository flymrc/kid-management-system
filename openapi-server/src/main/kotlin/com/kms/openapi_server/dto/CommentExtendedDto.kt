package com.kms.openapi_server.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import com.kms.openapi_server.dto.UserDto
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
 * @param author 
 * @param content 
 * @param createdAt 
 * @param parentComment 
 */
data class CommentExtendedDto(

    @get:NotNull  
    @field:JsonProperty("objectId") val objectId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("postId") val postId: kotlin.String,

    @get:NotNull  
    @field:Valid
    @field:JsonProperty("author") val author: UserDto,

    @get:NotNull  
    @field:JsonProperty("content") val content: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("createdAt") val createdAt: java.time.Instant,

    @field:Valid
    @field:JsonProperty("parentComment") val parentComment: CommentExtendedDto? = null
) {

}

