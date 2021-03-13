package com.kms.openapi_server.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonValue
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
 * @param userId 
 * @param emoji 
 */
data class PostReactionDto(

    @get:NotNull  
    @field:JsonProperty("objectId") val objectId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("postId") val postId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("userId") val userId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("emoji") val emoji: PostReactionDto.Emoji
) {

    /**
    * 
    * Values: THUMBUP
    */
    enum class Emoji(val value: kotlin.String) {
    
        @JsonProperty("thumbup") THUMBUP("thumbup");
    
    }

}

