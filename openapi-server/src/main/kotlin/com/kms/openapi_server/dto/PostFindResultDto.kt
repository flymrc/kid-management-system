package com.kms.openapi_server.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import com.kms.openapi_server.dto.PostExtendedDto
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
 * @param posts 
 */
data class PostFindResultDto(

    @get:NotNull  
    @field:Valid
    @field:JsonProperty("posts") val posts: kotlin.collections.List<PostExtendedDto>
) {

}

