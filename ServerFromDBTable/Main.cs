using ServerFromDBTable.Database;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Globalization;
using CaronteWeb.Database;


namespace ServerFromDBTable
{
	public partial class Main : Form
	{
		private CaronteContext context381;
		private List<Table> tables;


		private List<string> exclude;

		public Main()
		{
			InitializeComponent();

			


			context381 = new CaronteContext(@"Data Source=MDTASG\SQLSERVER2014;Initial Catalog=Caronte;Persist Security Info=True;MultipleActiveResultSets=True;User ID=sa;Password=Mssqlidea2014");
			context381.Configuration.LazyLoadingEnabled = false;
			context381.Configuration.AutoDetectChangesEnabled = false;

			exclude = new List<string>()
			{
				"FKPUSER_INS",
				"FKPUSER_MOD",
				"DATA_INS",
				"DATA_MOD",
			};
		}

		private void Main_Load(object sender, EventArgs e)
		{
			tables = DBFunction.GetSchemaAndTables(this.context381);

			CBSchemas.DataSource = tables.Select(x => x.TABLE_SCHEMA).Distinct().ToList();
		}

		private void CHKOnlyNotMapped_CheckedChanged(object sender, EventArgs e)
		{
			this.GetFilteredTables();
		}

		private void CBSchemas_SelectedIndexChanged(object sender, EventArgs e)
		{
			this.GetFilteredTables();
		}

		private void BTNGenera_Click(object sender, EventArgs e)
		{
			LBLog.Items.Clear();

			string dir = this.GenerateAll();

			//if (MessageBox.Show("Vuoi visualizzare i file generati?", "Visualizza!", MessageBoxButtons.YesNo) == DialogResult.Yes)
			//{
			//	Process.Start("explorer.exe", dir);
			//}
			//Application.Exit();
		}

		private void GetFilteredTables()
		{
			if (CHKOnlyNotMapped.Checked)
			{
				var a = this.tables.Where(x => x.TABLE_SCHEMA == (string)CBSchemas.SelectedItem).Select(x => x.TABLE_NAME).ToList();
				
				CBTables.DataSource = a.ToList();
			}
			else
			{
				CBTables.DataSource = this.tables.Where(x => x.TABLE_SCHEMA == (string)CBSchemas.SelectedItem).Select(x => x.TABLE_NAME).ToList();
			}
		}

		private void WriteLog(string msg)
		{
			LBLog.Items.Add(msg);
		}

		private string GenerateAll()
		{
			string schema = CBSchemas.SelectedItem.ToString();
			string table = CBTables.SelectedItem.ToString();
			this.WriteLog(string.Format("Hai selezionato {0}.{1} !", schema, table));

			this.WriteLog("Sto acquisendo le colonne dalla tabella selezionata...");
			List<TableColumns> columns = DBFunction.GetColumnsFromTable(this.context381, table);
			this.WriteLog(string.Format("Trovate {0} colonne", columns.Count));


			//generate entity
			DirectoryInfo dir = Directory.CreateDirectory(Path.Combine(schema, table));
			File.WriteAllText(Path.Combine(dir.FullName, "Entity.cs"), this.GenerateEntity(columns, table, schema));
			this.WriteLog("Classe dell'Entity Framework generata con successo!!!");


			//generate controller
			string controller = File.ReadAllText(@"Resource\Controller.cs");
			File.WriteAllText(Path.Combine(dir.FullName, string.Format("{0}.Controller.cs", this.GetClassName(table))),
							  this.GenerateController(columns, table, schema, controller));
			this.WriteLog("Controller generato con successo!!!");


			//generate service
			string service = File.ReadAllText(@"Resource\Service.cs");
			File.WriteAllText(Path.Combine(dir.FullName, string.Format("{0}.cs", this.GetClassName(table))),
							  this.GenerateService(columns, table, schema, service));
			this.WriteLog("Service generato con successo!!!");


			//generate DTO
			string dto = File.ReadAllText(@"Resource\DTO.cs");
			File.WriteAllText(Path.Combine(dir.FullName, string.Format("{0}DTO.cs", this.GetClassName(table))),
							  this.GenerateDTO(columns, table, schema, dto));
			this.WriteLog("DTO generato con successo!!!");


			//generate assembler
			string assembler = File.ReadAllText(@"Resource\Assembler.cs");
			File.WriteAllText(Path.Combine(dir.FullName, string.Format("{0}.{1}.Assembler.cs", this.TranslateSchema(schema, true), this.GetClassName(table))),
							  this.GenerateAssembler(columns, table, schema, assembler));
			this.WriteLog("Assembler generato con successo!!!");


			return dir.FullName;
		}

