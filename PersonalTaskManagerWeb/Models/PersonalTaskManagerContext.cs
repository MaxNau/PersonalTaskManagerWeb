using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace PersonalTaskManagerWeb.Models
{
    public class PersonalTaskManagerContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public PersonalTaskManagerContext()
            :base("PersonalTaskManagerContext")
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<PersonalTaskManagerContext>());
        }
    }
}