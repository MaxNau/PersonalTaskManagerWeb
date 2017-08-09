using System.Collections.Generic;

namespace PersonalTaskManagerWeb.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }

        public Tag()
        {
            Tasks = new List<Task>();
        }
    }
}