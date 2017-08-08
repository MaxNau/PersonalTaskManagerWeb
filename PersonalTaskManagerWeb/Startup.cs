﻿using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PersonalTaskManagerWeb.Providers;
using System;
using System.Web.Http;

[assembly: OwinStartup(typeof(PersonalTaskManagerWeb.Startup))]
namespace PersonalTaskManagerWeb
{
    public class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthServerOptions;

        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration httpConfig = new HttpConfiguration();
            WebApiConfig.Register(httpConfig);
            app.UseWebApi(httpConfig);
            ConfigureOAuth(app);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AuthorizeEndpointPath = new PathString("/api/account/login"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(3),
                Provider = new SimpleAuthorizationServerProvider()
            };
            
            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

        }
    }
}