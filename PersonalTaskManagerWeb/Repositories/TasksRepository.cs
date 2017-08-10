using PersonalTaskManagerWeb.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalTaskManagerWeb.Repositories
{
    public class TasksRepository : IDisposable
    {
        private PersonalTaskManagerContext context;

        public TasksRepository()
        {
            context = new PersonalTaskManagerContext();
        }

        public async Task<ICollection<Models.Task>> GetAll()
        {
            return await context.Tasks.Include(tsk => tsk.Tags).ToListAsync();
        }

        public async Task<Models.Task> GetTaskById(int id)
        {
            return await context.Tasks.Include(tsk => tsk.Tags).SingleOrDefaultAsync(tsk => tsk.Id == id);
        }

        public async Task<int> Add(Models.Task task)
        {
            context.Tasks.Add(task);
            return await context.SaveChangesAsync();
        }

        public async Task<int> Update(Models.Task task)
        {
            context.Tasks.Attach(task);
            context.Entry(task).State = EntityState.Modified;
            return await context.SaveChangesAsync();
        }

        public async Task<int> Remove(int id)
        {
            var taskToRemove = await context.Tasks.SingleOrDefaultAsync(tsk => tsk.Id == id);
            context.Entry(taskToRemove).State = EntityState.Deleted;
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}