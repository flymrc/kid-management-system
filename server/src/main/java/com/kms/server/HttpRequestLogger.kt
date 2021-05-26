package com.kms.server

import org.apache.logging.log4j.LogManager
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.FilterConfig
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.annotation.WebFilter
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebFilter(urlPatterns = ["/*"], description = "Http Request logger")
class HttpRequestLogger : Filter {
    private val logger = LogManager.getLogger(HttpRequestLogger::class.java)

    override fun init(filterConfig: FilterConfig?) {
    }

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        check(request is HttpServletRequest)
        check(response is HttpServletResponse)

        chain.doFilter(request, response)

        logger.info("${request.method} ${request.requestURI} ${response.status}")
    }

    override fun destroy() {
    }
}
