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

import com.kms.openapi.dto.PostExtendedDto

import com.google.gson.annotations.SerializedName

/**
 * 
 * @param posts 
 */

data class PostFindResultDto (
    @SerializedName("posts")
    val posts: kotlin.collections.List<PostExtendedDto>
)

