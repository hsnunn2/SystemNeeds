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
        public virtual DbSet<NeedType> NeedTypes { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectType> ProjectTypes { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<LocationType> LocationTypes { get; set; }
        public virtual DbSet<NeedRisk> NeedRisks { get; set; }
        public virtual DbSet<Risk> Risks { get; set; }
        public virtual DbSet<RiskType> RiskTypes { get; set; }
    }
}
