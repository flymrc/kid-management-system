package com.kms.common.storage

import cn.leancloud.AVObject
import com.kms.common.storage.Comment
import com.kms.common.storage.Post
import com.kms.common.storage.PostReaction

fun initializeModels() {

    AVObject.registerSubclass(Comment::class.java)

    AVObject.registerSubclass(Post::class.java)

    AVObject.registerSubclass(PostReaction::class.java)
}
