namespace ServerFromDBTable
{
	partial class Main
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.CBTables = new System.Windows.Forms.ComboBox();
			this.CBSchemas = new System.Windows.Forms.ComboBox();
			this.BTNGenera = new System.Windows.Forms.Button();
			this.CHKOnlyNotMapped = new System.Windows.Forms.CheckBox();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.LBLog = new System.Windows.Forms.ListBox();
			this.SuspendLayout();
			// 
			// CBTables
			// 
			this.CBTables.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
			this.CBTables.Location = new System.Drawing.Point(128, 25);
			this.CBTables.Name = "CBTables";
			this.CBTables.Size = new System.Drawing.Size(405, 21);
			this.CBTables.TabIndex = 0;
			// 
			// CBSchemas
			// 
			this.CBSchemas.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
			this.CBSchemas.Location = new System.Drawing.Point(12, 25);
			this.CBSchemas.Name = "CBSchemas";
			this.CBSchemas.Size = new System.Drawing.Size(110, 21);
			this.CBSchemas.TabIndex = 1;
			this.CBSchemas.SelectedIndexChanged += new System.EventHandler(this.CBSchemas_SelectedIndexChanged);
			// 
			// BTNGenera
			// 
			this.BTNGenera.Location = new System.Drawing.Point(661, 73);
			this.BTNGenera.Name = "BTNGenera";
			this.BTNGenera.Size = new System.Drawing.Size(75, 23);
			this.BTNGenera.TabIndex = 2;
			this.BTNGenera.Text = "Go";
			this.BTNGenera.UseVisualStyleBackColor = true;
			this.BTNGenera.Click += new System.EventHandler(this.BTNGenera_Click);
			// 
			// CHKOnlyNotMapped
			// 
			this.CHKOnlyNotMapped.AutoSize = true;
			this.CHKOnlyNotMapped.Location = new System.Drawing.Point(540, 27);
			this.CHKOnlyNotMapped.Name = "CHKOnlyNotMapped";
			this.CHKOnlyNotMapped.Size = new System.Drawing.Size(196, 17);
			this.CHKOnlyNotMapped.TabIndex = 3;
			this.CHKOnlyNotMapped.Text = "Mostra solo le tabelle NON mappate";
			this.CHKOnlyNotMapped.UseVisualStyleBackColor = true;
			this.CHKOnlyNotMapped.CheckedChanged += new System.EventHandler(this.CHKOnlyNotMapped_CheckedChanged);
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Location = new System.Drawing.Point(9, 9);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(49, 13);
			this.label1.TabIndex = 5;
			this.label1.Text = "Schema:";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Location = new System.Drawing.Point(125, 9);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(42, 13);
			this.label2.TabIndex = 6;
			this.label2.Text = "Tabella";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Location = new System.Drawing.Point(12, 86);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(28, 13);
			this.label3.TabIndex = 7;
			this.label3.Text = "Log:";
			// 
			// LBLog
			// 
			this.LBLog.FormattingEnabled = true;
			this.LBLog.Location = new System.Drawing.Point(12, 102);
			this.LBLog.Name = "LBLog";
			this.LBLog.SelectionMode = System.Windows.Forms.SelectionMode.None;
			this.LBLog.Size = new System.Drawing.Size(724, 277);
			this.LBLog.TabIndex = 8;
			// 
			// Main
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(748, 388);
			this.Controls.Add(this.LBLog);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.CHKOnlyNotMapped);
			this.Controls.Add(this.BTNGenera);
			this.Controls.Add(this.CBSchemas);
			this.Controls.Add(this.CBTables);
			this.MaximizeBox = false;
			this.MaximumSize = new System.Drawing.Size(764, 427);
			this.MinimumSize = new System.Drawing.Size(764, 427);
			this.Name = "Main";
			this.Text = "381 Server Side Generator";
			this.Load += new System.EventHandler(this.Main_Load);
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.ComboBox CBTables;
		private System.Windows.Forms.ComboBox CBSchemas;
		private System.Windows.Forms.Button BTNGenera;
		private System.Windows.Forms.CheckBox CHKOnlyNotMapped;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.ListBox LBLog;
	}
}