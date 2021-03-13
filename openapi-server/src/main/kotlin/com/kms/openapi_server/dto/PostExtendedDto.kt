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
 * @param title 
 * @param content 
 * @param author 
 * @param countThumbup 
 * @param countComment 
 * @param countRepost 
 * @param repliedAt 
 * @param parentPostId 
 * @param rootPostId 
 * @param parentPostTitle 
 * @param createdAt 
 * @param updatedAt 
 */
data class PostExtendedDto(

    @get:NotNull  
    @field:JsonProperty("objectId") val objectId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("title") val title: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("content") val content: kotlin.String,

    @get:NotNull  
    @field:Valid
    @field:JsonProperty("author") val author: UserDto,

    @get:NotNull  
    @field:JsonProperty("countThumbup") val countThumbup: kotlin.Int,

    @get:NotNull  
    @field:JsonProperty("countComment") val countComment: kotlin.Int,

    @get:NotNull  
    @field:JsonProperty("countRepost") val countRepost: kotlin.Int,

    @get:NotNull  
    @field:JsonProperty("repliedAt") val repliedAt: java.time.Instant,

    @field:JsonProperty("parentPostId") val parentPostId: kotlin.String? = null,

    @field:JsonProperty("rootPostId") val rootPostId: kotlin.String? = null,

    @field:JsonProperty("parentPostTitle") val parentPostTitle: kotlin.String? = null,

    @field:JsonProperty("createdAt") val createdAt: java.time.Instant? = null,

    @field:JsonProperty("updatedAt") val updatedAt: java.time.Instant? = null
) {

}

