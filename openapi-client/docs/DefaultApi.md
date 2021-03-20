# DefaultApi

All URIs are relative to *https://jdp8jr1r.lc-cn-n1-shared.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postFindGet**](DefaultApi.md#postFindGet) | **GET** post/find | # Get post list
[**postIdGet**](DefaultApi.md#postIdGet) | **GET** post/{id} | # Get post by id
[**postPidCommentFindGet**](DefaultApi.md#postPidCommentFindGet) | **GET** post/{pid}/comment/find | # Get comment list
[**postPidCommentPost**](DefaultApi.md#postPidCommentPost) | **POST** post/{pid}/comment | # Create a comment
[**postPidReactionGet**](DefaultApi.md#postPidReactionGet) | **GET** post/{pid}/reaction | # Get reaction for post and user
[**postPidReactionIdDelete**](DefaultApi.md#postPidReactionIdDelete) | **DELETE** post/{pid}/reaction/{id} | # Delete reaction by id
[**postPidReactionPost**](DefaultApi.md#postPidReactionPost) | **POST** post/{pid}/reaction | # Create a post reaction
[**postPost**](DefaultApi.md#postPost) | **POST** post | # Create a post



# Get post list

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
val webService = apiClient.createWebservice(DefaultApi::class.java)
val sortBy : kotlin.String = sortBy_example // kotlin.String | 
val before : java.time.Instant = 2013-10-20T19:20:30+01:00 // java.time.Instant | 
val after : java.time.Instant = 2013-10-20T19:20:30+01:00 // java.time.Instant | 
val limit : kotlin.Int = 56 // kotlin.Int | 
val parentPostId : kotlin.String = parentPostId_example // kotlin.String | 
val development : kotlin.Boolean = true // kotlin.Boolean | 

launch(Dispatchers.IO) {
    val result : PostFindResultDto = webService.postFindGet(sortBy, before, after, limit, parentPostId, development)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sortBy** | **kotlin.String**|  |
 **before** | **java.time.Instant**|  | [optional]
 **after** | **java.time.Instant**|  | [optional]
 **limit** | **kotlin.Int**|  | [optional]
 **parentPostId** | **kotlin.String**|  | [optional]
 **development** | **kotlin.Boolean**|  | [optional] [default to false]

### Return type

[**PostFindResultDto**](PostFindResultDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


# Get post by id

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
val webService = apiClient.createWebservice(DefaultApi::class.java)
val id : kotlin.String = id_example // kotlin.String | post id

launch(Dispatchers.IO) {
    val result : PostExtendedDto = webService.postIdGet(id)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **kotlin.String**| post id |

### Return type

[**PostExtendedDto**](PostExtendedDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


# Get comment list

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
val webService = apiClient.createWebservice(DefaultApi::class.java)
val pid : kotlin.String = pid_example // kotlin.String | Id from Post.
val before : java.time.Instant = 2013-10-20T19:20:30+01:00 // java.time.Instant | 
val after : java.time.Instant = 2013-10-20T19:20:30+01:00 // java.time.Instant | 
val limit : kotlin.Int = 56 // kotlin.Int | 

launch(Dispatchers.IO) {
    val result : CommentFindResultDto = webService.postPidCommentFindGet(pid, before, after, limit)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pid** | **kotlin.String**| Id from Post. |
 **before** | **java.time.Instant**|  | [optional]
 **after** | **java.time.Instant**|  | [optional]
 **limit** | **kotlin.Int**|  | [optional]

### Return type

[**CommentFindResultDto**](CommentFindResultDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


# Create a comment

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
apiClient.setBearerToken("TOKEN")
val webService = apiClient.createWebservice(DefaultApi::class.java)
val pid : kotlin.String = pid_example // kotlin.String | Id from Post.
val authorId : kotlin.String = authorId_example // kotlin.String | 
val content : kotlin.String = content_example // kotlin.String | 
val parentCommentId : kotlin.String = parentCommentId_example // kotlin.String | 

launch(Dispatchers.IO) {
    val result : CommentDto = webService.postPidCommentPost(pid, authorId, content, parentCommentId)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pid** | **kotlin.String**| Id from Post. |
 **authorId** | **kotlin.String**|  |
 **content** | **kotlin.String**|  |
 **parentCommentId** | **kotlin.String**|  | [optional]

### Return type

[**CommentDto**](CommentDto.md)

### Authorization


Configure leancloudAuth:
    ApiClient().setBearerToken("TOKEN")

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


# Get reaction for post and user

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
val webService = apiClient.createWebservice(DefaultApi::class.java)
val pid : kotlin.String = pid_example // kotlin.String | Id from Post.
val userId : kotlin.String = userId_example // kotlin.String | 

launch(Dispatchers.IO) {
    val result : PostReactionListResultDto = webService.postPidReactionGet(pid, userId)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pid** | **kotlin.String**| Id from Post. |
 **userId** | **kotlin.String**|  |

### Return type

[**PostReactionListResultDto**](PostReactionListResultDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


# Delete reaction by id

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
val webService = apiClient.createWebservice(DefaultApi::class.java)
val pid : kotlin.String = pid_example // kotlin.String | Id from Post.
val id : kotlin.String = id_example // kotlin.String | post reaction id

launch(Dispatchers.IO) {
    val result : kotlin.Boolean = webService.postPidReactionIdDelete(pid, id)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pid** | **kotlin.String**| Id from Post. |
 **id** | **kotlin.String**| post reaction id |

### Return type

**kotlin.Boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


# Create a post reaction

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
apiClient.setBearerToken("TOKEN")
val webService = apiClient.createWebservice(DefaultApi::class.java)
val pid : kotlin.String = pid_example // kotlin.String | Id from Post.
val userId : kotlin.String = userId_example // kotlin.String | 
val emoji : kotlin.String = emoji_example // kotlin.String | 

launch(Dispatchers.IO) {
    val result : PostReactionDto = webService.postPidReactionPost(pid, userId, emoji)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pid** | **kotlin.String**| Id from Post. |
 **userId** | **kotlin.String**|  |
 **emoji** | **kotlin.String**|  |

### Return type

[**PostReactionDto**](PostReactionDto.md)

### Authorization


Configure leancloudAuth:
    ApiClient().setBearerToken("TOKEN")

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


# Create a post

### Example
```kotlin
// Import classes:
//import org.openapitools.client.*
//import org.openapitools.client.infrastructure.*
//import com.kms.openapi.dto.*

val apiClient = ApiClient()
apiClient.setBearerToken("TOKEN")
val webService = apiClient.createWebservice(DefaultApi::class.java)
val authorId : kotlin.String = authorId_example // kotlin.String | 
val title : kotlin.String = title_example // kotlin.String | 
val content : kotlin.String = content_example // kotlin.String | 
val parentPostId : kotlin.String = parentPostId_example // kotlin.String | 
val development : kotlin.Boolean = true // kotlin.Boolean | 

launch(Dispatchers.IO) {
    val result : PostDto = webService.postPost(authorId, title, content, parentPostId, development)
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorId** | **kotlin.String**|  |
 **title** | **kotlin.String**|  |
 **content** | **kotlin.String**|  |
 **parentPostId** | **kotlin.String**|  | [optional]
 **development** | **kotlin.Boolean**|  | [optional] [default to false]

### Return type

[**PostDto**](PostDto.md)

### Authorization


Configure leancloudAuth:
    ApiClient().setBearerToken("TOKEN")

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

