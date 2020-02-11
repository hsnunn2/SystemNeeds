using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DAL;

namespace NeedAPI.Controllers
{
    public class NeedProjectsController : ApiController
    {
        private NeedEntities db = new NeedEntities();

        // GET: api/NeedProjects
        public IQueryable<NeedProject> GetNeedProjects()
        {
            return db.NeedProjects;
        }

        // GET: api/NeedProjects/5
        [ResponseType(typeof(NeedProject))]
        public async Task<IHttpActionResult> GetNeedProject(int id)
        {
            NeedProject needProject = await db.NeedProjects.FindAsync(id);
            if (needProject == null)
            {
                return NotFound();
            }

            return Ok(needProject);
        }

        // PUT: api/NeedProjects/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNeedProject(int id, NeedProject needProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != needProject.ID)
            {
                return BadRequest();
            }

            db.Entry(needProject).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NeedProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/NeedProjects
        [ResponseType(typeof(NeedProject))]
        public async Task<IHttpActionResult> PostNeedProject(NeedProject needProject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NeedProjects.Add(needProject);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = needProject.ID }, needProject);
        }

        // DELETE: api/NeedProjects/5
        [ResponseType(typeof(NeedProject))]
        public async Task<IHttpActionResult> DeleteNeedProject(int id)
        {
            NeedProject needProject = await db.NeedProjects.FindAsync(id);
            if (needProject == null)
            {
                return NotFound();
            }

            db.NeedProjects.Remove(needProject);
            await db.SaveChangesAsync();

            return Ok(needProject);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NeedProjectExists(int id)
        {
            return db.NeedProjects.Count(e => e.ID == id) > 0;
        }
    }
}