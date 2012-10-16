using System.Collections.Generic;

namespace Netchex.Domain.WidgetData
{
    public class MyProfileWidget : IWidgetData
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public string Department { get; set; }
        public string Supervisor { get; set; }
        public string Email { get; set; }
        public string CellPhone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int ZipCode { get; set; }
        public string EmergencyContact { get; set; }
        public string PictureUrl { get; set; }
        public string[] KeyDate { get; set; }

        public string FullName 
        {
            get { return FirstName + " " +LastName; }
        }

        public MyProfileWidget()
        {
            Id = "1";
            FirstName = "Dominic";
            LastName = "Newell";

            Department = "IT";
            Supervisor = "Chris Fontan";
            Email = "dummy@netchexonline.com";
            CellPhone = "555-555-5555";
            Address = "123 Center ln.";
            City = "Mandeville";
            State = "LA";
            ZipCode = 12345;
            EmergencyContact = "Junk";
            PictureUrl = "simpletest";
            KeyDate = new string[] {"{ eventName: Anniversary, eventDate: 08/11/2012, eventYear: 1 Years }",
                "{ eventName: Benefit Eligibility, eventDate: 09/15/2012, eventYear: 1 Years }"};
            

        }
    }
}
