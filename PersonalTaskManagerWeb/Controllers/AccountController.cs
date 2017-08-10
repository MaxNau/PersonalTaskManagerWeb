using Microsoft.AspNet.Identity;
using PersonalTaskManagerWeb.Models;
using PersonalTaskManagerWeb.Repositories;
using System.Threading.Tasks;
using System.Web.Http;
using System.Net.Http;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Net;
using System.Web.Security;
using System.Web;

namespace PersonalTaskManagerWeb.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private AuthRepository repository = null;

        public AccountController()
        {
            repository = new AuthRepository();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await repository.RegisterUser(user);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login(User user)
        {
            IdentityUser identity = await repository.FindUser(user.Name, user.Password);

            if (identity != null)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created, true);
                FormsAuthentication.SetAuthCookie(user.Name, false);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        public IHttpActionResult IsAuthorized()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return Ok();
            return Ok((HttpContext.Current.User != null) && HttpContext.Current.User.Identity.IsAuthenticated);
        }

        [HttpPost]
        [Route("logout")]
        public IHttpActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return Ok();
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repository.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
