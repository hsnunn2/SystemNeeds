//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Project
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> InServiceDate { get; set; }
        public Nullable<System.DateTime> LastModified { get; set; }
        public string User { get; set; }
        public Nullable<int> ProjectType { get; set; }
    }
}