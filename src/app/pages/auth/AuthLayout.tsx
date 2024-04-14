import { useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../../_metronic/helpers"

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root")
    if (root) {
      root.style.height = "100vh"
    }
    return () => {
      if (root) {
        root.style.height = "auto"
      }
    }
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="w-100 w-lg-50">
        <div className="d-flex justify-content-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
