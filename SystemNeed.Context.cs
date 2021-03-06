﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class NeedEntities : DbContext
    {
        public NeedEntities()
            : base("name=NeedEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Need> Needs { get; set; }
        public virtual DbSet<NeedProject> NeedProjects { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<NeedType> NeedTypes { get; set; }
        public virtual DbSet<ProjectType> ProjectTypes { get; set; }
    
        public virtual int SelectNeedCPD(Nullable<int> id, Nullable<int> needID, Nullable<int> cpdID)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            var needIDParameter = needID.HasValue ?
                new ObjectParameter("needID", needID) :
                new ObjectParameter("needID", typeof(int));
    
            var cpdIDParameter = cpdID.HasValue ?
                new ObjectParameter("cpdID", cpdID) :
                new ObjectParameter("cpdID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("SelectNeedCPD", idParameter, needIDParameter, cpdIDParameter);
        }
    }
}
