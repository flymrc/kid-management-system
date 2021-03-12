package com.kms.common.storage

import cn.leancloud.AVObject

fun initializeModels() {

    AVObject.registerSubclass(Comment::class.java)

    AVObject.registerSubclass(Post::class.java)

    AVObject.registerSubclass(PostReaction::class.java)
}
