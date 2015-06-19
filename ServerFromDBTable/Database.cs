using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServerFromDBTable;
using CaronteWeb.Database;


namespace ServerFromDBTable.Database
{
	public static class DBFunction
	{
		public static List<Table> GetSchemaAndTables(CaronteContext context381)
		{
			return context381.Database.SqlQuery<Table>(@"SELECT T.TABLE_SCHEMA, T.TABLE_NAME
														 FROM INFORMATION_SCHEMA.TABLES T
														 WHERE T.TABLE_TYPE='Base Table'
														 ORDER BY T.TABLE_SCHEMA, T.TABLE_NAME").ToList();
		}

		public static List<TableColumns> GetColumnsFromTable(CaronteContext context381, string table)
		{
			return context381.Database.SqlQuery<TableColumns>(@"SELECT C.COLUMN_NAME,
																	   C.ORDINAL_POSITION,
																	   C.DATA_TYPE,
																	   C.CHARACTER_MAXIMUM_LENGTH,
																	   CASE WHEN (C.IS_NULLABLE = 'YES') THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END IS_NULLABLE,
																	   COLS.IS_COMPUTED,
																	   COLS.DBGEN_COMPUTED,
																	   COLS.IS_IDENTITY
																FROM INFORMATION_SCHEMA.COLUMNS C
																JOIN (SELECT COLS.name COLUMN_NAME,
																		CASE WHEN (COLS.default_object_id > 0) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END DBGEN_COMPUTED,
																		COLS.is_computed IS_COMPUTED,
																		CAST(COLS.is_identity AS BIT) IS_IDENTITY
																	  FROM sys.columns COLS
																	  JOIN sys.tables T ON T.object_id = COLS.object_id
																	  WHERE T.name = {0}) COLS ON COLS.COLUMN_NAME = C.COLUMN_NAME
																WHERE C.TABLE_NAME = {0}
																ORDER BY C.ORDINAL_POSITION", table).ToList();
		}

	}

	public class Table
	{
		public string TABLE_SCHEMA { get; set; }
		public string TABLE_NAME { get; set; }
	}
	public class TableColumns 
	{
		public string COLUMN_NAME { get; set; }
		public int ORDINAL_POSITION { get; set; }
		public bool IS_NULLABLE { get; set; }
		public string DATA_TYPE { get; set; }
		public int? CHARACTER_MAXIMUM_LENGTH { get; set; }
		public bool IS_COMPUTED { get; set; }
		public bool DBGEN_COMPUTED { get; set; }
		public bool IS_IDENTITY { get; set; }
	}
}
