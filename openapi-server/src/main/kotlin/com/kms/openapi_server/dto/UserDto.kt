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
 * @param nickname 
 * @param avatarUrl 
 */
data class UserDto(

    @get:NotNull  
    @field:JsonProperty("objectId") val objectId: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("nickname") val nickname: kotlin.String,

    @get:NotNull  
    @field:JsonProperty("avatarUrl") val avatarUrl: kotlin.String
) {

}

