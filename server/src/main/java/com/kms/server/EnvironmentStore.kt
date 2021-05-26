package com.kms.server

object EnvironmentStore {
    val LC_APP_ID = getEnv("LEANCLOUD_APP_ID")
    val LC_APP_MASTER_KEY = getEnv("LEANCLOUD_APP_MASTER_KEY")

    // Aliyun
    val ALIYUN_VOD_ACCESS_KEY_ID: String = getEnv("ALIYUN_VOD_ACCESS_KEY_ID")
    val ALIYUN_VOD_ACCESS_KEY_SECRET: String = getEnv("ALIYUN_VOD_ACCESS_KEY_SECRET")

    private fun getEnv(key: String): String {
        return System.getenv(key) ?: "FAKE_VALUE"
    }
}
