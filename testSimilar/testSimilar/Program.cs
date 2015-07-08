using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testSimilar
{
	class Program
	{
		static void Main(string[] args)
		{
			List<string> righe = System.IO.File.ReadAllLines("export.txt").ToList();

			for (int i = 1; i < righe.Count; i++)
			{
				if (righe[i].Length > 80 && righe[i-1].Length > 80 && righe[i].Substring(0, 71) == righe[i - 1].Substring(0, 71))
					Console.WriteLine(String.Format("{0}{1}{2}", righe[i], Environment.NewLine, righe[i - 1]));
			}

			
		}
	}
}
