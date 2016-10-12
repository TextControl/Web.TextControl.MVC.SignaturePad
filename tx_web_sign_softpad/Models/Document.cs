using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tx_web_sign_softpad.Models
{
    public class Document
    {
        public string BinaryDocument { get; set; }
        public string BinarySignature { get; set; }
        public string Name { get; set; }
    }
}
