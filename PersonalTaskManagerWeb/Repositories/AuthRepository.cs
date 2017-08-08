using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PersonalTaskManagerWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PersonalTaskManagerWeb.Repositories
{
    public class AuthRepository : IDisposable
    {
        private PersonalTaskManagerContext context;
        private UserManager<IdentityUser> userManager;

        public AuthRepository()
        {
            context = new PersonalTaskManagerContext();
            userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(context));
        }

        public async Task<IdentityResult> RegisterUser(User user)
        {
            IdentityUser userIdentity = new IdentityUser
            {
                UserName = user.Name
            };

            var result = await userManager.CreateAsync(userIdentity, user.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser userIdentity = await userManager.FindAsync(userName, password);

            return userIdentity;
        }

        public void Dispose()
        {
            context.Dispose();
            userManager.Dispose();
        }
    }
}