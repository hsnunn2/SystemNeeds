using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using System.Web.Http.Cors;


namespace NeedAPI.Controllers
{
   // [EnableCors(origins: "https://localhost/", headers: "*", methods: "*")]
    public class NeedViewModelController : ApiController
    {
        NeedEntities db = new NeedEntities();
        // GET: api/NeedViewModel

        public HttpResponseMessage GetVM()
        {

            List<NeedViewModel> vmList = new List<NeedViewModel>();
            NeedViewModel vm = null;

            List<NeedProject> npList = db.NeedProjects.ToList();
            List<Need> nList = db.Needs.ToList();
            List<Project> pList = db.Projects.ToList();

            foreach (var n in nList)
            {

                vm = new NeedViewModel();
                vm.ID = n.ID;
                vm.LastModified = n.LastModified;
                vm.LocationID = n.LocationID;
                vm.Name = n.Name;
                vm.Description = n.Description;
                vm.NeedDate = n.NeedDate;
                vm.NeedTypeID = n.NeedTypeID;
                vm.User = n.User;
                vm.ProjectList = new List<Project>();
               
                /*foreach (var np in npList)
                {
                    if (vm.ID == np.NeedID)
                    {
                        foreach (var p in pList)
                        {
                            if (p.ID == np.ProjectID)
                            {
                                vm.ProjectList.Add(p);
                            }
                        }
                    }
                }
                */
                vmList.Add(vm);
            }
            return Request.CreateResponse(HttpStatusCode.OK, vmList, Configuration.Formatters.JsonFormatter);
           // return vmList;
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
