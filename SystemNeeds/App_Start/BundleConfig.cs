using System.Web;
using System.Web.Optimization;

namespace SystemNeeds
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/jqwidgets/jqx-all.js"));

            bundles.Add(new ScriptBundle("~/bundles/grid").Include(
                        "~/Scripts/grid.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
            "~/jqwidgets/styles/jqx.base.css",
            "~/jqwidgets/styles/jqx.arctic.css",
            "~/jqwidgets/styles/jqx.black.css",
            "~/jqwidgets/styles/jqx.bootstrap.css",
            "~/jqwidgets/styles/jqx.classic.css",
            "~/jqwidgets/styles/jqx.darkblue.css",
            "~/jqwidgets/styles/jqx.energyblue.css",
            "~/jqwidgets/styles/jqx.fresh.css",
            "~/jqwidgets/styles/jqx.highcontrast.css",
            "~/jqwidgets/styles/jqx.metro.css",
            "~/jqwidgets/styles/jqx.metrodark.css",
            "~/jqwidgets/styles/jqx.office.css",
            "~/jqwidgets/styles/jqx.orange.css",
            "~/jqwidgets/styles/jqx.shinyblack.css",
            "~/jqwidgets/styles/jqx.summer.css",
            "~/jqwidgets/styles/jqx.web.css",
            "~/jqwidgets/styles/jqx.ui-darkness.css",
            "~/jqwidgets/styles/jqx.ui-lightness.css",
            "~/jqwidgets/styles/jqx.ui-le-frog.css",
            "~/jqwidgets/styles/jqx.ui-overcast.css",
            "~/jqwidgets/styles/jqx.ui-redmond.css",
            "~/jqwidgets/styles/jqx.ui-smoothness.css",
            "~/jqwidgets/styles/jqx.ui-start.css",
            "~/jqwidgets/styles/jqx.ui-sunny.css",
            "~/Content/bootstrap.css",
            "~/Content/site.css"
            ));
        }
    }
}
