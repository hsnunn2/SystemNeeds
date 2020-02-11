using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;

namespace NeedAPI.Controllers
{
    public class NeedViewModelController : ApiController
    {
        NeedEntities db = new NeedEntities();
        // GET: api/NeedViewModel
        public IEnumerable<NeedViewModel> GetVM()
        {

            List<NeedViewModel> vmList = new List<NeedViewModel>();
            NeedViewModel vm = null;

            List<NeedProject> npList = db.NeedProjects.ToList();
            List<Need> nList = db.Needs.ToList();
            List<Project> pList = db.Projects.ToList();


            foreach (var np in npList)
            {

                vm = new NeedViewModel();
                vm.ProjectList = new List<Project>();
                vm.NeedProject = np;
                
                foreach(var n in nList)
                {
                    if (n.ID == np.NeedID)
                    {
                        vm.Need = n;

                        foreach(var p in pList)
                        {
                            if (p.Id == np.ProjectID)
                            {
                                vm.ProjectList.Add(p);
                            }
                        }
                    }
                }
                vmList.Add(vm);

            }
            
            return vmList;
        }

        // GET: api/NeedViewModel/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/NeedViewModel
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/NeedViewModel/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/NeedViewModel/5
        public void Delete(int id)
        {
        }
    }
}
