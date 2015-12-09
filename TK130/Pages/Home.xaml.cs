using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

using System.Data;
using System.Data.SQLite;
using System.IO;

namespace TK130.Pages
{
    /// <summary>
    /// Interaction logic for Home.xaml
    /// </summary>
    public partial class Home : UserControl
    {
        string mDbPath = "catalog-db.db";

        SQLiteConnection mConn;
        SQLiteDataAdapter mAdapter;
        DataTable mTable;


        public Home()
        {
            InitializeComponent();

        }
    }
/*
  // Navigate to HTML document stream


           //  wbSample.Navigate(@".\Docs\3511.html");

            mConn = new SQLiteConnection("Data Source=" + mDbPath);

            // ----------------- Opening The Connection -----------------
            // ----------------------------------------------------------
            // I.e. Opening DB's File for Reading And Writing.
            // SQLiteDataAdapter cans do it automatically.
            // But, if you would also use SQLiteCommand, or GetSchema(),
            // you should Open DB Manually.
            mConn.Open();

            // ---------- Creating A Test Table, If Not Exists ----------
            // ----------------------------------------------------------
            // id        - Unique Counter - Key Field (Required in any table)
            // FirstName - Text
            // Age       - Integer
          
            // ---------- Get All Tables From DB to ComboBox -----------
            // ---------------------------------------------------------
            // There "Tables" is a system table which contains info
            // about tables in DB.
            // "TABLE_NAME" field in "Tables" contains table names.
            using (DataTable dt = mConn.GetSchema("Tables"))
            {
                CmbTables.ItemsSource = dt.DefaultView;
                if (CmbTables.Items.Count > 0)
                {
                    CmbTables.SelectedIndex = 0;
                }
            }
        }

        private void BtnSelectTable_Click(object sender, RoutedEventArgs e)
        {
            // --- Putting All Data From Selected Table To DataTable ---
            // ---------------------------------------------------------
            // In simply put, DataTable is just matrix (2-dimensional array)
            // which stores data of the table.
            mAdapter = new SQLiteDataAdapter("SELECT * FROM search", mConn);
            mTable = new DataTable(); // Don't forget initialize!
            mAdapter.Fill(mTable);

            // ---------- Disabling Counter Field For Edition ----------
            // ---------------------------------------------------------
            // Because it can throw exception.
            if (mTable.Columns.Contains("id"))
            {
                mTable.Columns["id"].ReadOnly = true;
            }

            // ----------- Fixing One Bug Of WPF's DataGrid ------------
            // ---------------------------------------------------------
            // If DataTable is empty, DataGrid not show columns and
            // not allows to add a row.
            // To fix, you should add at least 1 row to empty DataTable.
            if (mTable.Rows.Count == 0)
            {
                mTable.Rows.Add(new object[mTable.Columns.Count]);
            }

            // ------------ Making DataBase Saving Changes -------------
            // ---------------------------------------------------------
            // SQLiteCommandBuilder authomatically generates
            // neccessary INSERT, UPDATE, DELETE SQL queries.
            // Next we just have to run the
            // mAdapter.Update(mTable);
            // and all changes in the table will be saved to DataBase.
            new SQLiteCommandBuilder(mAdapter);

            // ------------- Binding DataTable To DataGrid -------------
            // ---------------------------------------------------------
            // DataGrid visualizes DataTable's data in the window.
            dataGrid1.ItemsSource = mTable.DefaultView;
        }

        private void dataGrid1_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

    }
*/
 }
