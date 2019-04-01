using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeeNow1.Models
{
    public class Score
    {
        public int ID { get; set; }
        public int PlayerID { get; set; }
        public int PlayerScore { get; set; }
        public DateTime PlayTime{get;set;}

        public virtual Player Player { get; set; }
    }
}
