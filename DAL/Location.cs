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
    
    public partial class Location
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Nullable<int> LocationType { get; set; }
        public Nullable<int> ParentLocationID { get; set; }
        public System.Data.Entity.Spatial.DbGeography Latitude { get; set; }
        public System.Data.Entity.Spatial.DbGeography Longitude { get; set; }
        public System.Data.Entity.Spatial.DbGeometry Polygon { get; set; }
    
        public virtual LocationType LocationType1 { get; set; }
    }
}