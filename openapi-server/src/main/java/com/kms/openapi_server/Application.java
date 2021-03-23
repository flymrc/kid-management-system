package com.kms.openapi_server;

import static com.kms.common.storage.InitKt.initializeModels;

import cn.leancloud.AVCloud;
import cn.leancloud.AVLogger;
import cn.leancloud.AVObject;
import cn.leancloud.LeanEngine;
import cn.leancloud.core.AVOSCloud;
import cn.leancloud.core.GeneralRequestSignature;
import com.kms.common.storage.User;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(
    basePackages = {
      "com.kms.openapi_server",
    })
public class Application extends SpringBootServletInitializer {

  private static final String appId = System.getenv("LEANCLOUD_APP_ID");
  private static final String appKey = System.getenv("LEANCLOUD_APP_KEY");
  private static final String appMasterKey = System.getenv("LEANCLOUD_APP_MASTER_KEY");
  private static final String hookKey = System.getenv("LEANCLOUD_APP_HOOK_KEY");
  private static final String appEnv = System.getenv("LEANCLOUD_APP_ENV");
  private static final String haveStaging = System.getenv("LEAN_CLI_HAVE_STAGING");
  private static boolean initialized = false;

  public static void main(String[] args) {
    final Logger logger = LogManager.getLogger(Application.class);
    logger.info("KMS OpenAPI Server init from main");

    init();
    SpringApplication.run(Application.class, args);
  }

  private static void init() {
    synchronized (Application.class) {
      if (initialized) {
        return;
      }
    }
    initialized = true;
    AVOSCloud.setLogLevel(AVLogger.Level.DEBUG);

    if ("development".equals(appEnv) && "true".equals(haveStaging) || "stage".equals(appEnv)) {
      AVCloud.setProductionMode(false);
    }

    // Initializes application.
    // Ensure that you only perform one initialization in the whole project.
    LeanEngine.initialize(appId, appKey, appMasterKey, hookKey);

    // Uses masterKey for the whole project.
    GeneralRequestSignature.setMasterKey(appMasterKey);

    // We only initialize models as DAO for openapi server.
    initializeModels();
    AVObject.registerSubclass(User.class);
  }

  @Override
  public void onStartup(ServletContext servletContext) throws ServletException {
    super.onStartup(servletContext);

    logger.info("KMS OpenAPI Server init from onStartup");
    init();
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(Application.class);
  }
}
