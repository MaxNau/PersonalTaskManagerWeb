using System;
using System.Collections.Generic;

namespace PersonalTaskManagerWeb.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime LastModified { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }

        public Task()
        {
            Tags = new List<Tag>();
        }
    }
}