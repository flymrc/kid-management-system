package com.kms.openapi_server

import cn.leancloud.AVCloud
import cn.leancloud.AVLogger
import cn.leancloud.LeanEngine
import cn.leancloud.core.AVOSCloud
import cn.leancloud.core.GeneralRequestSignature
import com.kms.common.storage.initializeModels
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.ComponentScan
import javax.servlet.ServletContext

@SpringBootApplication
@ComponentScan(
    basePackages = [
        "com.kms.openapi_server",
    ]
)
class Application : SpringBootServletInitializer() {
    override fun onStartup(servletContext: ServletContext?) {
        super.onStartup(servletContext)
        logger.info("KMS OpenAPI Server init from onStartup")
        init()
    }

    override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
        return builder.sources(Application::class.java)
    }

    companion object {
        private val appId: String = System.getenv("LEANCLOUD_APP_ID")
        private val appKey: String = System.getenv("LEANCLOUD_APP_KEY")
        private val appMasterKey: String = System.getenv("LEANCLOUD_APP_MASTER_KEY")
        private val appEnv: String = System.getenv("LEANCLOUD_APP_ENV")
        private val haveStaging: String = System.getenv("LEAN_CLI_HAVE_STAGING")
        private var initialized = false

        @JvmStatic
        fun main(args: Array<String>) {
            val logger: org.apache.logging.log4j.Logger = org.apache.logging.log4j.LogManager.getLogger(Application::class.java)
            logger.info("KMS OpenAPI Server init from main")
            init()
            SpringApplication.run(Application::class.java, *args)
        }

        private fun init() {
            synchronized(Application::class.java) {
                if (initialized) {
                    return
                }
            }
            initialized = true
            AVOSCloud.setLogLevel(AVLogger.Level.DEBUG)
            if ("development" == appEnv && "true" == haveStaging || "stage" == appEnv) {
                AVCloud.setProductionMode(false)
            }

            // Initializes application.
            // Ensure that you only perform one initialization in the whole project.
            LeanEngine.initialize(appId, appKey, appMasterKey, "")

            // Uses masterKey for the whole project.
            GeneralRequestSignature.setMasterKey(appMasterKey)

            // We only initialize models as DAO for openapi server.
            initializeModels()
        }
    }
}