		private string GenerateGeneric(List<TableColumns> columns, string table, string schema, string file)
		{
			file = file.Replace("<%SCHEMA_CONV_CAPITALIZE%>", this.TranslateSchema(schema, true));
			file = file.Replace("<%TABLE_NAME_CAPITALIZE%>", this.GetClassName(table));
			file = file.Replace("<%TABLE_KEY%>", columns.FirstOrDefault(x => x.IS_IDENTITY).COLUMN_NAME);
			return file;
		}

		private string GenerateEntity(List<TableColumns> columns, string table, string schema)
		{
			this.WriteLog("Sto generando la classe dell'Entity Framework...");

			string result = string.Format("[Table(\"{0}\", Schema = \"{1}\")]{3}public class {2}{3}{{{3}", table, schema, this.GetClassName(table), Environment.NewLine);

			string colAttr = "[Column(\"{0}\")]{1}";
			string maxLengthAttr = "[MaxLength({0})]";
			string keyAttr = "[Key]";
			string identityAttr = "[DatabaseGenerated(DatabaseGeneratedOption.Identity)]";
			string dbGenAttr = "[DatabaseGenerated(DatabaseGeneratedOption.Computed)]";
			string requiredAttr = "[Required]";
			string variable = "public {0} {1} {{ get; set; }}{2}{2}";

			foreach (TableColumns col in columns)
			{
				//result += string.Format();
				result += string.Format(colAttr, col.COLUMN_NAME, Environment.NewLine);

				if (col.CHARACTER_MAXIMUM_LENGTH.HasValue && col.CHARACTER_MAXIMUM_LENGTH.Value > 0)
					result += string.Format(maxLengthAttr, col.CHARACTER_MAXIMUM_LENGTH.Value) + Environment.NewLine;

				if (col.IS_IDENTITY)
					result += keyAttr + Environment.NewLine + identityAttr + Environment.NewLine;

				if (col.DBGEN_COMPUTED)
					result += dbGenAttr + Environment.NewLine;

				if (!col.IS_NULLABLE)
					result += requiredAttr + Environment.NewLine;

				result += string.Format(variable, this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, false), col.COLUMN_NAME, Environment.NewLine);
			}

			return string.Format("{0}{1}}}", result, Environment.NewLine, "}");
		}

		private string GenerateController(List<TableColumns> columns, string table, string schema, string file)
		{
			return this.GenerateGeneric(columns, table, schema, file);
		}

		private string GenerateService(List<TableColumns> columns, string table, string schema, string file)
		{
			file = this.GenerateGeneric(columns, table, schema, file);

			string dto = string.Empty;
			string place = "{0} = obj.{1},{2}";

			foreach (TableColumns col in columns)
			{
				if (col.CHARACTER_MAXIMUM_LENGTH == 5)
				{
					dto += string.Format(place, col.COLUMN_NAME + "_CODICE", col.COLUMN_NAME, Environment.NewLine);
					dto += "//" + string.Format(place, col.COLUMN_NAME + "_DESC", col.COLUMN_NAME, Environment.NewLine);
				}
				else
				{
					if (exclude.Contains(col.COLUMN_NAME)) dto += "//";

					if (this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, false).StartsWith("decimal"))
						dto += string.Format(place, col.COLUMN_NAME, "(double?)" + col.COLUMN_NAME, Environment.NewLine);
					else
						dto += string.Format(place, col.COLUMN_NAME, col.COLUMN_NAME, Environment.NewLine);
				}
			}


