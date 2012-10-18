namespace MvcApplication141.Core.Model
{
	using System;
	using System.ComponentModel.DataAnnotations;

	public partial class User
	{
        public int LayoutId { get; set; }
        public bool UseDefaultDashboard { get; set; }
	}
}