package com.kms.server

import cn.leancloud.AVCloud
import cn.leancloud.AVLogger
import cn.leancloud.LeanEngine
import cn.leancloud.core.AVOSCloud
import cn.leancloud.core.GeneralRequestSignature
import com.kms.server.api.initializeApi
import com.kms.server.functions.initializeFunction
import org.apache.logging.log4j.LogManager
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.annotation.WebListener

@WebListener
class AppInitListener : ServletContextListener {
    private val appId = EnvironmentStore.LC_APP_ID
    private val appKey = System.getenv("LEANCLOUD_APP_KEY")
    private val appMasterKey = EnvironmentStore.LC_APP_MASTER_KEY
    private val hookKey = System.getenv("LEANCLOUD_APP_HOOK_KEY")
    private val appEnv = System.getenv("LEANCLOUD_APP_ENV")
    private val haveStaging = System.getenv("LEAN_CLI_HAVE_STAGING")

    override fun contextDestroyed(arg0: ServletContextEvent) {}
    override fun contextInitialized(arg0: ServletContextEvent) {
        logger.info("LeanEngine app init.")

        // Enables debug logging.
        AVOSCloud.setLogLevel(AVLogger.Level.DEBUG)

        // Registers subclass.
        if ("development" == appEnv && "true" == haveStaging || "stage" == appEnv) {
            AVCloud.setProductionMode(false)
        }

        // Initializes application.
        // Ensure that you only perform one initialization in the whole project.
        LeanEngine.initialize(appId, appKey, appMasterKey, hookKey)

        // Uses masterKey for the whole project.
        GeneralRequestSignature.setMasterKey(appMasterKey)

        initializeApi()
        initializeFunction()
    }

    companion object {
        private val logger = LogManager.getLogger(AppInitListener::class.java)
    }
}
