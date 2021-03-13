# org.openapitools.client - Kotlin client library for KMS OpenAPI Backend

## Requires

* Kotlin 1.3.61
* Gradle 4.9

## Build

First, create the gradle wrapper script:

```
gradle wrapper
```

Then, run:

```
./gradlew check assemble
```

This runs all tests and packages the library.

## Features/Implementation Notes

* Supports JSON inputs/outputs, File inputs, and Form inputs.
* Supports collection formats for query parameters: csv, tsv, ssv, pipes.
* Some Kotlin and Java types are fully qualified to avoid conflicts with types defined in OpenAPI definitions.
* Implementation of ApiClient is intended to reduce method counts, specifically to benefit Android targets.

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *https://jdp8jr1r.lc-cn-n1-shared.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**postFindGet**](docs/DefaultApi.md#postfindget) | **GET** post/find | # Get post list
*DefaultApi* | [**postIdGet**](docs/DefaultApi.md#postidget) | **GET** post/{id} | # Get post by id
*DefaultApi* | [**postPidCommentFindGet**](docs/DefaultApi.md#postpidcommentfindget) | **GET** post/{pid}/comment/find | # Get comment list
*DefaultApi* | [**postPidCommentPost**](docs/DefaultApi.md#postpidcommentpost) | **POST** post/{pid}/comment | # Create a comment
*DefaultApi* | [**postPidReactionGet**](docs/DefaultApi.md#postpidreactionget) | **GET** post/{pid}/reaction | # Get reaction for post and user
*DefaultApi* | [**postPidReactionIdDelete**](docs/DefaultApi.md#postpidreactioniddelete) | **DELETE** post/{pid}/reaction/{id} | # Delete reaction by id
*DefaultApi* | [**postPidReactionPost**](docs/DefaultApi.md#postpidreactionpost) | **POST** post/{pid}/reaction | # Create a post reaction
*DefaultApi* | [**postPost**](docs/DefaultApi.md#postpost) | **POST** post | # Create a post


<a name="documentation-for-models"></a>
## Documentation for Models

 - [com.kms.openapi.dto.CommentDto](docs/CommentDto.md)
 - [com.kms.openapi.dto.CommentExtendedDto](docs/CommentExtendedDto.md)
 - [com.kms.openapi.dto.CommentFindResultDto](docs/CommentFindResultDto.md)
 - [com.kms.openapi.dto.PostDto](docs/PostDto.md)
 - [com.kms.openapi.dto.PostExtendedDto](docs/PostExtendedDto.md)
 - [com.kms.openapi.dto.PostFindResultDto](docs/PostFindResultDto.md)
 - [com.kms.openapi.dto.PostReactionDto](docs/PostReactionDto.md)
 - [com.kms.openapi.dto.PostReactionListResultDto](docs/PostReactionListResultDto.md)
 - [com.kms.openapi.dto.UserDto](docs/UserDto.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="leancloudAuth"></a>
### leancloudAuth

- **Type**: HTTP basic authentication

