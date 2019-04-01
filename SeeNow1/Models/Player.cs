﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeeNow1.Models
{
    public class Player
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Score> Scores { get; set; }
    }
}
