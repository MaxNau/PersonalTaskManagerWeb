using System;
using System.Collections.Generic;

namespace PersonalTaskManagerWeb.Models
{
    public class Task
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime LastModified { get; set; }
        public virtual ICollection<Tag> Tag { get; set; }
    }
}