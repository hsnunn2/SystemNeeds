using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class NeedViewModel
    {
        
        public NeedProject NeedProject { get; set; }
        public Project Project { get; set; }
        public Need Need { get; set; }
        public List<Project> ProjectList { get; set; }
    }
}
