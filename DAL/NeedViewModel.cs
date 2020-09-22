using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class NeedViewModel
    {
      
     
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> NeedDate { get; set; }
        public Nullable<int> NeedTypeID { get; set; }
        public Nullable<int> LocationID { get; set; }

        public Nullable<int> NeedRiskID { get; set; }
        public System.DateTime LastModified { get; set; }
        public string User { get; set; }

        public List<Project> ProjectList { get; set; }


    }
}
