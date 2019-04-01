using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SeeNow1.Models
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options)
            : base(options)
        {
        }
        public DbSet<SeeNow1.Models.Player> Players { get; set; }
        public DbSet<Score> Scores { get; set; }
    }
}
