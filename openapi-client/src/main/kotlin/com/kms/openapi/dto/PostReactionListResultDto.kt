/**
* KMS OpenAPI Backend
* No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
*
* The version of the OpenAPI document: 1.0.0
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package com.kms.openapi.dto

import com.kms.openapi.dto.PostReactionDto

import com.google.gson.annotations.SerializedName

/**
 * 
 * @param postReactions 
 */

data class PostReactionListResultDto (
    @SerializedName("postReactions")
    val postReactions: kotlin.collections.List<PostReactionDto>
)

