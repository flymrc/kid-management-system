package com.kms.server.cms.servlet

import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(name = "AdminServlet", urlPatterns = ["/kms"])
class AdminServlet : HttpServlet() {
    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        resp.addHeader("Content-Type", "text/html")
        req.getRequestDispatcher(TEMPLATE_PATH).forward(req, resp)
    }

    companion object {
        private const val TEMPLATE_PATH = "/kms/index.html"
    }
}
