using Microsoft.AspNet.Identity;
using PersonalTaskManagerWeb.Models;
using PersonalTaskManagerWeb.Repositories;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNet.Identity.EntityFramework;

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

        public async Task<IHttpActionResult> Login(User user)
        {
            IdentityUser identity = await repository.FindUser(user.Name, user.Password);

            if (identity != null)
            {
                var token = GenerateLocalAccessTokenResponse(identity.UserName);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        private JObject GenerateLocalAccessTokenResponse(string userName)
        { 
            var tokenExpiration = TimeSpan.FromDays(3);

            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

           

            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);

          //  var accessToken = Startup.OAuthServerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                                        new JProperty("userName", userName),
                                        new JProperty("token_type", "bearer"),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
        );
            var token = JsonConvert.DeserializeObject(tokenResponse.ToString());
            identity.AddClaim(new Claim(ClaimTypes.Name, userName));
            identity.AddClaim(new Claim("AcessToken", string.Format("Bearer {0}", tokenResponse["access_token"])));

            return tokenResponse;
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
