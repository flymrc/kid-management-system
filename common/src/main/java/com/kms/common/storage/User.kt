package com.kms.common.storage

import cn.leancloud.AVException
import cn.leancloud.AVFile
import cn.leancloud.AVObject
import cn.leancloud.AVUser
import cn.leancloud.annotation.AVClassName

@AVClassName("_User")
class User : AVUser() {
    companion object {
        const val KEY_NICKNAME = "name"
        const val KEY_AVATAR_FILE = "avatarFile"

        fun newPointer(objectId: String): AVUser {
            return AVObject.createWithoutData(AVUser::class.java, objectId)
        }
    }

    val defaultNickname get() = "kms${getObjectId().substring(0, 8)}"

    var nickname: String
        get() {
            val value = get(KEY_NICKNAME)
            return if (value is String) {
                value
            } else {
                throw AVException(AVException.INCORRECT_TYPE, "Invalid value, expect kotlin.String, got ${value.javaClass}")
            }
        }
        set(value) = put(KEY_NICKNAME, value)

    var avatarFile: AVFile
        get() {
            val value = get(KEY_AVATAR_FILE)
            return if (value is AVFile) {
                value
            } else {
                throw AVException(AVException.INCORRECT_TYPE, "Invalid value, expect AVFile, got ${value.javaClass}")
            }
        }
        set(value) = put(KEY_AVATAR_FILE, value)
}
