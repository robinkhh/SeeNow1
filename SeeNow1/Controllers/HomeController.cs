using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data.SqlClient;
using SeeNow1.Models;
using Npgsql;

namespace SeeNow1.Controllers
{
    public class HomeController : Controller
    {
        const string SessionName = "_Name";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.SetString(SessionName, "");
            //return RedirectToAction("Index", "Home");
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public ActionResult SqlLoginForm()
        {
            
            return View();
            
        }

        [HttpPost]
        public ActionResult SqlLoginForm(Player player)
        {
            var connString = "Server=ec2-23-21-165-188.compute-1.amazonaws.com;Database=d3bm0700r43dpl;Username=yohuckrvclthnh;Port=5432;Password=45c96b6e58847ceb7c86b13e632958f8cdde17d3a6bfdff2ecfd8775b44c6403;sslmode=Prefer;TrustServerCertificate=true";

            //string queryString = "SELECT Name from Players WHERE Name='" + player.Name + "';";
            //string queryString = "SELECT * from Players;";
            string queryString = "SELECT \"Name\" from \"Players\"; ";
            using (var conn = new NpgsqlConnection(connString))
            {
                conn.Open();
                //using (var cmd = new NpgsqlCommand("SELECT \"Name\" from \"Players\"", conn))
                using (var cmd = new NpgsqlCommand(queryString, conn))
                using (var reader = cmd.ExecuteReader())
                    try { 
                        while (reader.Read()) {
                            if(player.Name == reader.GetString(0)) { 
                            HttpContext.Session.SetString(SessionName, player.Name);
                            return RedirectToAction("Index","Home");}
                        }
                    }
                    catch(Exception ex)
                    {
                        ViewBag.nobody= ex.ToString();
                    }

            }
            ViewBag.nobody = "無此使用者";
            return View();
        }
    }
}
