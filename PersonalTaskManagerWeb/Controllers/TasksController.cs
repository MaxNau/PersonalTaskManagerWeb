using PersonalTaskManagerWeb.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace PersonalTaskManagerWeb.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        private TasksRepository repository = null;

        public TasksController()
        {
            repository = new TasksRepository();
        }

        public async Task<ICollection<Models.Task>> GetTasks()
        {
            return await repository.GetAll();
        }

        public async Task<Models.Task> GetTask(int id)
        {
            return await repository.GetTaskById(id);
        }

        public async Task<IHttpActionResult> PostTask(Models.Task task)
        {
            await repository.Add(task);
            return Ok();
        }

        [HttpDelete]
        public async Task<IHttpActionResult> DeleteTask(int id)
        {
            await repository.Remove(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IHttpActionResult> PutTask([FromUri] int id, Models.Task task)
        {
            await repository.Update(task);
            return Ok();
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