			file = file.Replace("<%DTO%>", dto);
			return file;
		}

		private string GenerateDTO(List<TableColumns> columns, string table, string schema, string file)
		{
			file = this.GenerateGeneric(columns, table, schema, file);

			string dto = string.Empty;
			string keyAttr = "[Key]";
			string variable = "public {0} {1} {{ set; get; }}{2}";
			foreach (TableColumns col in columns)
			{
				if (col.IS_IDENTITY)
					dto += keyAttr + Environment.NewLine;

				//sono una property
				if (col.CHARACTER_MAXIMUM_LENGTH == 5)
				{
					dto += string.Format(variable, this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, true), col.COLUMN_NAME + "_CODICE", Environment.NewLine);
					dto += string.Format(variable, this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, true), col.COLUMN_NAME + "_DESC", Environment.NewLine);
				}
				else
				{
					if (exclude.Contains(col.COLUMN_NAME)) dto += "//";
					dto += string.Format(variable, this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, true), col.COLUMN_NAME, Environment.NewLine);
				}
			}

			file = file.Replace("<%DTO%>", dto);
			return file;
		}

		private string GenerateAssembler(List<TableColumns> columns, string table, string schema, string file)
		{
			file = this.GenerateGeneric(columns, table, schema, file);

			string insert = string.Empty, update = string.Empty;
			string vInsert = "{0} = {1},{2}";
			string vUpdate = "domainEntity.{0} = {1};{2}";
			foreach (TableColumns col in columns.Where(x => !x.IS_IDENTITY).Where(x=>!exclude.Contains(x.COLUMN_NAME)).ToList())
			{
				//sono una property
				if (col.CHARACTER_MAXIMUM_LENGTH == 5)
				{
					insert += string.Format(vInsert, col.COLUMN_NAME, this.NullOrWS("dto." + col.COLUMN_NAME + "_CODICE", col.IS_NULLABLE), Environment.NewLine);
					update += string.Format(vUpdate, col.COLUMN_NAME, this.NullOrWS("dto." + col.COLUMN_NAME + "_CODICE", col.IS_NULLABLE), Environment.NewLine);
				}
				else
				{
					if (this.GetTableColumnType(col.DATA_TYPE, col.IS_NULLABLE, false).StartsWith("string"))
					{
						insert += string.Format(vInsert, col.COLUMN_NAME, this.NullOrWS("dto." + col.COLUMN_NAME, col.IS_NULLABLE), Environment.NewLine);
						update += string.Format(vUpdate, col.COLUMN_NAME, this.NullOrWS("dto." + col.COLUMN_NAME, col.IS_NULLABLE), Environment.NewLine);
					}
					else
					{
						insert += string.Format(vInsert, col.COLUMN_NAME, "dto." + col.COLUMN_NAME, Environment.NewLine);
						update += string.Format(vUpdate, col.COLUMN_NAME, "dto." + col.COLUMN_NAME, Environment.NewLine);
					}
				}
			}

			insert += string.Format(vInsert, "FKPUSER_INS", "SaideaUser.PUtente", Environment.NewLine);
			insert += string.Format(vInsert, "FKPUSER_MOD", "SaideaUser.PUtente", Environment.NewLine);

			update += string.Format(vUpdate, "FKPUSER_MOD", "SaideaUser.PUtente", Environment.NewLine);

			file = file.Replace("<%ASSEMBLER_INSERT%>", insert);
			file = file.Replace("<%ASSEMBLER_UPDATE%>", update);
			return file;
		}

		private string NullOrWS(string name, bool nullable)
		{
			return nullable ? string.Format("string.IsNullOrWhiteSpace({0}) ? null : {0}", name) : name;
		}

		private string TranslateSchema(string schema, bool capitalized)
		{
			return capitalized ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(schema == "dbo" ? "comune" : schema) : (schema == "dbo" ? "comune" : schema);
		}

		private string GetClassName(string table)
		{
			return string.Join("", table.ToLower().Split('_').Select(x => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x)));			
		}

		private string GetTableColumnType(string dataType, bool isNullable, bool isFromDTO)
		{
			string ret = dataType;

			switch (dataType)
			{
				case "bigint": ret = "long"; break;
				case "bit": ret = "bool"; break;
				case "tinyint": ret = isFromDTO ? "int" : "Int16"; break;
				case "uniqueidentifier": ret = "Guid"; break;
				case "varbinary": ret = "byte[]"; break;
				case "datetime": ret = "DateTime"; break;
				case "date"	:
				case "datetimeoffset": ret = "DateTimeOffset"; break;
				case "float": ret = " double"; break;
				case "geography": ret = "DbGeography"; break;
				case "int": ret = "int"; break;

				case "decimal":
				case "money":
				case "numeric": ret = isFromDTO ? "double" : "decimal"; break;

				case "nvarchar":
				case "varchar":
				case "xml": ret = "string"; break;

				default:
					throw new Exception("Nessun tipo trovato!");
			}

			return (isNullable && ret != "string") ? ret + "?" : ret;
		}
	}
}
